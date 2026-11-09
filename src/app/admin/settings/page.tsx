import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Settings, CalendarDays, Gift, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export default async function AdminSettingsPage() {
  await requireRole(['admin']);

  const eventTypes = db.getEventTypes();
  const policies = db.getRewardPolicies();

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-black text-white">System Administration</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure system formats, reward policies, and platform defaults.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/settings/event-types" className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 block transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
              <CalendarDays className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
              Event Types Configuration
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Manage the 16 handbook formats, lead times, and platform recommendations.
            </p>
            <span className="text-xs text-emerald-400 font-semibold mt-3 inline-flex items-center gap-1">
              Configure {eventTypes.length} formats <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link href="/admin/settings/rewards" className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 block transition-all group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition-transform">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
              Reward Policies & Tiers
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Define participant volume thresholds and digital certificate benefits.
            </p>
            <span className="text-xs text-purple-400 font-semibold mt-3 inline-flex items-center gap-1">
              Review Policies <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        {/* Brand Assets Compliance Module (Section 73) */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Approved Brand Assets & Compliance
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Per the handbook instructions: Ambassadors must use approved brand assets and never misrepresent unofficial resources as official.
          </p>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-400 font-mono">
            Asset Bucket: storage.objects / brand-assets (Requires Administrator Sign-off)
          </div>
        </div>
      </div>
    </AppShell>
  );
}
