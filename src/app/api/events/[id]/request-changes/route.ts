import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';
import { can_review_event } from '@/lib/permissions/rbac';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user || !can_review_event(user)) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Analyst role required' }, { status: 403 });
  }

  const ev = db.getEventById(params.id) || db.getEventByCode(params.id);
  if (!ev) {
    return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
  }

  const body = await req.json().catch(() => ({}));
  if (!body.reason) {
    return NextResponse.json({ success: false, error: 'Reason is required' }, { status: 400 });
  }

  const res = db.requestChanges(ev.id, user.id, body.reason);
  if (!res.success) {
    return NextResponse.json({ success: false, error: res.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: res.event });
}
