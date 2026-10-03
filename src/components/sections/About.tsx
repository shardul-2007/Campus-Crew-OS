'use client';
import { motion } from 'framer-motion';
import { PERSONAL } from '@/data/portfolio';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

const FOCUS = [
  { area: 'Full-Stack Development', detail: 'React, Next.js, Node.js, REST APIs' },
  { area: 'Web Technologies',       detail: 'HTML5, CSS3, Tailwind, Framer Motion' },
  { area: 'AI & Machine Learning',  detail: 'AI APIs, Prompt Engineering' },
  { area: 'Cybersecurity',          detail: 'Currently exploring' },
];

const in1 = { opacity: 0, y: 28 };
const an1 = { opacity: 1, y: 0 };
const vp  = { once: true, margin: '-80px' };

export default function About() {
  return (
    <section id="about" className="section" aria-label="About">
      {/* Blurred portrait in background of this section */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-15%', right: '-8%',
          width: '55%', height: '130%',
          backgroundImage: `url(${BASE}/imageshardul.png)`,
          backgroundSize: 'cover', backgroundPosition: 'center 20%',
          filter: 'blur(88px) saturate(75%) brightness(0.50)',
          opacity: 0.22,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, var(--bg) 30%, transparent 80%, var(--bg) 100%)',
        }} />
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* ── Editorial header ── */}
        <motion.div
          initial={in1} whileInView={an1} viewport={vp}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 72 }}
        >
          <span className="s-label" style={{ marginBottom: 24 }}>About</span>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)', color: 'var(--text)', maxWidth: 680 }}
          >
            Software engineering student<br />building real things.
          </h2>
        </motion.div>

        {/* ── Two-column editorial layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'start',
        }}>
          {/* Left: story */}
          <motion.div
            initial={in1} whileInView={an1} viewport={vp}
            transition={{ duration: 0.65 }}
          >
            <p style={{ fontSize: '1.05rem', color: 'var(--text-2)', lineHeight: 1.80, marginBottom: 24 }}>
              {PERSONAL.bio}
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 24 }}>
              Based in <span style={{ color: 'var(--text)', fontWeight: 600 }}>{PERSONAL.location}</span>.
              Building full-stack products from scratch — shipped CivicOS, an
              AI-powered civic intelligence platform, and this portfolio (SHARDUL.OS)
              rebuilt multiple times in pursuit of an honest, handcrafted personal site.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.75 }}>
              Actively contributing to open source through GSSoC and NSOC, and serving
              as Campus Ambassador for Google, Internshala, GUVI, Physics Wallah,
              RemoteRecruit and HackerRank — community and collaboration matter as much
              as shipping code.
            </p>

            {/* Contact brief */}
            <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
                className="btn" data-cursor="hover">
                GitHub
              </a>
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
                className="btn" data-cursor="hover">
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right: focus areas (glass surface, not card grid) */}
          <motion.div
            initial={in1} whileInView={an1} viewport={vp}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="glass"
            style={{ borderRadius: 28, padding: 'clamp(28px, 4vw, 44px)', position: 'relative' }}
          >
            <p style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 28 }}>
              Focus areas
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {FOCUS.map((f, i) => (
                <div
                  key={f.area}
                  style={{
                    padding: '18px 0',
                    borderBottom: i < FOCUS.length - 1 ? '1px solid var(--glass-border)' : 'none',
                  }}
                >
                  <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.96rem', marginBottom: 4 }}>
                    {f.area}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>{f.detail}</p>
                </div>
              ))}
            </div>

            {/* Location meta */}
            <div style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: '1px solid var(--glass-border)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span className="dot-available" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>
                Open to internships &amp; collaborations
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
