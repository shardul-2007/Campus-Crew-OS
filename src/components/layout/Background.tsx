'use client';
import { useEffect, useRef } from 'react';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  amplitude: number;
  life: number;
  maxLife: number;
  wobbleFreq: number;
  wobblePhase: number;
}

// 18 subtle floating golden-yellow light particles providing natural optical depth
const PARTICLES = [
  { id: 1, top: '12%', left: '18%', size: 2.2, opacity: 0.38, factor: 1.8 },
  { id: 2, top: '24%', left: '78%', size: 1.8, opacity: 0.32, factor: -1.5 },
  { id: 3, top: '35%', left: '32%', size: 2.6, opacity: 0.42, factor: 2.1 },
  { id: 4, top: '48%', left: '88%', size: 1.6, opacity: 0.28, factor: -2.0 },
  { id: 5, top: '58%', left: '14%', size: 2.0, opacity: 0.35, factor: 1.6 },
  { id: 6, top: '65%', left: '55%', size: 3.0, opacity: 0.45, factor: -1.9 },
  { id: 7, top: '78%', left: '82%', size: 1.8, opacity: 0.30, factor: 2.4 },
  { id: 8, top: '85%', left: '25%', size: 2.4, opacity: 0.36, factor: -1.7 },
  { id: 9, top: '18%', left: '45%', size: 1.5, opacity: 0.28, factor: 1.4 },
  { id: 10, top: '92%', left: '68%', size: 2.0, opacity: 0.32, factor: 2.0 },
  { id: 11, top: '8%',  left: '62%', size: 1.7, opacity: 0.30, factor: -1.8 },
  { id: 12, top: '42%', left: '10%', size: 2.2, opacity: 0.34, factor: 1.9 },
  { id: 13, top: '52%', left: '72%', size: 1.9, opacity: 0.31, factor: -2.2 },
  { id: 14, top: '72%', left: '38%', size: 2.5, opacity: 0.40, factor: 1.7 },
  { id: 15, top: '28%', left: '92%', size: 1.6, opacity: 0.27, factor: -1.6 },
  { id: 16, top: '82%', left: '4%',  size: 2.1, opacity: 0.33, factor: 2.3 },
  { id: 17, top: '15%', left: '85%', size: 2.8, opacity: 0.43, factor: -2.1 },
  { id: 18, top: '62%', left: '94%', size: 1.7, opacity: 0.29, factor: 1.5 },
];

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    const ripples: Ripple[] = [];
    let lastX = -1;
    let lastY = -1;
    let lastTime = 0;
    let animId: number;

    const spawnRipple = (x: number, y: number, amplitude = 0.55, speed = 2.8, maxRadius = 240) => {
      ripples.push({
        x,
        y,
        radius: 4,
        maxRadius,
        speed,
        amplitude,
        life: 0,
        maxLife: Math.floor(70 + Math.random() * 25),
        wobbleFreq: Math.floor(3 + Math.random() * 4),
        wobblePhase: Math.random() * Math.PI * 2,
      });
      // Cap active ripples for solid 60fps
      if (ripples.length > 40) {
        ripples.shift();
      }
    };

    // Parallax values
    let bgParallaxX = 0;
    let bgParallaxY = 0;
    let photoParallaxX = 0;
    let photoParallaxY = 0;
    const rootStyle = document.documentElement.style;

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const x = e.clientX;
      const y = e.clientY;

      if (lastX >= 0 && lastY >= 0) {
        const dx = x - lastX;
        const dy = y - lastY;
        const dist = Math.hypot(dx, dy);
        const dt = Math.max(now - lastTime, 16);
        const velocity = dist / dt; // px per ms

        // Spawn ripples along the path if mouse moved enough distance
        if (dist > 18) {
          const steps = Math.min(Math.floor(dist / 24), 3);
          for (let i = 1; i <= steps; i++) {
            const rx = lastX + (dx * i) / steps;
            const ry = lastY + (dy * i) / steps;
            const amp = Math.min(0.25 + velocity * 0.35, 0.75);
            const spd = Math.min(2.4 + velocity * 1.2, 4.8);
            const maxR = Math.min(180 + velocity * 90, 320);
            spawnRipple(rx, ry, amp, spd, maxR);
          }
          lastX = x;
          lastY = y;
          lastTime = now;
        }
      } else {
        lastX = x;
        lastY = y;
        lastTime = now;
        spawnRipple(x, y, 0.45, 2.6, 220);
      }

      // Smooth parallax on background layers
      const normX = x / width - 0.5;
      const normY = y / height - 0.5;
      bgParallaxX += (normX * -14 - bgParallaxX) * 0.1;
      bgParallaxY += (normY * -14 - bgParallaxY) * 0.1;
      photoParallaxX += (normX * -24 - photoParallaxX) * 0.1;
      photoParallaxY += (normY * -24 - photoParallaxY) * 0.1;

      rootStyle.setProperty('--pointer-x', `${x}px`);
      rootStyle.setProperty('--pointer-y', `${y}px`);
      rootStyle.setProperty('--cx', `${x}px`);
      rootStyle.setProperty('--cy', `${y}px`);
      rootStyle.setProperty('--bg-parallax-x', `${bgParallaxX.toFixed(2)}px`);
      rootStyle.setProperty('--bg-parallax-y', `${bgParallaxY.toFixed(2)}px`);
      rootStyle.setProperty('--photo-parallax-x', `${photoParallaxX.toFixed(2)}px`);
      rootStyle.setProperty('--photo-parallax-y', `${photoParallaxY.toFixed(2)}px`);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Idle ambient water droplet every 3.5s
    const ambientTimer = setInterval(() => {
      const now = performance.now();
      if (now - lastTime > 2500) {
        const ax = Math.random() * width;
        const ay = Math.random() * height;
        spawnRipple(ax, ay, 0.38, 2.2, 200);
      }
    }, 3200);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.life++;
        r.radius += r.speed;
        r.speed *= 0.985; // Viscous liquid deceleration

        const progress = r.life / r.maxLife;
        if (progress >= 1 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Smooth cubic ease out for organic liquid dissipation
        const alpha = Math.sin((1 - progress) * Math.PI * 0.5) * r.amplitude;
        if (alpha <= 0.005) continue;

        // 1. Inner soft shining golden-yellow caustic liquid glow
        const glowGrad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius);
        if (isDark) {
          glowGrad.addColorStop(0, `rgba(255, 220, 70, ${(alpha * 0.10).toFixed(3)})`);
          glowGrad.addColorStop(0.65, `rgba(245, 180, 30, ${(alpha * 0.035).toFixed(3)})`);
          glowGrad.addColorStop(1, 'transparent');
        } else {
          glowGrad.addColorStop(0, `rgba(240, 185, 40, ${(alpha * 0.08).toFixed(3)})`);
          glowGrad.addColorStop(0.65, `rgba(220, 160, 20, ${(alpha * 0.025).toFixed(3)})`);
          glowGrad.addColorStop(1, 'transparent');
        }
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Primary leading wave crest (radiant shining golden-yellow water ridge)
        ctx.beginPath();
        const segments = 48;
        for (let s = 0; s <= segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          const wobble = Math.sin(angle * r.wobbleFreq + r.wobblePhase) * (2 * (1 - progress));
          const rad = r.radius + wobble;
          const px = r.x + Math.cos(angle) * rad;
          const py = r.y + Math.sin(angle) * rad;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        ctx.lineWidth = Math.max(1, 2.8 * (1 - progress));
        if (isDark) {
          ctx.strokeStyle = `rgba(255, 235, 140, ${(alpha * 0.65).toFixed(3)})`;
          ctx.shadowColor = 'rgba(255, 215, 60, 0.65)';
          ctx.shadowBlur = 8;
        } else {
          ctx.strokeStyle = `rgba(210, 155, 25, ${(alpha * 0.45).toFixed(3)})`;
          ctx.shadowColor = 'rgba(230, 175, 30, 0.40)';
          ctx.shadowBlur = 6;
        }
        ctx.stroke();

        // 3. Trough shadow behind crest (creates physical 3D wave depth)
        if (r.radius > 16) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.86, 0, Math.PI * 2);
          ctx.lineWidth = Math.max(0.8, 1.8 * (1 - progress));
          ctx.strokeStyle = isDark
            ? `rgba(0, 0, 15, ${(alpha * 0.28).toFixed(3)})`
            : `rgba(180, 160, 120, ${(alpha * 0.25).toFixed(3)})`;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }

        // 4. Secondary harmonic crest (golden water reflection)
        if (r.radius > 28) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.72, 0, Math.PI * 2);
          ctx.lineWidth = Math.max(0.6, 1.4 * (1 - progress));
          ctx.strokeStyle = isDark
            ? `rgba(255, 230, 130, ${(alpha * 0.32).toFixed(3)})`
            : `rgba(200, 150, 20, ${(alpha * 0.24).toFixed(3)})`;
          ctx.shadowBlur = 5;
          ctx.shadowColor = isDark ? 'rgba(255, 215, 60, 0.45)' : 'rgba(220, 165, 30, 0.3)';
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      clearInterval(ambientTimer);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: 'var(--bg)',
        transition: 'background-color 0.35s ease',
      }}
    >
      {/* ── Depth 1A: Primary Shining Yellow atmospheric light field (top right) ── */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '130%',
          height: '130%',
          background:
            'radial-gradient(circle 900px at 72% 26%, rgba(255, 215, 50, 0.16) 0%, rgba(245, 180, 25, 0.07) 35%, rgba(220, 150, 15, 0.02) 60%, transparent 75%)',
          transform: 'translate3d(var(--bg-parallax-x, 0px), var(--bg-parallax-y, 0px), 0)',
          willChange: 'transform',
        }}
      />

      {/* ── Depth 1B: Secondary Shining Yellow atmospheric field (bottom left) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-15%',
          width: '120%',
          height: '120%',
          background:
            'radial-gradient(circle 800px at 25% 75%, rgba(255, 195, 40, 0.12) 0%, rgba(240, 160, 20, 0.04) 45%, transparent 75%)',
          transform: 'translate3d(calc(var(--bg-parallax-x, 0px) * 0.75), calc(var(--bg-parallax-y, 0px) * 0.75), 0)',
          willChange: 'transform',
        }}
      />

      {/* ── Depth 1C: Central shining golden-yellow atmospheric warmth ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(255, 220, 70, 0.065) 0%, rgba(245, 185, 30, 0.02) 50%, transparent 70%)',
        }}
      />

      {/* ── Depth 2: Blurred portrait atmosphere (shifts with --photo-parallax) ── */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '120%',
          height: '140%',
          backgroundImage: `url(${BASE}/imageshardul.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 15%',
          filter: 'var(--photo-filter)',
          opacity: 'var(--photo-opacity)' as unknown as number,
          transform:
            'translate3d(var(--photo-parallax-x, 0px), var(--photo-parallax-y, 0px), 0) scale(1.08)',
          willChange: 'transform',
          transition: 'filter 0.35s ease, opacity 0.35s ease',
        }}
      />

      {/* ── Depth 3: Microscopic floating golden-yellow light particles ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'transform',
        }}
      >
        {PARTICLES.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: '#ffdb4d',
              boxShadow: '0 0 8px rgba(255, 215, 50, 0.8), 0 0 2px rgba(255, 245, 180, 1)',
              opacity: p.opacity,
              transform: `translate3d(calc(var(--bg-parallax-x, 0px) * ${p.factor}), calc(var(--bg-parallax-y, 0px) * ${p.factor}), 0)`,
              transition: 'opacity 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* ── Depth 4: Interactive Water Surface Canvas (Shining Yellow Water Ripples) ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      {/* ── Depth 5: Atmospheric overlay layer ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--overlay)',
          transition: 'background 0.35s ease',
        }}
      />

      {/* ── Depth 6: Vignette edge depth ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 48%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      {/* ── Grain ── */}
      <div className="grain" />
    </div>
  );
}
