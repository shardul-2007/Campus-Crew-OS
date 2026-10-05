import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Handshake, Building2, User, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function CollaborationsPage() {
  const collabs = db.getCollaborations();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Cross-Campus Collaborations</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              The handbook actively encourages joint campus initiatives to scale technical outreach.
            </p>
          </div>

          <Link href="/events/new">
            <Button size="sm" variant="primary">
              <PlusCircle className="w-3.5 h-3.5 mr-1" />
              Propose Joint Event
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collabs.map((c) => (
            <div key={c.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {c.event_code || 'ACT-2026-00042'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {c.status}
                </span>
              </div>

              <div>
                <Link href={`/events/${c.event_code || 'ACT-2026-00042'}`} className="font-bold text-white text-base hover:text-emerald-400">
                  {c.event_title || 'CodeRush 2026: Inter-College Edition'}
                </Link>
                <p className="text-xs text-slate-400 mt-1">{c.responsibility}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Host Ambassador</span>
                  <span className="font-medium text-slate-200">{c.lead_user_name || 'Lead Ambassador'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Partner Chapter</span>
                  <span className="font-medium text-slate-200 truncate block">{c.partner_college_name || 'Partner College'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
