'use client';
import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '@/data/portfolio';

export default function Achievements() {
  return (
    <section id="achievements" className="section-new">
      <div className="container-new">
        <h2 className="heading-editorial" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '4rem' }}>
          Milestones
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div key={ach.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-soft" style={{ padding: '2rem', borderRadius: '20px' }} data-cursor="hover">
              <p className="text-meta" style={{ marginBottom: '1rem' }}>{ach.year} — {ach.cat}</p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>{ach.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}>{ach.org}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
