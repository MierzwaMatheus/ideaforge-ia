
import React from 'react';
import { cn } from '@/lib/utils';

interface IdeaForgeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const IdeaForgeTextarea = React.forwardRef<HTMLTextAreaElement, IdeaForgeTextareaProps>(
  ({ className, label, error, helper, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-exo text-ideaforge-text-secondary"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 bg-ideaforge-bg-secondary text-ideaforge-text-primary placeholder-ideaforge-text-secondary',
            'border border-transparent rounded-lg font-exo resize-vertical min-h-[120px]',
            'focus:border-ideaforge-primary focus:outline-none focus:ring-2 focus:ring-ideaforge-primary focus:ring-opacity-20',
            'ideaforge-transition',
            error && 'border-ideaforge-error',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-ideaforge-error font-exo">{error}</p>
        )}
        {helper && !error && (
          <p className="text-sm text-ideaforge-text-secondary font-exo">{helper}</p>
        )}
      </div>
    );
  }
);

IdeaForgeTextarea.displayName = 'IdeaForgeTextarea';

export { IdeaForgeTextarea };
