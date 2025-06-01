
import React from 'react';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';
import { Checkbox } from '@/components/ui/checkbox';
import { OnboardingData } from '@/hooks/useOnboarding';

interface OnboardingStep5Props {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const resources = [
  'Equipe completa', 'Conhecimento técnico', 'Capital inicial', 
  'Rede de contatos', 'Experiência no setor', 'Espaço físico'
];

const budgetRanges = [
  { id: 'up-to-5k', label: 'Até R$ 5.000', description: 'Investimento inicial mínimo' },
  { id: '5k-25k', label: 'R$ 5.000 - R$ 25.000', description: 'Pequeno investimento' },
  { id: '25k-100k', label: 'R$ 25.000 - R$ 100.000', description: 'Médio investimento' },
  { id: '100k-500k', label: 'R$ 100.000 - R$ 500.000', description: 'Grande investimento' },
  { id: 'above-500k', label: 'Acima de R$ 500.000', description: 'Investimento robusto' }
];

const OnboardingStep5 = ({ data, updateData }: OnboardingStep5Props) => {
  const handleResourceChange = (resource: string, checked: boolean) => {
    const currentResources = data.resources || [];
    if (checked) {
      updateData('resources', [...currentResources, resource]);
    } else {
      updateData('resources', currentResources.filter(r => r !== resource));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bitter font-bold text-ideaforge-text-primary">
          Recursos e Investimento
        </h1>
        <p className="text-base font-exo text-ideaforge-text-secondary">
          Vamos entender o que você já tem e o que precisa
        </p>
      </div>

      <div className="space-y-6">
        <IdeaForgeCard variant="default">
          <div className="space-y-4">
            <h3 className="text-lg font-bitter font-semibold text-ideaforge-text-primary">
              Quais recursos você já possui?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {resources.map((resource) => (
                <div key={resource} className="flex items-center space-x-2">
                  <Checkbox
                    id={resource}
                    checked={data.resources?.includes(resource) || false}
                    onCheckedChange={(checked) => handleResourceChange(resource, !!checked)}
                  />
                  <label htmlFor={resource} className="font-exo text-ideaforge-text-primary">
                    {resource}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </IdeaForgeCard>

        <div>
          <h3 className="text-lg font-bitter font-semibold text-ideaforge-text-primary mb-4">
            Qual seu orçamento inicial estimado?
          </h3>
          <div className="space-y-3">
            {budgetRanges.map((budget) => (
              <IdeaForgeCard
                key={budget.id}
                variant="agent"
                className={`cursor-pointer ideaforge-transition ${
                  data.budget === budget.id ? 'border-ideaforge-primary border-opacity-100 bg-ideaforge-primary bg-opacity-10' : ''
                }`}
                onClick={() => updateData('budget', budget.id)}
              >
                <div>
                  <div className="font-exo font-medium text-ideaforge-text-primary">{budget.label}</div>
                  <div className="font-exo text-sm text-ideaforge-text-secondary">{budget.description}</div>
                </div>
              </IdeaForgeCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep5;
