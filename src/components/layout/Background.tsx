'use client';
import { useEffect, useState } from 'react';

export default function Background() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      zIndex: -1, pointerEvents: 'none', overflow: 'hidden',
      backgroundColor: 'var(--bg)'
    }}>
      {/* Massive blurred portrait in background */}
      <div style={{
        position: 'absolute', top: '-10%', left: '10%',
        width: '80vw', height: '120vh',
        opacity: 0.15, filter: 'blur(80px) saturate(120%)',
        backgroundImage: 'url(/imageshardul.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: 'scale(1.1)'
      }} />

      {/* Atmospheric blue/navy gradients */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at top right, rgba(20,40,90,0.15), transparent 60%)'
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at bottom left, rgba(10,30,70,0.15), transparent 60%)'
      }} />

      {/* Cursor reactive light (CSS variables set by Cursor.tsx) */}
      {mounted && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'radial-gradient(circle 600px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(255,255,255,0.03), transparent 100%)',
          transition: 'background 0.1s ease',
          zIndex: 1
        }} />
      )}

      {/* Grain overlay */}
      <div className="bg-grain" />
    </div>
  );
}
