'use client';
import { useEffect, useRef } from 'react';
function getScoreColor(score) {
    if (score >= 75)
        return 'rgb(var(--color-true))';
    if (score >= 50)
        return 'rgb(var(--color-accent))';
    if (score >= 25)
        return 'rgb(var(--color-misleading))';
    return 'rgb(var(--color-false))';
}
function getScoreLabel(score) {
    if (score >= 80)
        return 'Highly Credible';
    if (score >= 60)
        return 'Likely True';
    if (score >= 40)
        return 'Uncertain';
    if (score >= 20)
        return 'Misleading';
    return 'Likely False';
}
export function CredibilityMeter({ score, size = 120, strokeWidth = 8, animate = true, showLabel = true, className = '', }) {
    const circleRef = useRef(null);
    const clampedScore = Math.max(0, Math.min(100, score));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const targetOffset = circumference - (clampedScore / 100) * circumference;
    const color = getScoreColor(clampedScore);
    const label = getScoreLabel(clampedScore);
    useEffect(() => {
        const circle = circleRef.current;
        if (!circle || !animate)
            return;
        // Start from full offset (empty) and animate to target
        circle.style.strokeDashoffset = String(circumference);
        circle.style.transition = 'none';
        const rafId = requestAnimationFrame(() => {
            circle.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(0.16, 0.77, 0.44, 1)';
            circle.style.strokeDashoffset = String(targetOffset);
        });
        return () => cancelAnimationFrame(rafId);
    }, [circumference, targetOffset, animate]);
    const center = size / 2;
    return (<div className={`relative inline-flex flex-col items-center gap-1 ${className}`} role="img" aria-label={`Credibility score: ${clampedScore} out of 100 — ${label}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle cx={center} cy={center} r={radius} stroke="rgb(var(--color-border))" strokeWidth={strokeWidth}/>
        {/* Progress */}
        <circle ref={circleRef} cx={center} cy={center} r={radius} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={animate ? circumference : targetOffset} style={{
            filter: `drop-shadow(0 0 6px ${color}60)`,
        }}/>
      </svg>

      {/* Score number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
        <span className="text-2xl font-bold tabular-nums leading-none" style={{ color }}>
          {clampedScore}
        </span>
        <span className="text-[10px] text-faint uppercase tracking-wider mt-0.5">/ 100</span>
      </div>

      {showLabel && (<span className="text-[11.5px] font-medium text-center" style={{ color }}>
          {label}
        </span>)}
    </div>);
}
