'use client';
import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, motion, AnimatePresence } from 'framer-motion';

type CursorMode = 'default' | 'hover' | 'image' | 'text';

export default function Cursor() {
  const [mode, setMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Velocity-smoothed spring values for the transformative outer ring
  const ringX = useSpring(mouseX, { damping: 26, stiffness: 320, mass: 0.45 });
  const ringY = useSpring(mouseY, { damping: 26, stiffness: 320, mass: 0.45 });

  // Secondary delayed aura for atmospheric trail
  const auraX = useSpring(mouseX, { damping: 36, stiffness: 180, mass: 0.8 });
  const auraY = useSpring(mouseY, { damping: 36, stiffness: 180, mass: 0.8 });

  // Velocity orientation
  const angle = useMotionValue(0);
  const stretch = useMotionValue(1);
  const prevPos = useRef({ x: 0, y: 0, time: Date.now() });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    // Only desktop fine-pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setIsFinePointer(true);

    const onMouseMove = (e: MouseEvent) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        const now = Date.now();
        const dt = Math.max(now - prevPos.current.time, 16);

        // Velocity & angle calculation for fluid kinetic stretch
        const dx = x - prevPos.current.x;
        const dy = y - prevPos.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy) / dt;

        if (speed > 0.15) {
          const moveAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
          angle.set(moveAngle);
          // Subtle stretch based on speed, clamped for refinement
          const stretchFactor = Math.min(1 + speed * 0.15, 1.45);
          stretch.set(stretchFactor);
        } else {
          stretch.set(1);
        }

        prevPos.current = { x, y, time: now };

        mouseX.set(x);
        mouseY.set(y);

        // Set global CSS variables for atmospheric illumination in Background.tsx
        document.documentElement.style.setProperty('--cx', `${x}px`);
        document.documentElement.style.setProperty('--cy', `${y}px`);

        setVisible(true);
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('img, [data-cursor="image"]')) {
        setMode('image');
      } else if (target.closest('h1, h2, [data-cursor="text"]')) {
        setMode('text');
      } else if (
        target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]')
      ) {
        setMode('hover');
      } else {
        setMode('default');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [mouseX, mouseY, angle, stretch]);

  if (!isFinePointer) return null;

  // Mode dimensions and styles
  const isDefault = mode === 'default';
  const isHover = mode === 'hover';
  const isImage = mode === 'image';
  const isText = mode === 'text';

  // Ring size transforms
  let ringSize = 34;
  let ringRadius = '50%';
  if (isHover) ringSize = 58;
  if (isImage) ringSize = 88;
  if (isText) ringSize = 46;

  if (isClicking) ringSize = Math.max(ringSize * 0.75, 24);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden',
      }}
    >
      {/* ── Layer 1: Ambient Trailing Aura (Atmospheric Glow) ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
          width: isImage ? 160 : isHover ? 120 : 80,
          height: isImage ? 160 : isHover ? 120 : 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--cursor-glow) 0%, transparent 70%)',
          opacity: visible ? 1 : 0,
          transition: 'width 0.4s ease, height 0.4s ease, opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 2: Transformative Kinetic Spring Ring ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          rotate: angle,
          scaleX: stretch,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: isText ? 28 : ringSize,
            borderRadius: ringRadius,
            borderColor: isHover
              ? 'var(--text)'
              : isImage
              ? 'var(--text)'
              : 'var(--cursor-ring)',
            borderWidth: isHover ? 1.5 : 1,
            backgroundColor: isHover
              ? 'rgba(128, 128, 128, 0.08)'
              : isImage
              ? 'rgba(128, 128, 128, 0.05)'
              : 'transparent',
            backdropFilter: isImage ? 'blur(6px)' : isHover ? 'blur(2px)' : 'none',
            opacity: visible ? (isClicking ? 0.9 : 0.75) : 0,
          }}
          transition={{
            type: 'spring',
            damping: 22,
            stiffness: 300,
            mass: 0.5,
          }}
          style={{
            borderStyle: 'solid',
            boxShadow: isHover
              ? '0 0 20px rgba(128,128,255,0.18), inset 0 0 10px rgba(255,255,255,0.06)'
              : isImage
              ? '0 0 24px rgba(255,255,255,0.12), inset 0 0 12px rgba(255,255,255,0.08)'
              : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Subtle spinning orbital accent on hover state */}
          <AnimatePresence>
            {isHover && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  inset: -6,
                  borderRadius: '50%',
                  border: '1px dashed var(--cursor-ring)',
                  animation: 'orb-cw 12s linear infinite',
                }}
              />
            )}
          </AnimatePresence>

          {/* Camera lens corner reticles on image state */}
          <AnimatePresence>
            {isImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'absolute', inset: 6 }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 5,
                    height: 5,
                    borderTop: '1.5px solid var(--text)',
                    borderLeft: '1.5px solid var(--text)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 5,
                    height: 5,
                    borderTop: '1.5px solid var(--text)',
                    borderRight: '1.5px solid var(--text)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 5,
                    height: 5,
                    borderBottom: '1.5px solid var(--text)',
                    borderLeft: '1.5px solid var(--text)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 5,
                    height: 5,
                    borderBottom: '1.5px solid var(--text)',
                    borderRight: '1.5px solid var(--text)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* ── Layer 3: Tight Precision Core Dot ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            width: isHover ? 7 : isClicking ? 3 : 5,
            height: isHover ? 7 : isClicking ? 3 : 5,
            scale: isClicking ? 0.6 : 1,
            backgroundColor: 'var(--cursor-dot)',
            opacity: visible ? (isImage ? 0.5 : 1) : 0,
          }}
          transition={{ type: 'spring', damping: 18, stiffness: 400 }}
          style={{
            borderRadius: '50%',
            boxShadow: '0 0 10px var(--cursor-dot)',
          }}
        />
      </motion.div>

      {/* ── Layer 4: Click Impulse Shockwave ── */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0.6 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
              width: ringSize,
              height: ringSize,
              borderRadius: '50%',
              border: '1px solid var(--text)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
