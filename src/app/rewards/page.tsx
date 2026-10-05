import React from 'react';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Gift, ShieldCheck, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export default async function RewardsPage() {
  const rewards = db.getEventRewards();
  const policies = db.getRewardPolicies();
  const activePolicy = policies.find((p) => p.is_active) || policies[0];

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Reward Management & Policy</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit and track verified student awards dispatched to program leadership for activation.
          </p>
        </div>

        {/* Active Policy Notice Card */}
        {activePolicy && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800 uppercase">
                Active Policy: {activePolicy.name}
              </span>
              <span className="text-xs text-slate-400">Effective: {activePolicy.effective_from} to {activePolicy.effective_until}</span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {activePolicy.description}
            </p>
            <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-amber-400 font-bold uppercase block mb-1">Rank 1 Award</span>
                <span className="text-white font-medium">{activePolicy.benefits.tier1_rank1}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Rank 2 Award</span>
                <span className="text-white font-medium">{activePolicy.benefits.tier1_rank2}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-amber-600 font-bold uppercase block mb-1">Rank 3 Award</span>
                <span className="text-white font-medium">{activePolicy.benefits.tier1_rank3}</span>
              </div>
            </div>
          </div>
        )}

        {/* Reward Submissions Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Submitted Reward Records ({rewards.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Winner Name</th>
                  <th className="p-3">Rank</th>
                  <th className="p-3">HackerRank Email</th>
                  <th className="p-3">Reward Tier</th>
                  <th className="p-3">Submission Status</th>
                  <th className="p-3">Activation</th>
                  <th className="p-3">Submitted At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {rewards.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">{r.winner_name || 'Rank Winner'}</td>
                    <td className="p-3 font-mono font-bold text-amber-400">#{r.winner_rank || 1}</td>
                    <td className="p-3 font-mono text-slate-300">{r.winner_email || '—'}</td>
                    <td className="p-3 text-slate-300">{r.reward_tier}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {r.submission_status}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                        {r.activation_status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-400">{new Date(r.submitted_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
