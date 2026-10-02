'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: 'calc(100% - 48px)', maxWidth: '800px' }}
    >
      <div className="glass-deep" style={{ padding: '12px 24px', borderRadius: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: scrolled ? 'rgba(5, 10, 20, 0.85)' : 'rgba(5, 10, 20, 0.4)' }}>
        <a href="#home" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, letterSpacing: '-0.02em' }} data-cursor="hover">SHARDUL.</a>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['ABOUT', 'WORK', 'EXPERIENCE', 'CONTACT'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-meta hidden md:block" style={{ color: 'var(--text-2)', textDecoration: 'none' }} data-cursor="hover">
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
