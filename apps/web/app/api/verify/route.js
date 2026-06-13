import { verifyHandler } from '@/features/verification/presentation/api/verify.handler';
export async function POST(request) {
    return verifyHandler(request);
}
