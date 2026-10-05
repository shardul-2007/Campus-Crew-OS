'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Profile } from '@/types/database';
import { switchDemoUser } from '@/lib/actions/auth';
import {
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  Users2,
  Handshake,
  Trophy,
  FileSpreadsheet,
  Bell,
  Settings,
  CheckSquare,
  ShieldCheck,
  Building2,
  BarChart3,
  Gift,
  History,
  ShieldAlert,
  ChevronDown,
  LogOut,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

interface Props {
  currentUser: Profile;
}

export function AppSidebar({ currentUser }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const role = currentUser.role;

  const handleSwitchUser = async (email: string) => {
    setIsSwitching(true);
    try {
      await switchDemoUser(email);
      router.refresh();
    } finally {
      setIsSwitching(false);
    }
  };

  const crewNav = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Events', href: '/events', icon: CalendarDays },
    { label: '+ Create Event', href: '/events/new', icon: PlusCircle, highlight: true },
    { label: 'Crew Directory', href: '/crew', icon: Users2 },
    { label: 'Colleges', href: '/colleges', icon: Building2 },
    { label: 'Collaborations', href: '/collaborations', icon: Handshake },
    { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { label: 'Event Reports', href: '/reports', icon: FileSpreadsheet },
    { label: 'Certificates', href: '/certificates', icon: ShieldCheck },
    { label: 'Notifications', href: '/notifications', icon: Bell },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  const analystNav = [
    { label: 'Analyst Dashboard', href: '/admin/analytics', icon: BarChart3, highlight: true },
    { label: 'Approvals Queue', href: '/admin/approvals', icon: CheckSquare },
    { label: 'Proof Verification', href: '/admin/proof', icon: ShieldCheck },
    { label: 'All Events', href: '/events', icon: CalendarDays },
    { label: 'Crew Performance', href: '/admin/analytics/crew', icon: Users2 },
    { label: 'College Analytics', href: '/admin/analytics/colleges', icon: Building2 },
    { label: 'Reward Submissions', href: '/rewards', icon: Gift },
    { label: 'Operational Reports', href: '/reports', icon: FileSpreadsheet },
    { label: 'Audit Logs', href: '/admin/audit', icon: History },
    { label: 'Notifications', href: '/notifications', icon: Bell },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const adminNav = [
    { label: 'Analyst Dashboard', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Approvals Queue', href: '/admin/approvals', icon: CheckSquare },
    { label: 'Proof Verification', href: '/admin/proof', icon: ShieldCheck },
    { label: 'User Directory', href: '/admin/users', icon: Users2, highlight: true },
    { label: 'All Events', href: '/events', icon: CalendarDays },
    { label: 'Announcements', href: '/admin/announcements', icon: Bell },
    { label: 'Event Types Config', href: '/admin/settings/event-types', icon: CalendarDays },
    { label: 'Reward Policies', href: '/admin/settings/rewards', icon: Gift },
    { label: 'Audit Trail', href: '/admin/audit', icon: History },
    { label: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  const navItems = role === 'admin' ? adminNav : role === 'analyst' ? analystNav : crewNav;

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-3.5 bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-black text-sm">
            CC
          </div>
          <span className="font-bold text-white text-sm tracking-tight">Campus Crew OS</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-950 border-r border-slate-800/90 flex flex-col justify-between z-40 transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand & Tagline Header */}
        <div>
          <div className="p-5 border-b border-slate-800/80">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center font-black text-black text-base shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                CC
              </div>
              <div>
                <h1 className="font-black text-white text-sm tracking-tight group-hover:text-emerald-300 transition-colors">
                  Campus Crew OS
                </h1>
                <p className="text-[10px] font-semibold text-emerald-400 tracking-wider uppercase font-mono">
                  Plan. Execute. Prove. Grow.
                </p>
              </div>
            </Link>
          </div>

          {/* Quick Demo Switcher Banner */}
          <div className="p-3 mx-3 mt-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Simulated Persona:
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                  role === 'admin'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : role === 'analyst'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}
              >
                {role.replace('_', ' ')}
              </span>
            </div>

            {/* Persona Switch Buttons */}
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => handleSwitchUser('crew@example.com')}
                disabled={isSwitching}
                className={`py-1 text-[10px] font-semibold rounded text-center transition-all ${
                  currentUser.email === 'crew@example.com'
                    ? 'bg-emerald-500 text-black font-bold shadow-sm'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300'
                }`}
              >
                Crew
              </button>
              <button
                type="button"
                onClick={() => handleSwitchUser('analyst@example.com')}
                disabled={isSwitching}
                className={`py-1 text-[10px] font-semibold rounded text-center transition-all ${
                  currentUser.email === 'analyst@example.com'
                    ? 'bg-cyan-400 text-black font-bold shadow-sm'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300'
                }`}
              >
                Analyst
              </button>
              <button
                type="button"
                onClick={() => handleSwitchUser('admin@example.com')}
                disabled={isSwitching}
                className={`py-1 text-[10px] font-semibold rounded text-center transition-all ${
                  currentUser.email === 'admin@example.com'
                    ? 'bg-rose-400 text-black font-bold shadow-sm'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)]">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/admin/analytics' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                      : item.highlight
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-emerald-400' : ''}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Current User Profile Footer */}
        <div className="p-3.5 border-t border-slate-800/80 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white shrink-0 overflow-hidden">
              {currentUser.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={currentUser.avatar_url} alt={currentUser.full_name} className="w-full h-full object-cover" />
              ) : (
                currentUser.full_name.slice(0, 2).toUpperCase()
              )}
            </div>
            <div className="truncate flex-1">
              <p className="text-xs font-bold text-white truncate">{currentUser.full_name}</p>
              <p className="text-[10px] text-slate-400 font-mono truncate">{currentUser.crew_code}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}
