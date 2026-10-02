'use client';
import { motion } from 'framer-motion';
import { PERSONAL } from '@/data/portfolio';

export default function Contact() {
  return (
    <section id="contact" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/imageshardul.png)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(40px)', opacity: 0.15, zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,7,18,1) 0%, rgba(3,7,18,0.4) 100%)', zIndex: 1 }} />
      
      <div className="container-new" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="heading-editorial" style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', lineHeight: 0.9, marginBottom: '4rem' }}>
            LET&apos;S BUILD<br/>SOMETHING.
          </h2>
          
          <div className="glass-deep" style={{ padding: 'clamp(2rem, 4vw, 4rem)', borderRadius: '32px', display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p className="text-meta" style={{ marginBottom: '1rem' }}>Direct Line</p>
              <a href={`mailto:${PERSONAL.email}`} className="heading-editorial" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#fff', textDecoration: 'none' }} data-cursor="hover">{PERSONAL.email}</a>
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href={PERSONAL.github} target="_blank" rel="noreferrer" className="text-meta" style={{ color: '#fff', textDecoration: 'none' }} data-cursor="hover">GITHUB</a>
              <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer" className="text-meta" style={{ color: '#fff', textDecoration: 'none' }} data-cursor="hover">LINKEDIN</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
