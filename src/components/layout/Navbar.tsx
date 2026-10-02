'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Menu } from 'lucide-react';
import { useTheme, THEMES, type Theme } from '@/components/layout/ThemeProvider';

const NAV = [
  { label: 'About',        href: '#about'        },
  { label: 'Work',         href: '#projects'     },
  { label: 'Journey',      href: '#experience'   },
  { label: 'Recognition',  href: '#achievements' },
  { label: 'Contact',      href: '#contact'      },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [themeOpen,  setThemeOpen]  = useState(false);
  const [active,     setActive]     = useState('');
  const { theme, setTheme }         = useTheme();
  const popoverRef                  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = NAV.map(n => document.querySelector(n.href));
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    els.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    };
    if (themeOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [themeOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') { setThemeOpen(false); setMenuOpen(false); } };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <div
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        style={{ paddingTop: 0 }}
      >
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-nav pointer-events-auto w-full"
          style={{
            maxWidth: 820,
            boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          <div className="flex items-center justify-between px-5 py-3">
            {/* Wordmark */}
            <a href="#home" className="flex items-center gap-2.5 group flex-shrink-0">
              <span className="dot dot-pulse" style={{ width: 5, height: 5 }} />
              <span
                className="font-semibold text-sm tracking-tight"
                style={{ color: 'var(--text)' }}
              >
                Shardul
                <span style={{ color: 'var(--accent)' }}>.</span>
                Parihar
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-sm transition-all"
                  style={{
                    color: active === link.href ? 'var(--accent)' : 'var(--text-2)',
                    background: active === link.href ? 'var(--ad)' : 'transparent',
                    fontWeight: active === link.href ? 500 : 400,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: theme + hamburger */}
            <div className="flex items-center gap-2">
              {/* Theme selector */}
              <div className="relative" ref={popoverRef}>
                <button
                  onClick={() => setThemeOpen(!themeOpen)}
                  className="glass-sm flex items-center gap-2 px-3 py-1.5 text-sm transition-all"
                  style={{
                    color: 'var(--text-2)',
                    borderRadius: 10,
                    background: 'var(--surface)',
                  }}
                  aria-label="Change theme"
                  aria-expanded={themeOpen}
                >
                  <Palette size={14} />
                  <span className="hidden sm:inline" style={{ fontSize: '0.78rem' }}>Theme</span>
                </button>

                <AnimatePresence>
                  {themeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="glass absolute top-full right-0 mt-2 p-3"
                      style={{ width: 168, borderRadius: 16, zIndex: 100 }}
                    >
                      <p className="label mb-3 px-1">Appearance</p>
                      {THEMES.map(t => (
                        <button
                          key={t.id}
                          onClick={() => { setTheme(t.id as Theme); setThemeOpen(false); }}
                          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all text-left"
                          style={{
                            background: theme === t.id ? 'var(--ad)' : 'transparent',
                            color: theme === t.id ? 'var(--accent)' : 'var(--text-2)',
                          }}
                        >
                          <span
                            style={{
                              width: 10, height: 10, borderRadius: '50%',
                              background: t.color, flexShrink: 0,
                              boxShadow: theme === t.id ? `0 0 8px ${t.color}88` : 'none',
                            }}
                          />
                          {t.label}
                          {theme === t.id && <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: '0.7rem' }}>✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden glass-sm p-2 transition-colors"
                style={{ borderRadius: 10, color: 'var(--text-2)', background: 'var(--surface)' }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-4 top-20 z-40 glass"
            style={{ borderRadius: 20 }}
          >
            <div className="p-4 flex flex-col gap-1">
              {NAV.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm transition-all"
                  style={{
                    color: active === link.href ? 'var(--accent)' : 'var(--text-2)',
                    background: active === link.href ? 'var(--ad)' : 'transparent',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t mt-2 pt-3" style={{ borderColor: 'var(--gb)' }}>
                <p className="label px-2 mb-2">Theme</p>
                <div className="grid grid-cols-2 gap-2">
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t.id as Theme); setMenuOpen(false); }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                      style={{
                        background: theme === t.id ? 'var(--ad)' : 'var(--surface)',
                        color: theme === t.id ? 'var(--accent)' : 'var(--text-2)',
                        border: '1px solid var(--gb)',
                      }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
