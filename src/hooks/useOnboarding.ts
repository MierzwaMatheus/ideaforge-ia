
import { useState } from 'react';

export interface OnboardingData {
  projectType: string;
  projectName: string;
  mainObjective: string;
  sector: string;
  marketSize: string;
  targetAudience: string;
  ageRange: string[];
  incomeLevel: string[];
  resources: string[];
  budget: string;
  documents: string[];
}

const initialData: OnboardingData = {
  projectType: '',
  projectName: '',
  mainObjective: '',
  sector: '',
  marketSize: '',
  targetAudience: '',
  ageRange: [],
  incomeLevel: [],
  resources: [],
  budget: '',
  documents: []
};

export const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 7));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.projectType !== '';
      case 2:
        return data.projectName.trim() !== '' && data.mainObjective.trim() !== '';
      case 3:
        return data.sector !== '' && data.marketSize !== '';
      case 4:
        return data.targetAudience.trim() !== '';
      case 5:
        return data.resources.length > 0 && data.budget !== '';
      case 6:
        return data.documents.length > 0;
      default:
        return true;
    }
  };

  return {
    currentStep,
    data,
    updateData,
    nextStep,
    prevStep,
    canProceed,
    totalSteps: 7
  };
};
