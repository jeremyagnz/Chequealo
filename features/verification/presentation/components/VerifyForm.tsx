'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { CredibilityMeter } from '@/shared/components/ui/CredibilityMeter';
import { Badge } from '@/shared/components/ui/Badge';

type VerificationStatus = 'pending' | 'processing' | 'completed' | 'failed';
type VerificationVerdict = 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED' | null;

interface VerificationResult {
  id: string;
  claim: string;
  status: VerificationStatus;
  credibilityScore: number | null;
  verdict: VerificationVerdict;
  evidence: unknown[];
  aiResponses: unknown[];
  createdAt: string;
}

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary-light animate-pulse-glow"
          style={{ animationDelay: `${i * 250}ms` }}
        />
      ))}
    </span>
  );
}

function ProcessingCard({ claim }: { claim: string }) {
  const steps = [
    { label: 'Fetching live evidence',  delay: 0 },
    { label: 'Running AI models',        delay: 800 },
    { label: 'Calculating credibility',  delay: 1600 },
  ];

  return (
    <div className="animate-fade-up rounded-2xl border border-border bg-surface p-7 shadow-card">
      <div className="mb-5 flex items-start gap-3">
        <div className="shrink-0 mt-0.5 h-8 w-8 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
          <svg className="h-4 w-4 text-primary-light animate-spin-slow" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-text">Verifying claim…</p>
          <p className="mt-0.5 text-[12.5px] text-faint line-clamp-2 italic">"{claim}"</p>
        </div>
      </div>

      <div className="space-y-2.5 pl-11">
        {steps.map(({ label, delay }, i) => (
          <div
            key={label}
            className="animate-slide-in-left flex items-center gap-2.5 text-[13px] text-muted"
            style={{ animationDelay: `${delay}ms` }}
          >
            <span className="h-1 w-1 rounded-full bg-primary-light shrink-0" aria-hidden="true" />
            {label}
            {i === steps.length - 1 && <LoadingDots />}
          </div>
        ))}
      </div>
    </div>
  );
}

interface ResultCardProps {
  result: VerificationResult;
}

