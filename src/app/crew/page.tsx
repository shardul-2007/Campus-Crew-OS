import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Users2, MapPin, Building2, Calendar, Trophy, ArrowRight } from 'lucide-react';

export default async function CrewDirectoryPage() {
  const crewMembers = db.getProfiles().filter((p) => p.role === 'crew_member');

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Campus Crew Directory</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Discover and connect with student ambassadors leading technical communities across India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {crewMembers.map((cm) => (
            <div key={cm.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-white shrink-0 overflow-hidden">
                    {cm.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cm.avatar_url} alt={cm.full_name} className="w-full h-full object-cover" />
                    ) : (
                      cm.full_name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{cm.full_name}</h3>
                    <span className="font-mono text-[10px] text-emerald-400 font-semibold">{cm.crew_code}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <p className="flex items-center gap-1.5 truncate text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{cm.college_name || 'Affiliated College'}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{cm.city}, {cm.state}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">Batch {cm.graduation_year || 2027}</span>
                <Link href={`/crew/${cm.crew_code}`} className="font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  Profile <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
