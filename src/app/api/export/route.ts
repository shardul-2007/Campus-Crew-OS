import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const eventType = searchParams.get('type') || undefined;

  const events = db.getEvents({ status, eventType });
  const collegesMap = new Map(db.getColleges().map((c) => [c.id, c]));

  const headers = [
    'Event Code',
    'Event Name',
    'Event Type',
    'Crew Lead',
    'College',
    'City',
    'State',
    'Start Date',
    'Platform',
    'Registrations',
    'Participants',
    'Completed Submissions',
    'Completion Rate (%)',
    'Status',
    'Documentation Score (%)',
    'Risk Level'
  ];

  const rows = events.map((e) => {
    const col = e.college_id ? collegesMap.get(e.college_id) : undefined;
    return [
      `"${e.event_code}"`,
      `"${e.title.replace(/"/g, '""')}"`,
      `"${e.event_type_name || ''}"`,
      `"${e.created_by_name || ''}"`,
      `"${e.college_name || ''}"`,
      `"${col?.city || ''}"`,
      `"${col?.state || ''}"`,
      `"${e.start_date.split('T')[0]}"`,
      `"${e.platform}"`,
      e.actual_registrations,
      e.actual_participants,
      e.completed_submissions,
      e.completion_rate,
      `"${e.status.toUpperCase()}"`,
      e.documentation_score || 0,
      `"${e.risk_level || 'LOW'}"`
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="campus_crew_events_${Date.now()}.csv"`
    }
  });
}
