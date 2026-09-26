'use client';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '@/data/portfolio';

const TYPE_COLORS: Record<string, string> = {
  BUILD: '#00F5C8',
  COMMUNITY: '#A78BFA',
  'OPEN SOURCE': '#5B8DEF',
  LEARN: '#F59E0B',
};

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative" style={{ background: '#070b14' }}>
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="sys-label-accent">SECTION 04</span>
            <div className="h-px flex-1 max-w-[48px] bg-[var(--accent)] opacity-40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            SYSTEM /<br />
            <span className="gradient-text">EVENT LOG</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-lg">
            A chronological log of builds, community roles, and open source contributions.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--border)]" />

          <div className="flex flex-col gap-0">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex gap-6 pb-8"
              >
                {/* Node */}
                <div className="flex flex-col items-center flex-shrink-0 w-6">
                  <div
                    className="w-[11px] h-[11px] rounded-full border-2 flex-shrink-0 mt-1"
                    style={{
                      background: TYPE_COLORS[exp.type] ? TYPE_COLORS[exp.type] + '33' : 'rgba(255,255,255,0.04)',
                      borderColor: TYPE_COLORS[exp.type] || 'var(--border)',
                      boxShadow: exp.current ? '0 0 12px ' + (TYPE_COLORS[exp.type] || 'var(--accent)') : 'none',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="glass rounded-xl p-5 flex-1 hover:border-[var(--border-md)] transition-colors">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="mono text-xs font-bold" style={{ color: TYPE_COLORS[exp.type] || 'var(--text-sub)' }}>
                      {exp.year}
                    </span>
                    <span
                      className="mono text-[9px] px-2 py-0.5 rounded-full"
                      style={{
                        background: TYPE_COLORS[exp.type] ? TYPE_COLORS[exp.type] + '1a' : 'rgba(255,255,255,0.04)',
                        color: TYPE_COLORS[exp.type] || 'var(--text-sub)',
                        border: '1px solid ' + (TYPE_COLORS[exp.type] ? TYPE_COLORS[exp.type] + '44' : 'var(--border)'),
                        letterSpacing: '0.12em',
                      }}
                    >
                      {exp.type}
                    </span>
                    {exp.current && (
                      <span className="flex items-center gap-1.5">
                        <span className="status-dot status-dot-pulse" style={{ width: 5, height: 5 }} />
                        <span className="sys-label-accent">CURRENT</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-base mb-1">{exp.title}</h3>
                  {exp.role && (
                    <div className="mono text-xs text-[var(--accent)] mb-2">{exp.role} @ {exp.org}</div>
                  )}
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {exp.tags.map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono text-[10px] text-[var(--accent)] border border-[var(--border-glow)] rounded-full px-2 py-0.5 hover:bg-[var(--accent-dim)] transition-colors"
                      >
                        VIEW LIVE
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
