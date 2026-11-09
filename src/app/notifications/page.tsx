import React from 'react';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

export default async function NotificationsPage() {
  const user = await requireAuth();
  const notifications = db.getNotifications(user.id);

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Notifications</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Operational updates, approval alerts, and proof verification logs.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border transition-all ${
                n.is_read
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                  : 'bg-slate-900 border-emerald-500/40 text-slate-200 shadow-md shadow-emerald-950/10'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg mt-0.5 ${n.is_read ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${n.is_read ? 'text-slate-300' : 'text-white'}`}>
                      {n.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-slate-500 font-mono mt-2 block">
                      {new Date(n.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                {n.entity_id && (
                  <Link href={`/events/${n.entity_id}`}>
                    <Button size="sm" variant="outline" className="text-xs shrink-0">
                      <span>View Entity</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-12 text-center text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-xl">
              No notifications at this time. You&apos;re all caught up!
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
