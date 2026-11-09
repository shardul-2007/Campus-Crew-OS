import { NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET() {
  const stats = db.getAnalyticsOverview();
  return NextResponse.json({ success: true, data: stats });
}
