'use client';

const FEATURES_ROW = [
  '5 proveedores de IA',
  'Fuentes dominicanas',
  'GDPR compliant',
  'API disponible',
] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 py-28 w-full max-w-4xl mx-auto">
        {/* Badge */}
        <div className="mb-8 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-[13px] font-medium text-primary-light tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light animate-pulse-glow" />
            Verificación con IA en tiempo real
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-[clamp(2.8rem,7vw,5rem)] font-bold tracking-[-0.03em] leading-[1.08] animate-fade-up delay-100">
          La verdad, respaldada
          <br />
          por <span className="text-primary-light">evidencia real</span>
        </h1>

        {/* Description */}
        <p className="mb-10 max-w-[42rem] text-[1.0625rem] text-muted leading-relaxed animate-fade-up delay-200">
          Verifica noticias, afirmaciones y rumores en segundos. Puntuación de
          credibilidad basada en fuentes verificables, no en suposiciones.
        </p>

        {/* Search bar */}
        <div className="w-full max-w-2xl animate-fade-up delay-300">
          <div className="flex items-center gap-2 rounded-full border border-primary/50 bg-surface p-2 pl-5 shadow-glow-primary focus-within:border-primary transition-all duration-200">
            <svg className="h-4 w-4 text-faint shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              type="text"
              readOnly
              placeholder="Escribe o pega una afirmación, noticia o URL..."
              aria-label="Introduce una afirmación para verificar"
              className="flex-1 bg-transparent py-2 text-[0.9375rem] text-faint placeholder:text-faint cursor-pointer border-none outline-none focus:ring-0"
              onClick={() => { if (typeof window !== 'undefined') window.location.href = '/verify'; }}
            />
            <a
              href="/verify"
              className="shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm text-white font-semibold hover:bg-primary/90 active:scale-[0.97] transition-all duration-100 flex items-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verificar
            </a>
          </div>
          <p className="mt-3 text-[12px] text-faint">
            Gratis, sin registro · Resultados en ~8 segundos ·{' '}
            <span className="text-primary-light">Fuentes verificables</span>
          </p>
        </div>

        {/* Features row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 animate-fade-up delay-500">
          {FEATURES_ROW.map((item, i) => (
            <span key={item} className="inline-flex items-center gap-x-4">
              <span className="flex items-center gap-1.5 text-[13px] text-muted">
                <svg className="h-3.5 w-3.5 text-primary-light shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {item}
              </span>
              {i < FEATURES_ROW.length - 1 && (
                <span className="text-faint text-xs" aria-hidden="true">•</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
