import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { MonthlyActivityChart } from '@/components/analytics/MonthlyActivityChart';
import { EventMixChart } from '@/components/analytics/EventMixChart';
import { Button } from '@/components/ui/button';
import {
  Users2,
  CalendarDays,
  CheckCircle2,
  Building2,
  MapPin,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Gift,
  FileSpreadsheet,
  ShieldAlert,
  Download,
  Info
} from 'lucide-react';

export default async function AnalystDashboardPage() {
  await requireRole(['analyst', 'admin', 'program_manager']);

  const stats = db.getAnalyticsOverview();
  const monthlyData = db.getMonthlyPerformance();
  const eventMix = db.getEventMix();
  const topCrew = db.getCrewPerformance().slice(0, 5);
  const topColleges = db.getCollegePerformance().slice(0, 5);
  const highRiskEvents = db.getEvents({ risk: 'HIGH' }).slice(0, 5);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Top Header Section (Section 78) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                National Operations Command
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-mono text-slate-400">October 2026</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Campus Crew Analytics
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <a href="/api/export" download>
              <Button size="sm" variant="outline">
                <Download className="w-3.5 h-3.5 mr-1" />
                Export Comprehensive CSV
              </Button>
            </a>
            <Link href="/admin/approvals">
              <Button size="sm" variant="primary">
                Review Approvals Queue ({stats.pendingReviews})
              </Button>
            </Link>
          </div>
        </div>

        {/* 6 Top KPI Cards (Section 78) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Active Crew
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black font-mono text-white">{stats.activeCrew}</span>
              <span className="text-[10px] text-slate-500">/ {stats.totalCrew}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Total Events
            </span>
            <span className="text-2xl font-black font-mono text-white">{stats.totalEvents}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Verified
            </span>
            <span className="text-2xl font-black font-mono text-emerald-400">{stats.verifiedEvents}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Participants
            </span>
            <span className="text-2xl font-black font-mono text-cyan-400">{stats.totalParticipants}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Colleges
            </span>
            <span className="text-2xl font-black font-mono text-white">{stats.totalColleges}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Cities Reached
            </span>
            <span className="text-2xl font-black font-mono text-white">{stats.citiesReached}</span>
          </div>
        </div>

        {/* Charts Row: Monthly Activity vs Event Mix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Activity (Target vs Completed vs Verified) */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Monthly Activity
                </h3>
                <p className="text-xs text-slate-400">Target vs Completed vs Verified Events</p>
              </div>
            </div>
            <MonthlyActivityChart data={monthlyData} />
          </div>

          {/* Event Mix */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Event Mix</h3>
              <p className="text-xs text-slate-400">Distribution across handbook formats</p>
            </div>
            <EventMixChart data={eventMix} />
          </div>
        </div>

        {/* Community Impact Row (Section 78 & 39) */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                Depth of Engagement
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Community Impact & Academic Reach
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Info className="w-3.5 h-3.5" />
              <span>Metrics emphasize meaningful participation, not vanity numbers.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Total Registrations</span>
              <p className="text-xl font-black font-mono text-slate-200">{stats.totalRegistrations}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Unique Students</span>
              <p className="text-xl font-black font-mono text-cyan-400">{stats.uniqueStudents}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Repeat Participants</span>
              <p className="text-xl font-black font-mono text-emerald-400">{stats.repeatParticipants}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Avg Completion</span>
              <p className="text-xl font-black font-mono text-amber-400">{stats.avgCompletionRate}%</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Collaborations</span>
              <p className="text-xl font-black font-mono text-purple-400">{stats.clubCollaborations}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Social Reach</span>
              <p className="text-xl font-black font-mono text-slate-200">{stats.socialReach.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Top Crew & Top Colleges Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Crew Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Top Crew Ambassadors</h3>
                <p className="text-xs text-slate-400">Ranked by weighted impact score formula</p>
              </div>
              <Link href="/admin/analytics/crew" className="text-xs text-emerald-400 hover:underline">
                View Full Table →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">Rank</th>
                    <th className="p-2.5">Crew Lead</th>
                    <th className="p-2.5">College</th>
                    <th className="p-2.5">Events</th>
                    <th className="p-2.5">Impact</th>
                    <th className="p-2.5">Verified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {topCrew.map((c, idx) => (
                    <tr key={c.id} className="hover:bg-slate-800/40">
                      <td className="p-2.5 font-bold font-mono text-amber-400">#{idx + 1}</td>
                      <td className="p-2.5 font-semibold text-white">{c.name}</td>
                      <td className="p-2.5 text-slate-400 truncate max-w-[120px]">{c.college_name}</td>
                      <td className="p-2.5 font-mono">{c.events_count}</td>
                      <td className="p-2.5 font-mono font-bold text-emerald-400">{c.impact_score}</td>
                      <td className="p-2.5 font-mono text-cyan-400">{c.verified_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Colleges Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Top Colleges</h3>
                <p className="text-xs text-slate-400">Campuses driving highest developer volume</p>
              </div>
              <Link href="/admin/analytics/colleges" className="text-xs text-cyan-400 hover:underline">
                View Colleges →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">College</th>
                    <th className="p-2.5">Events</th>
                    <th className="p-2.5">Participants</th>
                    <th className="p-2.5">Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {topColleges.map((col) => (
                    <tr key={col.id} className="hover:bg-slate-800/40">
                      <td className="p-2.5 font-semibold text-white truncate max-w-[180px]">{col.name}</td>
                      <td className="p-2.5 font-mono">{col.events_count}</td>
                      <td className="p-2.5 font-mono text-cyan-400">{col.participants_count}</td>
                      <td className="p-2.5 font-mono text-emerald-400">{col.completion_rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pending Actions & Risk Section (Section 78) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Actions */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Pending Actions Queue
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link href="/admin/approvals" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 block">
                <span className="text-2xl font-black font-mono text-cyan-400">{stats.pendingReviews}</span>
                <p className="text-slate-300 font-semibold mt-1">Events Awaiting Review</p>
              </Link>
              <Link href="/admin/proof" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 block">
                <span className="text-2xl font-black font-mono text-emerald-400">{stats.pendingProofCount}</span>
                <p className="text-slate-300 font-semibold mt-1">Proof Submissions</p>
              </Link>
              <Link href="/reports" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 block">
                <span className="text-2xl font-black font-mono text-amber-400">{stats.pendingReportCount}</span>
                <p className="text-slate-300 font-semibold mt-1">Reports Awaiting Audit</p>
              </Link>
              <Link href="/rewards" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 block">
                <span className="text-2xl font-black font-mono text-purple-400">{stats.pendingWinnerCount}</span>
                <p className="text-slate-300 font-semibold mt-1">Winner Verifications</p>
              </Link>
            </div>
          </div>

          {/* Risk Indicator */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-rose-950/70 space-y-3">
            <div className="flex items-center gap-2 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Operational Risk Warning</h3>
            </div>
            <p className="text-xs text-slate-300">
              {stats.highRiskEventsCount} upcoming events are scheduled within 48 hours but have incomplete required checklist items or untested platforms.
            </p>

            <div className="space-y-2">
              {highRiskEvents.map((e) => (
                <div key={e.id} className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/60 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{e.title} ({e.event_code})</p>
                    <p className="text-[11px] text-slate-400">{e.college_name} • Start: {new Date(e.start_date).toLocaleDateString()}</p>
                  </div>
                  <Link href={`/events/${e.event_code}`}>
                    <Button size="sm" variant="danger" className="text-xs py-1 h-7">Inspect Risk</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
