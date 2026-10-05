import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const eventType = searchParams.get('type') || undefined;
  const collegeId = searchParams.get('college') || undefined;
  const search = searchParams.get('q') || undefined;
  const platform = searchParams.get('platform') || undefined;
  const risk = searchParams.get('risk') || undefined;

  const events = db.getEvents({
    status,
    eventType,
    collegeId,
    search,
    platform,
    risk
  });

  return NextResponse.json({ success: true, count: events.length, data: events });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.event_type_id) {
      return NextResponse.json({ success: false, error: 'Title and event_type_id are required' }, { status: 400 });
    }

    const newEvent = db.createEvent(body, user.id);
    return NextResponse.json({ success: true, data: newEvent }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
