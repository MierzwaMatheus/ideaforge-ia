
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DocumentPreferences = () => {
  const [autoSuggestions, setAutoSuggestions] = useState(true);
  const [defaultFormat, setDefaultFormat] = useState('pdf');
  const [includeLogo, setIncludeLogo] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bitter font-semibold text-ideaforge-text-primary">
        Preferências de Documentos
      </h2>
      
      <div className="bg-ideaforge-bg-secondary rounded-lg p-4 space-y-6">
        {/* Auto Suggestions Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base font-exo text-ideaforge-text-primary">
              Gerar automaticamente sugestões de documentos
            </Label>
            <p className="text-sm font-exo text-ideaforge-text-secondary">
              Receba sugestões personalizadas de documentos com base no seu projeto
            </p>
          </div>
          <Switch
            checked={autoSuggestions}
            onCheckedChange={setAutoSuggestions}
          />
        </div>

        {/* Default Export Format */}
        <div className="space-y-2">
          <Label className="text-base font-exo text-ideaforge-text-primary">
            Formato de exportação padrão
          </Label>
          <Select value={defaultFormat} onValueChange={setDefaultFormat}>
            <SelectTrigger className="bg-ideaforge-bg-primary border-ideaforge-text-secondary border-opacity-20 text-ideaforge-text-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-ideaforge-bg-primary border-ideaforge-text-secondary border-opacity-20">
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="docx">DOCX</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Include Logo Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base font-exo text-ideaforge-text-primary">
              Incluir logotipo em documentos
            </Label>
            <p className="text-sm font-exo text-ideaforge-text-secondary">
              Adicione automaticamente seu logotipo aos documentos gerados
            </p>
          </div>
          <Switch
            checked={includeLogo}
            onCheckedChange={setIncludeLogo}
          />
        </div>

        {includeLogo && (
          <div className="mt-4 p-4 bg-ideaforge-bg-primary rounded-lg border border-ideaforge-text-secondary border-opacity-20">
            <p className="text-sm font-exo text-ideaforge-text-secondary mb-2">
              Upload do logotipo será implementado em breve
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPreferences;
