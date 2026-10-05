import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';

export async function GET() {
  const pending = db.getPendingReports();
  const allEvents = db.getEvents();
  const reportsWithEvents = allEvents.map((e) => {
    const r = db.getEventReport(e.id);
    return {
      event_id: e.id,
      event_code: e.event_code,
      title: e.title,
      college: e.college_name,
      creator: e.created_by_name,
      status: e.status,
      report: r || null
    };
  }).filter((x) => x.report !== null);

  return NextResponse.json({
    success: true,
    data: reportsWithEvents,
    pendingCount: pending.length
  });
}
