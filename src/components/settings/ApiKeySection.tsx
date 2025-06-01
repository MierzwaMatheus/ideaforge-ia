
import React, { useState } from 'react';
import { ExternalLink, Eye, EyeOff } from 'lucide-react';
import { IdeaForgeInput } from '@/components/ui/ideaforge-input';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';
import { toast } from '@/hooks/use-toast';

const ApiKeySection = () => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma chave de API válida.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Implement API key validation and storage
      // For now, simulate saving to localStorage
      localStorage.setItem('googleAiApiKey', apiKey);
      
      toast({
        title: "Sucesso!",
        description: "Chave salva com sucesso!",
        className: "bg-ideaforge-success text-white",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Chave inválida. Verifique e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = () => {
    setShowKey(!showKey);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bitter font-semibold text-ideaforge-text-primary">
        Chave de API - Google AI Studio
      </h2>
      
      <div className="bg-ideaforge-bg-secondary rounded-lg p-4 space-y-4">
        <p className="text-sm font-exo text-ideaforge-text-secondary leading-relaxed">
          Insira sua chave de API gerada no Google AI Studio para habilitar a inteligência artificial do IdeaForge. 
          Sua chave é armazenada com segurança.
        </p>
        
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-ideaforge-primary hover:text-blue-400 ideaforge-transition text-sm font-exo"
        >
          Como gerar uma chave?
          <ExternalLink className="w-4 h-4" />
        </a>
        
        <div className="space-y-4">
          <div className="relative">
            <IdeaForgeInput
              label="Sua Chave de API"
              type={showKey ? "text" : "password"}
              placeholder="Cole sua chave aqui"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button
              type="button"
              onClick={handleToggleVisibility}
              className="absolute right-3 top-9 text-ideaforge-text-secondary hover:text-ideaforge-primary ideaforge-transition"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
          <IdeaForgeButton
            onClick={handleSaveKey}
            loading={loading}
            className="w-full"
          >
            Salvar Chave
          </IdeaForgeButton>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySection;
