'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain } from 'lucide-react';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

export default function ImageBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const topY    = useTransform(scrollYProgress, [0, 0.6], ['0%', '-55%']);
  const bottomY = useTransform(scrollYProgress, [0, 0.6], ['0%', '55%']);
  const brainOpacity = useTransform(scrollYProgress, [0.2, 0.48], [0, 1]);
  const brainScale   = useTransform(scrollYProgress, [0.2, 0.52], [0.3, 1]);
  const labelOpacity = useTransform(scrollYProgress, [0.4, 0.62], [0, 1]);
  const scanOpacity  = useTransform(scrollYProgress, [0.05, 0.25, 0.55], [0, 1, 0]);

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    objectPosition: 'top',
    borderRadius: '16px',
    filter: 'brightness(0.72) contrast(1.08)',
  };

  return (
    <div ref={ref} style={{ height: '250vh', position: 'relative' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ background: '#050810' }}>

        {/* Top half */}
        <motion.div style={{ y: topY, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ clipPath: 'inset(0 0 50% 0)', width: '100%', maxWidth: 360, height: '70vh', position: 'relative' }}>
            <img src={BASE + '/imageshardul.png'} alt="" aria-hidden style={imgStyle} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: 'linear-gradient(to bottom, transparent 55%, rgba(5,8,16,0.9) 100%)' }} />
          </div>
        </motion.div>

        {/* Bottom half */}
        <motion.div style={{ y: bottomY, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ clipPath: 'inset(50% 0 0 0)', width: '100%', maxWidth: 360, height: '70vh', position: 'relative' }}>
            <img src={BASE + '/imageshardul.png'} alt="" aria-hidden style={imgStyle} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: 'linear-gradient(to top, transparent 55%, rgba(5,8,16,0.9) 100%)' }} />
          </div>
        </motion.div>

        {/* Scan line at the break */}
        <motion.div
          style={{
            opacity: scanOpacity,
            position: 'absolute',
            left: 0, right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            boxShadow: '0 0 16px var(--accent)',
            zIndex: 10,
          }}
        />

        {/* Brain icon in the gap */}
        <motion.div
          style={{ opacity: brainOpacity, scale: brainScale, position: 'relative', zIndex: 20 }}
          className="flex flex-col items-center gap-5"
        >
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(0,245,200,0.18)', filter: 'blur(40px)', transform: 'scale(2)' }} />
            <div
              className="glass flex items-center justify-center"
              style={{
                borderRadius: 24,
                padding: '28px 32px',
                borderColor: 'var(--border-glow)',
                boxShadow: '0 0 48px rgba(0,245,200,0.22), 0 0 100px rgba(0,245,200,0.08)',
                position: 'relative',
              }}
            >
              <Brain size={64} color="var(--accent)" />
            </div>
          </div>

          <motion.div style={{ opacity: labelOpacity }} className="text-center">
            <div className="sys-label-accent mb-1">TECHNICAL CAPABILITIES</div>
            <div className="text-2xl font-bold">The Stack Behind It</div>
            <div className="text-sm text-[var(--text-muted)] mt-1">Technologies I actually use, day to day</div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}