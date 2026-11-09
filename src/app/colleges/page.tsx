import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Building2, MapPin, ArrowRight, ExternalLink } from 'lucide-react';

export default async function CollegesPage() {
  const colleges = db.getColleges();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Campus Directory</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            15 institutional partner chapters hosting developer challenges and assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colleges.map((col) => {
            const events = db.getEvents({ collegeId: col.id });
            const participants = events.reduce((acc, e) => acc + (e.actual_participants || 0), 0);

            return (
              <div key={col.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                      <Building2 className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">{col.country}</span>
                  </div>

                  <h3 className="font-bold text-white text-sm mb-1">{col.name}</h3>
                  <p className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{col.city}, {col.state}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold font-mono text-emerald-400">{events.length}</span>
                    <span className="text-slate-400 ml-1">Events</span>
                  </div>
                  <Link href={`/colleges/${col.id}`} className="font-semibold text-emerald-400 hover:underline flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
