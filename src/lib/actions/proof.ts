'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db/store';
import { requireAuth, requireRole } from '@/lib/auth/session';
import { ProofType, VerificationStatus } from '@/types/database';

export async function uploadProofAction(data: {
  event_id: string;
  proof_type: ProofType;
  file_name: string;
  file_path: string;
  mime_type: string;
  file_size: number;
  description: string;
}) {
  const user = await requireAuth();
  const proof = db.addProof({
    ...data,
    uploaded_by: user.id
  });

  const ev = db.getEventById(data.event_id);
  if (ev) {
    revalidatePath(`/events/${ev.event_code}`);
    revalidatePath('/admin/proof');
    revalidatePath('/admin/analytics');
  }
  return { success: true, proof };
}

export async function verifyProofAction(
  proofId: string,
  status: VerificationStatus,
  comment?: string
) {
  const user = await requireRole(['analyst', 'admin']);
  const proof = db.verifyProof(proofId, status as any, user.id, comment);

  if (proof) {
    const ev = db.getEventById(proof.event_id);
    if (ev) {
      revalidatePath(`/events/${ev.event_code}`);
      revalidatePath('/admin/proof');
      revalidatePath('/admin/analytics');
    }
  }
  return { success: !!proof, proof };
}
