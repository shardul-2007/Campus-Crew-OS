'use client';
import { createContext, useContext, useEffect, useState } from 'react';
export type Theme = 'obsidian' | 'pearl' | 'aurora' | 'dream';
export const THEMES: { id: Theme; label: string; color: string }[] = [
  { id: 'obsidian', label: 'Obsidian', color: '#1f2937' },
  { id: 'pearl',    label: 'Pearl',    color: '#f9fafb' },
  { id: 'aurora',   label: 'Aurora',   color: '#3b82f6' },
  { id: 'dream',    label: 'Dream',    color: '#8b5cf6' },
];
const Ctx = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({ theme: 'obsidian', setTheme: () => {} });
export function useTheme() { return useContext(Ctx); }
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('obsidian');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme') as Theme;
      if (saved && ['obsidian','pearl','aurora','dream'].includes(saved)) { setThemeState(saved); }
    } catch {}
  }, []);
  function setTheme(t: Theme) {
    setThemeState(t);
    try { localStorage.setItem('portfolio-theme', t); document.documentElement.setAttribute('data-theme', t); } catch {}
  }
  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}
