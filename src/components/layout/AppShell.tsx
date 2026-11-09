import React from 'react';
import { getCurrentUser } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { CommandPalette } from './CommandPalette';

interface Props {
  children: React.ReactNode;
}

export async function AppShell({ children }: Props) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <div>{children}</div>;
  }

  const notifications = db.getNotifications(currentUser.id);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-emerald-500 selection:text-black">
      <CommandPalette />
      <AppSidebar currentUser={currentUser} />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader currentUser={currentUser} unreadCount={unreadCount} />
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>
      </div>
    </div>
  );
}
