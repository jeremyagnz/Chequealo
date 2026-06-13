import { redirect } from 'next/navigation';
import { auth } from '@/shared/lib/auth';
import { Sidebar } from '@/shared/components/layout/Sidebar';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      {/* Sidebar — desktop */}
      <div className="hidden md:flex h-full flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top bar — mobile */}
        <header className="md:hidden flex items-center gap-3 px-4 h-14 border-b border-border bg-surface shrink-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary-light border border-primary/25">
            <svg fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span className="text-[14.5px] font-semibold tracking-tight text-text">
            Chequealo <span className="text-gradient font-bold">AI</span>
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-5 py-7 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
