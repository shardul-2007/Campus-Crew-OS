import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { CalendarDays, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default async function AdminEventTypesPage() {
  await requireRole(['admin']);

  const eventTypes = db.getEventTypes();

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/admin/settings" className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white">Event Types Configuration</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              16 handbook-defined formats with minimum planning lead times.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="divide-y divide-slate-800">
            {eventTypes.map((et) => (
              <div key={et.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <h3 className="font-bold text-white text-sm">{et.name}</h3>
                  <p className="text-slate-400 mt-0.5">{et.description}</p>
                  <span className="font-mono text-[10px] text-slate-500 mt-1 block">
                    Slug: {et.slug} • Min Lead Time: {et.min_lead_time_days} days
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {et.is_active ? 'Active' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
