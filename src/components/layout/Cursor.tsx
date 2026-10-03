'use client';
import { useEffect, useRef, useState } from 'react';

interface WakePoint {
  x: number;
  y: number;
  opacity: number;
}

export default function Cursor() {
  const [isActive, setIsActive] = useState(false);

  // DOM node references for 60fps GPU transforms (zero React re-renders on move)
  const coreRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const wakeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only desktop fine-pointer devices without reduced-motion preference
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setIsActive(true);

    let isVisible = false;
    let targetX = -100;
    let targetY = -100;

    // Intermediate physics coordinates
    let haloX = -100;
    let haloY = -100;
    let fieldX = -100;
    let fieldY = -100;

    // Magnetic pull coordinates
    let magneticTargetX = 0;
    let magneticTargetY = 0;
    let isMagnetic = false;

    // Hover context states
    type ContextMode = 'default' | 'nav' | 'button' | 'card' | 'portrait';
    let currentMode: ContextMode = 'default';

    // 4 decaying wake impressions
    const wakeHistory: WakePoint[] = [
      { x: -100, y: -100, opacity: 0 },
      { x: -100, y: -100, opacity: 0 },
      { x: -100, y: -100, opacity: 0 },
      { x: -100, y: -100, opacity: 0 },
    ];
    let wakeCounter = 0;

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        haloX = targetX;
        haloY = targetY;
        fieldX = targetX;
        fieldY = targetY;
      }

      // Check contextual elements underneath cursor
      const target = e.target as HTMLElement | null;
      if (target) {
        const btn = target.closest('button, .btn, [data-cursor="button"]') as HTMLElement | null;
        const nav = target.closest('nav a, [data-cursor="nav"]') as HTMLElement | null;
        const card = target.closest('article, [data-cursor="card"]') as HTMLElement | null;
        const portrait = target.closest('[data-cursor="portrait"]') as HTMLElement | null;

        if (btn) {
          currentMode = 'button';
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          // Subtle magnetic attraction — pulls by up to 5px toward button center
          const dx = centerX - targetX;
          const dy = centerY - targetY;
          magneticTargetX = dx * 0.14;
          magneticTargetY = dy * 0.14;
          isMagnetic = true;
        } else if (nav) {
          currentMode = 'nav';
          isMagnetic = false;
        } else if (portrait) {
          currentMode = 'portrait';
          isMagnetic = false;
        } else if (card) {
          currentMode = 'card';
          isMagnetic = false;
        } else {
          currentMode = 'default';
          isMagnetic = false;
        }
      }

      // Update background atmospheric illumination via CSS variables
      document.documentElement.style.setProperty('--cx', `${targetX}px`);
      document.documentElement.style.setProperty('--cy', `${targetY}px`);
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onMouseEnter = () => {
      isVisible = true;
    };

    // Physics Animation Loop
    const render = () => {
      if (isVisible) {
        const actualCoreX = isMagnetic ? targetX + magneticTargetX : targetX;
        const actualCoreY = isMagnetic ? targetY + magneticTargetY : targetY;

        // 1. Core (Immediate responsive tracking)
        if (coreRef.current) {
          coreRef.current.style.transform = `translate3d(${actualCoreX}px, ${actualCoreY}px, 0) translate(-50%, -50%)`;
          coreRef.current.style.opacity = '1';
        }

        // 2. Micro Halo (~40ms delay, lerp factor 0.42)
        haloX += (actualCoreX - haloX) * 0.42;
        haloY += (actualCoreY - haloY) * 0.42;
        if (haloRef.current) {
          haloRef.current.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`;
          haloRef.current.style.opacity = currentMode === 'button' ? '0.9' : '0.65';
        }

        // 3. Delayed Spatial Field (~100ms delay, lerp factor 0.16)
        fieldX += (actualCoreX - fieldX) * 0.16;
        fieldY += (actualCoreY - fieldY) * 0.16;
        if (fieldRef.current) {
          fieldRef.current.style.transform = `translate3d(${fieldX}px, ${fieldY}px, 0) translate(-50%, -50%)`;
          fieldRef.current.style.opacity = '1';

          // Contextual morphing styles
          if (currentMode === 'button') {
            fieldRef.current.style.width = '48px';
            fieldRef.current.style.height = '48px';
            fieldRef.current.style.borderColor = 'rgba(255, 255, 255, 0.45)';
            fieldRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          } else if (currentMode === 'nav') {
            fieldRef.current.style.width = '44px';
            fieldRef.current.style.height = '44px';
            fieldRef.current.style.borderColor = 'rgba(255, 255, 255, 0.35)';
            fieldRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          } else if (currentMode === 'portrait') {
            fieldRef.current.style.width = '64px';
            fieldRef.current.style.height = '64px';
            fieldRef.current.style.borderColor = 'rgba(255, 255, 255, 0.28)';
            fieldRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
          } else if (currentMode === 'card') {
            fieldRef.current.style.width = '52px';
            fieldRef.current.style.height = '52px';
            fieldRef.current.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            fieldRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
          } else {
            fieldRef.current.style.width = '36px';
            fieldRef.current.style.height = '36px';
            fieldRef.current.style.borderColor = 'var(--cursor-ring)';
            fieldRef.current.style.backgroundColor = 'transparent';
          }
        }

        // 4. Short Decaying Spatial Wake (3-4 discrete light stamps, decays rapidly)
        wakeCounter++;
        if (wakeCounter % 3 === 0) {
          // Push current field position into wake history
          wakeHistory.unshift({ x: fieldX, y: fieldY, opacity: 0.32 });
          wakeHistory.pop();
        }

        // Decay wake opacities
        for (let i = 0; i < wakeHistory.length; i++) {
          wakeHistory[i].opacity *= 0.88;
          const wakeEl = wakeRefs.current[i];
          if (wakeEl) {
            wakeEl.style.transform = `translate3d(${wakeHistory[i].x}px, ${wakeHistory[i].y}px, 0) translate(-50%, -50%)`;
            wakeEl.style.opacity = `${wakeHistory[i].opacity}`;
          }
        }
      } else {
        if (coreRef.current) coreRef.current.style.opacity = '0';
        if (haloRef.current) haloRef.current.style.opacity = '0';
        if (fieldRef.current) fieldRef.current.style.opacity = '0';
        wakeRefs.current.forEach(w => {
          if (w) w.style.opacity = '0';
        });
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden',
      }}
    >
      {/* ── Layer 4: Decaying Spatial Wake Points (3-4 points) ── */}
      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          ref={el => {
            wakeRefs.current[i] = el;
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${Math.max(6 - i, 3)}px`,
            height: `${Math.max(6 - i, 3)}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(215, 230, 255, 0.45)',
            boxShadow: '0 0 6px rgba(180, 215, 255, 0.3)',
            opacity: 0,
            pointerEvents: 'none',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* ── Layer 3: Delayed Spatial Field (~100ms lag, subtle translucent depth) ── */}
      <div
        ref={fieldRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid var(--cursor-ring)',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          opacity: 0,
          transition: 'width 0.28s ease, height 0.28s ease, border-color 0.25s ease, background-color 0.25s ease',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* ── Layer 2: Micro Halo (~40ms lag, soft atmospheric boundary) ── */}
      <div
        ref={haloRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(190, 215, 255, 0.25) 0%, rgba(190, 215, 255, 0.05) 60%, transparent 100%)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* ── Layer 1: Core (Immediate 4.5px luminous point with subtle blue tint) ── */}
      <div
        ref={coreRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 8px rgba(180, 215, 255, 0.85), 0 0 2px rgba(255, 255, 255, 1)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