function ResultCard({ result }: ResultCardProps) {
  const { verdict, credibilityScore, claim, evidence, aiResponses } = result;

  return (
    <div className="animate-fade-up rounded-2xl border border-border bg-surface shadow-card overflow-hidden">
      {/* Result header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[11.5px] font-semibold uppercase tracking-wider text-faint mb-2">
              Claim verified
            </p>
            <p className="text-[0.9375rem] font-medium text-text leading-snug line-clamp-3 italic">
              "{claim}"
            </p>
          </div>

          {credibilityScore !== null && credibilityScore !== undefined && (
            <div className="shrink-0">
              <CredibilityMeter score={credibilityScore} size={108} animate />
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          {verdict && <Badge verdict={verdict} />}
          <span className="text-[12px] text-faint">
            {new Date(result.createdAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>

      {/* Evidence */}
      {Array.isArray(evidence) && evidence.length > 0 && (
        <div className="p-6 border-b border-border">
          <h3 className="mb-3 text-[13px] font-semibold text-text flex items-center gap-2">
            <svg className="h-3.5 w-3.5 text-faint" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
            </svg>
            Evidence ({evidence.length})
          </h3>
          <ol className="space-y-2">
            {(evidence as Array<{ title?: string; url?: string; snippet?: string }>)
              .slice(0, 5)
              .map((ev, i) => (
                <li key={i} className="flex gap-3 text-[12.5px]">
                  <span className="shrink-0 text-faint tabular-nums mt-0.5">{i + 1}.</span>
                  <div className="min-w-0">
                    {ev.url ? (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-light hover:underline font-medium"
                      >
                        {ev.title ?? ev.url}
                      </a>
                    ) : (
                      <span className="text-muted font-medium">{ev.title}</span>
                    )}
                    {ev.snippet && (
                      <p className="text-faint mt-0.5 line-clamp-2">{ev.snippet}</p>
                    )}
                  </div>
                </li>
              ))}
          </ol>
        </div>
      )}

      {/* AI responses */}
      {Array.isArray(aiResponses) && aiResponses.length > 0 && (
        <div className="p-6">
          <h3 className="mb-3 text-[13px] font-semibold text-text flex items-center gap-2">
            <svg className="h-3.5 w-3.5 text-faint" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            AI Analysis ({aiResponses.length} models)
          </h3>
          <div className="space-y-3">
            {(aiResponses as Array<{ provider?: string; verdict?: string; reasoning?: string; score?: number }>)
              .map((resp, i) => (
                <div key={i} className="rounded-xl bg-surface2 border border-border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-semibold text-muted capitalize">
                      {resp.provider ?? `Model ${i + 1}`}
                    </span>
                    {resp.verdict && <Badge verdict={resp.verdict} size="sm" />}
                  </div>
                  {resp.reasoning && (
                    <p className="text-[12.5px] text-faint leading-relaxed">{resp.reasoning}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

const POLL_INTERVAL = 2000;
const MAX_POLLS = 30;

export function VerifyForm() {
  const [claim, setClaim] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollCount = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fetchResult = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const res = await fetch(`/api/verify/${id}`, { credentials: 'include' });
        if (!res.ok) return false;
        const data = (await res.json()) as VerificationResult;
        if (data.status === 'completed' || data.status === 'failed') {
          setResult(data);
          setPolling(false);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    [],
  );

  useEffect(() => {
    if (!jobId || !polling) return;

    const interval = setInterval(async () => {
      pollCount.current += 1;
      const done = await fetchResult(jobId);
      if (done || pollCount.current >= MAX_POLLS) {
        clearInterval(interval);
        setPolling(false);
        if (!done) {
          setError('Verification is taking longer than expected. Please check History shortly.');
        }
      }
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [jobId, polling, fetchResult]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!claim.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setJobId(null);
    pollCount.current = 0;

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ claim }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Your session expired. Please sign in again.');
        }
        throw new Error('Failed to submit claim. Please try again.');
      }

      const data = (await res.json()) as { jobId: string };
      setJobId(data.jobId);
      setPolling(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setJobId(null);
    setError(null);
    setClaim('');
    setPolling(false);
    pollCount.current = 0;
    setTimeout(() => textareaRef.current?.focus(), 50);
  }

  const canSubmit = claim.trim().length >= 10 && !loading && !polling;
  const isProcessing = polling && !result;

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Input form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="rounded-2xl border border-border bg-surface shadow-card focus-within:border-primary/50 focus-within:shadow-glow-primary transition-all duration-200">
          <textarea
            ref={textareaRef}
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="Paste a claim, news headline, tweet, or statement to verify…"
            aria-label="Enter claim to verify"
            rows={4}
            disabled={loading || polling}
            className="w-full resize-none rounded-t-2xl bg-transparent px-5 pt-5 pb-3 text-[0.9375rem] text-text placeholder:text-faint border-none outline-none focus:ring-0 disabled:opacity-60 disabled:cursor-not-allowed"
          />

          <div className="flex items-center justify-between px-4 pb-3 pt-1">
            <span className={`text-[12px] tabular-nums ${claim.length < 10 ? 'text-faint' : 'text-muted'}`}>
              {claim.length} chars{claim.length < 10 && claim.length > 0 ? ` (${10 - claim.length} more needed)` : ''}
            </span>

            <button
              type="submit"
              disabled={!canSubmit}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm text-white font-semibold hover:bg-primary/90 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-100 shadow-glow-primary"
            >
              {loading ? (
                <>
                  <svg className="h-3.5 w-3.5 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Submitting…
                </>
              ) : (
                <>
                  Verify Claim
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="animate-fade-in flex items-start gap-3 rounded-xl border border-verdict-false/25 bg-verdict-false/10 px-4 py-3" role="alert">
          <svg className="h-4 w-4 text-verdict-false shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" />
          </svg>
          <p className="text-[13px] text-verdict-false">{error}</p>
        </div>
      )}

      {/* Processing state */}
      {isProcessing && <ProcessingCard claim={claim} />}

      {/* Result */}
      {result && (
        <>
          {result.status === 'failed' ? (
            <div className="animate-fade-up rounded-2xl border border-verdict-false/25 bg-verdict-false/10 px-6 py-5" role="alert">
              <p className="text-sm font-medium text-verdict-false">
                Verification failed. The claim may be too ambiguous or our models couldn't reach a consensus.
              </p>
            </div>
          ) : (
            <ResultCard result={result} />
          )}

          <button
            type="button"
            onClick={handleReset}
            className="text-[13px] text-muted hover:text-text transition-colors flex items-center gap-1.5"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Verify another claim
          </button>
        </>
      )}
    </div>
  );
}
