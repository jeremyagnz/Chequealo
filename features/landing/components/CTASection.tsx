export function CTASection() {
  return (
    <section className="relative px-5 py-28 overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[640px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        {/* Badge */}
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-light">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-light animate-pulse-glow" />
          Trusted by journalists and fact-checkers worldwide
        </span>

        <h2 className="mb-5 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
          Stop misinformation
          <br />
          <span className="text-gradient">before it spreads.</span>
        </h2>

        <p className="mb-10 text-[1.0625rem] text-muted leading-relaxed">
          Join thousands of journalists, researchers, and enterprises who rely on
          Chequealo AI to separate fact from fiction — in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/verify"
            className="w-full sm:w-auto rounded-xl bg-primary px-8 py-3.5 text-[0.9375rem] text-white font-semibold hover:bg-primary/90 active:scale-[0.97] transition-all duration-100 shadow-glow-primary"
          >
            Start for Free
          </a>
          <a
            href="/verify"
            className="w-full sm:w-auto rounded-xl border border-border bg-surface px-8 py-3.5 text-[0.9375rem] text-muted font-medium hover:border-border/60 hover:text-text hover:bg-surface2 transition-all duration-150"
          >
            View Demo
          </a>
        </div>

        <p className="mt-5 text-xs text-faint">
          No credit card required · 10 free verifications per day · Cancel anytime
        </p>
      </div>
    </section>
  );
}
