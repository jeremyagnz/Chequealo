import type { EvidenceItem } from '@/lib/shared-types';

export class RecencyScorer {
  /**
   * Returns a score (0–100) based on how recent the evidence is.
   * More recent evidence gets a higher score.
   */
  score(evidence: EvidenceItem[]): number {
    if (evidence.length === 0) return 50;

    const now = Date.now();
    const scores = evidence.map((item) => {
      if (!item.publishedAt) return 50;

      const published = new Date(item.publishedAt).getTime();
      if (isNaN(published)) return 50;

      const ageInDays = (now - published) / (1000 * 60 * 60 * 24);

      if (ageInDays <= 1) return 100;
      if (ageInDays <= 7) return 85;
      if (ageInDays <= 30) return 70;
      if (ageInDays <= 90) return 55;
      if (ageInDays <= 365) return 40;
      return 20;
    });

    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }
}
