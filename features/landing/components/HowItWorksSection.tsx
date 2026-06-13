const STEPS = [
  {
    number: '01',
    title: 'Submit a Claim',
    description:
      'Paste any news headline, tweet, WhatsApp forward, or statement you want to verify.',
    color: 'from-primary/20 to-primary/5',
    accent: 'text-primary-light',
    border: 'border-primary/25',
  },
  {
    number: '02',
    title: 'AI + Live Search',
    description:
      'Four AI models simultaneously search the web and cross-validate the claim against fresh evidence.',
    color: 'from-accent/20 to-accent/5',
    accent: 'text-accent-light',
    border: 'border-accent/25',
  },
  {
    number: '03',
    title: 'Get Your Verdict',
    description:
      'Receive a credibility score, a clear TRUE/FALSE/MISLEADING verdict, and the full evidence trail.',
    color: 'from-verdict-true/20 to-verdict-true/5',
    accent: 'text-verdict-true',
    border: 'border-verdict-true/25',
  },
] as const;

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative px-5 py-28 overflow-hidden">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/30 to-bg" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent-light">
            How it works
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            Three steps to the truth.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 relative">
          {/* Connector line (desktop only) */}
          <div
            className="absolute top-10 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px hidden sm:block"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(90deg, rgb(var(--color-border)), rgb(var(--color-border-subtle)), rgb(var(--color-border)))',
            }}
          />

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col rounded-2xl border bg-surface p-7 shadow-card"
              style={{
                borderColor: `rgb(var(--color-border))`,
                animationDelay: `${i * 120}ms`,
              }}
            >
              {/* Number badge */}
              <div
                className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} border ${step.border}`}
              >
                <span className={`text-xs font-bold tracking-wider ${step.accent}`}>
                  {step.number}
                </span>
              </div>

              <h3 className="mb-2.5 text-[0.9375rem] font-semibold text-text tracking-tight">
                {step.title}
              </h3>
              <p className="text-[0.8375rem] text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sample result preview card */}
        <div className="mt-12 mx-auto max-w-md rounded-2xl border border-border bg-surface p-6 shadow-card">
          <p className="mb-3 text-[11.5px] font-semibold uppercase tracking-wider text-faint">
            Sample Result
          </p>
          <p className="mb-4 text-sm text-text italic">
            "The Eiffel Tower grows 15 cm taller in summer."
          </p>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-verdict-true/15 border border-verdict-true/30 px-3 py-1 text-[12px] font-semibold text-verdict-true">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" />
              </svg>
              TRUE
            </span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 rounded-full bg-surface3 overflow-hidden">
                <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-verdict-true to-accent" />
              </div>
              <span className="text-sm font-bold text-text">87</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
