'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown } from 'lucide-react';
import { PROJECTS } from '@/data/portfolio';

// Each project gets a full-bleed atmospheric section
// with blurred portrait/visual behind it
export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>('civicos');
  const featured = PROJECTS.filter(p => p.featured);

  return (
    <section id="projects" className="section" aria-label="Projects">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 80 }}
        >
          <div className="section-eyebrow">
            <span className="label">Projects</span>
            <div className="section-line" />
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', color: 'var(--text)' }}
          >
            Selected<br />Work
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-2)', marginTop: 16, maxWidth: 420 }}>
            Real products, shipped.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {featured.map((project, i) => {
            const isOpen = expanded === project.id;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className="glass"
                style={{ borderRadius: 28, overflow: 'hidden', position: 'relative' }}
                aria-label={project.name}
              >
                {/* Atmospheric background — portrait-style blurred visual per project */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                  background: i === 0
                    ? 'radial-gradient(ellipse 80% 60% at 80% 50%, rgba(0,180,120,0.07) 0%, transparent 70%)'
                    : 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(80,100,255,0.06) 0%, transparent 70%)',
                }} />

                <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(28px,5vw,48px)' }}>
                  {/* Header row */}
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em',
                        padding: '3px 12px', borderRadius: 100,
                        background: project.status === 'LIVE' ? 'rgba(74,222,128,0.12)' : 'var(--glass)',
                        border: `1px solid ${project.status === 'LIVE' ? 'rgba(74,222,128,0.3)' : 'var(--glass-border)'}`,
                        color: project.status === 'LIVE' ? '#4ade80' : 'var(--text-3)',
                      }}>
                        {project.status === 'LIVE' && '● '}{project.status}
                      </span>
                      <span className="label">{project.category} · {project.year}</span>
                    </div>
                    <h3
                      className="display"
                      style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'var(--text)', marginBottom: 8 }}
                    >
                      {project.name}
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-2)', fontWeight: 500 }}>{project.tagline}</p>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.75, maxWidth: 680, marginBottom: 28 }}>
                    {project.description}
                  </p>

                  {/* Stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                    {project.stack.map(s => (
                      <span key={s} className="tag" style={{ fontSize: '0.78rem' }}>{s}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank" rel="noopener noreferrer"
                        className="btn btn-fill"
                        data-cursor="hover"
                      >
                        <ExternalLink size={14} /> Live site
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank" rel="noopener noreferrer"
                        className="btn"
                        data-cursor="hover"
                      >
                        <Github size={14} /> Source
                      </a>
                    )}
                    {project.architecture && (
                      <button
                        onClick={() => setExpanded(isOpen ? null : project.id)}
                        className="btn"
                        data-cursor="hover"
                        aria-expanded={isOpen}
                      >
                        Architecture
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: 'inline-flex' }}
                        >
                          <ChevronDown size={14} />
                        </motion.span>
                      </button>
                    )}
                  </div>

                  {/* Architecture expandable */}
                  <AnimatePresence>
                    {isOpen && project.architecture && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          marginTop: 32, paddingTop: 28,
                          borderTop: '1px solid var(--glass-border)',
                        }}>
                          <p className="label" style={{ marginBottom: 20 }}>Architecture</p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
                            {project.architecture.map(node => (
                              <div
                                key={node.layer}
                                style={{
                                  padding: '16px 20px', borderRadius: 16,
                                  border: '1px solid var(--glass-border)',
                                  background: 'var(--glass)',
                                }}
                              >
                                <p className="label" style={{ marginBottom: 8 }}>{node.layer}</p>
                                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{node.tech}</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', lineHeight: 1.6 }}>{node.detail}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
