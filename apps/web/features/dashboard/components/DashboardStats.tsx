'use client';

import { useEffect, useState } from 'react';

interface Stats {
  total: number;
  verdictBreakdown: { verdict: string | null; count: number }[];
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then((r) => r.json() as Promise<Stats>)
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) return <p className="text-sm text-secondary">Loading stats...</p>;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="rounded-xl border p-4">
        <p className="text-3xl font-bold">{stats.total}</p>
        <p className="text-sm text-secondary">Total Verifications</p>
      </div>
      {stats.verdictBreakdown.map((v) => (
        <div key={v.verdict ?? 'null'} className="rounded-xl border p-4">
          <p className="text-3xl font-bold">{v.count}</p>
          <p className="text-sm text-secondary">{v.verdict ?? 'Pending'}</p>
        </div>
      ))}
    </div>
  );
}
