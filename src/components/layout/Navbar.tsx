'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { PERSONAL } from '@/data/portfolio';

const NAV_LINKS = [
  { label: 'HOME',         href: '#home'         },
  { label: 'ABOUT',        href: '#about'         },
  { label: 'PROJECTS',     href: '#projects'      },
  { label: 'EXPERIENCE',   href: '#experience'    },
  { label: 'SKILLS',       href: '#skills'        },
  { label: 'ACHIEVEMENTS', href: '#achievements'  },
  { label: 'CONTACT',      href: '#contact'       },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href));
    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Thin scroll-progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px z-[9999] origin-left"
        style={{ background: 'var(--accent)', scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0 }}
      />

      {/* Main navbar */}
      <nav
        className="fixed top-3 left-3 right-3 z-50 rounded-2xl transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5,8,16,0.92)' : 'rgba(5,8,16,0.55)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          border: scrolled ? '1px solid rgba(0,245,200,0.14)' : '1px solid rgba(255,255,255,0.07)',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.45)' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-5 py-3 max-w-7xl mx-auto">

          {/* Wordmark */}
          <a href="#home" className="flex items-center gap-2.5 group flex-shrink-0">
            <span className="status-dot status-dot-pulse" style={{ width: 6, height: 6 }} />
            <div>
              <div className="mono font-bold text-sm tracking-widest group-hover:text-[var(--accent)] transition-colors">
                {PERSONAL.shortName}
              </div>
              <div className="mono text-[8px] tracking-[0.18em] text-[var(--text-sub)]">
                SOFTWARE ENGINEER / BUILDER
              </div>
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="mono text-[10px] tracking-[0.13em] px-3 py-2 rounded-xl transition-all duration-200"
                style={{
                  color: active === link.href.slice(1) ? 'var(--accent)' : 'var(--text-muted)',
                  background: active === link.href.slice(1) ? 'var(--accent-dim)' : 'transparent',
                  fontWeight: active === link.href.slice(1) ? 600 : 400,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — AVAILABLE badge only (no RESUME button) */}
          <div className="flex items-center gap-2">
            <span
              className="hidden sm:flex items-center gap-2 mono text-[10px] px-3 py-1.5 rounded-full flex-shrink-0"
              style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-glow)', color: 'var(--accent)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              AVAILABLE
            </span>
            {/* Mobile menu button */}
            <button
              className="lg:hidden glass rounded-xl p-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-3 top-[62px] z-40 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(5,8,16,0.97)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid var(--border-md)', boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="mono text-sm tracking-widest px-4 py-3 rounded-xl transition-all"
                  style={{
                    color:      active === link.href.slice(1) ? 'var(--accent)' : 'var(--text-muted)',
                    background: active === link.href.slice(1) ? 'var(--accent-dim)' : 'transparent',
                    border:     '1px solid ' + (active === link.href.slice(1) ? 'var(--border-glow)' : 'transparent'),
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-3 border-t border-[var(--border)] mt-1">
                <span className="flex items-center gap-2 mono text-xs px-3 py-2 rounded-full w-fit"
                  style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-glow)', color: 'var(--accent)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> AVAILABLE
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}