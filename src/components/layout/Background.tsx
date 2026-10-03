'use client';
// Photographic atmospheric background using the real portrait.
// Three layers: blurred portrait + dark overlay + cursor-reactive light + grain
import { useEffect, useState } from 'react';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

export default function Background() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        pointerEvents: 'none', overflow: 'hidden',
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* Portrait atmospheric layer */}
      <div
        style={{
          position: 'absolute',
          top: '-15%', left: '-5%',
          width: '110%', height: '130%',
          backgroundImage: `url(${BASE}/imageshardul.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          filter: 'blur(72px) saturate(90%)',
          opacity: 'var(--photo-opacity)' as React.CSSProperties['opacity'],
          transform: 'scale(1.08)',
        }}
      />

      {/* Dark overlay so glass has depth */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'var(--photo-overlay)',
      }} />

      {/* Cursor-reactive light — reads --cx/--cy set by Cursor.tsx via rAF */}
      {ready && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle 480px at var(--cx,50vw) var(--cy,40vh), rgba(255,255,255,0.022) 0%, transparent 80%)',
        }} />
      )}

      {/* Corner vignette for depth */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.50) 100%)',
      }} />

      {/* Grain overlay — defined in globals.css */}
      <div className="grain" />
    </div>
  );
}
