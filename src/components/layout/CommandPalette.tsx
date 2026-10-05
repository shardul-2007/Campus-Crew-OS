'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calendar, Users, Building, Bell, X, ArrowRight, Loader2 } from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const json = await res.json();
        if (json.success) {
          setResults(json.results || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (url: string) => {
    setOpen(false);
    setQuery('');
    router.push(url);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events (e.g. CodeRush, ACT-2026), crew, colleges, announcements..."
            className="w-full py-4 px-3 bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          {loading && <Loader2 className="w-4 h-4 text-emerald-400 animate-spin mr-2" />}
          <button
            onClick={() => setOpen(false)}
            className="text-xs font-mono px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-800/60">
          {results.length > 0 ? (
            results.map((item) => (
              <button
                key={`${item.type}-${item.id}`}
                onClick={() => handleSelect(item.url)}
                className="w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-slate-800/70 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-emerald-400">
                    {item.type === 'event' && <Calendar className="w-4 h-4" />}
                    {item.type === 'crew' && <Users className="w-4 h-4" />}
                    {item.type === 'college' && <Building className="w-4 h-4" />}
                    {item.type === 'announcement' && <Bell className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-400">{item.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </button>
            ))
          ) : query.trim() ? (
            !loading && (
              <div className="py-8 text-center text-sm text-slate-400">
                No matching results found for &quot;{query}&quot;
              </div>
            )
          ) : (
            <div className="py-8 text-center text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Quick Navigation</p>
              <p>Type to search across events, crew ambassadors, colleges, and announcements.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
