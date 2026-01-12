'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const Tooltip = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn('group relative inline-flex', className)} {...props} />
  )
);
Tooltip.displayName = 'Tooltip';

type TooltipTriggerProps = React.HTMLAttributes<HTMLSpanElement>;

function TooltipTrigger({ className, children, ...props }: TooltipTriggerProps) {
  return (
    <span className={cn('inline-flex', className)} {...props}>
      {children}
    </span>
  );
}

const TooltipContent = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="tooltip"
      className={cn(
        'pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max -translate-x-1/2 rounded-md border border-white/10 bg-surfaceElevated px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-muted opacity-0 shadow-card transition group-hover:opacity-100 group-focus-within:opacity-100',
        className
      )}
      {...props}
    />
  )
);
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipTrigger, TooltipContent };
