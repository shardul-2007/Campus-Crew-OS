'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { ACHIEVEMENTS, PERSONAL } from '@/data/portfolio';

const vp = { once: true, margin: '-60px' };

export default function Achievements() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="achievements" className="section" aria-label="Achievements and Credentials">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: 56 }}
        >
          <span className="s-label">Achievements</span>
          <h2
            className="display"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
              color: 'var(--text)',
              marginTop: 18,
            }}
          >
            Credentials &amp; Contributions
          </h2>
          <p
            style={{
              fontSize: '0.96rem',
              color: 'var(--text-2)',
              marginTop: 16,
              maxWidth: 500,
              lineHeight: 1.7,
            }}
          >
            Documented participation in open source and developer communities.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 16,
          }}
        >
          {ACHIEVEMENTS.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="glass"
              style={{
                padding: '24px 26px',
                borderRadius: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              data-cursor="hover"
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.66rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      padding: '3px 10px',
                      borderRadius: 100,
                      background: 'rgba(128, 128, 128, 0.10)',
                      color: 'var(--text)',
                      textTransform: 'uppercase',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    Verified
                  </span>
                  <span className="meta">{a.year}</span>
                </div>

                <h3
                  style={{
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: 6,
                    lineHeight: 1.35,
                  }}
                >
                  {a.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.84rem',
                    color: 'var(--text-2)',
                  }}
                >
                  {a.role}
                </p>
              </div>

              <div
                style={{
                  marginTop: 20,
                  paddingTop: 12,
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
                    gap: 6,
                  }}
                >
                  <ShieldCheck size={13} color="var(--text-2)" /> Documented Proof
                </span>

                {a.link ? (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--text)',
                      textDecoration: 'underline',
                    }}
                  >
                    Source
                  </a>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    data-cursor="hover"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text)',
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline',
                      fontFamily: 'inherit',
                    }}
                  >
                    View
                  </button>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ marginTop: 44, display: 'flex', justifyContent: 'center' }}
        >
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-fill"
            data-cursor="hover"
          >
            View Credential Proofs
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
              padding: 24,
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
                <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: 20 }}>
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
                        <p style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 600 }}>
                          {a.name}
                        </p>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-2)' }}>{a.role}</p>
                      </div>
                      <span className="meta">{a.year}</span>
                    </div>
                  ))}
                </div>

                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-2)',
                    textAlign: 'center',
                    marginBottom: 18,
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
                  data-cursor="hover"
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
