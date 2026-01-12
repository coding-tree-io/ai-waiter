'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'outline' | 'subtle';

const variantClasses: Record<BadgeVariant, string> = {
  default:
    'rounded-full border border-white/10 bg-surface px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-muted',
  outline:
    'rounded-full border border-white/30 bg-transparent px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-ink',
  subtle:
    'rounded-full border border-white/10 bg-surfaceElevated px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-muted'
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return <span className={cn(variantClasses[variant], className)} {...props} />;
}

export { Badge };
