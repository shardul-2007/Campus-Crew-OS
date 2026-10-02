'use client';
import { motion } from 'framer-motion';
import { ABOUT_PANELS, PERSONAL } from '@/data/portfolio';

const PANEL_COLORS = ['var(--accent)', 'var(--accent-2)', 'var(--accent)', 'var(--accent-2)'];

export default function About() {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <p className="label-accent" style={{ marginBottom: 16 }}>About</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--text)',
            maxWidth: 640,
            fontFamily: `'Manrope', 'Inter', sans-serif`,
          }}>
            Building things that
            <span className="gradient-text"> actually matter.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {ABOUT_PANELS.map((panel, i) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass"
              style={{ padding: 32, position: 'relative', overflow: 'hidden' }}
            >
              {/* Decorative number */}
              <span style={{
                position: 'absolute', top: 16, right: 20,
                fontSize: '4rem', fontWeight: 800,
                color: PANEL_COLORS[i % PANEL_COLORS.length], opacity: 0.08,
                lineHeight: 1, userSelect: 'none',
                fontFamily: `'Manrope', 'Inter', sans-serif`,
              }}>
                {panel.num}
              </span>

              <p style={{ fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
                {panel.label}
              </p>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)', marginBottom: 12, lineHeight: 1.3 }}>
                {panel.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 20 }}>
                {panel.body}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {panel.tags.map(t => (
                  <span key={t} className="pill" style={{ fontSize: '0.75rem' }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Profile line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: 40,
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '20px 28px',
            borderRadius: 16,
            background: 'var(--surface)', border: '1px solid var(--gb)',
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--ad)', border: '1px solid var(--gb-h)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', flexShrink: 0,
          }}>SP</div>
          <div>
            <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{PERSONAL.name}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}>{PERSONAL.role} · {PERSONAL.location}</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PERSONAL.focus.map(f => (
              <span key={f} className="pill" style={{ fontSize: '0.75rem' }}>{f}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}