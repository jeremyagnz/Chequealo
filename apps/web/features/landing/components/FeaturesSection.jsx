const FEATURES = [
    {
        icon: (<svg fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
      </svg>),
        title: 'Multi-AI Consensus',
        description: 'Claims are simultaneously analyzed by GPT-4o, Claude 3.5, Gemini 1.5 Pro, and Groq Llama — cross-validating for maximum accuracy.',
    },
    {
        icon: (<svg fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>
      </svg>),
        title: 'Real-Time Evidence',
        description: 'Live search results from Serper, Brave, and Tavily provide fresh context to every verification — no stale data.',
    },
    {
        icon: (<svg fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
      </svg>),
        title: 'Credibility Score',
        description: 'A transparent 0–100 score weighted by source credibility, AI consensus, and evidence recency — with full reasoning.',
    },
    {
        icon: (<svg fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>),
        title: 'Full Audit History',
        description: 'Every verification is stored, searchable, and shareable — letting you track how claims evolve over time.',
    },
    {
        icon: (<svg fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"/>
      </svg>),
        title: 'White-Label Ready',
        description: 'Full white-labeling with custom domains, colors, and branding for enterprise teams and media organizations.',
    },
    {
        icon: (<svg fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
      </svg>),
        title: 'Enterprise Security',
        description: 'SOC 2 Type II, GDPR compliant, SSO/SAML, role-based access control, and audit logs built for enterprise deployments.',
    },
];
export function FeaturesSection() {
    return (<section id="features" className="relative px-5 py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-primary-light">
            Features
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            Why Chequealo AI?
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-[1.0625rem] text-muted">
            Built for journalists, researchers, and enterprises that can't afford to get it wrong.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (<article key={feature.title} className="group relative rounded-2xl border border-border bg-surface p-6 shadow-card hover:border-border/80 hover:bg-surface2 hover:shadow-card-hover transition-all duration-200" style={{ animationDelay: `${i * 80}ms` }}>
              {/* Icon */}
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary-light border border-primary/20">
                {feature.icon}
              </div>

              <h3 className="mb-2 text-[0.9375rem] font-semibold text-text tracking-tight">
                {feature.title}
              </h3>
              <p className="text-[0.8375rem] text-muted leading-relaxed">
                {feature.description}
              </p>

              {/* Hover accent line */}
              <div className="absolute inset-x-0 bottom-0 h-px rounded-b-2xl bg-gradient-to-r from-primary/40 via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
            </article>))}
        </div>
      </div>
    </section>);
}
