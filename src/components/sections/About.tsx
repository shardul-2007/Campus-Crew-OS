'use client';
import { motion } from 'framer-motion';
import { ABOUT_PANELS, PERSONAL } from '@/data/portfolio';

export default function About() {
  return (
    <section id="about" className="section-new" style={{ position: 'relative' }}>
      <div className="container-new">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="heading-editorial" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '4rem' }}>
            Who I Am
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {ABOUT_PANELS.map((panel, i) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass"
              style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}
              data-cursor="glass"
            >
              <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', fontSize: '10rem', opacity: 0.03, fontWeight: 900, pointerEvents: 'none' }}>
                {panel.num}
              </div>
              <p className="text-meta" style={{ marginBottom: '1rem', color: '#fff' }}>{panel.label}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>{panel.title}</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.95rem' }}>{panel.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
