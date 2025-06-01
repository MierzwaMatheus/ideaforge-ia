
import React from 'react';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';
import { CheckCircle } from 'lucide-react';
import { OnboardingData } from '@/hooks/useOnboarding';

interface OnboardingStep7Props {
  data: OnboardingData;
  onFinish: () => void;
}

const OnboardingStep7 = ({ data, onFinish }: OnboardingStep7Props) => {
  return (
    <div className="space-y-8 text-center">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-ideaforge-success" />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bitter font-bold text-ideaforge-text-primary">
          Tudo pronto!
        </h1>
        <p className="text-lg font-exo text-ideaforge-text-secondary max-w-md mx-auto">
          Seu projeto <span className="text-ideaforge-primary font-medium">{data.projectName}</span> está configurado. 
          Vamos para o Dashboard e começar a análise!
        </p>
      </div>

      <div className="bg-ideaforge-bg-secondary rounded-xl p-6 text-left">
        <h3 className="font-bitter font-semibold text-ideaforge-text-primary mb-4">
          Resumo do Projeto:
        </h3>
        <div className="space-y-2 text-sm font-exo text-ideaforge-text-secondary">
          <p><span className="text-ideaforge-text-primary">Tipo:</span> {data.projectType}</p>
          <p><span className="text-ideaforge-text-primary">Setor:</span> {data.sector}</p>
          <p><span className="text-ideaforge-text-primary">Mercado:</span> {data.marketSize}</p>
          <p><span className="text-ideaforge-text-primary">Documentos:</span> {data.documents?.length || 0} selecionados</p>
        </div>
      </div>

      <IdeaForgeButton size="lg" onClick={onFinish} className="w-full sm:w-auto">
        Ir para o Dashboard
      </IdeaForgeButton>
    </div>
  );
};

export default OnboardingStep7;
