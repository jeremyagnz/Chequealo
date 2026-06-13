export type VerificationVerdict = 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED';

export type VerificationStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface EvidenceItem {
  url: string;
  title: string;
  snippet: string;
  publishedAt?: string;
  source: string;
}

export interface AIProviderResponse {
  provider: string;
  verdict: VerificationVerdict;
  explanation: string;
  confidence: number;
  tokensUsed?: number;
}

export interface Verification {
  id: string;
  tenantId: string;
  userId: string;
  claim: string;
  status: VerificationStatus;
  credibilityScore: number | null;
  verdict: VerificationVerdict | null;
  evidence: EvidenceItem[];
  aiResponses: AIProviderResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateVerificationInput {
  claim: string;
  tenantId: string;
  userId: string;
}

export interface VerificationJobPayload {
  verificationId: string;
  claim: string;
  tenantId: string;
  userId: string;
}
