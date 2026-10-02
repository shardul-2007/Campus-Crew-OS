'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SKILLS } from '@/data/portfolio';

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="skills" className="section-new" ref={containerRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', zIndex: 0, opacity: 0.05 }}>
        <h2 className="heading-editorial" style={{ fontSize: '20vw', whiteSpace: 'nowrap', textAlign: 'center' }}>
          TOOLS<br/>OF THE<br/>CRAFT
        </h2>
      </div>

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1000px', height: '600px' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <span className="heading-editorial" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.2em' }}>SHARDUL</span>
        </div>

        {SKILLS.slice(0, 12).map((skill, i) => {
          const isLeft = i % 2 === 0;
          const top = `${10 + (i * 7)}%`;
          const left = isLeft ? `${10 + (i % 3) * 10}%` : `${60 + (i % 3) * 10}%`;
          const y = i % 3 === 0 ? y1 : i % 3 === 1 ? y2 : y3;

          return (
            <motion.div
              key={skill.name}
              style={{ position: 'absolute', top, left, y }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="glass-soft" style={{ padding: '0.75rem 1.5rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 500 }} data-cursor="hover">
                {skill.name}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
