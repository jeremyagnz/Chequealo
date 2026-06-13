import type { VerificationStatus } from '@/lib/shared-types';

export class VerificationStatusVO {
  private constructor(private readonly value: VerificationStatus) {}

  static pending(): VerificationStatusVO {
    return new VerificationStatusVO('pending');
  }

  static processing(): VerificationStatusVO {
    return new VerificationStatusVO('processing');
  }

  static completed(): VerificationStatusVO {
    return new VerificationStatusVO('completed');
  }

  static failed(): VerificationStatusVO {
    return new VerificationStatusVO('failed');
  }

  static from(status: VerificationStatus): VerificationStatusVO {
    return new VerificationStatusVO(status);
  }

  getValue(): VerificationStatus {
    return this.value;
  }

  equals(other: VerificationStatusVO): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
