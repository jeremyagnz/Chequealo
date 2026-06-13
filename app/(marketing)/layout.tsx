import type { Metadata } from 'next';
import { Navbar } from '@/features/landing/components/Navbar';

export const metadata: Metadata = {
  title: 'Chequealo AI — AI-Powered Fact Checking',
  description:
    'Verify news, claims, and rumors instantly with multiple AI providers and real-time evidence.',
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <footer className="border-t border-border bg-surface/40 mt-24">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-faint">
              © {new Date().getFullYear()} Chequealo AI. All rights reserved.
            </p>
            <nav className="flex gap-6 text-xs text-faint" aria-label="Footer navigation">
              {['Privacy', 'Terms', 'Status', 'Docs'].map((item) => (
                <a key={item} href="#" className="hover:text-muted transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
