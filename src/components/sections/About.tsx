'use client';
import { motion } from 'framer-motion';
import { PERSONAL, ABOUT_DATA } from '@/data/portfolio';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

const in1 = { opacity: 0, y: 24 };
const an1 = { opacity: 1, y: 0 };
const vp = { once: true, margin: '-60px' };

export default function About() {
  return (
    <section id="about" className="section" aria-label="About Shardul Parihar">
      {/* Blurred portrait atmosphere */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-8%',
            width: '55%',
            height: '130%',
            backgroundImage: `url(${BASE}/imageshardul.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            filter: 'var(--photo-filter)',
            opacity: 'var(--photo-opacity)' as unknown as number,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, var(--bg) 30%, transparent 80%, var(--bg) 100%)',
          }}
        />
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* ── Header ── */}
        <motion.div
          initial={in1}
          whileInView={an1}
          viewport={vp}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <span className="s-label">About</span>
          <h2
            className="display"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
              color: 'var(--text)',
              maxWidth: 720,
              marginTop: 18,
            }}
          >
            {ABOUT_DATA.heading}
          </h2>
        </motion.div>

        {/* ── Two-column layout: Story (left) + Focus / What I build (right) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Narrative paragraphs */}
          <motion.div
            initial={in1}
            whileInView={an1}
            viewport={vp}
            transition={{ duration: 0.65 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
          >
            {ABOUT_DATA.paragraphs.map((p, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: idx === 0 ? '1.05rem' : '0.94rem',
                  color: idx === 0 ? 'var(--text)' : 'var(--text-2)',
                  fontWeight: idx === 0 ? 500 : 400,
                  lineHeight: 1.8,
                }}
              >
                {p}
              </p>
            ))}

            {/* Location indicator */}
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: '0.88rem',
                color: 'var(--text-2)',
              }}
            >
              <span className="dot-available" />
              <span>{PERSONAL.location}</span>
            </div>

            {/* Direct Links */}
            <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-fill"
                data-cursor="hover"
              >
                GitHub
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                data-cursor="hover"
              >
                LinkedIn
              </a>
              <a href="#projects" className="btn" data-cursor="hover">
                Explore Projects
              </a>
            </div>
          </motion.div>

          {/* Right Column: Focus / What I build surface */}
          <motion.div
            initial={in1}
            whileInView={an1}
            viewport={vp}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="glass"
            style={{
              borderRadius: 24,
              padding: 'clamp(28px, 4vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div>
              <p className="meta" style={{ marginBottom: 4 }}>Focus</p>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: '-0.02em',
                }}
              >
                What I build
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {ABOUT_DATA.focus.map((item, i) => (
                <div
                  key={item.title}
                  style={{
                    paddingBottom: i < ABOUT_DATA.focus.length - 1 ? 14 : 0,
                    borderBottom:
                      i < ABOUT_DATA.focus.length - 1 ? '1px solid var(--glass-border)' : 'none',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      color: 'var(--text)',
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-2)',
                      lineHeight: 1.6,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.skills}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
