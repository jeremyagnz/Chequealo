'use client';

import { useEffect, useState } from 'react';
import type { VerificationRecord } from '@chequealo/database/schema';
import { Badge } from '@/shared/components/ui/Badge';

function SkeletonItem() {
  return (
    <li className="rounded-2xl border border-border bg-surface p-5">
      <div className="skeleton h-4 w-3/4 mb-3" />
      <div className="flex items-center gap-3">
        <div className="skeleton h-5 w-16 rounded-full" />
        <div className="skeleton h-3 w-10" />
        <div className="skeleton h-3 w-20" />
      </div>
    </li>
  );
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 75
      ? 'rgb(var(--color-true))'
      : score >= 50
        ? 'rgb(var(--color-accent))'
        : score >= 25
          ? 'rgb(var(--color-misleading))'
          : 'rgb(var(--color-false))';

  return (
    <span className="flex items-center gap-2" title={`Credibility: ${score}/100`}>
      <div className="h-1 w-14 rounded-full bg-surface3 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span className="text-[12px] font-semibold tabular-nums" style={{ color }}>
        {score}
      </span>
    </span>
  );
}

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function HistoryList() {
  const [items, setItems] = useState<VerificationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/history')
      .then((r) => r.json() as Promise<{ data: VerificationRecord[] }>)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <ul className="space-y-3" aria-label="Loading history">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </ul>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 py-16 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-surface2 border border-border">
          <svg className="h-5 w-5 text-faint" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-muted">No verifications yet</p>
        <p className="mt-1 text-[12.5px] text-faint">
          Your verified claims will appear here.
        </p>
        <a
          href="/verify"
          className="mt-5 rounded-xl bg-primary/20 border border-primary/30 px-4 py-2 text-sm text-primary-light font-medium hover:bg-primary/30 transition-colors"
        >
          Verify your first claim →
        </a>
      </div>
    );
  }

  return (
    <ul className="space-y-2.5" aria-label="Verification history">
      {items.map((item, i) => (
        <li
          key={item.id}
          className="group animate-fade-up rounded-2xl border border-border bg-surface p-5 shadow-card hover:bg-surface2 hover:border-border/60 hover:shadow-card-hover transition-all duration-150"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          {/* Claim text */}
          <p className="text-[0.875rem] font-medium text-text leading-snug line-clamp-2 mb-3">
            {item.claim}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <Badge verdict={item.verdict ?? item.status} size="sm" />

            {item.credibilityScore !== null && item.credibilityScore !== undefined && (
              <ScoreBar score={item.credibilityScore} />
            )}

            <span className="text-[11.5px] text-faint ml-auto">
              {formatDate(item.createdAt)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
