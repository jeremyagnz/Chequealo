import type { VerificationVerdict, VerificationStatus, EvidenceItem, AIProviderResponse } from '@chequealo/shared-types';

export class Verification {
  constructor(
    public readonly id: string,
    public readonly tenantId: string,
    public readonly userId: string,
    public readonly claim: string,
    public status: VerificationStatus,
    public credibilityScore: number | null,
    public verdict: VerificationVerdict | null,
    public evidence: EvidenceItem[],
    public aiResponses: AIProviderResponse[],
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  markAsProcessing(): void {
    this.status = 'processing';
    this.updatedAt = new Date();
  }

  complete(
    score: number,
    verdict: VerificationVerdict,
    evidence: EvidenceItem[],
    aiResponses: AIProviderResponse[],
  ): void {
    this.status = 'completed';
    this.credibilityScore = score;
    this.verdict = verdict;
    this.evidence = evidence;
    this.aiResponses = aiResponses;
    this.updatedAt = new Date();
  }

  fail(): void {
    this.status = 'failed';
    this.updatedAt = new Date();
  }

  isPending(): boolean {
    return this.status === 'pending';
  }

  isCompleted(): boolean {
    return this.status === 'completed';
  }
}
