'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('sm');
  const [isTouch, setIsTouch] = useState(true);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const spring = { damping: 22, stiffness: 280, mass: 0.45 };
  const rx = useSpring(mx, spring);
  const ry = useSpring(my, spring);

  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setIsTouch(false);

    const move = (e: MouseEvent) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        mx.set(e.clientX);
        my.set(e.clientY);
        // cursor-reactive light via CSS vars (no React state)
        document.documentElement.style.setProperty('--cx', `${e.clientX}px`);
        document.documentElement.style.setProperty('--cy', `${e.clientY}px`);
        setVisible(true);
      });
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('img, [data-cursor="image"]')) setSize('lg');
      else if (t.closest('a, button, [data-cursor="hover"]')) setSize('md');
      else setSize('sm');
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [mx, my]);

  if (isTouch) return null;

  const ringSize = size === 'sm' ? 36 : size === 'md' ? 56 : 80;
  const ringOpacity = size === 'sm' ? 0.35 : size === 'md' ? 0.55 : 0.22;

  return (
    <>
      {/* Dot — follows mouse exactly */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 10001,
          pointerEvents: 'none',
          x: mx, y: my,
          translateX: '-50%', translateY: '-50%',
          width: 6, height: 6,
          borderRadius: '50%',
          backgroundColor: 'var(--text)',
          opacity: visible ? 0.9 : 0,
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring — spring-follows */}
      <motion.div
        animate={{ width: ringSize, height: ringSize, opacity: visible ? ringOpacity : 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 200 }}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 10000,
          pointerEvents: 'none',
          x: rx, y: ry,
          translateX: '-50%', translateY: '-50%',
          borderRadius: '50%',
          border: '1px solid var(--text)',
          backdropFilter: size === 'lg' ? 'blur(4px)' : 'none',
        }}
      />
    </>
  );
}
