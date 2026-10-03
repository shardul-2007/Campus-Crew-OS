'use client';
import { motion } from 'framer-motion';
import { EXPERIENCE_ITEMS } from '@/data/portfolio';

const vp = { once: true, margin: '-60px' };

export default function Experience() {
  return (
    <section id="experience" className="section" aria-label="Community and Open Source Experience">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: 64 }}
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
            Community &amp; Open Source
          </h2>
          <p
            style={{
              fontSize: '0.96rem',
              color: 'var(--text-2)',
              marginTop: 16,
              maxWidth: 460,
              lineHeight: 1.7,
            }}
          >
            Learning through building and collaboration.
          </p>
        </motion.div>

        {/* Timeline list */}
        <div style={{ position: 'relative', maxWidth: 760 }}>
          {/* Subtle vertical spine */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 12,
              bottom: 12,
              left: 15,
              width: 1,
              background:
                'linear-gradient(to bottom, transparent, var(--glass-border) 10%, var(--glass-border) 90%, transparent)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {EXPERIENCE_ITEMS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}
              >
                {/* Node indicator */}
                <div
                  style={{
                    flexShrink: 0,
                    width: 30,
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 22,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--text)',
                      opacity: 0.6,
                      boxShadow: '0 0 10px var(--text)',
                    }}
                  />
                </div>

                {/* Content Card */}
                <div
                  className="glass"
                  style={{
                    flex: 1,
                    padding: '22px 26px',
                    borderRadius: 20,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.80rem',
                        fontWeight: 600,
                        color: 'var(--text-2)',
                      }}
                    >
                      {item.role}
                    </span>
                    <span className="meta">{item.year}</span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text)',
                      marginBottom: 8,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.org}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-2)',
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {item.tags.map(t => (
                      <span key={t} className="tag" style={{ fontSize: '0.74rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
