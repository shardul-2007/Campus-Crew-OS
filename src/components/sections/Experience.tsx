'use client';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { EXPERIENCE } from '@/data/portfolio';

const TYPE_COLOR: Record<string, string> = {
  BUILD:          'rgba(74,222,128,0.80)',
  COMMUNITY:      'rgba(160,140,255,0.80)',
  'OPEN SOURCE':  'rgba(96,165,250,0.80)',
  LEARN:          'rgba(250,200,80,0.80)',
};
const TYPE_BG: Record<string, string> = {
  BUILD:          'rgba(74,222,128,0.08)',
  COMMUNITY:      'rgba(160,140,255,0.08)',
  'OPEN SOURCE':  'rgba(96,165,250,0.08)',
  LEARN:          'rgba(250,200,80,0.08)',
};

export default function Experience() {
  return (
    <section id="experience" className="section" aria-label="Experience and community">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 72 }}
        >
          <div className="section-eyebrow">
            <span className="label">Experience</span>
            <div className="section-line" />
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', color: 'var(--text)' }}
          >
            Community<br />&amp; Builds
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-2)', marginTop: 16, maxWidth: 460 }}>
            Personal projects, open-source contributions, and campus community roles.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: 760 }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 14, top: 10, bottom: 10,
            width: 1, background: 'var(--glass-border)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {EXPERIENCE.map((exp, i) => {
              const col = TYPE_COLOR[exp.type] || 'var(--text-3)';
              const bg  = TYPE_BG[exp.type]   || 'var(--glass)';
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.055 }}
                  style={{ display: 'flex', gap: 28 }}
                >
                  {/* Node */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 28 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%',
                      border: `2px solid ${col}`,
                      background: bg,
                      marginTop: 22, flexShrink: 0,
                      boxShadow: exp.current ? `0 0 14px ${col}` : 'none',
                    }} />
                  </div>

                  {/* Card */}
                  <div
                    className="glass"
                    style={{ flex: 1, padding: '20px 24px', borderRadius: 20, marginBottom: 4 }}
                    data-cursor="hover"
                  >
                    {/* Meta row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: col }}>{exp.year}</span>
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.10em',
                        padding: '2px 10px', borderRadius: 100,
                        background: bg, color: col, textTransform: 'uppercase',
                      }}>{exp.type}</span>
                      {exp.current && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.7rem', color: '#4ade80' }}>
                          <span className="dot-live" style={{ width: 5, height: 5 }} />
                          Current
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '0.97rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4, lineHeight: 1.3 }}>
                      {exp.title}
                    </h3>
                    {exp.role && exp.org && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: 8, fontWeight: 500 }}>
                        {exp.role} · {exp.org}
                      </p>
                    )}
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 12 }}>
                      {exp.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
                      {exp.tags.map(t => (
                        <span key={t} className="tag" style={{ fontSize: '0.72rem' }}>{t}</span>
                      ))}
                      {exp.link && (
                        <a
                          href={exp.link} target="_blank" rel="noopener noreferrer"
                          data-cursor="hover"
                          style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.76rem', color: 'var(--text-2)', textDecoration: 'none', marginLeft: 4 }}
                        >
                          View <ExternalLink size={11} />
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
