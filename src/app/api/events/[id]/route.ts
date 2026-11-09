import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';
import { getCurrentUser } from '@/lib/auth/session';
import { can_edit_event } from '@/lib/permissions/rbac';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = db.getEventById(params.id) || db.getEventByCode(params.id);
  if (!event) {
    return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
  }

  const stages = db.getEventStages(event.id);
  const team = db.getEventTeam(event.id);
  const checklist = db.getEventChecklists(event.id);
  const proofs = db.getEventProofs(event.id);
  const winners = db.getEventWinners(event.id);
  const participants = db.getEventParticipants(event.id);
  const report = db.getEventReport(event.id);
  const feedback = db.getEventFeedback(event.id);
  const improvement = db.getEventImprovement(event.id);

  return NextResponse.json({
    success: true,
    data: {
      ...event,
      stages,
      team,
      checklist,
      proofs,
      winners,
      participants,
      report,
      feedback,
      improvement
    }
  });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const event = db.getEventById(params.id) || db.getEventByCode(params.id);
  if (!event) {
    return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
  }

  if (!can_edit_event(user, event)) {
    return NextResponse.json({ success: false, error: 'Permission denied' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const updated = db.updateEvent(event.id, body, user.id);
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
