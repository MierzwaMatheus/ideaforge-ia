
import React from 'react';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';
import { Monitor, Package, Users, ShoppingCart, Video, MoreHorizontal } from 'lucide-react';
import { IdeaForgeInput } from '@/components/ui/ideaforge-input';
import { OnboardingData } from '@/hooks/useOnboarding';

interface OnboardingStep1Props {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const projectTypes = [
  { id: 'app', label: 'Aplicativo/Software', icon: Monitor },
  { id: 'product', label: 'Produto Físico', icon: Package },
  { id: 'service', label: 'Serviço/Consultoria', icon: Users },
  { id: 'ecommerce', label: 'E-commerce/Loja', icon: ShoppingCart },
  { id: 'content', label: 'Conteúdo/Mídia', icon: Video },
  { id: 'other', label: 'Outro', icon: MoreHorizontal }
];

const OnboardingStep1 = ({ data, updateData }: OnboardingStep1Props) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bitter font-bold text-ideaforge-text-primary">
          Bem-vindo ao IdeaForge!
        </h1>
        <p className="text-lg font-exo text-ideaforge-text-secondary max-w-md mx-auto">
          Vamos transformar sua ideia em realidade. Que tipo de projeto você tem em mente?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projectTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = data.projectType === type.id;
          
          return (
            <IdeaForgeCard
              key={type.id}
              variant="agent"
              className={`cursor-pointer ideaforge-transition ${
                isSelected ? 'border-ideaforge-primary border-opacity-100 bg-ideaforge-primary bg-opacity-10' : ''
              }`}
              onClick={() => updateData('projectType', type.id)}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-ideaforge-primary" />
                <span className="font-exo text-ideaforge-text-primary">{type.label}</span>
              </div>
            </IdeaForgeCard>
          );
        })}
      </div>

      {data.projectType === 'other' && (
        <div className="mt-6">
          <IdeaForgeInput
            label="Especifique seu tipo de projeto"
            placeholder="Digite aqui..."
            value={data.projectName}
            onChange={(e) => updateData('projectName', e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default OnboardingStep1;
