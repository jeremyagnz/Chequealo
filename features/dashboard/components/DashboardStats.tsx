'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/shared/components/ui/Badge';

interface Stats {
  total: number;
  verdictBreakdown: { verdict: string | null; count: number }[];
}

const VERDICT_ORDER = ['TRUE', 'FALSE', 'MISLEADING', 'UNVERIFIED'];

function StatCard({
  value,
  label,
  sub,
  delay = 0,
}: {
  value: string | number;
  label: string;
  sub?: string;
  delay?: number;
}) {
  return (
    <div
      className="animate-fade-up rounded-2xl border border-border bg-surface p-5 shadow-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-[2rem] font-bold tracking-tight text-text tabular-nums leading-none">
        {value}
      </p>
      <p className="mt-1.5 text-[13px] font-medium text-muted">{label}</p>
      {sub && <p className="mt-1 text-[11.5px] text-faint">{sub}</p>}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="skeleton h-8 w-16 mb-2" />
      <div className="skeleton h-3.5 w-28" />
    </div>
  );
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then((r) => r.json() as Promise<Stats>)
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="text-sm text-faint">Failed to load stats. Please refresh.</p>
      </div>
    );
  }

  const breakdownMap = Object.fromEntries(
    stats.verdictBreakdown.map((v) => [v.verdict ?? 'PENDING', v.count]),
  );

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          value={stats.total.toLocaleString()}
          label="Total Verifications"
          delay={0}
        />
        {VERDICT_ORDER.map((verdict, i) => (
          <StatCard
            key={verdict}
            value={(breakdownMap[verdict] ?? 0).toLocaleString()}
            label={verdict}
            delay={(i + 1) * 80}
          />
        ))}
      </div>

      {/* Verdict breakdown */}
      {stats.total > 0 && (
        <div className="animate-fade-up delay-300 rounded-2xl border border-border bg-surface p-6 shadow-card">
          <h3 className="mb-5 text-sm font-semibold text-text">Verdict Distribution</h3>
          <div className="space-y-3">
            {VERDICT_ORDER.map((verdict) => {
              const count = breakdownMap[verdict] ?? 0;
              const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
              return (
                <div key={verdict} className="flex items-center gap-3">
                  <Badge verdict={verdict} size="sm" className="w-24 justify-center shrink-0" />
                  <div className="flex-1 h-1.5 rounded-full bg-surface3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, rgb(var(--color-primary)), rgb(var(--color-accent)))`,
                      }}
                    />
                  </div>
                  <span className="w-8 text-right text-[12px] text-faint tabular-nums">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
