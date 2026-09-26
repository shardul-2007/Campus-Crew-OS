'use client';
import { motion } from 'framer-motion';
import { PERSONAL } from '@/data/portfolio';

export default function SystemStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="fixed bottom-6 left-6 z-50 glass rounded-2xl p-4 w-[200px] hidden xl:block"
      style={{ borderColor: 'rgba(0,245,200,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
        <span className="status-dot status-dot-pulse" style={{ width: 6, height: 6 }} />
        <span className="sys-label-accent text-[9px] tracking-[0.18em]">SYSTEM STATUS</span>
      </div>

      {/* Rows */}
      {[
        { label: 'ROLE',     value: PERSONAL.role,      accent: false },
        { label: 'LOCATION', value: PERSONAL.locationShort, accent: false },
        { label: 'STATUS',   value: PERSONAL.status,    accent: true },
      ].map(row => (
        <div key={row.label} className="flex flex-col gap-0.5 mb-3">
          <div className="sys-label" style={{ fontSize: '0.58rem' }}>{row.label}</div>
          <div
            className="mono font-medium"
            style={{ fontSize: '0.7rem', color: row.accent ? 'var(--accent)' : 'var(--text-muted)' }}
          >
            {row.value}
          </div>
        </div>
      ))}

      {/* Focus tags */}
      <div className="flex flex-col gap-0.5 mb-4">
        <div className="sys-label mb-1" style={{ fontSize: '0.58rem' }}>FOCUS</div>
        {PERSONAL.focus.map(f => (
          <div key={f} className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
            ▸ {f}
          </div>
        ))}
      </div>

      {/* Build status */}
      <div>
        <div className="sys-label mb-1.5" style={{ fontSize: '0.58rem' }}>BUILD STATUS</div>
        <div className="progress-bar mb-1.5">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--accent)' }}>
          ██████████ 100%
        </div>
      </div>
    </motion.div>
  );
}
