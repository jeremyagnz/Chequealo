export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="mb-4 text-5xl font-bold tracking-tight">
        Verify Any Claim in Seconds
      </h1>
      <p className="mb-8 max-w-xl text-lg text-secondary">
        Chequealo AI uses multiple AI providers and real-time evidence to fact-check
        news, rumors, and claims — instantly.
      </p>
      <a
        href="/verify"
        className="rounded-lg bg-primary px-8 py-3 text-white text-lg font-medium hover:opacity-90"
      >
        Start Verifying
      </a>
    </section>
  );
}
