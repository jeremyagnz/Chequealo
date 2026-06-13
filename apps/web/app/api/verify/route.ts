import { NextRequest, NextResponse } from 'next/server';
import { verifyHandler } from '@/features/verification/presentation/api/verify.handler';

export async function POST(request: NextRequest) {
  return verifyHandler(request);
}
