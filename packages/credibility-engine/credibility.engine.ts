import type { EvidenceItem, AIProviderResponse, VerificationVerdict } from '@chequealo/shared-types';
import { SourceScorer } from './scorers/source.scorer';
import { ConsensusScorer } from './scorers/consensus.scorer';
import { RecencyScorer } from './scorers/recency.scorer';

export interface CredibilityResult {
  score: number;
  verdict: VerificationVerdict;
  breakdown: {
    sourceScore: number;
    consensusScore: number;
    recencyScore: number;
  };
}

const WEIGHTS = {
  source: 0.3,
  consensus: 0.5,
  recency: 0.2,
};

export class CredibilityEngine {
  private readonly sourceScorer = new SourceScorer();
  private readonly consensusScorer = new ConsensusScorer();
  private readonly recencyScorer = new RecencyScorer();

  compute(evidence: EvidenceItem[], aiResponses: AIProviderResponse[]): CredibilityResult {
    const sourceScore = this.sourceScorer.score(evidence);
    const consensusScore = this.consensusScorer.score(aiResponses);
    const recencyScore = this.recencyScorer.score(evidence);

    const score = Math.round(
      sourceScore * WEIGHTS.source +
      consensusScore * WEIGHTS.consensus +
      recencyScore * WEIGHTS.recency,
    );

    return {
      score,
      verdict: this.deriveVerdict(score, aiResponses),
      breakdown: { sourceScore, consensusScore, recencyScore },
    };
  }

  private deriveVerdict(score: number, aiResponses: AIProviderResponse[]): VerificationVerdict {
    // If all providers agree on FALSE, override score-based verdict
    const allFalse = aiResponses.length > 0 && aiResponses.every((r) => r.verdict === 'FALSE');
    if (allFalse) return 'FALSE';

    if (score >= 70) return 'TRUE';
    if (score >= 45) return 'MISLEADING';
    if (score >= 20) return 'UNVERIFIED';
    return 'FALSE';
  }
}
