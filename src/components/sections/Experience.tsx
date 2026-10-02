'use client';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '@/data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="section-new" style={{ position: 'relative' }}>
      <div className="container-new">
        <h2 className="heading-editorial" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '6rem' }}>
          Experience
        </h2>

        <div style={{ position: 'relative', paddingLeft: 'clamp(2rem, 5vw, 4rem)' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }} />

          {EXPERIENCE.map((exp, i) => (
            <motion.div key={exp.id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} style={{ position: 'relative', paddingBottom: '4rem' }}>
              <div style={{ position: 'absolute', left: 'calc(clamp(-2rem, -5vw, -4rem) - 4px)', top: '10px', width: '9px', height: '9px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px #fff' }} />
              
              <div className="glass-soft" style={{ padding: '2.5rem', borderRadius: '24px' }} data-cursor="glass">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff' }}>{exp.title}</h3>
                    {exp.org && <p className="text-meta" style={{ marginTop: '0.5rem', color: 'var(--text-2)' }}>{exp.org} {exp.role ? `— ${exp.role}` : ''}</p>}
                  </div>
                  <span className="text-meta" style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '100px' }}>{exp.year}</span>
                </div>
                <p style={{ color: 'var(--text-2)', lineHeight: 1.6, maxWidth: '800px' }}>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
