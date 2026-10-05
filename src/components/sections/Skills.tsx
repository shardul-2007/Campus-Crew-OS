'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/data/portfolio';

const vp = { once: true, margin: '-60px' };

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const displayedCategories = selectedCategory
    ? SKILL_CATEGORIES.filter(c => c.category === selectedCategory)
    : SKILL_CATEGORIES;

  return (
    <section id="skills" className="section" aria-label="Skills and technologies">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: 48 }}
        >
          <span className="s-label">Skills</span>
          <h2
            className="display"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
              color: 'var(--text)',
              marginTop: 18,
            }}
          >
            Technologies I work with
          </h2>
          <p
            style={{
              fontSize: '0.96rem',
              color: 'var(--text-2)',
              marginTop: 16,
              maxWidth: 520,
              lineHeight: 1.7,
            }}
          >
            A growing toolkit across software engineering, full-stack development, AI, and programming.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 'clamp(28px, 4vh, 40px)' }}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            data-cursor="hover"
            style={{
              padding: '6px 15px',
              borderRadius: 100,
              fontSize: '0.78rem',
              fontWeight: selectedCategory === null ? 600 : 400,
              border: `1px solid ${selectedCategory === null ? 'var(--glass-border-h)' : 'var(--glass-border)'}`,
              background: selectedCategory === null ? 'var(--btn-fill-bg)' : 'var(--glass-bg)',
              color: selectedCategory === null ? 'var(--btn-fill-text)' : 'var(--text-2)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.18s ease',
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            All
          </button>
          {SKILL_CATEGORIES.map(c => (
            <button
              key={c.category}
              onClick={() => setSelectedCategory(selectedCategory === c.category ? null : c.category)}
              data-cursor="hover"
              style={{
                padding: '6px 15px',
                borderRadius: 100,
                fontSize: '0.78rem',
                fontWeight: selectedCategory === c.category ? 600 : 400,
                border: `1px solid ${selectedCategory === c.category ? 'var(--glass-border-h)' : 'var(--glass-border)'}`,
                background: selectedCategory === c.category ? 'var(--btn-fill-bg)' : 'var(--glass-bg)',
                color: selectedCategory === c.category ? 'var(--btn-fill-text)' : 'var(--text-2)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.18s ease',
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
            >
              {c.category}
            </button>
          ))}
        </motion.div>

        {/* Editorial Category Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 16,
          }}
        >
          {displayedCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="glass"
              style={{
                borderRadius: 20,
                padding: 'clamp(20px, 4vw, 26px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  className="meta"
                  style={{
                    color: 'var(--text-3)',
                    marginBottom: 12,
                  }}
                >
                  {cat.category}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {cat.skills.map(s => (
                    <span
                      key={s}
                      className="tag"
                      data-cursor="hover"
                      style={{
                        padding: '5px 12px',
                        fontSize: '0.80rem',
                        fontWeight: 500,
                        color: 'var(--text)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
