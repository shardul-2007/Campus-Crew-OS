'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown, Layers } from 'lucide-react';
import { PROJECTS } from '@/data/portfolio';

const vp = { once: true, margin: '-60px' };

export default function Projects() {
  const [openArch, setOpenArch] = useState<string | null>('assemblyos');

  return (
    <section id="projects" className="section" aria-label="Selected Projects">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: 64 }}
        >
          <span className="s-label">Projects</span>
          <h2
            className="display"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
              color: 'var(--text)',
              marginTop: 18,
            }}
          >
            Selected Work
          </h2>
          <p
            style={{
              fontSize: '0.96rem',
              color: 'var(--text-2)',
              marginTop: 16,
              maxWidth: 420,
              lineHeight: 1.7,
            }}
          >
            Ideas turned into working software.
          </p>
        </motion.div>

        {/* Project Case Studies List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {PROJECTS.map((p, i) => {
            const hasArch = p.architecture && p.architecture.length > 0;
            const isArchOpen = openArch === p.id;

            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.65, delay: i * 0.08 }}
                className="glass"
                style={{
                  borderRadius: 26,
                  overflow: 'hidden',
                  position: 'relative',
                }}
                aria-label={p.name}
              >
                {/* Subtle atmospheric wash behind cards */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                    background:
                      i === 0
                        ? 'radial-gradient(ellipse 70% 50% at 85% 40%, rgba(99, 102, 241, 0.08) 0%, transparent 70%)'
                        : i === 1
                        ? 'radial-gradient(ellipse 70% 50% at 85% 40%, rgba(34, 197, 94, 0.06) 0%, transparent 70%)'
                        : 'radial-gradient(ellipse 70% 50% at 85% 40%, rgba(168, 85, 247, 0.06) 0%, transparent 70%)',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(28px, 5vw, 48px)' }}>
                  {/* Category and Year row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 16,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        padding: '3px 12px',
                        borderRadius: 100,
                        background: 'rgba(34, 197, 94, 0.10)',
                        border: '1px solid rgba(34, 197, 94, 0.25)',
                        color: '#22c55e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
                      {p.status}
                    </span>
                    <span className="meta">
                      {p.category} · {p.year}
                    </span>
                  </div>

                  {/* Project Name and Tagline */}
                  <h3
                    className="display"
                    style={{
                      fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                      color: 'var(--text)',
                      marginBottom: 8,
                    }}
                  >
                    {p.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '1.02rem',
                      color: 'var(--text-2)',
                      fontWeight: 500,
                      marginBottom: 20,
                    }}
                  >
                    {p.tagline}
                  </p>

                  {/* Project Description */}
                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-2)',
                      lineHeight: 1.8,
                      maxWidth: 720,
                      marginBottom: 26,
                    }}
                  >
                    {p.description}
                  </p>

                  {/* Stack Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                    {p.stack.map(s => (
                      <span key={s} className="tag" data-cursor="hover">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-fill"
                        data-cursor="hover"
                      >
                        <ExternalLink size={14} /> {p.id === 'assemblyos' ? 'Live Demo' : 'Live Site'}
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        data-cursor="hover"
                      >
                        <Github size={14} /> Source
                      </a>
                    )}
                    {hasArch && (
                      <button
                        onClick={() => setOpenArch(isArchOpen ? null : p.id)}
                        className="btn"
                        data-cursor="hover"
                        aria-expanded={isArchOpen}
                        style={{ cursor: 'pointer' }}
                      >
                        <Layers size={14} /> Architecture
                        <motion.span
                          animate={{ rotate: isArchOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: 'inline-flex' }}
                        >
                          <ChevronDown size={14} />
                        </motion.span>
                      </button>
                    )}
                  </div>

                  {/* Architecture breakdown */}
                  <AnimatePresence>
                    {isArchOpen && hasArch && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div
                          style={{
                            marginTop: 36,
                            paddingTop: 28,
                            borderTop: '1px solid var(--glass-border)',
                          }}
                        >
                          <p className="meta" style={{ marginBottom: 18 }}>
                            Architecture &amp; System Layers
                          </p>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
                              gap: 12,
                            }}
                          >
                            {p.architecture?.map(node => (
                              <div
                                key={node.layer}
                                className="glass"
                                style={{
                                  padding: '16px 20px',
                                  borderRadius: 16,
                                }}
                              >
                                <p className="meta" style={{ marginBottom: 6 }}>
                                  {node.layer}
                                </p>
                                <p
                                  style={{
                                    fontSize: '0.88rem',
                                    fontWeight: 600,
                                    color: 'var(--text)',
                                    marginBottom: 6,
                                  }}
                                >
                                  {node.tech}
                                </p>
                                <p
                                  style={{
                                    fontSize: '0.80rem',
                                    color: 'var(--text-2)',
                                    lineHeight: 1.6,
                                  }}
                                >
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
