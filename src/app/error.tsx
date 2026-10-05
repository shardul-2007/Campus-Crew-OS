'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h2 className="text-xl font-bold text-white">Something went wrong</h2>
      <p className="text-xs text-slate-400 max-w-md mx-auto">
        {error.message || 'An unexpected operational error occurred while processing this view.'}
      </p>
      <Button onClick={() => reset()} variant="secondary" size="sm">
        <RefreshCw className="w-3.5 h-3.5 mr-1" />
        Retry Operation
      </Button>
    </div>
  );
}
