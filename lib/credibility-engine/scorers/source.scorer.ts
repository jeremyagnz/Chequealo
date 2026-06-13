import type { EvidenceItem } from '@/lib/shared-types';

// Known high-credibility domains
const HIGH_CREDIBILITY_DOMAINS = new Set([
  'reuters.com', 'apnews.com', 'bbc.com', 'bbc.co.uk',
  'nytimes.com', 'theguardian.com', 'nature.com', 'science.org',
  'who.int', 'cdc.gov', 'nih.gov', 'nasa.gov',
]);

const LOW_CREDIBILITY_DOMAINS = new Set([
  'infowars.com', 'naturalnews.com',
]);

export class SourceScorer {
  /**
   * Returns a score (0–100) based on the credibility of evidence sources.
   */
  score(evidence: EvidenceItem[]): number {
    if (evidence.length === 0) return 0;

    const scores = evidence.map((item) => {
      const hostname = this.extractHostname(item.url);
      if (HIGH_CREDIBILITY_DOMAINS.has(hostname)) return 100;
      if (LOW_CREDIBILITY_DOMAINS.has(hostname)) return 10;
      // Mid-tier default
      return 50;
    });

    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  private extractHostname(url: string): string {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  }
}
