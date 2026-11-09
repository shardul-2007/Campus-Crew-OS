import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';
import { certificateProvider } from '@/lib/certificates/certificate-provider';

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
    const body = await req.json().catch(() => ({}));
    const type = body.type === 'winner' ? 'winner' : 'participation';
    const forceRegenerate = Boolean(body.forceRegenerate);
    const customItems = Array.isArray(body.items) ? body.items : undefined;

    const res = await certificateProvider.generateBulk(ev.id, type, customItems, forceRegenerate);

    return NextResponse.json({
      success: true,
      total: res.total,
      generated: res.generated,
      results: res.results,
      certificates: db.getEventCertificates(ev.id),
      stats: certificateProvider.getEligibilityStats(ev.id),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
