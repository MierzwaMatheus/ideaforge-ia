
import React from 'react';
import { IdeaForgeTextarea } from '@/components/ui/ideaforge-textarea';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';
import { Checkbox } from '@/components/ui/checkbox';
import { OnboardingData } from '@/hooks/useOnboarding';

interface OnboardingStep4Props {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const ageRanges = [
  '18-25 anos', '26-35 anos', '36-45 anos', '46-55 anos', '56+ anos'
];

const incomeLevels = [
  'Baixa renda', 'Classe média baixa', 'Classe média', 'Classe média alta', 'Alta renda'
];

const OnboardingStep4 = ({ data, updateData }: OnboardingStep4Props) => {
  const handleAgeRangeChange = (range: string, checked: boolean) => {
    const currentRanges = data.ageRange || [];
    if (checked) {
      updateData('ageRange', [...currentRanges, range]);
    } else {
      updateData('ageRange', currentRanges.filter(r => r !== range));
    }
  };

  const handleIncomeLevelChange = (level: string, checked: boolean) => {
    const currentLevels = data.incomeLevel || [];
    if (checked) {
      updateData('incomeLevel', [...currentLevels, level]);
    } else {
      updateData('incomeLevel', currentLevels.filter(l => l !== level));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bitter font-bold text-ideaforge-text-primary">
          Público-Alvo
        </h1>
        <p className="text-base font-exo text-ideaforge-text-secondary">
          Quem são as pessoas que usarão seu produto ou serviço?
        </p>
      </div>

      <div className="space-y-6">
        <IdeaForgeTextarea
          label="Descreva seu público-alvo"
          placeholder="Ex: Jovens profissionais de 25-35 anos que moram em grandes centros urbanos e buscam praticidade no transporte diário"
          value={data.targetAudience}
          onChange={(e) => updateData('targetAudience', e.target.value)}
          rows={4}
        />

        <IdeaForgeCard variant="default">
          <div className="space-y-4">
            <h3 className="text-lg font-bitter font-semibold text-ideaforge-text-primary">
              Faixa Etária (opcional)
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {ageRanges.map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox
                    id={range}
                    checked={data.ageRange?.includes(range) || false}
                    onCheckedChange={(checked) => handleAgeRangeChange(range, !!checked)}
                  />
                  <label htmlFor={range} className="font-exo text-ideaforge-text-primary text-sm">
                    {range}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </IdeaForgeCard>

        <IdeaForgeCard variant="default">
          <div className="space-y-4">
            <h3 className="text-lg font-bitter font-semibold text-ideaforge-text-primary">
              Nível de Renda (opcional)
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {incomeLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={level}
                    checked={data.incomeLevel?.includes(level) || false}
                    onCheckedChange={(checked) => handleIncomeLevelChange(level, !!checked)}
                  />
                  <label htmlFor={level} className="font-exo text-ideaforge-text-primary text-sm">
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </IdeaForgeCard>
      </div>
    </div>
  );
};

export default OnboardingStep4;
