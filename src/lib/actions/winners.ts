'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db/store';
import { requireAuth, requireRole } from '@/lib/auth/session';

export async function addParticipantAction(data: {
  event_id: string;
  name: string;
  hacker_rank_email: string;
  department: string;
  academic_year: any;
  college_name: string;
  registration_status?: any;
  submission_status?: any;
}) {
  await requireAuth();
  const part = db.addParticipant({
    event_id: data.event_id,
    name: data.name,
    hacker_rank_email: data.hacker_rank_email,
    email_verified: true,
    registration_status: data.registration_status || 'attended',
    submission_status: data.submission_status || 'completed',
    department: data.department,
    academic_year: data.academic_year || '3rd Year',
    college_name: data.college_name,
    joined_at: new Date().toISOString()
  });

  const ev = db.getEventById(data.event_id);
  if (ev) revalidatePath(`/events/${ev.event_code}`);
  return { success: true, participant: part };
}

export async function addWinnerAction(data: {
  event_id: string;
  participant_id?: string;
  name: string;
  rank: number;
  hacker_rank_email: string;
  notes?: string;
}) {
  await requireAuth();
  const win = db.addWinner({
    event_id: data.event_id,
    participant_id: data.participant_id,
    name: data.name,
    rank: Number(data.rank),
    hacker_rank_email: data.hacker_rank_email,
    email_verified: true,
    identity_verified: false,
    reward_status: 'verification_required',
    notes: data.notes
  });

  const ev = db.getEventById(data.event_id);
  if (ev) revalidatePath(`/events/${ev.event_code}`);
  return { success: true, winner: win };
}

export async function verifyWinnerAction(winnerId: string) {
  const user = await requireRole(['analyst', 'admin']);
  const win = db.verifyWinner(winnerId, user.id);
  if (win) {
    const ev = db.getEventById(win.event_id);
    if (ev) revalidatePath(`/events/${ev.event_code}`);
  }
  return { success: !!win, winner: win };
}

export async function submitRewardAction(data: {
  event_id: string;
  winner_id: string;
  reward_tier: string;
}) {
  await requireAuth();
  const win = db.getEventWinners(data.event_id).find((w) => w.id === data.winner_id);
  const reward = db.submitReward({
    event_id: data.event_id,
    winner_id: data.winner_id,
    winner_name: win?.name,
    winner_email: win?.hacker_rank_email,
    winner_rank: win?.rank,
    reward_tier: data.reward_tier,
    submission_status: 'submitted',
    submitted_at: new Date().toISOString(),
    activation_status: 'pending'
  });

  if (win) {
    win.reward_status = 'submitted';
    win.submitted_to_program_manager_at = new Date().toISOString();
  }

  const ev = db.getEventById(data.event_id);
  if (ev) {
    revalidatePath(`/events/${ev.event_code}`);
    revalidatePath('/rewards');
    revalidatePath('/admin/analytics');
  }
  return { success: true, reward };
}

export async function generateCertificatesAction(data: {
  event_id: string;
  type: 'participation' | 'winner';
}) {
  await requireAuth();
  const ev = db.getEventById(data.event_id);
  if (!ev) return { success: false, error: 'Event not found' };

  let generatedCount = 0;
  if (data.type === 'winner') {
    const winners = db.getEventWinners(data.event_id);
    winners.forEach((w) => {
      db.generateCertificate({
        event_id: data.event_id,
        event_title: ev.title,
        recipient_name: w.name || 'Rank Winner',
        recipient_email: w.hacker_rank_email,
        certificate_type: 'winner',
        certificate_url: `https://certificates.campuscrew.org/verify/WIN-${w.rank}-${ev.event_code}`,
        status: 'generated'
      });
      generatedCount++;
    });
  } else {
    const participants = db.getEventParticipants(data.event_id).filter((p) => p.submission_status === 'completed');
    participants.forEach((p) => {
      db.generateCertificate({
        event_id: data.event_id,
        event_title: ev.title,
        participant_id: p.id,
        recipient_name: p.name,
        recipient_email: p.hacker_rank_email,
        certificate_type: 'participation',
        certificate_url: `https://certificates.campuscrew.org/verify/PART-${p.id.slice(-6)}-${ev.event_code}`,
        status: 'generated'
      });
      generatedCount++;
    });
  }

  revalidatePath(`/events/${ev.event_code}`);
  revalidatePath('/certificates');
  return { success: true, count: generatedCount };
}
