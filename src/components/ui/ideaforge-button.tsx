
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface IdeaForgeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const IdeaForgeButton = React.forwardRef<HTMLButtonElement, IdeaForgeButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const baseClasses = 'font-exo font-medium rounded-lg ideaforge-transition focus:outline-none focus:ring-2 focus:ring-ideaforge-primary focus:ring-offset-2 focus:ring-offset-ideaforge-bg-primary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2';
    
    const variants = {
      primary: 'bg-ideaforge-primary text-white hover:bg-blue-600 active:bg-blue-700',
      secondary: 'bg-ideaforge-bg-secondary text-ideaforge-primary border border-ideaforge-primary hover:bg-ideaforge-primary hover:text-white',
      ghost: 'bg-transparent text-ideaforge-text-primary hover:bg-ideaforge-bg-secondary',
      success: 'bg-ideaforge-success text-white hover:bg-green-600',
      warning: 'bg-ideaforge-warning text-ideaforge-bg-primary hover:bg-yellow-500',
      error: 'bg-ideaforge-error text-white hover:bg-red-600'
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

IdeaForgeButton.displayName = 'IdeaForgeButton';

export { IdeaForgeButton };
