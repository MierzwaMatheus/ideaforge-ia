
import React from 'react';
import { cn } from '@/lib/utils';

interface IdeaForgeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const IdeaForgeInput = React.forwardRef<HTMLInputElement, IdeaForgeInputProps>(
  ({ className, label, error, helper, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-exo text-ideaforge-text-secondary"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full px-4 py-3 bg-ideaforge-bg-secondary text-ideaforge-text-primary placeholder-ideaforge-text-secondary',
            'border border-transparent rounded-lg font-exo',
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

IdeaForgeInput.displayName = 'IdeaForgeInput';

export { IdeaForgeInput };
