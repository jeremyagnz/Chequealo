import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chequealo AI — AI-Powered Fact Checking',
  description: 'Verify news, claims, and rumors instantly with multiple AI providers and real-time evidence.',
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
