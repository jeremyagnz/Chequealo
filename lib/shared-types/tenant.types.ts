export type TenantPlan = 'free' | 'pro' | 'enterprise';

export interface WhiteLabelConfig {
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  customDomain?: string;
  companyName?: string;
}

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  plan: TenantPlan;
  whiteLabelConfig: WhiteLabelConfig | null;
  createdAt: string;
}

export interface TenantSettings {
  id: string;
  tenantId: string;
  userId: string | null;
  preferredAIProvider: string;
  preferredSearchProvider: string;
  language: string;
  config: Record<string, unknown>;
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  createdAt: string;
}
