import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Trophy, Medal, Award, Info, Sparkles } from 'lucide-react';

export default async function LeaderboardPage() {
  const crewRanking = db.getCrewPerformance();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                Chapter Impact Standings
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Campus Crew Leaderboard
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Celebrating verified chapter execution, high participant completion rates, and reliable documentation across colleges.
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-[11px] text-slate-400 max-w-sm">
            <span className="font-semibold text-slate-300 block mb-0.5">Application Notice:</span>
            Rankings are computed via internal chapter impact scoring and are not an official global HackerRank ambassador tier unless confirmed by leadership.
          </div>
        </div>

        {/* Podium for Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {crewRanking.slice(0, 3).map((cm, idx) => {
            const medalColors = [
              'border-amber-500/60 bg-amber-950/20 text-amber-400',
              'border-slate-400/60 bg-slate-900 text-slate-300',
              'border-amber-700/60 bg-amber-950/10 text-amber-600',
            ];
            const rankLabel = idx === 0 ? '1st Place' : idx === 1 ? '2nd Place' : '3rd Place';

            return (
              <div
                key={cm.id}
                className={`p-5 rounded-2xl border ${medalColors[idx]} flex flex-col justify-between shadow-lg`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      {rankLabel}
                    </span>
                    <span className="text-2xl">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{cm.name}</h3>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{cm.college_name}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Verified Events</span>
                    <span className="font-mono font-bold text-emerald-400">{cm.verified_count}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-slate-400 block">Impact Score</span>
                    <span className="font-mono font-black text-amber-400 text-sm">{cm.impact_score}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Ambassador</th>
                  <th className="p-3">College</th>
                  <th className="p-3">Verified Events</th>
                  <th className="p-3">Total Participants</th>
                  <th className="p-3">Completion Rate</th>
                  <th className="p-3">Impact Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {crewRanking.map((cm, idx) => (
                  <tr key={cm.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-slate-300">
                      {idx === 0 ? '🥇 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : `#${idx + 1}`}
                    </td>
                    <td className="p-3 font-semibold text-white">
                      <Link href={`/crew/${cm.crew_code}`} className="hover:text-emerald-400">
                        {cm.name}
                      </Link>
                      <span className="block text-[10px] text-slate-400 font-mono">{cm.crew_code}</span>
                    </td>
                    <td className="p-3 text-slate-300 truncate max-w-[200px]">{cm.college_name}</td>
                    <td className="p-3 font-mono font-bold text-emerald-400">{cm.verified_count}</td>
                    <td className="p-3 font-mono text-cyan-400">{cm.participants_count}</td>
                    <td className="p-3 font-mono text-slate-300">{cm.completion_rate}%</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded bg-amber-950/70 border border-amber-800 text-amber-300 font-mono font-black text-xs">
                        {cm.impact_score} pts
                      </span>
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
