import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const ev = db.getEventById(params.id) || db.getEventByCode(params.id);
  if (!ev) {
    return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
  }

  const rewards = db.getEventRewards(ev.id);
  return NextResponse.json({ success: true, data: rewards });
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
    const win = db.getEventWinners(ev.id).find((w) => w.id === body.winner_id);
    const reward = db.submitReward({
      event_id: ev.id,
      winner_id: body.winner_id,
      winner_name: win?.name,
      winner_email: win?.hacker_rank_email,
      winner_rank: win?.rank,
      reward_tier: body.reward_tier || 'Tier 1 Standard',
      submission_status: 'submitted',
      submitted_at: new Date().toISOString(),
      activation_status: 'pending'
    });

    if (win) {
      win.reward_status = 'submitted';
      win.submitted_to_program_manager_at = new Date().toISOString();
    }

    return NextResponse.json({ success: true, data: reward }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
