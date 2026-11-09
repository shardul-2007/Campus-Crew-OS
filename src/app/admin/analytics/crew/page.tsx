import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Trophy, Users, ShieldCheck, Info } from 'lucide-react';

export default async function CrewPerformancePage() {
  await requireRole(['analyst', 'admin', 'program_manager']);

  const crewList = db.getCrewPerformance();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Crew Ambassador Performance</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Ranked by weighted impact score emphasizing verified quality, documentation, and student completion.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            <span>Configurable Operational Weights: Verified (35%), Completion (25%), Doc Quality (20%), Collab (20%)</span>
          </div>
        </div>

        {/* Full Crew Performance Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Crew Ambassador</th>
                  <th className="p-3">College</th>
                  <th className="p-3">Events</th>
                  <th className="p-3">Verified</th>
                  <th className="p-3">Participants</th>
                  <th className="p-3">Completion</th>
                  <th className="p-3">Collabs</th>
                  <th className="p-3">Doc Score</th>
                  <th className="p-3">Impact Score</th>
                  <th className="p-3">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {crewList.map((cm, idx) => (
                  <tr key={cm.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-amber-400">#{idx + 1}</td>
                    <td className="p-3 font-semibold text-white">
                      <Link href={`/crew/${cm.crew_code}`} className="hover:text-emerald-400">
                        {cm.name}
                      </Link>
                      <span className="block text-[10px] text-slate-400 font-mono">{cm.crew_code}</span>
                    </td>
                    <td className="p-3 text-slate-300 truncate max-w-[150px]">{cm.college_name}</td>
                    <td className="p-3 font-mono">{cm.events_count}</td>
                    <td className="p-3 font-mono font-bold text-emerald-400">{cm.verified_count}</td>
                    <td className="p-3 font-mono text-cyan-400">{cm.participants_count}</td>
                    <td className="p-3 font-mono text-slate-200">{cm.completion_rate}%</td>
                    <td className="p-3 font-mono text-purple-400">{cm.collaborations_count}</td>
                    <td className="p-3 font-mono text-slate-300">{cm.documentation_score}%</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 font-mono font-black text-xs">
                        {cm.impact_score}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-400">
                      {new Date(cm.last_activity).toLocaleDateString()}
                    </td>
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
