import React from 'react';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Bell, Sparkles, AlertTriangle, Calendar } from 'lucide-react';

export default async function AdminAnnouncementsPage() {
  await requireRole(['admin', 'analyst', 'program_manager']);

  const announcements = db.getAnnouncements();

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-black text-white">Broadcast Announcements</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Publish critical notices, monthly event reminders, and handbook policy updates to student chapters.
          </p>
        </div>

        <div className="space-y-4">
          {announcements.map((ann) => (
            <div key={ann.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">{ann.title}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    ann.priority === 'high' || ann.priority === 'urgent'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {ann.priority} Priority
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{ann.content}</p>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800">
                <span>Published by {ann.created_by_name || 'Administrator'}</span>
                <span>{new Date(ann.published_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
