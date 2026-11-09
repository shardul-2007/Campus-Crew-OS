import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const ev = db.getEventById(params.id) || db.getEventByCode(params.id);
  if (!ev) {
    return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
  }

  const winners = db.getEventWinners(ev.id);
  return NextResponse.json({ success: true, data: winners });
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
    const win = db.addWinner({
      event_id: ev.id,
      participant_id: body.participant_id,
      name: body.name,
      rank: Number(body.rank),
      hacker_rank_email: body.hacker_rank_email,
      email_verified: true,
      identity_verified: false,
      reward_status: 'verification_required',
      notes: body.notes
    });

    return NextResponse.json({ success: true, data: win }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
