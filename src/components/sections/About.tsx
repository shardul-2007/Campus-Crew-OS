'use client';
import { motion } from 'framer-motion';
import { ABOUT_PANELS, PERSONAL } from '@/data/portfolio';

export default function About() {
  return (
    <section id="about" className="section" aria-label="About Shardul">
      {/* Blurred portrait behind this section */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '60%', height: '140%',
          backgroundImage: 'url(/my-portfolio/imageshardul.png)',
          backgroundSize: 'cover', backgroundPosition: 'center top',
          filter: 'blur(80px) saturate(80%)',
          opacity: 'var(--photo-opacity)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--photo-overlay)' }} />
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 72 }}
        >
          <div className="section-eyebrow">
            <span className="label">About</span>
            <div className="section-line" />
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2.4rem,6vw,5rem)', color: 'var(--text)', maxWidth: 640 }}
          >
            Shardul<br />Parihar
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-2)', maxWidth: 520, marginTop: 20, lineHeight: 1.7 }}>
            Software engineering student from Pune, India. Building full-stack products, contributing to open source, and active in developer communities.
          </p>
        </motion.div>

        {/* 4 panels from real ABOUT_PANELS data */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {ABOUT_PANELS.map((panel, i) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              className="glass"
              style={{ padding: 32, borderRadius: 24, position: 'relative', overflow: 'hidden' }}
              data-cursor="hover"
            >
              {/* Large number watermark */}
              <span style={{
                position: 'absolute', top: 12, right: 20,
                fontSize: '5.5rem', fontWeight: 800, lineHeight: 1,
                color: 'var(--text)', opacity: 0.035, userSelect: 'none',
                fontFamily: 'Manrope, system-ui',
              }}>
                {panel.num}
              </span>

              <p className="label" style={{ marginBottom: 16, color: 'var(--text-2)' }}>
                {panel.label}
              </p>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: 14, lineHeight: 1.3 }}>
                {panel.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
                {panel.body}
              </p>
              {panel.tags && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
                  {panel.tags.map(t => (
                    <span key={t} className="tag" style={{ fontSize: '0.72rem' }}>{t}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Simple profile line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: 40,
            display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
            padding: '18px 24px', borderRadius: 16,
            border: '1px solid var(--glass-border)',
            background: 'var(--glass)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
            border: '1px solid var(--glass-border-h)',
            background: 'var(--glass)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-2)',
          }}>SP</div>
          <div>
            <p style={{ fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{PERSONAL.name}</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>{PERSONAL.role} · {PERSONAL.location}</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PERSONAL.focus.map(f => (
              <span key={f} className="tag" style={{ fontSize: '0.72rem' }}>{f}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
