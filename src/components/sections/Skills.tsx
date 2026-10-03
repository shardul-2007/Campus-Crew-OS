'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '@/data/portfolio';

// Group skills by category in the order they appear
const GROUPS: { label: string; cat: string }[] = [
  { label: 'Frontend',        cat: 'Frontend'      },
  { label: 'Languages',       cat: 'Languages'     },
  { label: 'Backend / APIs',  cat: 'Backend'       },
  { label: 'AI',              cat: 'AI'            },
  { label: 'Tools',           cat: 'Tools'         },
  { label: 'Computer Science',cat: 'CS'            },
  { label: 'Exploring',       cat: 'Cybersecurity' },
];

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const displayed = activeGroup
    ? SKILLS.filter(s => s.category === activeGroup)
    : SKILLS;

  return (
    <section id="skills" className="section" aria-label="Skills">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <div className="section-eyebrow">
            <span className="label">Skills</span>
            <div className="section-line" />
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', color: 'var(--text)' }}
          >
            Technologies
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-2)', marginTop: 16, maxWidth: 420 }}>
            What I work with. Built real products with all of these.
          </p>
        </motion.div>

        {/* Category filter pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
          <button
            onClick={() => setActiveGroup(null)}
            data-cursor="hover"
            style={{
              padding: '7px 18px', borderRadius: 100,
              fontSize: '0.8rem', fontWeight: activeGroup === null ? 600 : 400,
              border: '1px solid var(--glass-border-h)',
              background: activeGroup === null ? 'var(--glass-border-h)' : 'var(--glass)',
              color: activeGroup === null ? 'var(--text)' : 'var(--text-2)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s',
            }}
          >
            All
          </button>
          {GROUPS.map(g => (
            <button
              key={g.cat}
              onClick={() => setActiveGroup(activeGroup === g.cat ? null : g.cat)}
              data-cursor="hover"
              style={{
                padding: '7px 18px', borderRadius: 100,
                fontSize: '0.8rem', fontWeight: activeGroup === g.cat ? 600 : 400,
                border: '1px solid var(--glass-border)',
                background: activeGroup === g.cat ? 'var(--glass-border-h)' : 'var(--glass)',
                color: activeGroup === g.cat ? 'var(--text)' : 'var(--text-2)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.2s',
              }}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Skills display — elegant tag cloud */}
        <motion.div
          layout
          style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
        >
          {displayed.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.4) }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="glass"
              data-cursor="hover"
              style={{
                padding: '10px 20px',
                borderRadius: 100,
                borderColor: skill.level === 'primary' ? 'var(--glass-border-h)' : 'var(--glass-border)',
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: skill.level === 'primary' ? 600 : 400, color: skill.level === 'primary' ? 'var(--text)' : 'var(--text-2)' }}>
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
