
import React from 'react';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';
import { OnboardingData } from '@/hooks/useOnboarding';

interface OnboardingStep3Props {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const sectors = [
  'Tecnologia', 'Saúde', 'Educação', 'Alimentação', 'Moda',
  'Finanças', 'Entretenimento', 'Transporte', 'Imobiliário', 'Sustentabilidade'
];

const marketSizes = [
  { id: 'local', label: 'Local', description: 'Cidade ou região específica' },
  { id: 'regional', label: 'Regional', description: 'Estado ou região do país' },
  { id: 'nacional', label: 'Nacional', description: 'Todo o país' },
  { id: 'internacional', label: 'Internacional', description: 'Múltiplos países' }
];

const OnboardingStep3 = ({ data, updateData }: OnboardingStep3Props) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bitter font-bold text-ideaforge-text-primary">
          Setor e Mercado
        </h1>
        <p className="text-base font-exo text-ideaforge-text-secondary">
          Ajude-nos a entender melhor seu mercado
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bitter font-semibold text-ideaforge-text-primary mb-4">
            Em qual setor seu projeto se encaixa?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {sectors.map((sector) => (
              <IdeaForgeCard
                key={sector}
                variant="agent"
                className={`cursor-pointer text-center py-3 ideaforge-transition ${
                  data.sector === sector ? 'border-ideaforge-primary border-opacity-100 bg-ideaforge-primary bg-opacity-10' : ''
                }`}
                onClick={() => updateData('sector', sector)}
              >
                <span className="font-exo text-sm text-ideaforge-text-primary">{sector}</span>
              </IdeaForgeCard>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bitter font-semibold text-ideaforge-text-primary mb-4">
            Qual o tamanho estimado do mercado?
          </h3>
          <div className="space-y-3">
            {marketSizes.map((size) => (
              <IdeaForgeCard
                key={size.id}
                variant="agent"
                className={`cursor-pointer ideaforge-transition ${
                  data.marketSize === size.id ? 'border-ideaforge-primary border-opacity-100 bg-ideaforge-primary bg-opacity-10' : ''
                }`}
                onClick={() => updateData('marketSize', size.id)}
              >
                <div>
                  <div className="font-exo font-medium text-ideaforge-text-primary">{size.label}</div>
                  <div className="font-exo text-sm text-ideaforge-text-secondary">{size.description}</div>
                </div>
              </IdeaForgeCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep3;
