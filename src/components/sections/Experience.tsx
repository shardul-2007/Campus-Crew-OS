'use client';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { EXPERIENCE } from '@/data/portfolio';

const TYPE_COLORS: Record<string, string> = {
  BUILD: '#00F5C8', 'OPEN SOURCE': '#5B8DEF', COMMUNITY: '#A78BFA',
  INTERNSHIP: '#F59E0B', PROGRAM: '#F59E0B',
};
function getColor(type: string) {
  return TYPE_COLORS[type] || '#6B7280';
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative" style={{ background: '#060a14' }}>
      <div className="section-container">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[var(--accent)] opacity-60" />
            <span className="sys-label-accent">MY JOURNEY</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Experience &amp;<br /><span className="gradient-text">Contributions</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-md leading-relaxed">
            Open source, campus programs, and projects — across the developer ecosystem.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical glow line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, var(--accent), rgba(0,245,200,0.2), transparent)' }} />

          <div className="flex flex-col gap-4">
            {EXPERIENCE.map((exp, i) => {
              const color = getColor(exp.type);
              return (
                <motion.div key={exp.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                  className="flex gap-5 group"
                >
                  {/* Dot */}
                  <div className="hidden md:flex flex-col items-center flex-shrink-0 pt-5 z-10">
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center"
                      style={{ border: '1px solid ' + color + '40', boxShadow: '0 0 12px ' + color + '20' }}>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 glass rounded-2xl p-5 md:p-6 group-hover:-translate-y-0.5 transition-transform"
                    style={{ borderColor: color + '1a' }}>
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-base leading-snug">{exp.title}</div>
                        {exp.org && <div className="text-sm mt-0.5" style={{ color }}>{exp.org}{exp.role ? ' · ' + exp.role : ''}</div>}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="mono text-xs text-[var(--text-sub)]">{exp.year}</span>
                        <span className="mono text-[9px] px-2 py-0.5 rounded-full tracking-widest"
                          style={{ background: color + '14', border: '1px solid ' + color + '28', color }}>
                          {exp.type}
                        </span>
                        {exp.current && (
                          <span className="mono text-[9px] px-2 py-0.5 rounded-full tracking-widest"
                            style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-glow)', color: 'var(--accent)' }}>
                            NOW
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">{exp.description}</p>

                    <div className="flex flex-wrap items-center gap-2">
                      {exp.tags.map(t => <span key={t} className="tech-pill">{t}</span>)}
                      {exp.link && (
                        <a href={exp.link} target="_blank" rel="noopener noreferrer"
                          className="ml-auto glow-btn glow-btn-ghost text-xs py-1 px-2.5">
                          <ExternalLink size={11} /> VIEW LIVE
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}