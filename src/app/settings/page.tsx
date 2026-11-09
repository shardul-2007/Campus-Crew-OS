import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { User, Bell, Shield, Lock, CheckCircle2 } from 'lucide-react';

export default async function SettingsPage() {
  const user = await requireAuth();

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-black text-white">Account Settings</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your ambassador profile, credentials, and notification preferences.
          </p>
        </div>

        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            Ambassador Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                disabled
                defaultValue={user.full_name}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-semibold cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Official Crew Code</label>
              <input
                type="text"
                disabled
                defaultValue={user.crew_code}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono font-bold cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                defaultValue={user.email}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-mono cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Assigned Role</label>
              <input
                type="text"
                disabled
                defaultValue={user.role}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-cyan-400 font-semibold uppercase cursor-not-allowed"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 mb-1">College Chapter</label>
              <input
                type="text"
                disabled
                defaultValue={user.college_name || 'COEP Pune Chapter'}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            Security & Authentication
          </h2>
          <p className="text-xs text-slate-400">
            Sessions are secured using httpOnly cookies and role-based access control.
          </p>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-200">Supabase Auth Session</p>
              <p className="text-slate-500 text-[11px]">Valid encrypted session token</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[10px]">
              ACTIVE
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
