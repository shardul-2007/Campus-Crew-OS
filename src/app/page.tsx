import React from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  ShieldCheck,
  Trophy,
  BarChart3,
  Terminal,
  ArrowRight,
  Sparkles,
  Users2,
  CheckCircle2,
  Lock,
  Layers,
  FileCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const lifecycleSteps = [
    { name: 'IDEA', desc: 'Define contest concept, algorithmic difficulty, and target college audience.' },
    { name: 'PLAN', desc: 'Draft event proposal with venue, platform, and timeline for analyst review.' },
    { name: 'BUILD', desc: 'Set up assessments on HRW (or HRC fallback) with custom problem statements.' },
    { name: 'TEST', desc: 'Pre-flight validate test cases, time limits, and permissions with technical lead.' },
    { name: 'PROMOTE', desc: 'Execute T-14 to T-1 structured promotional campaign across campus.' },
    { name: 'EXECUTE', desc: 'Monitor live testing session, student query desk, and leaderboard telemetry.' },
    { name: 'EVALUATE', desc: 'Review completed submissions, analyze score distribution, and audit integrity.' },
    { name: 'REWARD', desc: 'Verify winner HackerRank emails and submit tier rewards to program manager.' },
    { name: 'DOCUMENT', desc: 'Upload proof evidence, attendance records, photos, and file post-event report.' },
    { name: 'IMPROVE', desc: 'Record retrospective feedback, resolve bottlenecks, and prepare next month cycle.' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-black">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center font-black text-black text-sm shadow-md shadow-emerald-500/20">
              CC
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight">Campus Crew OS</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-mono font-bold text-emerald-400 tracking-wider bg-emerald-950 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                v2.6
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="primary" size="sm">
                <span>Open Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 md:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-mono font-medium mb-8">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Operational Operating System for Student Chapters</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
          Plan. Execute. Prove.{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Grow.
          </span>
        </h1>

        <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
          The unified command platform for Campus Crew ambassadors, analysts, and program managers.
          Manage the full 10-stage lifecycle from initial proposal to proof verification, winner rewards, and college community impact analytics.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" variant="primary" className="w-full sm:w-auto px-8 text-base">
              Enter Crew Workspace
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/admin/analytics">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8 text-base">
              <BarChart3 className="w-4 h-4 mr-2 text-cyan-400" />
              Analyst Operations View
            </Button>
          </Link>
        </div>

        {/* Disclaimer / Compliance Notice */}
        <div className="mt-8 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 text-xs max-w-2xl mx-auto">
          <span className="font-semibold text-slate-300">Handbook Compliance Notice:</span> Campus Crew OS is an internal operating tool built to enforce official guidelines. It is not an unapproved replacement for official platforms. Technical assessments are hosted directly on <strong>HRW</strong> (or <strong>HRC</strong>).
        </div>
      </section>

      {/* 10-Stage Lifecycle Section */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800/80 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Standard Operating Procedure
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
              The 10-Stage Event Lifecycle
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every campus event strictly follows the handbook lifecycle to ensure high academic standards, verified proof, and student rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {lifecycleSteps.map((step, idx) => (
              <div
                key={step.name}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      STEP {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{step.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
              <CalendarDays className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">For Campus Crew Leads</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Plan contests with step-by-step wizards, manage team delegations, track the T-14 promotion timeline, capture attendance, and verify winner credentials in one place.
            </p>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Event Command Center (ACT-2026-...)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Automated Documentation Score</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 1-per-month target tracker</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">For Marketing & Analysts</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Review event proposals, audit evidence submissions, inspect test completion rates, and verify winner emails before reward activation with national program leadership.
            </p>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Real-time Approval Queue</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Proof Center & Evidence Verification</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Comprehensive CSV & XLSX Exports</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">For Executive Leadership</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Gain transparent visibility into student growth, repeat participation, college reach, and program health across all regions without vanity metrics.
            </p>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> College Comparative Analytics</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Configurable Crew Impact Scores</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Complete Audit Trail Logging</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-10 px-4 md:px-8 text-center text-xs text-slate-400 bg-slate-950">
        <p className="font-semibold text-slate-300 mb-1">Campus Crew OS — Plan. Execute. Prove. Grow.</p>
        <p>Built for campus community teams and developer ambassadors.</p>
      </footer>
    </div>
  );
}
