import { HeroSection } from '@/features/landing/components/HeroSection';
import { FeaturesSection } from '@/features/landing/components/FeaturesSection';
import { HowItWorksSection } from '@/features/landing/components/HowItWorksSection';
import { CTASection } from '@/features/landing/components/CTASection';
export default function LandingPage() {
    return (<main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </main>);
}
