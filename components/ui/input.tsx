'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-11 w-full rounded-full border border-white/10 bg-surfaceElevated px-4 py-3 text-sm text-ink shadow-sm transition placeholder:text-muted focus:border-white/40 focus:outline-none',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
