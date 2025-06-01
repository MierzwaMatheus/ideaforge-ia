
import React from 'react';
import { cn } from '@/lib/utils';

interface IdeaForgeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'agent' | 'document' | 'glass';
  children: React.ReactNode;
}

const IdeaForgeCard = React.forwardRef<HTMLDivElement, IdeaForgeCardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-ideaforge-bg-secondary border border-ideaforge-bg-secondary',
      agent: 'bg-ideaforge-bg-secondary border border-ideaforge-primary border-opacity-20 hover:border-opacity-40',
      document: 'bg-ideaforge-bg-secondary border border-ideaforge-text-secondary border-opacity-20',
      glass: 'ideaforge-glass'
    };

    return (
      <div
        className={cn(
          'rounded-xl p-6 ideaforge-transition',
          variants[variant],
          variant === 'agent' && 'hover:scale-[1.02] cursor-pointer',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

IdeaForgeCard.displayName = 'IdeaForgeCard';

export { IdeaForgeCard };
