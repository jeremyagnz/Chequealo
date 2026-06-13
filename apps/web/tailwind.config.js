const config = {
    content: [
        './app/**/*.{ts,tsx}',
        './features/**/*.{ts,tsx}',
        './shared/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                bg: 'rgb(var(--color-bg) / <alpha-value>)',
                surface: 'rgb(var(--color-surface) / <alpha-value>)',
                surface2: 'rgb(var(--color-surface2) / <alpha-value>)',
                surface3: 'rgb(var(--color-surface3) / <alpha-value>)',
                border: 'rgb(var(--color-border) / <alpha-value>)',
                text: 'rgb(var(--color-text) / <alpha-value>)',
                muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
                faint: 'rgb(var(--color-text-faint) / <alpha-value>)',
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)',
                'accent-light': 'rgb(var(--color-accent-light) / <alpha-value>)',
                'verdict-true': 'rgb(var(--color-true) / <alpha-value>)',
                'verdict-false': 'rgb(var(--color-false) / <alpha-value>)',
                'verdict-misleading': 'rgb(var(--color-misleading) / <alpha-value>)',
                'verdict-unverified': 'rgb(var(--color-unverified) / <alpha-value>)',
                'verdict-pending': 'rgb(var(--color-pending) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                '2xs': ['0.6875rem', { lineHeight: '1rem' }],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            backgroundSize: {
                '200%': '200% 200%',
            },
            keyframes: {
                fadeUp: {
                    from: { opacity: '0', transform: 'translateY(14px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                scoreReveal: {
                    from: { strokeDashoffset: '283' },
                    to: { strokeDashoffset: 'var(--score-offset, 0)' },
                },
            },
            animation: {
                'fade-up': 'fadeUp 0.5s ease-out both',
                'fade-in': 'fadeIn 0.35s ease-out both',
                'shimmer': 'shimmer 1.8s linear infinite',
                'score-reveal': 'scoreReveal 1.1s cubic-bezier(.16,.77,.44,1) forwards',
                'gradient-pan': 'gradientPan 6s ease infinite',
            },
        },
    },
    plugins: [],
};
export default config;
