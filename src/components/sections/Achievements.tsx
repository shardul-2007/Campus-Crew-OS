'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, ExternalLink, X, ShieldCheck, Award } from 'lucide-react';
import { ACHIEVEMENTS, PERSONAL } from '@/data/portfolio';

const vp = { once: true, margin: '-60px' };

const CATEGORY_STYLES: Record<string, { badge: string; text: string; border: string }> = {
  'OPEN SOURCE': {
    badge: 'rgba(147, 197, 253, 0.08)',
    text: '#93c5fd',
    border: 'rgba(147, 197, 253, 0.20)',
  },
  COMMUNITY: {
    badge: 'rgba(196, 181, 253, 0.08)',
    text: '#c4b5fd',
    border: 'rgba(196, 181, 253, 0.20)',
  },
  PROGRAM: {
    badge: 'rgba(134, 239, 172, 0.08)',
    text: '#86efac',
    border: 'rgba(134, 239, 172, 0.20)',
  },
};

export default function Achievements() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="achievements" className="section" aria-label="Achievements and recognition">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: 64 }}
        >
          <span className="s-label">Achievements</span>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: 'var(--text)', marginTop: 20 }}
          >
            Verified credentials &amp;<br />open source
          </h2>
          <p style={{ fontSize: '0.93rem', color: 'var(--text-2)', marginTop: 16, maxWidth: 500, lineHeight: 1.7 }}>
            Factual community leadership and open-source contributions. All badges, certificates, and appointment letters are documented on LinkedIn.
          </p>
        </motion.div>

        {/* Editorial list / gallery */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 16,
          }}
        >
          {ACHIEVEMENTS.map((a, i) => {
            const style = CATEGORY_STYLES[a.cat] || {
              badge: 'rgba(255, 255, 255, 0.06)',
              text: 'var(--text-2)',
              border: 'var(--glass-border)',
            };

            return (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                className="glass"
                style={{
                  padding: '24px 26px',
                  borderRadius: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                data-cursor="hover"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 16 }}>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        padding: '3px 10px',
                        borderRadius: 100,
                        background: style.badge,
                        color: style.text,
                        border: `1px solid ${style.border}`,
                        textTransform: 'uppercase',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      {a.cat}
                    </span>
                    <span className="meta">{a.year}</span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.02rem',
                      fontWeight: 700,
                      color: 'var(--text)',
                      marginBottom: 4,
                      lineHeight: 1.3,
                    }}
                  >
                    {a.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: style.text,
                      fontWeight: 600,
                      marginBottom: 10,
                    }}
                  >
                    {a.org}
                  </p>
                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--text-2)',
                      lineHeight: 1.6,
                    }}
                  >
                    {a.detail}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 20,
                    paddingTop: 14,
                    borderTop: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--text-3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <ShieldCheck size={13} color={style.text} /> Verified credential
                  </span>
                  <button
                    onClick={() => setShowModal(true)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-2)',
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline',
                      fontFamily: 'inherit',
                    }}
                    data-cursor="hover"
                  >
                    Proof
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}
        >
          <button
            onClick={() => setShowModal(true)}
            className="btn"
            data-cursor="hover"
          >
            <Award size={15} /> View credential proofs
          </button>
        </motion.div>
      </div>

      {/* Modal */}
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
              padding: 24,
              background: 'rgba(6, 8, 16, 0.78)',
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
                maxWidth: 480,
                width: '100%',
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
                  padding: '20px 24px',
                  borderBottom: '1px solid var(--glass-border)',
                }}
              >
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.98rem' }}>
                    Documented Credentials
                  </p>
                  <p className="meta" style={{ marginTop: 4 }}>
                    LinkedIn Experience &amp; Certifications
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  aria-label="Close dialog"
                  data-cursor="hover"
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
              <div style={{ padding: '20px 24px 26px' }}>
                <div style={{ maxHeight: '320px', overflowY: 'auto', marginBottom: 20 }}>
                  {ACHIEVEMENTS.map(a => (
                    <div
                      key={a.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 0',
                        borderBottom: '1px solid var(--glass-border)',
                        gap: 12,
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '0.86rem', color: 'var(--text)', fontWeight: 500 }}>
                          {a.name}
                        </p>
                        <p style={{ fontSize: '0.76rem', color: 'var(--text-3)' }}>
                          {a.org} · {a.detail}
                        </p>
                      </div>
                      <span className="meta">{a.year}</span>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', textAlign: 'center', marginBottom: 18, lineHeight: 1.6 }}>
                  All appointment letters, badges, and contributor proofs are archived and viewable directly on my LinkedIn profile.
                </p>

                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-fill"
                  data-cursor="hover"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Linkedin size={15} /> Open LinkedIn profile <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
