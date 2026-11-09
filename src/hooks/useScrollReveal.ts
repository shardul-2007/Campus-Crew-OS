'use client';
import { useEffect, useRef } from 'react';

export function useScrollReveal(className = 'reveal-up') {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in-view'); io.unobserve(el); } },
      { threshold: 0.1 }
    );
    el.classList.add(className);
    io.observe(el);
    return () => io.disconnect();
  }, [className]);
  return ref;
}
