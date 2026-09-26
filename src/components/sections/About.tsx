'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ABOUT_PANELS, PERSONAL } from '@/data/portfolio';

export default function About() {
  const [open, setOpen] = useState<string | null>('engineer');

  return (
    <section id="about" className="py-32 relative">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #050810 0%, #060a14 100%)' }} />
      <div className="section-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="sys-label-accent">SECTION 02</span>
            <div className="h-px flex-1 max-w-[48px] bg-[var(--accent)] opacity-40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            IDENTITY /<br />
            <span className="gradient-text">PROFILE</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-lg">
            Four facets of how I work, build and collaborate — click any panel to explore.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {ABOUT_PANELS.map((panel, i) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <button
                onClick={() => setOpen(open === panel.id ? null : panel.id)}
                className="w-full text-left glass glass-hover rounded-2xl p-6 block"
                aria-expanded={open === panel.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className="mono text-3xl font-bold leading-none select-none"
                      style={{ color: open === panel.id ? 'rgba(0,245,200,0.4)' : 'rgba(255,255,255,0.1)' }}
                    >
                      {panel.num}
                    </span>
                    <div>
                      <div className="sys-label-accent mb-1">{panel.label}</div>
                      <div className="font-semibold text-lg leading-tight">{panel.title}</div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: open === panel.id ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    className="text-[var(--text-muted)] flex-shrink-0 mt-1"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {open === panel.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed mt-5 mb-4">
                        {panel.body}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {panel.tags.map(t => (
                          <span key={t} className="tech-pill" style={{ borderColor: 'var(--border-glow)', color: 'var(--accent)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 glass rounded-2xl p-6 flex flex-wrap items-center gap-6"
          style={{ borderColor: 'rgba(0,245,200,0.1)' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 glass"
            style={{ borderColor: 'var(--border-glow)', boxShadow: '0 0 20px rgba(0,245,200,0.12)' }}
          >
            <span className="mono text-sm font-bold text-[var(--accent)]">SP</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-[var(--text)] text-lg">{PERSONAL.name}</div>
            <div className="sys-label mt-1">{PERSONAL.role} · {PERSONAL.location}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {PERSONAL.focus.map(f => (
              <span
                key={f}
                className="tech-pill"
                style={{ borderColor: 'var(--border-glow)', color: 'var(--accent)', background: 'var(--accent-dim)' }}
              >
                {f}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
