'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function SystemStatus() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      className="fixed bottom-5 right-5 z-50 hidden lg:flex flex-col items-end gap-0"
    >
      {/* Expanded detail panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-xl p-4 mb-2 min-w-[160px]"
            style={{ borderColor: 'rgba(0,245,200,0.15)' }}
          >
            <div className="mono text-[10px] text-[var(--text-sub)] mb-3 tracking-widest">BUILD INFO</div>
            {[
              { k: 'STACK',    v: 'Next.js 14' },
              { k: 'DEPLOY',   v: 'GitHub Pages' },
              { k: 'VERSION',  v: 'v5.0 · 2026' },
              { k: 'STATUS',   v: 'LIVE', accent: true },
            ].map(r => (
              <div key={r.k} className="flex justify-between gap-6 mb-1.5">
                <span className="sys-label" style={{ fontSize: '0.58rem' }}>{r.k}</span>
                <span className="mono" style={{ fontSize: '0.62rem', color: r.accent ? 'var(--accent)' : 'var(--text-muted)' }}>{r.v}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact badge — always visible */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="flex items-center gap-2 glass rounded-full px-3 py-2 hover:border-[var(--border-glow)] transition-colors"
        style={{ borderColor: 'rgba(0,245,200,0.12)' }}
        aria-label="Toggle system info"
      >
        <span className="status-dot status-dot-pulse" style={{ width: 6, height: 6 }} />
        <span className="mono text-[9px] tracking-[0.15em] text-[var(--accent)]">AVAILABLE</span>
        {expanded ? <ChevronDown size={10} className="text-[var(--text-sub)]" /> : <ChevronUp size={10} className="text-[var(--text-sub)]" />}
      </button>
    </motion.div>
  );
}