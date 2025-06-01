
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressIndicator = ({ currentStep, totalSteps, className }: ProgressIndicatorProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        
        return (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-exo font-medium ideaforge-transition",
                isActive && "bg-ideaforge-primary text-white",
                isCompleted && "bg-ideaforge-success text-white",
                !isActive && !isCompleted && "bg-ideaforge-bg-secondary text-ideaforge-text-secondary"
              )}
            >
              {step}
            </div>
            {step < totalSteps && (
              <div
                className={cn(
                  "w-8 h-0.5 mx-1 ideaforge-transition",
                  isCompleted ? "bg-ideaforge-success" : "bg-ideaforge-bg-secondary"
                )}
              />
            )}
          </div>
        );
      })}
      <div className="ml-4 text-sm font-exo text-ideaforge-text-secondary">
        Passo {currentStep} de {totalSteps}
      </div>
    </div>
  );
};

export { ProgressIndicator };
