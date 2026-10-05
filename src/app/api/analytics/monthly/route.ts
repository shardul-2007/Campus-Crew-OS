import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET() {
  const data = db.getMonthlyPerformance();
  return NextResponse.json({ success: true, data });
}
