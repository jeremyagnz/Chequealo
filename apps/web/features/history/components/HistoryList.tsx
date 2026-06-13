'use client';

import { useEffect, useState } from 'react';
import type { VerificationRecord } from '@chequealo/database/schema';

export function HistoryList() {
  const [items, setItems] = useState<VerificationRecord[]>([]);

  useEffect(() => {
    fetch('/api/history')
      .then((r) => r.json() as Promise<{ data: VerificationRecord[] }>)
      .then((res) => setItems(res.data))
      .catch(console.error);
  }, []);

  if (items.length === 0) {
    return <p className="text-sm text-secondary">No verifications yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id} className="rounded-xl border p-4">
          <p className="font-medium">{item.claim}</p>
          <div className="mt-2 flex items-center gap-3 text-sm text-secondary">
            <span className="capitalize">{item.status}</span>
            {item.verdict && <span className="font-semibold">{item.verdict}</span>}
            {item.credibilityScore !== null && (
              <span>Score: {item.credibilityScore}</span>
            )}
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
