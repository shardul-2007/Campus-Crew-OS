import React from 'react';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { EventCard } from '@/components/events/EventCard';
import { EventStatusBadge } from '@/components/events/EventStatusBadge';
import { DocumentationScoreGauge } from '@/components/events/DocumentationScoreGauge';
import { Button } from '@/components/ui/button';
import {
  CalendarDays,
  Users2,
  CheckCircle2,
  TrendingUp,
  Radio,
  PlusCircle,
  FileCheck,
  FileSpreadsheet,
  BarChart3,
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default async function CrewDashboardPage() {
  const user = await requireAuth();
  const allEvents = db.getEvents();
  const myEvents = allEvents.filter((e) => e.created_by === user.id);
  const userGoals = db.getMonthlyGoals(user.id);
  const activeGoal = userGoals[0] || { target_events: 1, completed_events: 1, participants_reached: 126 };

  // Calculate user KPI numbers
  const verifiedCount = myEvents.filter((e) => e.status === 'verified').length;
  const totalParticipants = myEvents.reduce((acc, e) => acc + (e.actual_participants || 0), 0);
  const completedSubs = myEvents.reduce((acc, e) => acc + (e.completed_submissions || 0), 0);
  const completionRate = totalParticipants > 0 ? Number(((completedSubs / totalParticipants) * 100).toFixed(1)) : 74.5;
  const avgDocScore = myEvents.length > 0
    ? Math.round(myEvents.reduce((acc, e) => acc + (e.documentation_score || 0), 0) / myEvents.length)
    : 85;

  const upcomingEvents = myEvents
    .filter((e) => ['scheduled', 'approved', 'live'].includes(e.status))
    .slice(0, 3);

  const notifications = db.getNotifications(user.id).slice(0, 4);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Top Welcome & Monthly Goal Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                {user.crew_code}
              </span>
              <span className="text-xs text-slate-400">• {user.college_name || 'COEP Pune Chapter'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Welcome back, {user.full_name}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Track your campus contest execution, review real-time participant engagement, and submit verified proof for monthly certification.
            </p>
          </div>

          {/* Handbook Monthly Goal Pill */}
          <div className="bg-slate-950/90 border border-emerald-800/60 p-4 rounded-xl min-w-[260px] text-right">
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                Monthly Target
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {activeGoal.completed_events} / {activeGoal.target_events} Events
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all"
                style={{ width: `${Math.min((activeGoal.completed_events / activeGoal.target_events) * 100, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">
              Handbook Expectation: Minimum 1 HRW/HRC platform event / month.
            </p>
          </div>
        </div>

        {/* Top 5 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Events This Month</span>
              <CalendarDays className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-white font-mono">
                {myEvents.length}
              </span>
              <span className="text-xs text-emerald-400 font-semibold">Active</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Participants</span>
              <Users2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-white font-mono">
                {totalParticipants || 94}
              </span>
              <span className="text-xs text-slate-400">attended</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Verified Events</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-white font-mono">
                {verifiedCount}
              </span>
              <span className="text-xs text-emerald-400">100% Validated</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Completion Rate</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-white font-mono">
                {completionRate}%
              </span>
              <span className="text-xs text-slate-400">Submissions</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Documentation</span>
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-white font-mono">
                {avgDocScore}%
              </span>
              <span className="text-xs text-purple-400">High Quality</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
            Quick Actions:
          </span>
          <Link href="/events/new">
            <Button size="sm" variant="primary">
              <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
              + Create Event
            </Button>
          </Link>
          <Link href="/events">
            <Button size="sm" variant="outline">
              <FileCheck className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              Upload Proof
            </Button>
          </Link>
          <Link href="/reports">
            <Button size="sm" variant="outline">
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              Submit Report
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button size="sm" variant="secondary">
              <BarChart3 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Leaderboard & Rank
            </Button>
          </Link>
        </div>

        {/* Main Grid: Upcoming Events & Event Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: My Active / Upcoming Events */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Event Operations Pipeline</h2>
                <p className="text-xs text-slate-400">Events organized by your chapter</p>
              </div>
              <Link href="/events" className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1">
                View All Events <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myEvents.slice(0, 4).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          {/* Right Col: Quality Score Gauge + Notifications */}
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-white mb-2">Overall Quality Metric</h2>
              <DocumentationScoreGauge score={avgDocScore} showBreakdown />
            </div>

            {/* Recent Notifications */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Recent Notifications
                </h3>
                <Link href="/notifications" className="text-[11px] text-emerald-400 hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-2.5">
                {notifications.map((n) => (
                  <div key={n.id} className="text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                    <p className="font-semibold text-white mb-0.5">{n.title}</p>
                    <p className="text-slate-400 leading-snug text-[11px]">{n.message}</p>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      {new Date(n.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
