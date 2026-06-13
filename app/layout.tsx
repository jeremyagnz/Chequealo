import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chequealo AI',
  description: 'Verify news, claims, and rumors with AI-powered fact-checking.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
