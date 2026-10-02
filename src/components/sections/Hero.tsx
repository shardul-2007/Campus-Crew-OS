'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function NeuralOrb() {
  return (
    <div style={{
      width: 200, height: 200,
      borderRadius: '50%',
      background: 'rgba(15, 25, 45, 0.4)',
      backdropFilter: 'blur(30px) saturate(140%)',
      border: '1px solid rgba(255,255,255,0.15)',
      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute', inset: -20, borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.05)',
        animation: 'spin-slow 20s linear infinite'
      }} />
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <path d="M60 20 C40 30, 20 45, 20 60 C20 80, 40 90, 55 95" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
        <path d="M60 20 C80 30, 100 45, 100 60 C100 80, 80 90, 65 95" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
        <circle cx="60" cy="20" r="3" fill="#fff" />
        <circle cx="60" cy="95" r="3" fill="#fff" />
        <circle cx="20" cy="60" r="3" fill="#fff" />
        <circle cx="100" cy="60" r="3" fill="#fff" />
        <circle cx="60" cy="60" r="8" fill="#fff" fillOpacity="0.8" />
        <circle cx="60" cy="60" r="16" stroke="rgba(255,255,255,0.2)" fill="none" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  
  const portraitScale = useTransform(scrollYProgress, [0.1, 0.35], [0.8, 1.4]);
  const portraitOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  const tearTopY = useTransform(scrollYProgress, [0.45, 0.7], ["0%", "-60%"]);
  const tearBotY = useTransform(scrollYProgress, [0.45, 0.7], ["0%", "60%"]);
  
  const orbOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const orbScale = useTransform(scrollYProgress, [0.65, 0.8], [0.5, 1]);
  const mindTextOpacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Phase 1: Typography */}
        <motion.div style={{ opacity: textOpacity, y: textY, position: 'absolute', zIndex: 10, textAlign: 'center', pointerEvents: 'none' }}>
          <h1 className="heading-editorial" style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', color: 'var(--text)' }}>
            Shardul<br />Parihar
          </h1>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
            <span className="text-meta">Software Engineer</span>
            <span className="text-meta">Builder</span>
            <span className="text-meta">AI / Web</span>
          </div>
        </motion.div>

        {/* Phase 2 & 3: Portrait & Tear */}
        <motion.div style={{ position: 'absolute', width: 'clamp(300px, 45vw, 600px)', aspectRatio: '3/4', scale: portraitScale, opacity: portraitOpacity, pointerEvents: 'none', zIndex: 5 }}>
          
          <motion.div className="clip-tear-top" style={{ position: 'absolute', inset: 0, y: tearTopY }}>
            <img src="/imageshardul.png" alt="Shardul" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(3,7,18,0.8) 100%)' }} />
          </motion.div>

          <motion.div className="clip-tear-bot" style={{ position: 'absolute', inset: 0, y: tearBotY }}>
            <img src="/imageshardul.png" alt="Shardul" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, transparent 60%, rgba(3,7,18,0.8) 100%)' }} />
          </motion.div>

        </motion.div>

        {/* Phase 4: Inner Mind */}
        <motion.div style={{ position: 'absolute', zIndex: 2, opacity: orbOpacity, scale: orbScale, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
          <NeuralOrb />
          <motion.div style={{ opacity: mindTextOpacity, textAlign: 'center' }}>
            <h2 className="heading-editorial" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}>My Mind</h2>
            <p className="text-meta" style={{ marginTop: '1rem', opacity: 0.8 }}>From ideas to systems</p>
          </motion.div>
        </motion.div>
        
      </div>
    </div>
  );
}
