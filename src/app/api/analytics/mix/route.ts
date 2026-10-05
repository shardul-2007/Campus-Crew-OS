import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET() {
  const data = db.getEventMix();
  return NextResponse.json({ success: true, data });
}
