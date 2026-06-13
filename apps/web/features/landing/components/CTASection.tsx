export function CTASection() {
  return (
    <section className="flex flex-col items-center px-6 py-20 text-center">
      <h2 className="mb-4 text-3xl font-bold">Ready to Stop Misinformation?</h2>
      <p className="mb-8 max-w-md text-secondary">
        Join thousands of journalists, researchers, and everyday users who rely on Chequealo AI.
      </p>
      <a
        href="/verify"
        className="rounded-lg bg-primary px-8 py-3 text-white text-lg font-medium hover:opacity-90"
      >
        Try for Free
      </a>
    </section>
  );
}
