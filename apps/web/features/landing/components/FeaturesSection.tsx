const features = [
  {
    title: 'Multi-AI Analysis',
    description: 'Claims are analyzed by OpenAI, Anthropic, Gemini, and Groq for maximum accuracy.',
  },
  {
    title: 'Real-Time Evidence',
    description: 'Live search results from multiple providers give context to every claim.',
  },
  {
    title: 'Credibility Score',
    description: 'A transparent 0–100 score based on source credibility, consensus, and recency.',
  },
  {
    title: 'Full History',
    description: 'Every verification is stored and searchable so you can track claims over time.',
  },
];

export function FeaturesSection() {
  return (
    <section className="px-6 py-16">
      <h2 className="mb-10 text-center text-3xl font-bold">Why Chequealo AI?</h2>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border p-6">
            <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
            <p className="text-sm text-secondary">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
