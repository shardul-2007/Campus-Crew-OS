'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db/store';
import { requireAuth, requireRole } from '@/lib/auth/session';
import { can_review_event, can_edit_event } from '@/lib/permissions/rbac';
import { LifecycleStage } from '@/types/database';

export async function createEventAction(input: {
  title: string;
  event_type_id: string;
  objective: string;
  description: string;
  mode: 'online' | 'offline' | 'hybrid';
  venue?: string;
  college_id?: string;
  start_date: string;
  end_date: string;
  platform: 'HRW' | 'HRC' | 'Other';
  expected_participants: number;
  registration_url?: string;
  event_url?: string;
  contest_details?: any;
  hackathon_details?: any;
  workshop_details?: any;
}) {
  const user = await requireAuth();
  if (!input.title || !input.event_type_id) {
    return { success: false, error: 'Title and event format are required.' };
  }

  const newEvent = db.createEvent(input, user.id);
  revalidatePath('/events');
  revalidatePath('/dashboard');
  revalidatePath('/admin/analytics');
  return { success: true, event: newEvent };
}

export async function updateEventAction(eventId: string, updates: any) {
  const user = await requireAuth();
  const event = db.getEventById(eventId);
  if (!event) return { success: false, error: 'Event not found.' };

  if (!can_edit_event(user, event)) {
    return { success: false, error: 'Permission denied: Cannot edit event in current status.' };
  }

  const updated = db.updateEvent(eventId, updates, user.id);
  revalidatePath(`/events/${event.event_code}`);
  revalidatePath('/events');
  return { success: true, event: updated };
}

export async function submitEventAction(eventId: string) {
  const user = await requireAuth();
  const res = db.submitEvent(eventId, user.id);
  if (res.event) {
    revalidatePath(`/events/${res.event.event_code}`);
    revalidatePath('/events');
    revalidatePath('/admin/approvals');
    revalidatePath('/dashboard');
  }
  return res;
}

export async function approveEventAction(eventId: string, comment?: string) {
  const user = await requireRole(['analyst', 'admin', 'program_manager']);
  const res = db.approveEvent(eventId, user.id, comment);
  if (res.event) {
    revalidatePath(`/events/${res.event.event_code}`);
    revalidatePath('/events');
    revalidatePath('/admin/approvals');
    revalidatePath('/dashboard');
    revalidatePath('/admin/analytics');
  }
  return res;
}

export async function requestChangesAction(eventId: string, reason: string) {
  const user = await requireRole(['analyst', 'admin', 'program_manager']);
  if (!reason) return { success: false, error: 'Feedback reason is required.' };
  const res = db.requestChanges(eventId, user.id, reason);
  if (res.event) {
    revalidatePath(`/events/${res.event.event_code}`);
    revalidatePath('/events');
    revalidatePath('/admin/approvals');
  }
  return res;
}

export async function rejectEventAction(eventId: string, reason: string) {
  const user = await requireRole(['analyst', 'admin', 'program_manager']);
  if (!reason) return { success: false, error: 'Rejection reason is required.' };
  const res = db.rejectEvent(eventId, user.id, reason);
  if (res.event) {
    revalidatePath(`/events/${res.event.event_code}`);
    revalidatePath('/events');
    revalidatePath('/admin/approvals');
  }
  return res;
}

export async function transitionLifecycleStageAction(eventId: string, targetStage: LifecycleStage, notes?: string) {
  const user = await requireAuth();
  const res = db.transitionLifecycleStage(eventId, targetStage, user.id, notes);
  const ev = db.getEventById(eventId);
  if (ev) {
    revalidatePath(`/events/${ev.event_code}`);
    revalidatePath('/events');
    revalidatePath('/dashboard');
    revalidatePath('/admin/analytics');
  }
  return res;
}

export async function toggleChecklistItemAction(itemId: string, completed: boolean) {
  const user = await requireAuth();
  const updated = db.toggleChecklistItem(itemId, completed, user.id);
  if (updated) {
    const ev = db.getEventById(updated.event_id);
    if (ev) revalidatePath(`/events/${ev.event_code}`);
  }
  return { success: !!updated, item: updated };
}

export async function addTeamMemberAction(eventId: string, data: { user_id: string; role: any; responsibilities: string }) {
  const user = await requireAuth();
  const res = db.addTeamMember({
    event_id: eventId,
    user_id: data.user_id,
    role: data.role,
    responsibilities: data.responsibilities
  });
  const ev = db.getEventById(eventId);
  if (ev) revalidatePath(`/events/${ev.event_code}`);
  return { success: true, member: res };
}

export async function submitReportAction(reportData: any) {
  const user = await requireAuth();
  const rep = db.submitReport({
    ...reportData,
    submitted_by: user.id
  });
  const ev = db.getEventById(rep.event_id);
  if (ev) {
    revalidatePath(`/events/${ev.event_code}`);
    revalidatePath('/reports');
    revalidatePath('/admin/analytics');
  }
  return { success: true, report: rep };
}

export async function reviewReportAction(reportId: string, status: 'approved' | 'changes_requested', comment?: string) {
  const user = await requireRole(['analyst', 'admin']);
  const rep = db.reviewReport(reportId, status, user.id, comment);
  if (rep) {
    const ev = db.getEventById(rep.event_id);
    if (ev) revalidatePath(`/events/${ev.event_code}`);
    revalidatePath('/reports');
    revalidatePath('/admin/analytics');
  }
  return { success: !!rep, report: rep };
}

export async function addFeedbackAction(feedbackData: any) {
  const user = await requireAuth();
  const fb = db.addFeedback({
    ...feedbackData,
    submitted_by: user.id
  });
  const ev = db.getEventById(feedbackData.event_id);
  if (ev) revalidatePath(`/events/${ev.event_code}`);
  return { success: true, feedback: fb };
}

export async function saveImprovementAction(improvementData: any) {
  const user = await requireAuth();
  const imp = db.saveImprovement(improvementData);
  const ev = db.getEventById(improvementData.event_id);
  if (ev) revalidatePath(`/events/${ev.event_code}`);
  return { success: true, improvement: imp };
}
