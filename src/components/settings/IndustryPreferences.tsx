
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const IndustryPreferences = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const industries = [
    { value: 'tecnologia', label: 'Tecnologia' },
    { value: 'saude', label: 'Saúde' },
    { value: 'educacao', label: 'Educação' },
    { value: 'alimentacao', label: 'Alimentação' },
    { value: 'moda', label: 'Moda' },
    { value: 'financas', label: 'Finanças' },
    { value: 'varejo', label: 'Varejo' },
    { value: 'servicos', label: 'Serviços' },
    { value: 'manufatura', label: 'Manufatura' },
    { value: 'construcao', label: 'Construção' },
    { value: 'turismo', label: 'Turismo' },
    { value: 'consultoria', label: 'Consultoria' },
    { value: 'outro', label: 'Outro' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bitter font-semibold text-ideaforge-text-primary">
        Seu Setor Principal
      </h2>
      
      <div className="bg-ideaforge-bg-secondary rounded-lg p-4 space-y-4">
        <p className="text-sm font-exo text-ideaforge-text-secondary">
          Selecione seu setor principal para receber sugestões personalizadas de documentos e estratégias.
        </p>
        
        <div className="space-y-2">
          <Label className="text-base font-exo text-ideaforge-text-primary">
            Setor/Indústria
          </Label>
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="bg-ideaforge-bg-primary border-ideaforge-text-secondary border-opacity-20 text-ideaforge-text-primary">
              <SelectValue placeholder="Selecione seu setor" />
            </SelectTrigger>
            <SelectContent className="bg-ideaforge-bg-primary border-ideaforge-text-secondary border-opacity-20">
              {industries.map((industry) => (
                <SelectItem key={industry.value} value={industry.value}>
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default IndustryPreferences;
