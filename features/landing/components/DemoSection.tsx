'use client';

import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Verdict = 'confiable' | 'dudosa' | 'falsa';

interface DemoTab {
  verdict: Verdict;
  label: string;
  score: number;
  claim: string;
  metrics: { label: string; value: number }[];
  evidence: string[];
  sources: string[];
}

// ─── Demo Data ────────────────────────────────────────────────────────────────

const DEMO_TABS: DemoTab[] = [
  {
    verdict: 'confiable',
    label: 'Confiable',
    score: 82,
    claim:
      'El Banco Central de la República Dominicana aumentó las tasas de interés en 50 puntos base en enero 2025.',
    metrics: [
      { label: 'Autoridad de fuente', value: 92 },
      { label: 'Evidencia encontrada', value: 88 },
      { label: 'Consenso de fuentes', value: 85 },
      { label: 'Actualidad', value: 79 },
      { label: 'Sin contradicciones', value: 70 },
    ],
    evidence: [
      'El Banco Central publicó el comunicado N° 012-2025 confirmando el ajuste de la tasa de política monetaria de 6.75% a 7.25%, efectivo al 31 de enero de 2025.',
      'Listín Diario y Diario Libre cubrieron el anuncio con declaraciones directas del gobernador Héctor Valdez Albizu.',
    ],
    sources: ['bancentral.gov.do', 'listindiario.com', 'diariolibre.com', 'elcaribe.com.do'],
  },
  {
    verdict: 'dudosa',
    label: 'Dudosa',
    score: 51,
    claim:
      'El gobierno dominicano eliminó completamente el impuesto a las importaciones de alimentos de la canasta básica en 2024.',
    metrics: [
      { label: 'Autoridad de fuente', value: 68 },
      { label: 'Evidencia encontrada', value: 55 },
      { label: 'Consenso de fuentes', value: 48 },
      { label: 'Actualidad', value: 60 },
      { label: 'Sin contradicciones', value: 45 },
    ],
    evidence: [
      'El gobierno anunció reducciones temporales de algunos aranceles en 2024, pero no una eliminación completa del impuesto según la DGII.',
      'Múltiples medios reportaron exenciones parciales, sin confirmar eliminación total. La afirmación mezcla hechos reales con una conclusión exagerada.',
    ],
    sources: ['dgii.gov.do', 'listindiario.com', 'diariolibre.com', 'elcaribe.com.do'],
  },
  {
    verdict: 'falsa',
    label: 'Falsa',
    score: 21,
    claim:
      'El presidente dominicano firmó un decreto que elimina todos los impuestos sobre combustibles en enero 2025.',
    metrics: [
      { label: 'Autoridad de fuente', value: 28 },
      { label: 'Evidencia encontrada', value: 18 },
      { label: 'Consenso de fuentes', value: 22 },
      { label: 'Actualidad', value: 35 },
      { label: 'Sin contradicciones', value: 15 },
    ],
    evidence: [
      'No se encontró ningún decreto presidencial relacionado con la eliminación de impuestos sobre combustibles en enero 2025.',
      'La Gaceta Oficial y fuentes gubernamentales no registran tal medida. La afirmación circula sin respaldo documental verificable.',
    ],
    sources: ['gazetaoficial.gob.do', 'listindiario.com', 'diariolibre.com', 'elcaribe.com.do'],
  },
];

interface VerdictConfig {
  arcColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  // icon is a JSX element — typed as any to avoid environment-specific JSX namespace issues
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}

