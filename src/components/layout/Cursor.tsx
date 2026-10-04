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
  const auraRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const outerFieldRef = useRef<HTMLDivElement>(null);
  const wakeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only desktop fine-pointer devices without reduced-motion preference
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setIsActive(true);

    let isVisible = false;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let prevX = targetX;
    let prevY = targetY;

    // Intermediate physics coordinates
    let auraX = targetX;
    let auraY = targetY;
    let fieldX = targetX;
    let fieldY = targetY;
    let outerFieldX = targetX;
    let outerFieldY = targetY;

    // Velocity & angle for liquid light distortion
    let smoothSpeed = 0;
    let currentAngle = 0;

    // Parallax values
    let bgParallaxX = 0;
    let bgParallaxY = 0;
    let photoParallaxX = 0;
    let photoParallaxY = 0;

    // Magnetic pull coordinates
    let magneticTargetX = 0;
    let magneticTargetY = 0;
    let isMagnetic = false;
    let isInteractive = false;

    // 4 decaying wake impressions (fading completely within 150ms)
    const wakeHistory: WakePoint[] = [
      { x: -100, y: -100, opacity: 0 },
      { x: -100, y: -100, opacity: 0 },
      { x: -100, y: -100, opacity: 0 },
      { x: -100, y: -100, opacity: 0 },
    ];
    let wakeCounter = 0;

    let animId: number;
    const rootStyle = document.documentElement.style;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        auraX = targetX;
        auraY = targetY;
        fieldX = targetX;
        fieldY = targetY;
        outerFieldX = targetX;
        outerFieldY = targetY;
        prevX = targetX;
        prevY = targetY;
      }

      // Check contextual interactive elements underneath cursor
      const target = e.target as HTMLElement | null;
      if (target) {
        const btn = target.closest('button, .btn, a, [role="button"]') as HTMLElement | null;
        if (btn) {
          isInteractive = true;
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          // Subtle magnetic attraction — pulls by 3–5px toward center
          const dx = centerX - targetX;
          const dy = centerY - targetY;
          magneticTargetX = Math.max(-5, Math.min(5, dx * 0.14));
          magneticTargetY = Math.max(-5, Math.min(5, dy * 0.14));
          isMagnetic = true;
        } else {
          isInteractive = false;
          isMagnetic = false;
          magneticTargetX = 0;
          magneticTargetY = 0;
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onMouseEnter = () => {
      isVisible = true;
    };

    // Unified 60fps Physics & Living Field Loop
    const render = () => {
      if (isVisible) {
        const actualCoreX = isMagnetic ? targetX + magneticTargetX : targetX;
        const actualCoreY = isMagnetic ? targetY + magneticTargetY : targetY;

        // Calculate velocity and motion angle for liquid light distortion
        const vx = actualCoreX - prevX;
        const vy = actualCoreY - prevY;
        const dist = Math.hypot(vx, vy);
        smoothSpeed += (dist - smoothSpeed) * 0.22;
        if (dist > 0.8) {
          currentAngle = Math.atan2(vy, vx);
        }
        prevX = actualCoreX;
        prevY = actualCoreY;

        // 1. Core: tiny 3.5px luminous point (immediate tracking, zero lag)
        if (coreRef.current) {
          coreRef.current.style.transform = `translate3d(${actualCoreX}px, ${actualCoreY}px, 0) translate(-50%, -50%)`;
          coreRef.current.style.opacity = '1';
        }

        // 2. Immediate Light Core (Layer 1: ~26px soft radial glow, lerp factor 0.65)
        auraX += (actualCoreX - auraX) * 0.65;
        auraY += (actualCoreY - auraY) * 0.65;
        if (auraRef.current) {
          auraRef.current.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) translate(-50%, -50%)`;
          auraRef.current.style.opacity = isInteractive ? '1' : '0.85';
        }

        // 3. Delayed Electromagnetic Field & Liquid Distortion (Layer 2 & 3: ~100ms lag, lerp factor 0.14)
        fieldX += (actualCoreX - fieldX) * 0.14;
        fieldY += (actualCoreY - fieldY) * 0.14;

        // Stretch dynamically along angle of travel when moving fast
        const stretch = Math.min(smoothSpeed * 0.018, 0.62);
        const scaleBase = isInteractive ? 1.35 : 1;
        const scaleX = (1 + stretch) * scaleBase;
        const scaleY = Math.max(1 - stretch * 0.35, 0.65) * scaleBase;

        if (fieldRef.current) {
          fieldRef.current.style.transform = `translate3d(${fieldX}px, ${fieldY}px, 0) translate(-50%, -50%) rotate(${currentAngle}rad) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;
          fieldRef.current.style.opacity = isInteractive ? '1' : '0.8';
        }

        // 4. Secondary Large Atmospheric Glow (Layer 4: ~140ms lag, lerp factor 0.075)
        outerFieldX += (actualCoreX - outerFieldX) * 0.075;
        outerFieldY += (actualCoreY - outerFieldY) * 0.075;
        if (outerFieldRef.current) {
          outerFieldRef.current.style.transform = `translate3d(${outerFieldX}px, ${outerFieldY}px, 0) translate(-50%, -50%)`;
          outerFieldRef.current.style.opacity = '1';
        }

        // 5. Decaying Directional Wake (3-4 discrete light stamps, decays rapidly within 150ms)
        wakeCounter++;
        if (wakeCounter % 3 === 0 && smoothSpeed > 1.2) {
          wakeHistory.unshift({ x: fieldX, y: fieldY, opacity: 0.36 });
          wakeHistory.pop();
        }

        for (let i = 0; i < wakeHistory.length; i++) {
          wakeHistory[i].opacity *= 0.82;
          const wakeEl = wakeRefs.current[i];
          if (wakeEl) {
            wakeEl.style.transform = `translate3d(${wakeHistory[i].x}px, ${wakeHistory[i].y}px, 0) translate(-50%, -50%)`;
            wakeEl.style.opacity = `${wakeHistory[i].opacity.toFixed(3)}`;
          }
        }

        // 6. Multi-layer background parallax coordinates
        const normX = targetX / window.innerWidth - 0.5;
        const normY = targetY / window.innerHeight - 0.5;

        bgParallaxX += (normX * -14 - bgParallaxX) * 0.08;
        bgParallaxY += (normY * -14 - bgParallaxY) * 0.08;
        photoParallaxX += (normX * -26 - photoParallaxX) * 0.08;
        photoParallaxY += (normY * -26 - photoParallaxY) * 0.08;

        // Update centralized CSS variables on documentElement for living environment
        rootStyle.setProperty('--pointer-x', `${targetX}px`);
        rootStyle.setProperty('--pointer-y', `${targetY}px`);
        rootStyle.setProperty('--cx', `${targetX}px`);
        rootStyle.setProperty('--cy', `${targetY}px`);
        rootStyle.setProperty('--bg-parallax-x', `${bgParallaxX.toFixed(2)}px`);
        rootStyle.setProperty('--bg-parallax-y', `${bgParallaxY.toFixed(2)}px`);
        rootStyle.setProperty('--photo-parallax-x', `${photoParallaxX.toFixed(2)}px`);
        rootStyle.setProperty('--photo-parallax-y', `${photoParallaxY.toFixed(2)}px`);
      } else {
        if (coreRef.current) coreRef.current.style.opacity = '0';
        if (auraRef.current) auraRef.current.style.opacity = '0';
        if (fieldRef.current) fieldRef.current.style.opacity = '0';
        if (outerFieldRef.current) outerFieldRef.current.style.opacity = '0';
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
      {/* ── Layer 5: Decaying Directional Wake (dissolves naturally without borders) ── */}
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
            width: `${Math.max(14 - i * 2, 8)}px`,
            height: `${Math.max(14 - i * 2, 8)}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--cursor-wake) 0%, transparent 70%)',
            filter: 'blur(3px)',
            opacity: 0,
            pointerEvents: 'none',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* ── Layer 4: Secondary Large Outer Atmospheric Field (~420px, deep dissolve) ── */}
      <div
        ref={outerFieldRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--cursor-field-2) 0%, transparent 68%)',
          filter: 'blur(28px)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* ── Layer 3: Electromagnetic Liquid Light Field (~220px, velocity-stretched, NO BORDER) ── */}
      <div
        ref={fieldRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, var(--cursor-field-1) 0%, var(--cursor-field-2) 45%, transparent 75%)',
          filter: 'blur(16px)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* ── Layer 2: Immediate Light Core (~26px soft radial aura, NO BORDER) ── */}
      <div
        ref={auraRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--cursor-immediate-aura) 0%, transparent 70%)',
          filter: 'blur(4px)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* ── Layer 1: Core (Tiny, precise 3.5px luminous point) ── */}
      <div
        ref={coreRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3.5px',
          height: '3.5px',
          borderRadius: '50%',
          backgroundColor: 'var(--cursor-core)',
          boxShadow: '0 0 6px var(--cursor-core-glow), 0 0 12px var(--cursor-immediate-aura)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
