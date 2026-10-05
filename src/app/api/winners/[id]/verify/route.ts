import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';
import { can_review_event } from '@/lib/permissions/rbac';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user || !can_review_event(user)) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Analyst role required' }, { status: 403 });
  }

  const win = db.verifyWinner(params.id, user.id);
  if (!win) {
    return NextResponse.json({ success: false, error: 'Winner not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: win });
}
