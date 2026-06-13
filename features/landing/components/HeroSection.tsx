'use client';

const TRUST_BADGES = [
  'GPT-4o',
  'Claude 3.5',
  'Gemini 1.5',
  'Groq Llama',
] as const;

const STATS = [
  { value: '10k+', label: 'claims verified' },
  { value: '4',    label: 'AI models' },
  { value: '99.9%', label: 'uptime' },
  { value: '<5s',  label: 'avg response' },
] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <div
        className="absolute top-1/4 -left-32 w-[600px] h-[600px] orb-primary blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] orb-accent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 py-28 w-full max-w-4xl mx-auto">
        {/* AI models badge */}
        <div className="mb-7 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[12px] font-medium text-primary-light tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light animate-pulse-glow" />
            Powered by {TRUST_BADGES.join(' · ')}
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-[-0.03em] leading-[1.08] animate-fade-up delay-100">
          Verify any claim.
          <br />
          <span className="text-gradient-animated">In seconds.</span>
        </h1>

        {/* Description */}
        <p className="mb-10 max-w-[38rem] text-[1.0625rem] text-muted leading-relaxed animate-fade-up delay-200">
          Chequealo AI cross-references your claims against live evidence using
          four AI models and real-time search — delivering a transparent credibility
          score you can trust.
        </p>

        {/* Search bar CTA */}
        <div className="w-full max-w-2xl animate-fade-up delay-300">
          <div
            className="flex items-center gap-2 rounded-2xl bg-surface border border-border p-2 shadow-card focus-within:border-primary/50 focus-within:shadow-glow-primary transition-all duration-200"
          >
            <div className="pl-2 text-faint shrink-0" aria-hidden="true">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>
            <input
              type="text"
              readOnly
              placeholder="Paste a claim, headline, or tweet…"
              aria-label="Enter a claim to verify"
              className="flex-1 bg-transparent py-2.5 text-[0.9375rem] text-faint placeholder:text-faint cursor-pointer border-none outline-none focus:ring-0 rounded-none"
              onClick={() => { if (typeof window !== 'undefined') window.location.href = '/verify'; }}
            />
            <a
              href="/verify"
              className="shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm text-white font-semibold hover:bg-primary/90 active:scale-[0.97] transition-all duration-100 flex items-center gap-2"
            >
              Verify
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
          <p className="mt-3 text-[11.5px] text-faint">
            No credit card required · 10 free verifications per day
          </p>
        </div>

        {/* Stats row */}
        <dl className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 animate-fade-up delay-500">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <dt className="text-2xl font-bold text-text tracking-tight">{value}</dt>
              <dd className="text-[11.5px] text-faint uppercase tracking-wider">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
