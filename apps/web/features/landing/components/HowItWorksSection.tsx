const steps = [
  { step: '1', title: 'Submit a Claim', description: 'Paste any news headline, tweet, or rumor.' },
  { step: '2', title: 'AI + Search', description: 'We fetch live evidence and run it through multiple AI models.' },
  { step: '3', title: 'Get Your Score', description: 'Receive a credibility score and a clear verdict in seconds.' },
];

export function HowItWorksSection() {
  return (
    <section className="bg-gray-50 px-6 py-16">
      <h2 className="mb-10 text-center text-3xl font-bold">How It Works</h2>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 sm:flex-row">
        {steps.map((s) => (
          <div key={s.step} className="flex-1 rounded-xl border bg-white p-6 text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
              {s.step}
            </div>
            <h3 className="mb-2 font-semibold">{s.title}</h3>
            <p className="text-sm text-secondary">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
