'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'obsidian' | 'pearl' | 'aurora' | 'dream';

export const THEMES: { id: Theme; label: string; dot: string }[] = [
  { id: 'obsidian', label: 'Obsidian', dot: '#9090c0' },
  { id: 'pearl',    label: 'Pearl',    dot: '#c0b8e8' },
  { id: 'aurora',   label: 'Aurora',   dot: '#80b0ff' },
  { id: 'dream',    label: 'Dream',    dot: '#c080ff' },
];

interface ThemeCtx { theme: Theme; setTheme: (t: Theme) => void; }
const Ctx = createContext<ThemeCtx>({ theme: 'obsidian', setTheme: () => {} });
export function useTheme() { return useContext(Ctx); }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('obsidian');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sp-theme') as Theme;
      const valid: Theme[] = ['obsidian', 'pearl', 'aurora', 'dream'];
      if (saved && valid.includes(saved)) setThemeState(saved);
    } catch { /* ok */ }
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    try {
      localStorage.setItem('sp-theme', t);
      document.documentElement.setAttribute('data-theme', t);
    } catch { /* ok */ }
  }

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}
