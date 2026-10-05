'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCE_ITEMS, PERSONAL, type ExperienceItem } from '@/data/portfolio';
import { MapPin, Award, FileCheck, Linkedin, ExternalLink, X } from 'lucide-react';

const vp = { once: true, margin: '-60px' };

type FilterType = 'ALL' | 'OPEN SOURCE' | 'CAMPUS & COMMUNITY' | 'PROGRAMS';

const FILTERS: { id: FilterType; label: string }[] = [
  { id: 'ALL', label: 'All Experience' },
  { id: 'OPEN SOURCE', label: 'Open Source' },
  { id: 'CAMPUS & COMMUNITY', label: 'Campus & Community' },
  { id: 'PROGRAMS', label: 'Programs & Recognition' },
];

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const [showModal, setShowModal] = useState(false);

  const filteredItems = EXPERIENCE_ITEMS.filter(item => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'OPEN SOURCE') return item.category.toLowerCase().includes('open source');
    if (activeFilter === 'CAMPUS & COMMUNITY')
      return (
        item.category.toLowerCase().includes('campus') ||
        item.category.toLowerCase().includes('community') ||
        item.category.toLowerCase().includes('ambassador')
      );
    if (activeFilter === 'PROGRAMS') return item.category.toLowerCase().includes('program') || item.category.toLowerCase().includes('achievement');
    return true;
  });

  return (
    <section id="experience" className="section" aria-label="Experience & Community Involvement">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: 48 }}
        >
          <span className="s-label">Experience</span>
          <h2
            className="display"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
              color: 'var(--text)',
              marginTop: 18,
            }}
          >
            Experience, Programs &amp; Contributions
          </h2>
          <p
            style={{
              fontSize: '0.96rem',
              color: 'var(--text-2)',
              marginTop: 16,
              maxWidth: 580,
              lineHeight: 1.7,
            }}
          >
            Selected experience &amp; community involvement across open source initiatives, campus leadership, and developer programs.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 44,
          }}
        >
          {FILTERS.map(f => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                style={{
                  padding: '7px 18px',
                  borderRadius: 100,
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '0.02em',
                  border: isActive ? '1px solid var(--text)' : '1px solid var(--glass-border)',
                  background: isActive ? 'var(--text)' : 'var(--glass-bg)',
                  color: isActive ? 'var(--bg)' : 'var(--text-2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Timeline list */}
        <div style={{ position: 'relative', maxWidth: 840 }}>
          {/* Subtle vertical spine (tablet/desktop) */}
          <div
            aria-hidden="true"
            className="hidden sm:block"
            style={{
              position: 'absolute',
              top: 16,
              bottom: 16,
              left: 17,
              width: 1,
              background:
                'linear-gradient(to bottom, transparent, var(--glass-border) 8%, var(--glass-border) 92%, transparent)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item: ExperienceItem, i: number) => {
                const isPresent = item.status === 'Present';

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
                    className="flex sm:gap-6 gap-0 items-start"
                    style={{ width: '100%' }}
                  >
                    {/* Spine Node indicator (desktop/tablet) */}
                    <div
                      className="hidden sm:flex"
                      style={{
                        flexShrink: 0,
                        width: 35,
                        justifyContent: 'center',
                        paddingTop: 26,
                      }}
                    >
                      <div
                        style={{
                          width: isPresent ? 10 : 8,
                          height: isPresent ? 10 : 8,
                          borderRadius: '50%',
                          background: isPresent ? '#22c55e' : 'var(--text)',
                          opacity: isPresent ? 1 : 0.45,
                          boxShadow: isPresent ? '0 0 10px rgba(34, 197, 94, 0.6)' : 'none',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    </div>

                    {/* Content Card */}
                    <article
                      className="glass"
                      style={{
                        flex: 1,
                        width: '100%',
                        minWidth: 0,
                        padding: 'clamp(18px, 4vw, 26px) clamp(16px, 4vw, 30px)',
                        borderRadius: 22,
                      }}
                    >
                      {/* Top Meta Bar */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 10,
                          marginBottom: 12,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          {/* Category Badge */}
                          <span
                            style={{
                              fontSize: '0.66rem',
                              fontWeight: 600,
                              letterSpacing: '0.10em',
                              padding: '3px 10px',
                              borderRadius: 100,
                              background: 'rgba(255, 255, 255, 0.07)',
                              border: '1px solid var(--glass-border)',
                              color: 'var(--text)',
                              textTransform: 'uppercase',
                              fontFamily: 'JetBrains Mono, monospace',
                            }}
                          >
                            {item.category}
                          </span>

                          {/* Role Type Badge (Internship / Part-time) */}
                          {item.type && (
                            <span
                              style={{
                                fontSize: '0.66rem',
                                fontWeight: 500,
                                letterSpacing: '0.06em',
                                padding: '3px 8px',
                                borderRadius: 6,
                                background: 'rgba(128, 128, 128, 0.12)',
                                color: 'var(--text-2)',
                              }}
                            >
                              {item.type}
                            </span>
                          )}
                        </div>

                        {/* Dates & Active Status */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          {isPresent && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                fontSize: '0.70rem',
                                fontWeight: 600,
                                color: '#22c55e',
                                padding: '2px 8px',
                                borderRadius: 100,
                                background: 'rgba(34, 197, 94, 0.10)',
                                border: '1px solid rgba(34, 197, 94, 0.25)',
                              }}
                            >
                              <span
                                style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: '50%',
                                  background: '#22c55e',
                                }}
                              />
                              Present
                            </span>
                          )}
                          <span className="meta">{item.dates}</span>
                        </div>
                      </div>

                      {/* 1. ROLE (Prominent visual anchor) */}
                      <h3
                        style={{
                          fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                          fontWeight: 800,
                          color: 'var(--text)',
                          lineHeight: 1.25,
                          letterSpacing: '-0.02em',
                          marginBottom: 6,
                          wordBreak: 'break-word',
                        }}
                      >
                        {item.role}
                      </h3>

                      {/* 2. ORGANIZATION (Prominently displayed) */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: 10,
                          rowGap: 6,
                          marginBottom: 14,
                        }}
                      >
                        {item.orgShort && (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 26,
                              height: 26,
                              borderRadius: 7,
                              background: 'var(--glass-bg-d)',
                              border: '1px solid var(--glass-border)',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              fontFamily: 'JetBrains Mono, monospace',
                              color: 'var(--text)',
                              letterSpacing: '-0.02em',
                              flexShrink: 0,
                            }}
                          >
                            {item.orgShort}
                          </span>
                        )}
                        <span
                          style={{
                            fontSize: '0.96rem',
                            fontWeight: 600,
                            color: 'var(--text)',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {item.org}
                        </span>

                        {item.location && (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              fontSize: '0.78rem',
                              color: 'var(--text-3)',
                              marginLeft: 'auto',
                            }}
                          >
                            <MapPin size={12} /> {item.location}
                          </span>
                        )}
                      </div>

                      {/* Additional recognition banner if present */}
                      {item.recognition && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '6px 12px',
                            borderRadius: 10,
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--glass-border-h)',
                            fontSize: '0.80rem',
                            fontWeight: 600,
                            color: 'var(--text)',
                            marginBottom: 14,
                          }}
                        >
                          <Award size={14} color="var(--text)" />
                          {item.recognition}
                        </div>
                      )}

                      {/* Description */}
                      {item.description && (
                        <p
                          style={{
                            fontSize: '0.90rem',
                            color: 'var(--text-2)',
                            lineHeight: 1.7,
                            marginBottom: item.skills || item.media ? 16 : 0,
                          }}
                        >
                          {item.description}
                        </p>
                      )}

                      {/* Bottom row: Skills & Supporting Proof */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 10,
                          marginTop: item.skills || item.media ? 12 : 0,
                          paddingTop: item.skills || item.media ? 12 : 0,
                          borderTop: item.skills || item.media ? '1px solid var(--glass-border)' : 'none',
                        }}
                      >
                        {/* Associated Skills */}
                        {item.skills && item.skills.length > 0 ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {item.skills.map(s => (
                              <span key={s} className="tag" style={{ fontSize: '0.74rem' }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div />
                        )}

                        {/* Supporting Proof / Media Pills */}
                        {item.media && item.media.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {item.media.map(m => (
                              <span
                                key={m}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 5,
                                  fontSize: '0.72rem',
                                  fontWeight: 500,
                                  padding: '3px 9px',
                                  borderRadius: 100,
                                  background: 'rgba(255, 255, 255, 0.04)',
                                  border: '1px solid var(--glass-border)',
                                  color: 'var(--text-2)',
                                }}
                              >
                                <FileCheck size={12} color="var(--text-2)" /> Proof: {m}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Button to Open Documented Proofs Modal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}
        >
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-fill"
          >
            View Documented Proofs &amp; Records
          </button>
        </motion.div>
      </div>

      {/* Documented Proofs & Experience Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(12px, 3.5vw, 24px)',
              background: 'rgba(6, 7, 11, 0.78)',
              backdropFilter: 'blur(28px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="glass-deep"
              style={{
                maxWidth: 520,
                width: '100%',
                maxHeight: 'min(90vh, 680px)',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 24,
                overflow: 'hidden',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'clamp(16px, 3vw, 22px) clamp(16px, 3.5vw, 26px)',
                  borderBottom: '1px solid var(--glass-border)',
                }}
              >
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1rem' }}>
                    Documented Experience &amp; Records
                  </p>
                  <p className="meta" style={{ marginTop: 4 }}>
                    LinkedIn Experience, Offer Letters &amp; Badges
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  aria-label="Close dialog"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    color: 'var(--text-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              {/* List */}
              <div style={{ padding: 'clamp(14px, 3.5vw, 24px)', overflowY: 'auto' }}>
                <div style={{ maxHeight: 'min(50vh, 320px)', overflowY: 'auto', marginBottom: 20 }}>
                  {EXPERIENCE_ITEMS.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: '12px 0',
                        borderBottom: '1px solid var(--glass-border)',
                        gap: 14,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 600 }}>
                          {item.role}
                        </p>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-2)', marginTop: 2 }}>
                          {item.org}
                        </p>
                        {item.media && item.media.length > 0 && (
                          <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                            {item.media.map(m => (
                              <span
                                key={m}
                                style={{
                                  fontSize: '0.68rem',
                                  color: 'var(--text-3)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 3,
                                }}
                              >
                                <FileCheck size={10} color="var(--text-2)" /> Proof: {m}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="meta" style={{ flexShrink: 0 }}>{item.dates}</span>
                    </div>
                  ))}
                </div>

                <p
                  style={{
                    fontSize: '0.84rem',
                    color: 'var(--text-2)',
                    textAlign: 'center',
                    marginBottom: 20,
                    lineHeight: 1.6,
                  }}
                >
                  Appointment letters, contributor badges, and verified records are documented on my LinkedIn profile.
                </p>

                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-fill"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Linkedin size={15} /> Open LinkedIn Profile <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
