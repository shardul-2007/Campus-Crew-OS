'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, ExternalLink, X } from 'lucide-react';
import { ACHIEVEMENTS } from '@/data/portfolio';

const CAT_COLOR: Record<string, string> = {
  'OPEN SOURCE': 'rgba(96,165,250,0.80)',
  COMMUNITY:     'rgba(160,140,255,0.80)',
  PROGRAM:       'rgba(74,222,128,0.80)',
};
const CAT_BG: Record<string, string> = {
  'OPEN SOURCE': 'rgba(96,165,250,0.08)',
  COMMUNITY:     'rgba(160,140,255,0.08)',
  PROGRAM:       'rgba(74,222,128,0.08)',
};

export default function Achievements() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="achievements" className="section" aria-label="Achievements">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <div className="section-eyebrow">
            <span className="label">Achievements</span>
            <div className="section-line" />
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', color: 'var(--text)' }}
          >
            Community &amp;<br />Open Source
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-2)', marginTop: 16, maxWidth: 440 }}>
            Campus ambassador roles, open-source contributions. All verified.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))',
          gap: 14,
        }}>
          {ACHIEVEMENTS.map((a, i) => {
            const col = CAT_COLOR[a.cat] || 'var(--text-3)';
            const bg  = CAT_BG[a.cat]   || 'var(--glass)';
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: i * 0.055 }}
                whileHover={{ y: -4 }}
                className="glass"
                style={{ padding: 24, borderRadius: 22, overflow: 'hidden', position: 'relative' }}
                data-cursor="hover"
              >
                {/* Category */}
                <span style={{
                  fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em',
                  padding: '3px 10px', borderRadius: 100,
                  background: bg, color: col,
                  display: 'inline-block', marginBottom: 16, textTransform: 'uppercase',
                }}>
                  {a.cat}
                </span>

                <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4, lineHeight: 1.3 }}>
                  {a.name}
                </h3>
                <p style={{ fontSize: '0.78rem', color: col, fontWeight: 600, marginBottom: 8 }}>{a.org}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', lineHeight: 1.55, marginBottom: 14 }}>{a.detail}</p>
                <span className="label">{a.year}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}
        >
          <button
            onClick={() => setShowModal(true)}
            className="btn"
            data-cursor="hover"
          >
            <Linkedin size={15} /> View proofs &amp; certificates on LinkedIn
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
              position: 'fixed', inset: 0, zIndex: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="glass-deep"
              style={{ maxWidth: 440, width: '100%', borderRadius: 28, overflow: 'hidden' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '20px 24px',
                borderBottom: '1px solid var(--glass-border)',
              }}>
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem' }}>Verified credentials</p>
                  <p className="label" style={{ marginTop: 4 }}>All on LinkedIn</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                  data-cursor="hover"
                  style={{
                    width: 32, height: 32, borderRadius: 10,
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass)', color: 'var(--text-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              {/* List */}
              <div style={{ padding: '16px 24px 24px' }}>
                {ACHIEVEMENTS.map(a => (
                  <div
                    key={a.id}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 0', borderBottom: '1px solid var(--glass-border)',
                    }}
                  >
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-2)' }}>{a.name}</span>
                    <span className="label">{a.year}</span>
                  </div>
                ))}
                <p style={{ fontSize: '0.83rem', color: 'var(--text-2)', textAlign: 'center', marginTop: 20, lineHeight: 1.65 }}>
                  Offer letters, badges and certificates are in my{' '}
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>LinkedIn Experience section</span>.
                </p>
                <a
                  href="https://www.linkedin.com/in/shardul-parihar/"
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-fill"
                  data-cursor="hover"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 18 }}
                >
                  <Linkedin size={15} /> Open LinkedIn <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
