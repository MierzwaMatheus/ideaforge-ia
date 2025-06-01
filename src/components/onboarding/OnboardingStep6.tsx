
import React from 'react';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, BarChart3, Globe, Megaphone, TrendingUp } from 'lucide-react';
import { OnboardingData } from '@/hooks/useOnboarding';

interface OnboardingStep6Props {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const documents = [
  {
    id: 'pitch-deck',
    label: 'Pitch Deck',
    description: 'Apresentação para investidores',
    icon: FileText
  },
  {
    id: 'business-canvas',
    label: 'Business Canvas',
    description: 'Modelo de negócio visual',
    icon: BarChart3
  },
  {
    id: 'landing-page',
    label: 'Landing Page',
    description: 'Página web para validação',
    icon: Globe
  },
  {
    id: 'marketing-plan',
    label: 'Plano de Marketing',
    description: 'Estratégias iniciais',
    icon: Megaphone
  },
  {
    id: 'viability-analysis',
    label: 'Análise de Viabilidade',
    description: 'Dados de mercado',
    icon: TrendingUp
  }
];

const OnboardingStep6 = ({ data, updateData }: OnboardingStep6Props) => {
  const handleDocumentChange = (docId: string, checked: boolean) => {
    const currentDocs = data.documents || [];
    if (checked) {
      updateData('documents', [...currentDocs, docId]);
    } else {
      updateData('documents', currentDocs.filter(d => d !== docId));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bitter font-bold text-ideaforge-text-primary">
          Documentos Desejados
        </h1>
        <p className="text-base font-exo text-ideaforge-text-secondary">
          Selecione os documentos que você gostaria de gerar
        </p>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => {
          const Icon = doc.icon;
          const isSelected = data.documents?.includes(doc.id) || false;
          
          return (
            <IdeaForgeCard
              key={doc.id}
              variant="agent"
              className={`cursor-pointer ideaforge-transition ${
                isSelected ? 'border-ideaforge-primary border-opacity-100 bg-ideaforge-primary bg-opacity-10' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  id={doc.id}
                  checked={isSelected}
                  onCheckedChange={(checked) => handleDocumentChange(doc.id, !!checked)}
                />
                <div className="flex items-start space-x-3 flex-1">
                  <Icon className="w-6 h-6 text-ideaforge-primary mt-1" />
                  <div className="flex-1">
                    <h4 className="font-exo font-medium text-ideaforge-text-primary">{doc.label}</h4>
                    <p className="font-exo text-sm text-ideaforge-text-secondary">{doc.description}</p>
                  </div>
                </div>
              </div>
            </IdeaForgeCard>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingStep6;
