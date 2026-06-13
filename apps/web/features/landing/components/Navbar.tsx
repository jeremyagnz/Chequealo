import Link from 'next/link';

function LogoIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 glass border-b border-border">
      <div className="mx-auto flex h-15 max-w-7xl items-center justify-between px-5 py-3.5">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary-light border border-primary/25 group-hover:bg-primary/30 transition-colors">
            <LogoIcon />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-text">
            Chequealo{' '}
            <span className="text-gradient font-bold">AI</span>
          </span>
        </Link>

        {/* Nav links – desktop */}
        <nav className="hidden md:flex items-center gap-7 text-[13.5px] text-muted" aria-label="Main navigation">
          <Link href="#features"     className="hover:text-text transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-text transition-colors">How it Works</Link>
          <Link href="#pricing"      className="hover:text-text transition-colors">Pricing</Link>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/verify"
            className="hidden sm:block text-[13.5px] text-muted hover:text-text transition-colors px-1 py-1"
          >
            Sign In
          </Link>
          <Link
            href="/verify"
            className="rounded-xl bg-primary px-4 py-2 text-[13.5px] text-white font-medium hover:bg-primary/90 active:scale-[0.97] transition-all duration-100 shadow-glow-primary"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
