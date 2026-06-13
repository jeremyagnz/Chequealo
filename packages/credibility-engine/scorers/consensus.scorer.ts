import type { AIProviderResponse } from '@chequealo/shared-types';

export class ConsensusScorer {
  /**
   * Returns a score (0–100) based on consensus between multiple AI providers.
   * Higher score = stronger consensus towards TRUE.
   */
  score(aiResponses: AIProviderResponse[]): number {
    if (aiResponses.length === 0) return 0;

    const verdictWeights: Record<string, number> = {
      TRUE: 100,
      MISLEADING: 40,
      UNVERIFIED: 30,
      FALSE: 0,
    };

    const weightedScores = aiResponses.map((r) => {
      const baseScore = verdictWeights[r.verdict] ?? 30;
      return baseScore * r.confidence;
    });

    return Math.round(weightedScores.reduce((a, b) => a + b, 0) / aiResponses.length);
  }
}
