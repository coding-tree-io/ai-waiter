'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow disabled:pointer-events-none disabled:opacity-60';

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-accent text-white shadow-glow hover:bg-accentDark',
  secondary: 'border border-white/10 bg-surfaceElevated text-ink hover:border-white/30',
  outline: 'border border-white/10 bg-transparent text-ink hover:border-white/30',
  ghost: 'bg-transparent text-muted hover:text-ink',
  link: 'bg-transparent p-0 text-accent underline-offset-4 hover:underline',
  destructive: 'bg-red-500 text-white hover:bg-red-600'
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-11 px-6 text-base',
  icon: 'h-10 w-10'
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  )
);

Button.displayName = 'Button';

export { Button };
