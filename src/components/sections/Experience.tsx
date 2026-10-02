'use client';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { EXPERIENCE } from '@/data/portfolio';

const TYPE_CONFIG: Record<string, { color: string; bg: string }> = {
  BUILD:         { color: '#00d4aa', bg: 'rgba(0,212,170,0.08)' },
  COMMUNITY:     { color: '#a87fff', bg: 'rgba(168,127,255,0.08)' },
  'OPEN SOURCE': { color: '#4488ff', bg: 'rgba(68,136,255,0.08)' },
  LEARN:         { color: '#ffaa00', bg: 'rgba(255,170,0,0.08)' },
};

export default function Experience() {
  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-3)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <p className="label-accent" style={{ marginBottom: 16 }}>Journey</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700, letterSpacing: '-0.02em',
            lineHeight: 1.1, color: 'var(--text)',
            fontFamily: `'Manrope', 'Inter', sans-serif`,
          }}>
            Building in public,
            <span className="gradient-text"> continuously.</span>
          </h2>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: 720 }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: 12, top: 8, bottom: 8,
            width: 1, background: 'var(--gb)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {EXPERIENCE.map((exp, i) => {
              const cfg = TYPE_CONFIG[exp.type] || { color: 'var(--text-3)', bg: 'var(--surface)' };
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  style={{ display: 'flex', gap: 24, paddingBottom: 20 }}
                >
                  {/* Node */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 24 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%', marginTop: 6,
                      background: cfg.color + '33',
                      border: `2px solid ${cfg.color}`,
                      boxShadow: exp.current ? `0 0 12px ${cfg.color}88` : 'none',
                      flexShrink: 0,
                    }} />
                  </div>

                  {/* Card */}
                  <div
                    className="glass"
                    style={{ flex: 1, padding: '20px 24px', borderRadius: 16 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: cfg.color }}>{exp.year}</span>
                      <span style={{
                        fontSize: '0.68rem', padding: '2px 10px', borderRadius: 100,
                        background: cfg.bg, color: cfg.color,
                        fontWeight: 500, letterSpacing: '0.06em',
                      }}>{exp.type}</span>
                      {exp.current && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem', color: 'var(--accent)' }}>
                          <span className="dot dot-pulse" style={{ width: 5, height: 5 }} />
                          Current
                        </span>
                      )}
                    </div>
                    
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                      {exp.title}
                    </h3>
                    {exp.org && (
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', marginBottom: 12 }}>
                        {exp.org} {exp.role ? `· ${exp.role}` : ''}
                      </p>
                    )}
                    
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 16 }}>
                      {exp.description}
                    </p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {exp.tags.map(t => (
                          <span key={t} className="pill" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{t}</span>
                        ))}
                      </div>
                      
                      {exp.link && (
                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: 8 }}>
                          View <ExternalLink size={12} />
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
