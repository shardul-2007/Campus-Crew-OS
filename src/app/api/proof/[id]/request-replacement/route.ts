import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';
import { can_review_event } from '@/lib/permissions/rbac';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user || !can_review_event(user)) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Analyst role required' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const proof = db.verifyProof(params.id, 'replacement_requested', user.id, body.comment);

  if (!proof) {
    return NextResponse.json({ success: false, error: 'Proof not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: proof });
}
