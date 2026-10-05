import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Gift, ArrowLeft } from 'lucide-react';

export default async function AdminRewardsConfigPage() {
  await requireRole(['admin']);

  const policies = db.getRewardPolicies();

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/admin/settings" className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white">Reward Policies Configuration</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Admin-controlled thresholds and benefits distribution.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {policies.map((p) => (
            <div key={p.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">{p.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {p.is_active ? 'Active Policy' : 'Archived'}
                </span>
              </div>
              <p className="text-xs text-slate-300">{p.description}</p>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                <p className="text-slate-400">• Participant Threshold: <strong className="text-white">{p.participant_threshold}+ verified students</strong></p>
                <p className="text-slate-400">• Tier 1 Rank 1: <strong className="text-emerald-400">{p.benefits.tier1_rank1}</strong></p>
                <p className="text-slate-400">• Tier 1 Rank 2: <strong className="text-emerald-400">{p.benefits.tier1_rank2}</strong></p>
                <p className="text-slate-400">• Tier 1 Rank 3: <strong className="text-emerald-400">{p.benefits.tier1_rank3}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
