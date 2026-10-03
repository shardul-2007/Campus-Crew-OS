'use client';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { EXPERIENCE } from '@/data/portfolio';

const vp = { once: true, margin: '-60px' };

// Color per type — restrained, not neon
const TYPE_STYLE: Record<string, { dot: string; badge: string; text: string }> = {
  BUILD:          { dot: '#86efac', badge: 'rgba(74,222,128,0.08)',  text: '#86efac' },
  COMMUNITY:      { dot: '#c4b5fd', badge: 'rgba(160,140,255,0.08)', text: '#c4b5fd' },
  'OPEN SOURCE':  { dot: '#93c5fd', badge: 'rgba(96,165,250,0.08)',  text: '#93c5fd' },
  LEARN:          { dot: '#fde68a', badge: 'rgba(250,200,80,0.08)',   text: '#fde68a' },
};
const DEFAULT_STYLE = { dot: 'var(--text-3)', badge: 'rgba(255,255,255,0.04)', text: 'var(--text-3)' };

export default function Experience() {
  return (
    <section id="experience" className="section" aria-label="Experience and community">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={vp} transition={{ duration: 0.65 }}
          style={{ marginBottom: 72 }}
        >
          <span className="s-label">Experience</span>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: 'var(--text)', marginTop: 20 }}
          >
            Community &amp;<br />open source
          </h2>
          <p style={{ fontSize: '0.93rem', color: 'var(--text-2)', marginTop: 16, maxWidth: 460, lineHeight: 1.7 }}>
            Personal projects, open-source contributions, and campus community roles.
            No fabricated responsibilities — just what actually happened.
          </p>
        </motion.div>

        {/* Vertical timeline — max width so it stays editorial */}
        <div style={{ position: 'relative', maxWidth: 740 }}>
          {/* Line */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            top: 8, bottom: 8, left: 16,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, var(--glass-border) 10%, var(--glass-border) 90%, transparent)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {EXPERIENCE.map((exp, i) => {
              const s = TYPE_STYLE[exp.type] || DEFAULT_STYLE;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.48, delay: i * 0.05 }}
                  style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}
                >
                  {/* Timeline node */}
                  <div style={{
                    flexShrink: 0, width: 32,
                    display: 'flex', justifyContent: 'center', paddingTop: 20,
                  }}>
                    <div style={{
                      width: 9, height: 9,
                      borderRadius: '50%',
                      border: `2px solid ${s.dot}`,
                      background: s.badge,
                      boxShadow: exp.current ? `0 0 12px ${s.dot}` : 'none',
                    }} />
                  </div>

                  {/* Card — clean, not resume-template */}
                  <div
                    className="glass"
                    style={{
                      flex: 1,
                      padding: '18px 22px',
                      borderRadius: 18,
                      marginBottom: 2,
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: '0.76rem', fontWeight: 700, color: s.text }}>{exp.year}</span>
                      <span style={{
                        fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.10em',
                        padding: '2px 10px', borderRadius: 100,
                        background: s.badge, color: s.text, textTransform: 'uppercase',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}>
                        {exp.type}
                      </span>
                      {exp.current && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem', color: '#86efac' }}>
                          <span className="dot-available" style={{ width: 5, height: 5 }} />
                          Current
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4, lineHeight: 1.3 }}>
                      {exp.title}
                    </h3>

                    {exp.role && exp.org && (
                      <p style={{ fontSize: '0.80rem', color: 'var(--text-2)', fontWeight: 500, marginBottom: 8 }}>
                        {exp.role} · {exp.org}
                      </p>
                    )}

                    <p style={{ fontSize: '0.84rem', color: 'var(--text-2)', lineHeight: 1.70, marginBottom: 12 }}>
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
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            fontSize: '0.76rem', color: 'var(--text-2)',
                            textDecoration: 'none', marginLeft: 4,
                          }}
                        >
                          View <ExternalLink size={10} />
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
