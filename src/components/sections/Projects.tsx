'use client';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/data/portfolio';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="section-new" style={{ position: 'relative' }}>
      <div className="container-new">
        <h2 className="heading-editorial" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '6rem' }}>
          Selected<br/>Works
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
          {PROJECTS.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} style={{ position: 'relative' }}>
              
              <div style={{ position: 'absolute', inset: '-20%', zIndex: -1, opacity: 0.1, filter: 'blur(60px)', background: i % 2 === 0 ? 'var(--a1, #00d4aa)' : 'var(--a2, #4488ff)', borderRadius: '50%' }} />

              <div className="glass-deep" style={{ padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '32px' }} data-cursor="glass">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
                  
                  <div style={{ flex: '1 1 400px' }}>
                    <p className="text-meta" style={{ marginBottom: '1rem' }}>{p.num} — {p.category}</p>
                    <h3 className="heading-editorial" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}>{p.name}</h3>
                    <p style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 500 }}>{p.tagline}</p>
                    <p style={{ color: 'var(--text-2)', marginBottom: '2rem', fontSize: '0.95rem' }}>{p.description}</p>
                    
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                      {p.stack.map(s => <span key={s} className="glass-soft" style={{ padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.75rem' }}>{s}</span>)}
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                      {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="text-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }} data-cursor="hover"><ExternalLink size={14}/> LIVE SITE</a>}
                      {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="text-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} data-cursor="hover"><Github size={14}/> SOURCE</a>}
                    </div>
                  </div>

                  <div style={{ flex: '1 1 400px', aspectRatio: '4/3', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <span className="text-meta" style={{ opacity: 0.5 }}>PROJECT VISUAL</span>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
