import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mx-auto">
        <HelpCircle className="w-7 h-7" />
      </div>
      <h1 className="text-2xl font-black text-white">404 — Record Not Found</h1>
      <p className="text-xs text-slate-400 max-w-sm mx-auto">
        The requested campus event, ambassador record, or page could not be located in Campus Crew OS.
      </p>
      <Link href="/dashboard">
        <Button variant="primary" size="sm">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
