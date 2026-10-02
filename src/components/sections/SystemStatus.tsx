'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SystemStatus() {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3 }}
      className="fixed bottom-4 right-4 z-50 hidden xl:block"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="glass rounded-xl p-4 mb-2 text-left"
            style={{ borderColor: 'rgba(0,245,200,0.15)', minWidth: 160 }}
          >
            {[['STACK','Next.js 14'],['VERSION','v5.1'],['STATUS','LIVE']].map(([k,v]) => (
              <div key={k} className="flex justify-between gap-4 mb-1.5">
                <span className="sys-label" style={{ fontSize: '0.56rem' }}>{k}</span>
                <span className="mono" style={{ fontSize: '0.62rem', color: k === 'STATUS' ? 'var(--accent)' : 'var(--text-muted)' }}>{v}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 glass rounded-full px-3 py-1.5 hover:border-[var(--border-glow)] transition-colors"
        style={{ borderColor: 'rgba(0,245,200,0.1)' }}
        aria-label="Build info"
      >
        <span className="status-dot status-dot-pulse" style={{ width: 5, height: 5 }} />
        <span className="mono text-[9px] tracking-[0.15em] text-[var(--accent)]">LIVE</span>
      </button>
    </motion.div>
  );
}