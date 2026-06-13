'use client';

import { useState } from 'react';

export function VerifyForm() {
  const [claim, setClaim] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!claim.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim }),
      });

      if (!res.ok) throw new Error('Failed to submit claim');

      const data = (await res.json()) as { jobId: string };
      setJobId(data.jobId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          placeholder="Enter a claim, news headline, or rumor to verify..."
          className="w-full rounded-lg border p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading || !claim.trim()}
          className="rounded-lg bg-primary px-6 py-2 text-white disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Verify Claim'}
        </button>
      </form>

      {jobId && (
        <div className="mt-6 rounded-lg border p-4 text-sm text-secondary">
          Verification submitted. Job ID: <code className="font-mono">{jobId}</code>
        </div>
      )}
    </div>
  );
}
