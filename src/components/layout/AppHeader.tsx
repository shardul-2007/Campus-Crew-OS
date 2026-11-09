'use client';

import React from 'react';
import Link from 'next/link';
import { Profile } from '@/types/database';
import { Search, Bell, PlusCircle, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  currentUser: Profile;
  unreadCount?: number;
}

export function AppHeader({ currentUser, unreadCount = 0 }: Props) {
  const triggerSearch = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true })
    );
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Global Search Shortcut Trigger */}
      <button
        onClick={triggerSearch}
        type="button"
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors text-xs w-48 md:w-80 justify-between"
      >
        <span className="flex items-center gap-2 truncate">
          <Search className="w-3.5 h-3.5" />
          <span className="truncate">Search Campus Crew OS...</span>
        </span>
        <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400 rounded">
          Ctrl K
        </kbd>
      </button>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick action: Create Event */}
        <Link href="/events/new">
          <Button size="sm" variant="primary" className="hidden sm:inline-flex">
            <PlusCircle className="w-3.5 h-3.5 mr-1" />
            <span>Create Event</span>
          </Button>
        </Link>

        {/* Notifications Icon with Badge */}
        <Link
          href="/notifications"
          className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Persona Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300 font-medium capitalize">
            {currentUser.role.replace('_', ' ')}
          </span>
        </div>
      </div>
    </header>
  );
}
