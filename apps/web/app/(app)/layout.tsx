import { redirect } from 'next/navigation';
import { auth } from '@/shared/lib/auth';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-white" />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
