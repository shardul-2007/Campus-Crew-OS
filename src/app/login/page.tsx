'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button';
import { Shield, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser(email, password);
      if (res.success) {
        if (res.profile?.role === 'analyst' || res.profile?.role === 'admin') {
          router.push('/admin/analytics');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(res.error || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail: string, destination: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser(demoEmail);
      if (res.success) {
        router.push(destination);
      } else {
        setError(res.error || 'Quick login failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-black text-base shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            CC
          </div>
          <span className="font-black text-2xl text-white tracking-tight">Campus Crew OS</span>
        </Link>
        <p className="text-xs text-slate-400 font-mono">Plan. Execute. Prove. Grow.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-900/90 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          <h2 className="text-lg font-bold text-white mb-1">Sign in to your account</h2>
          <p className="text-xs text-slate-400 mb-6">Enter credentials or choose a pre-configured role profile.</p>

          {/* Quick Persona Buttons */}
          <div className="mb-6 pb-6 border-b border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Instant Persona Switch (Development Mode):
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('crew@example.com', '/dashboard')}
                className="p-2.5 bg-slate-950 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-600 rounded-lg text-left transition-all"
              >
                <span className="text-xs font-bold text-emerald-400 block">Crew Lead</span>
                <span className="text-[10px] text-slate-400 font-mono">crew@</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('analyst@example.com', '/admin/analytics')}
                className="p-2.5 bg-slate-950 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-600 rounded-lg text-left transition-all"
              >
                <span className="text-xs font-bold text-cyan-400 block">Analyst</span>
                <span className="text-[10px] text-slate-400 font-mono">analyst@</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@example.com', '/admin/analytics')}
                className="p-2.5 bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-600 rounded-lg text-left transition-all"
              >
                <span className="text-xs font-bold text-rose-400 block">Admin</span>
                <span className="text-[10px] text-slate-400 font-mono">admin@</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-950/70 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@campuscrew.org"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-300">Password</label>
                <Link href="/forgot-password" className="text-xs text-emerald-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-600"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
              Sign in to Campus Crew OS
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Need an account?{' '}
            <Link href="/signup" className="text-emerald-400 font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
