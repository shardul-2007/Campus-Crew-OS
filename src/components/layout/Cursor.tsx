'use client';
import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';

export default function Cursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isImage,   setIsImage]   = useState(false);
  const [visible,   setVisible]   = useState(false);
  const frameRef = useRef<number | null>(null);

  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);

  // Ring follows with spring — slower than dot
  const rx = useSpring(mx, { damping: 24, stiffness: 260, mass: 0.5 });
  const ry = useSpring(my, { damping: 24, stiffness: 260, mass: 0.5 });

  useEffect(() => {
    // Only on fine-pointer (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    // Respect reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        mx.set(e.clientX);
        my.set(e.clientY);
        // Background reactive light via CSS vars (no React re-render)
        document.documentElement.style.setProperty('--cx', `${e.clientX}px`);
        document.documentElement.style.setProperty('--cy', `${e.clientY}px`);
        setVisible(true);
      });
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('img, [data-cursor="image"]')) {
        setIsImage(true);
        setIsPointer(false);
      } else if (t.closest('a, button, [role="button"], [data-cursor="hover"]')) {
        setIsImage(false);
        setIsPointer(true);
      } else {
        setIsImage(false);
        setIsPointer(false);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove,  { passive: true });
    window.addEventListener('mouseover', onOver,  { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [mx, my]);

  // Don't render at all on touch/coarse devices
  const [isFine, setIsFine] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsFine(true);
    }
  }, []);

  if (!isFine) return null;

  const ringSize = isImage ? 72 : isPointer ? 48 : 32;

  return (
    <>
      {/* Dot — instant, no spring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 10001,
          pointerEvents: 'none',
          x: mx, y: my,
          translateX: '-50%',
          translateY: '-50%',
          width: 5, height: 5,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.85)',
          mixBlendMode: 'difference',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      />

      {/* Ring — spring-delayed, softly follows */}
      <motion.div
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? (isImage ? 0.18 : isPointer ? 0.45 : 0.30) : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.6 }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 10000,
          pointerEvents: 'none',
          x: rx, y: ry,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.55)',
          backdropFilter: isImage ? 'blur(6px)' : 'none',
        }}
      />
    </>
  );
}
