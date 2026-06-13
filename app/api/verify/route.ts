import { auth } from '@/shared/lib/auth';
import { verifyHandler } from '@/features/verification/presentation/api/verify.handler';

export const POST = auth((request) => verifyHandler(request, request.auth));
