import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET() {
  const data = db.getCrewPerformance();
  return NextResponse.json({ success: true, count: data.length, data });
}
