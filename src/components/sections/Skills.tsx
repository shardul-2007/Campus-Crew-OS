'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '@/data/portfolio';

// Ordered groups
const GROUPS = [
  { key: 'Frontend',      label: 'Frontend' },
  { key: 'Languages',     label: 'Languages' },
  { key: 'Backend',       label: 'Backend / APIs' },
  { key: 'AI',            label: 'AI' },
  { key: 'Tools',         label: 'Tools' },
  { key: 'CS',            label: 'Computer Science' },
  { key: 'Cybersecurity', label: 'Cybersecurity' },
];

const vp = { once: true, margin: '-60px' };

export default function Skills() {
  const [filter, setFilter] = useState<string | null>(null);

  const displayed = filter ? SKILLS.filter(s => s.category === filter) : SKILLS;

  return (
    <section id="skills" className="section" aria-label="Skills and technologies">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={vp} transition={{ duration: 0.65 }}
          style={{ marginBottom: 56 }}
        >
          <span className="s-label">Skills</span>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: 'var(--text)', marginTop: 20 }}
          >
            Technologies
          </h2>
          <p style={{ fontSize: '0.93rem', color: 'var(--text-2)', marginTop: 16, maxWidth: 400, lineHeight: 1.7 }}>
            What I work with. Built real products with most of these.
          </p>
        </motion.div>

        {/* Group filters */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={vp} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 44 }}
        >
          <button
            onClick={() => setFilter(null)}
            data-cursor="hover"
            style={{
              padding: '7px 18px', borderRadius: 100,
              fontSize: '0.80rem', fontWeight: filter === null ? 600 : 400,
              border: `1px solid ${filter === null ? 'rgba(255,255,255,0.22)' : 'var(--glass-border)'}`,
              background: filter === null ? 'rgba(255,255,255,0.09)' : 'var(--glass-bg)',
              color: filter === null ? 'var(--text)' : 'var(--text-2)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.18s ease',
              fontFamily: 'inherit',
            }}
          >
            All
          </button>
          {GROUPS.map(g => (
            <button
              key={g.key}
              onClick={() => setFilter(filter === g.key ? null : g.key)}
              data-cursor="hover"
              style={{
                padding: '7px 18px', borderRadius: 100,
                fontSize: '0.80rem', fontWeight: filter === g.key ? 600 : 400,
                border: `1px solid ${filter === g.key ? 'rgba(255,255,255,0.22)' : 'var(--glass-border)'}`,
                background: filter === g.key ? 'rgba(255,255,255,0.09)' : 'var(--glass-bg)',
                color: filter === g.key ? 'var(--text)' : 'var(--text-2)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.18s ease',
                fontFamily: 'inherit',
              }}
            >
              {g.label}
            </button>
          ))}
        </motion.div>

        {/* Tech tags — editorial tag cloud, no bars, no meters */}
        <motion.div layout style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {displayed.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.28, delay: Math.min(i * 0.025, 0.35) }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="glass"
              style={{
                padding: '10px 22px',
                borderRadius: 100,
                borderColor: skill.level === 'primary'
                  ? 'rgba(255,255,255,0.14)'
                  : 'var(--glass-border)',
              }}
              data-cursor="hover"
            >
              <span style={{
                fontSize: '0.86rem',
                fontWeight: skill.level === 'primary' ? 600 : 400,
                color: skill.level === 'primary' ? 'var(--text)' : 'var(--text-2)',
              }}>
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend — very subtle */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={vp} transition={{ delay: 0.6 }}
          style={{ marginTop: 32, fontSize: '0.76rem', color: 'var(--text-3)' }}
        >
          Brighter text = primary skill · Lighter = secondary · No ratings or percentages.
        </motion.p>
      </div>
    </section>
  );
}
