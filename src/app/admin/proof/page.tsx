import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { ProofVerificationList } from '@/components/proof/ProofVerificationList';

export default async function ProofVerificationPage() {
  await requireRole(['analyst', 'admin', 'program_manager']);

  const proofs = db.getEventProofs();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Proof Verification Queue</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit submitted event photographs, attendance records, and contest platform screenshots.
          </p>
        </div>

        <ProofVerificationList initialProofs={proofs} />
      </div>
    </AppShell>
  );
}
