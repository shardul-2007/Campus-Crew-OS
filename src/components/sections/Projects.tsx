'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown } from 'lucide-react';
import { PROJECTS } from '@/data/portfolio';

const vp = { once: true, margin: '-60px' };

export default function Projects() {
  const [open, setOpen] = useState<string | null>('civicos');
  const featured = PROJECTS.filter(p => p.featured);

  return (
    <section id="projects" className="section" aria-label="Projects">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={vp} transition={{ duration: 0.65 }}
          style={{ marginBottom: 80 }}
        >
          <span className="s-label">Projects</span>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: 'var(--text)', marginTop: 20 }}
          >
            Selected work
          </h2>
          <p style={{ fontSize: '0.93rem', color: 'var(--text-2)', marginTop: 16, maxWidth: 380 }}>
            Real products. Shipped.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {featured.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.65, delay: i * 0.08 }}
              className="glass"
              style={{ borderRadius: 28, overflow: 'hidden', position: 'relative' }}
              aria-label={p.name}
            >
              {/* Atmospheric color wash — no image fabrication */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                background: i === 0
                  ? 'radial-gradient(ellipse 70% 50% at 85% 50%, rgba(0, 160, 110, 0.06) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse 70% 50% at 15% 50%, rgba(70, 100, 220, 0.05) 0%, transparent 70%)',
              }} />

              <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(28px, 5vw, 52px)' }}>
                {/* Project meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                  {p.status === 'LIVE' && (
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: '0.70rem', fontWeight: 600, letterSpacing: '0.10em',
                      padding: '3px 12px', borderRadius: 100,
                      background: 'rgba(74, 222, 128, 0.10)',
                      border: '1px solid rgba(74, 222, 128, 0.25)',
                      color: '#86efac',
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#86efac', display: 'inline-block' }} />
                      Live
                    </span>
                  )}
                  <span style={{ fontSize: '0.70rem', letterSpacing: '0.12em', color: 'var(--text-3)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
                    {p.category} · {p.year}
                  </span>
                </div>

                {/* Project name — cinematic scale */}
                <h3
                  className="display"
                  style={{
                    fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
                    color: 'var(--text)',
                    marginBottom: 12,
                  }}
                >
                  {p.name}
                </h3>
                <p style={{ fontSize: '1.02rem', color: 'var(--text-2)', fontWeight: 500, marginBottom: 20 }}>
                  {p.tagline}
                </p>
                <p style={{ fontSize: '0.90rem', color: 'var(--text-2)', lineHeight: 1.78, maxWidth: 680, marginBottom: 28 }}>
                  {p.description}
                </p>

                {/* Stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                  {p.stack.map(s => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer"
                      className="btn btn-fill" data-cursor="hover">
                      <ExternalLink size={14} /> Live site
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      className="btn" data-cursor="hover">
                      <Github size={14} /> Source
                    </a>
                  )}
                  {p.architecture && (
                    <button
                      onClick={() => setOpen(open === p.id ? null : p.id)}
                      className="btn"
                      data-cursor="hover"
                      aria-expanded={open === p.id}
                      style={{ fontFamily: 'inherit' }}
                    >
                      Architecture
                      <motion.span
                        animate={{ rotate: open === p.id ? 180 : 0 }}
                        transition={{ duration: 0.22 }}
                        style={{ display: 'inline-flex', lineHeight: 1 }}
                      >
                        <ChevronDown size={14} />
                      </motion.span>
                    </button>
                  )}
                </div>

                {/* Architecture expandable */}
                <AnimatePresence>
                  {open === p.id && p.architecture && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.30, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        marginTop: 36,
                        paddingTop: 28,
                        borderTop: '1px solid var(--glass-border)',
                      }}>
                        <p style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 20 }}>
                          Architecture
                        </p>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                          gap: 12,
                        }}>
                          {p.architecture.map(node => (
                            <div
                              key={node.layer}
                              className="glass"
                              style={{ padding: '16px 20px', borderRadius: 16 }}
                            >
                              <p style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 8 }}>
                                {node.layer}
                              </p>
                              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>
                                {node.tech}
                              </p>
                              <p style={{ fontSize: '0.80rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
                                {node.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
