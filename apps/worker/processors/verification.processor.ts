import { Worker, type Job } from 'bullmq';
import { connection, VERIFICATION_QUEUE_NAME } from '../queues/verification.queue';
import type { VerificationJobPayload } from '@chequealo/shared-types';
import { AIProviderFactory } from '@chequealo/ai-providers';
import { SearchFactory } from '@chequealo/search-engine';
import { CredibilityEngine } from '@chequealo/credibility-engine';
import { db } from '@chequealo/database';
import { verifications } from '@chequealo/database/schema';
import { eq } from 'drizzle-orm';

const credibilityEngine = new CredibilityEngine();

async function processVerification(job: Job<VerificationJobPayload>): Promise<void> {
  const { verificationId, claim, tenantId } = job.data;

  // Mark as processing
  await db
    .update(verifications)
    .set({ status: 'processing', updatedAt: new Date() })
    .where(eq(verifications.id, verificationId));

  // 1. Search for evidence
  const searchProviderName = (process.env.DEFAULT_SEARCH_PROVIDER ?? 'serper') as 'serper' | 'brave' | 'tavily';
  const searchProvider = SearchFactory.create(searchProviderName);
  const evidence = await searchProvider.search(
    { query: claim, maxResults: 5 },
    { apiKey: process.env.SERPER_API_KEY ?? '' },
  );

  // 2. Analyze with AI provider(s)
  const aiProviderName = (process.env.DEFAULT_AI_PROVIDER ?? 'openai') as 'openai' | 'anthropic' | 'gemini' | 'groq';
  const aiProvider = AIProviderFactory.create(aiProviderName);
  const evidenceText = evidence.map((e) => `${e.title}: ${e.snippet} (${e.url})`).join('\n');

  const aiResult = await aiProvider.analyze(
    { claim, evidence: evidenceText },
    { apiKey: process.env.OPENAI_API_KEY ?? '' },
  );

  // 3. Compute credibility score
  const credResult = credibilityEngine.compute(evidence, [aiResult]);

  // 4. Persist result
  await db
    .update(verifications)
    .set({
      status: 'completed',
      credibilityScore: credResult.score,
      verdict: credResult.verdict,
      evidence: evidence,
      aiResponses: [aiResult],
      updatedAt: new Date(),
    })
    .where(eq(verifications.id, verificationId));
}

export function createVerificationWorker(): Worker {
  return new Worker<VerificationJobPayload>(
    VERIFICATION_QUEUE_NAME,
    processVerification,
    {
      connection,
      concurrency: Number(process.env.WORKER_CONCURRENCY ?? 5),
    },
  );
}
