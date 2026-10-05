'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, ExternalLink, X, FileCheck, Award, Sparkles } from 'lucide-react';
import { ACHIEVEMENTS, PERSONAL, type AchievementItem } from '@/data/portfolio';

const vp = { once: true, margin: '-60px' };

type AchievementTab = 'FEATURED' | 'ALL' | 'OPEN SOURCE' | 'CAMPUS / COMMUNITY' | 'RECOGNITION / PROGRAMS';

const TABS: { id: AchievementTab; label: string }[] = [
  { id: 'FEATURED', label: 'Featured Highlights' },
  { id: 'ALL', label: 'All Recognitions' },
  { id: 'OPEN SOURCE', label: 'Open Source' },
  { id: 'CAMPUS / COMMUNITY', label: 'Campus & Community' },
  { id: 'RECOGNITION / PROGRAMS', label: 'Recognition & Programs' },
];

export default function Achievements() {
  const [activeTab, setActiveTab] = useState<AchievementTab>('FEATURED');
  const [showModal, setShowModal] = useState(false);

  const displayedItems = ACHIEVEMENTS.filter(item => {
    if (activeTab === 'FEATURED') return item.featured;
    if (activeTab === 'ALL') return true;
    return item.category === activeTab;
  });

  return (
    <section id="achievements" className="section" aria-label="Achievements, Programs &amp; Recognitions">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: 44 }}
        >
          <span className="s-label">Recognition</span>
          <h2
            className="display"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
              color: 'var(--text)',
              marginTop: 18,
            }}
          >
            Programs &amp; Recognition
          </h2>
          <p
            style={{
              fontSize: '0.96rem',
              color: 'var(--text-2)',
              marginTop: 16,
              maxWidth: 560,
              lineHeight: 1.7,
            }}
          >
            Selected programs, open source contributions, and leadership milestones across student communities.
          </p>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 7,
            marginBottom: 'clamp(28px, 4vh, 40px)',
          }}
        >
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '6px 15px',
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
                {tab.id === 'FEATURED' && <Sparkles size={12} style={{ display: 'inline', marginRight: 5, verticalAlign: '-1px' }} />}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Curated Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 16,
          }}
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item: AchievementItem, i: number) => {
              const isPresent = item.status === 'Present';

              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.25) }}
                  className="glass"
                  style={{
                    padding: 'clamp(18px, 4vw, 26px)',
                    borderRadius: 22,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Top Row: Category & Dates */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                        marginBottom: 14,
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.64rem',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
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

                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {isPresent && (
                          <span
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: '50%',
                              background: '#22c55e',
                            }}
                          />
                        )}
                        <span className="meta">{item.dates}</span>
                      </div>
                    </div>

                    {/* 1. ROLE / ACHIEVEMENT NAME */}
                    <h3
                      style={{
                        fontSize: 'clamp(1.05rem, 2.4vw, 1.25rem)',
                        fontWeight: 800,
                        color: 'var(--text)',
                        lineHeight: 1.25,
                        letterSpacing: '-0.02em',
                        marginBottom: 6,
                        wordBreak: 'break-word',
                      }}
                    >
                      {item.name}
                    </h3>

                    {/* 2. ORGANIZATION (Prominent) */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 8,
                        marginBottom: 14,
                      }}
                    >
                      {item.orgShort && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: 'var(--glass-bg-d)',
                            border: '1px solid var(--glass-border)',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            fontFamily: 'JetBrains Mono, monospace',
                            color: 'var(--text)',
                            flexShrink: 0,
                          }}
                        >
                          {item.orgShort}
                        </span>
                      )}
                      <p
                        style={{
                          fontSize: '0.92rem',
                          fontWeight: 600,
                          color: 'var(--text)',
                        }}
                      >
                        {item.org}
                      </p>
                    </div>

                    {/* Associated special recognition */}
                    {item.recognition && (
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '5px 10px',
                          borderRadius: 8,
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--glass-border-h)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--text)',
                          marginBottom: 12,
                        }}
                      >
                        <Award size={13} color="var(--text)" />
                        {item.recognition}
                      </div>
                    )}

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--text-2)',
                        lineHeight: 1.65,
                        marginBottom: 16,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom: Proof Metadata & Modal Action */}
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 14,
                      borderTop: '1px solid var(--glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    {item.media && item.media.length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {item.media.map(m => (
                          <span
                            key={m}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              fontSize: '0.70rem',
                              color: 'var(--text-3)',
                            }}
                          >
                            <FileCheck size={11} color="var(--text-2)" /> {m}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span
                        style={{
                          fontSize: '0.70rem',
                          color: 'var(--text-3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <FileCheck size={11} color="var(--text-2)" /> Program Record
                      </span>
                    )}

                    <button
                      onClick={() => setShowModal(true)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text)',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        padding: 0,
                        textDecoration: 'underline',
                        fontFamily: 'inherit',
                        fontWeight: 500,
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Action Button */}
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

      {/* Proofs Modal */}
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
                    Documented Credentials &amp; Experience
                  </p>
                  <p className="meta" style={{ marginTop: 4 }}>
                    LinkedIn Experience, Badges &amp; Programs
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
                  {ACHIEVEMENTS.map(a => (
                    <div
                      key={a.id}
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
                          {a.name}
                        </p>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-2)', marginTop: 2 }}>
                          {a.org}
                        </p>
                        {a.media && a.media.length > 0 && (
                          <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                            {a.media.map(m => (
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
                                <FileCheck size={10} color="var(--text-2)" /> {m}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="meta" style={{ flexShrink: 0 }}>{a.dates}</span>
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
