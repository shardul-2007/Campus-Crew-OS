'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function Cursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [hoverState, setHoverState] = useState<'normal' | 'hover' | 'glass' | 'image'>('normal');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsTouch(false);
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverType = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const isClickable = target.closest('a, button, [role="button"], input');
      
      if (hoverType === 'glass') setHoverState('glass');
      else if (hoverType === 'image') setHoverState('image');
      else if (isClickable) setHoverState('hover');
      else setHoverState('normal');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: mouseX, y: mouseY,
          translateX: '-50%', translateY: '-50%',
          width: 8, height: 8,
          backgroundColor: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference'
        }}
      />
      <motion.div
        animate={{
          width: hoverState === 'hover' ? 60 : hoverState === 'glass' ? 80 : hoverState === 'image' ? 100 : 40,
          height: hoverState === 'hover' ? 60 : hoverState === 'glass' ? 80 : hoverState === 'image' ? 100 : 40,
          opacity: hoverState === 'normal' ? 0.4 : hoverState === 'glass' ? 0.15 : 0.2,
          borderWidth: hoverState === 'image' ? 1 : 2
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        style={{
          position: 'fixed', top: 0, left: 0,
          x: smoothX, y: smoothY,
          translateX: '-50%', translateY: '-50%',
          borderStyle: 'solid',
          borderColor: '#ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          filter: hoverState === 'glass' ? 'blur(4px)' : 'none',
        }}
      />
    </>
  );
}
