import { VerifyForm } from '@/features/verification/presentation/components/VerifyForm';

export default function VerifyPage() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-[1.625rem] font-bold tracking-tight text-text">Verify a Claim</h1>
        <p className="mt-1 text-sm text-muted">
          Submit any claim and get an AI-powered credibility score in seconds.
        </p>
      </div>
      <VerifyForm />
    </div>
  );
}
