import { HeroSection } from '@/features/landing/components/HeroSection';
import { DemoSection } from '@/features/landing/components/DemoSection';
import { FeaturesSection } from '@/features/landing/components/FeaturesSection';
import { CTASection } from '@/features/landing/components/CTASection';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <DemoSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
