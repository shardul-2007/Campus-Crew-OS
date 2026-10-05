import React from 'react';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { History, Shield, User } from 'lucide-react';

export default async function AuditLogPage() {
  await requireRole(['admin', 'analyst']);

  const logs = db.getAuditLogs();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">System Audit Trail</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable log of state changes, approvals, proposal submissions, proof verifications, and user sessions.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recorded Events ({logs.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Actor</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Entity Type</th>
                  <th className="p-3">Entity ID</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono text-slate-400">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-white block">{log.actor_name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{log.actor_email}</span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-emerald-400 font-semibold font-mono text-[11px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 capitalize text-slate-300">{log.entity_type}</td>
                    <td className="p-3 font-mono text-slate-500 text-[11px] truncate max-w-[120px]">
                      {log.entity_id}
                    </td>
                    <td className="p-3 font-mono text-[10px] text-slate-400 truncate max-w-[200px]">
                      {log.new_values ? JSON.stringify(log.new_values) : '—'}
                    </td>
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
