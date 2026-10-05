import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';
import { LifecycleStage } from '@/types/database';

export async function POST(req: NextRequest, { params }: { params: { id: string; stage: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const ev = db.getEventById(params.id) || db.getEventByCode(params.id);
  if (!ev) {
    return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
  }

  const stage = params.stage.toUpperCase() as LifecycleStage;
  const body = await req.json().catch(() => ({}));
  const res = db.transitionLifecycleStage(ev.id, stage, user.id, body.notes);

  if (!res.success) {
    return NextResponse.json({ success: false, error: res.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, event: db.getEventById(ev.id) });
}
