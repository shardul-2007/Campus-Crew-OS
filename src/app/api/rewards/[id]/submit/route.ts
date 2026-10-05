import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const updated = db.updateRewardStatus(params.id, 'submitted');
  if (!updated) {
    return NextResponse.json({ success: false, error: 'Reward record not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: updated });
}
