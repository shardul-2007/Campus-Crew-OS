import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const ev = db.getEventById(params.id) || db.getEventByCode(params.id);
  if (!ev) {
    return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
  }

  try {
    const body = await req.json();
    const rows = Array.isArray(body.participants) ? body.participants : [];
    let imported = 0;

    rows.forEach((r: any) => {
      if (r.name && r.email) {
        db.addParticipant({
          event_id: ev.id,
          name: r.name,
          hacker_rank_email: r.email,
          email_verified: true,
          registration_status: r.registration_status || 'attended',
          submission_status: r.submission_status || 'completed',
          department: r.department || 'Engineering',
          academic_year: r.academic_year || '3rd Year',
          college_name: ev.college_name || 'College',
          joined_at: new Date().toISOString()
        });
        imported++;
      }
    });

    return NextResponse.json({ success: true, count: imported });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
