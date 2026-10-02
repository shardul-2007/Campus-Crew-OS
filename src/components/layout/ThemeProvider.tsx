'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'obsidian' | 'pearl' | 'aurora' | 'dream';

const THEMES: { id: Theme; label: string; color: string }[] = [
  { id: 'obsidian', label: 'Obsidian', color: '#00d4aa' },
  { id: 'pearl',    label: 'Pearl',    color: '#007a5e' },
  { id: 'aurora',   label: 'Aurora',   color: '#00d8ff' },
  { id: 'dream',    label: 'Dream',    color: '#c87dff' },
];

export { THEMES };

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx>({ theme: 'obsidian', setTheme: () => {} });

export function useTheme() { return useContext(Ctx); }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('obsidian');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme') as Theme;
      if (saved && ['obsidian','pearl','aurora','dream'].includes(saved)) {
        setThemeState(saved);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setThemeState(prefersDark ? 'obsidian' : 'pearl');
      }
    } catch {}
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    try {
      localStorage.setItem('portfolio-theme', t);
      document.documentElement.setAttribute('data-theme', t);
    } catch {}
  }

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}
