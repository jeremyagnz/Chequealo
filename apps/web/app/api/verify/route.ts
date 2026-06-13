import { NextRequest, NextResponse } from 'next/server';
import { verifyHandler } from '@/features/verification/presentation/api/verify.handler';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  return verifyHandler(request);
}