const VERDICT_CONFIG: Record<Verdict, VerdictConfig> = {
  confiable: {
    arcColor: '#10b981',
    badgeBg: 'bg-verdict-true/15',
    badgeText: 'text-verdict-true',
    badgeBorder: 'border-verdict-true/30',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
  },
  dudosa: {
    arcColor: '#f59e0b',
    badgeBg: 'bg-verdict-misleading/15',
    badgeText: 'text-verdict-misleading',
    badgeBorder: 'border-verdict-misleading/30',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  falsa: {
    arcColor: '#ef4444',
    badgeBg: 'bg-verdict-false/15',
    badgeText: 'text-verdict-false',
    badgeBorder: 'border-verdict-false/30',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function metricBarColor(value: number) {
  if (value >= 75) return 'bg-verdict-true';
  if (value >= 50) return 'bg-verdict-misleading';
  return 'bg-verdict-false';
}

function metricTextColor(value: number) {
  if (value >= 75) return 'text-verdict-true';
  if (value >= 50) return 'text-verdict-misleading';
  return 'text-verdict-false';
}

// ─── Score Gauge ──────────────────────────────────────────────────────────────

function ScoreGauge({ score, arcColor }: { score: number; arcColor: string }) {
  const r = 38;
  const circ = 2 * Math.PI * r; // ≈ 238.76
  const trackLen = circ * 0.75; // 270° arc ≈ 179.07
  const gapLen = circ * 0.25;   // 90° gap  ≈ 59.69
  const filledLen = trackLen * (score / 100);

  return (
    <svg viewBox="0 0 100 100" className="w-[90px] h-[90px]" aria-hidden="true">
      {/* Track */}
      <circle
        cx={50} cy={50} r={r}
        fill="none"
        stroke="rgb(34 34 47)"
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${trackLen} ${gapLen}`}
        transform="rotate(135 50 50)"
      />
      {/* Score arc */}
      <circle
        cx={50} cy={50} r={r}
        fill="none"
        stroke={arcColor}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${filledLen} ${circ - filledLen}`}
        transform="rotate(135 50 50)"
      />
      {/* Score number */}
      <text
        x={50} y={54}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgb(244 244 246)"
        fontSize={22}
        fontWeight={700}
        fontFamily="inherit"
      >
        {score}
      </text>
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DemoSection() {
  const [active, setActive] = useState<Verdict>('confiable');
  const tab = DEMO_TABS.find((t) => t.verdict === active)!;
  const cfg = VERDICT_CONFIG[active];

  return (
    <section className="relative px-5 py-28 overflow-hidden">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            Así se ve un análisis real
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-[1.0625rem] text-muted leading-relaxed">
            Cada verificación incluye puntuación, evidencia trazable y fuentes consultadas.
          </p>
        </div>

        {/* Demo card */}
        <div className="rounded-2xl border border-border bg-surface shadow-card overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-1 px-5 pt-4 border-b border-border pb-0">
            {DEMO_TABS.map((t) => {
              const isActive = t.verdict === active;
              return (
                <button
                  key={t.verdict}
                  onClick={() => setActive(t.verdict)}
                  className={`relative px-4 py-2.5 text-[13px] font-semibold rounded-t-lg transition-colors duration-150 focus:outline-none ${
                    isActive
                      ? 'text-text bg-surface2 border border-border border-b-surface2 -mb-px'
                      : 'text-muted hover:text-text'
                  }`}
                >
                  {t.label} ({t.score})
                </button>
              );
            })}
          </div>

          {/* Card body */}
          <div className="p-6 space-y-6">
            {/* Claim */}
            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
                Afirmación verificada
              </p>
              <p className="text-[0.9375rem] text-muted italic leading-relaxed">
                &ldquo;{tab.claim}&rdquo;
              </p>
            </div>

            {/* Score + Metrics */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Gauge + verdict badge */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <ScoreGauge score={tab.score} arcColor={cfg.arcColor} />
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}
                >
                  {cfg.icon}
                  {tab.label}
                </span>
              </div>

              {/* Metric bars */}
              <div className="flex-1 w-full space-y-3">
                {tab.metrics.map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-[13px] text-muted w-40 shrink-0">{label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-surface3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${metricBarColor(value)}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className={`text-[13px] font-semibold w-7 text-right shrink-0 ${metricTextColor(value)}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence */}
            <div>
              <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
                Evidencia clave
              </p>
              <ul className="space-y-2">
                {tab.evidence.map((ev, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-muted leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-light shrink-0" aria-hidden="true" />
                    {ev}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sources */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
              {tab.sources.map((src) => (
                <span
                  key={src}
                  className="rounded-full border border-border bg-surface2 px-3 py-1 text-[12px] text-muted"
                >
                  {src}
                </span>
              ))}
              <span className="rounded-full border border-border bg-surface2 px-3 py-1 text-[12px] text-faint">
                +2 más
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
