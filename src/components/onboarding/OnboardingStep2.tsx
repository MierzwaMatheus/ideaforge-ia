
import React from 'react';
import { IdeaForgeInput } from '@/components/ui/ideaforge-input';
import { IdeaForgeTextarea } from '@/components/ui/ideaforge-textarea';
import { OnboardingData } from '@/hooks/useOnboarding';

interface OnboardingStep2Props {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const OnboardingStep2 = ({ data, updateData }: OnboardingStep2Props) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bitter font-bold text-ideaforge-text-primary">
          Vamos conhecer seu projeto
        </h1>
        <p className="text-base font-exo text-ideaforge-text-secondary">
          Nos conte mais detalhes sobre sua ideia
        </p>
      </div>

      <div className="space-y-6">
        <IdeaForgeInput
          label="Qual o nome do seu projeto?"
          placeholder="Digite o nome do seu projeto"
          value={data.projectName}
          onChange={(e) => updateData('projectName', e.target.value)}
        />

        <IdeaForgeTextarea
          label="Descreva o objetivo principal em uma frase"
          placeholder="Ex: Criar um aplicativo que conecta pessoas que querem dividir caronas na cidade"
          value={data.mainObjective}
          onChange={(e) => updateData('mainObjective', e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
};

export default OnboardingStep2;
