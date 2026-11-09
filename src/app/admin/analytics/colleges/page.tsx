import React from 'react';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Building2, MapPin, Users, Calendar } from 'lucide-react';

export default async function CollegeAnalyticsPage() {
  await requireRole(['analyst', 'admin', 'program_manager']);

  const collegeStats = db.getCollegePerformance();
  const activeCount = collegeStats.filter((c) => c.status === 'active').length;
  const newCount = collegeStats.filter((c) => c.status === 'new').length;
  const returningCount = collegeStats.filter((c) => c.status === 'returning').length;

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">College Chapter Analytics</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare campus engagement, active chapters, and student retention across Indian universities.
          </p>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Active Campuses (3+ Events)</span>
            <p className="text-2xl font-black font-mono text-emerald-400 mt-1">{activeCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Returning Campuses (2 Events)</span>
            <p className="text-2xl font-black font-mono text-cyan-400 mt-1">{returningCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">New Onboarding Campuses</span>
            <p className="text-2xl font-black font-mono text-amber-400 mt-1">{newCount}</p>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">College Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Events Hosted</th>
                  <th className="p-3">Total Participants</th>
                  <th className="p-3">Completion Rate</th>
                  <th className="p-3">Repeat Participants</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Last Event</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {collegeStats.map((col) => (
                  <tr key={col.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">{col.name}</td>
                    <td className="p-3 text-slate-300">
                      {col.city}, {col.state}
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-200">{col.events_count}</td>
                    <td className="p-3 font-mono text-cyan-400">{col.participants_count}</td>
                    <td className="p-3 font-mono text-emerald-400">{col.completion_rate}%</td>
                    <td className="p-3 font-mono text-purple-400">{col.repeat_participants}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          col.status === 'active'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : col.status === 'new'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        }`}
                      >
                        {col.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-400">
                      {new Date(col.last_event_date).toLocaleDateString()}
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
