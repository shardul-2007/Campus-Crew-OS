import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-black text-base">
            CC
          </div>
          <span className="font-black text-2xl text-white tracking-tight">Campus Crew OS</span>
        </Link>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          <h2 className="text-lg font-bold text-white mb-1">Reset Password</h2>
          <p className="text-xs text-slate-400 mb-6">
            Enter your email to receive password reset instructions.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Account Email</label>
              <input
                type="email"
                required
                placeholder="crew@example.com"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <Button type="button" variant="primary" className="w-full">
              Send Password Reset Link
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Remember password?{' '}
            <Link href="/login" className="text-emerald-400 font-semibold hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
