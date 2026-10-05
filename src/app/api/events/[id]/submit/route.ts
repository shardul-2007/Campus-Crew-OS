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

  const res = db.submitEvent(ev.id, user.id);
  if (!res.success) {
    return NextResponse.json({ success: false, error: res.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: res.event });
}
