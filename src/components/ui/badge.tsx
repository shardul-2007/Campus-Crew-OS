import React from 'react';
import { cn } from './button';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'purple';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'md', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
    success: 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/80',
    warning: 'bg-amber-950/70 text-amber-300 border border-amber-800/80',
    danger: 'bg-rose-950/70 text-rose-300 border border-rose-800/80',
    info: 'bg-cyan-950/70 text-cyan-300 border border-cyan-800/80',
    purple: 'bg-purple-950/70 text-purple-300 border border-purple-800/80',
    outline: 'bg-transparent text-slate-300 border border-slate-700',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded',
    md: 'text-xs px-2.5 py-1 rounded-md font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
