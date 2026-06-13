import { DashboardStats } from '@/features/dashboard/components/DashboardStats';

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-[1.625rem] font-bold tracking-tight text-text">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">An overview of your verification activity.</p>
      </div>
      <DashboardStats />
    </div>
  );
}
