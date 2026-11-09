import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Users2, Shield, Building2, Check, X } from 'lucide-react';

export default async function AdminUsersPage() {
  await requireRole(['admin']);

  const profiles = db.getProfiles();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">System User Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Admin oversight of ambassador accounts, analyst permissions, and system roles.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Registered Users ({profiles.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">User & Crew Code</th>
                  <th className="p-3">Email Address</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">College Chapter</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {profiles.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40">
                    <td className="p-3">
                      <span className="font-bold text-white block">{p.full_name}</span>
                      <span className="font-mono text-[10px] text-emerald-400">{p.crew_code}</span>
                    </td>
                    <td className="p-3 font-mono text-slate-300">{p.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          p.role === 'admin'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : p.role === 'analyst'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        {p.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400 truncate max-w-[180px]">{p.college_name || '—'}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {p.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-400">{new Date(p.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
