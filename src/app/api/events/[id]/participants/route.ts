import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const ev = db.getEventById(params.id) || db.getEventByCode(params.id);
  if (!ev) {
    return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
  }

  const participants = db.getEventParticipants(ev.id);
  return NextResponse.json({ success: true, count: participants.length, data: participants });
}

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
    const part = db.addParticipant({
      event_id: ev.id,
      name: body.name,
      hacker_rank_email: body.hacker_rank_email,
      email_verified: true,
      registration_status: body.registration_status || 'attended',
      submission_status: body.submission_status || 'completed',
      department: body.department || 'Computer Science',
      academic_year: body.academic_year || '3rd Year',
      college_name: body.college_name || ev.college_name || 'College',
      joined_at: new Date().toISOString()
    });

    return NextResponse.json({ success: true, data: part }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
