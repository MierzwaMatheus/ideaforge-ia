import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { useOnboarding } from '@/hooks/useOnboarding';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, push, get } from '@/lib/firebase';
import { getAgentResponse } from '@/services/ideiaforge_agents';
import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';
import OnboardingStep3 from './OnboardingStep3';
import OnboardingStep4 from './OnboardingStep4';
import OnboardingStep5 from './OnboardingStep5';
import OnboardingStep6 from './OnboardingStep6';
import OnboardingStep7 from './OnboardingStep7';

const AGENT_IDS = [
  'valida_ia',
  'strategos_ai',
  'pixel_ai',
  'impulso_ai',
  'construtor_ai',
];

const AGENT_ID_MAP = {
  valida_ia: 'validacao',
  strategos_ai: 'negocios',
  pixel_ai: 'design',
  impulso_ai: 'marketing',
  construtor_ai: 'tecnico',
};

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const { currentStep, data, updateData, nextStep, prevStep, canProceed, totalSteps } = useOnboarding();

  const handleFinish = async () => {
    try {
      console.log('[Onboarding] Iniciando criação do projeto...');
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado');
      const db = getDatabase();
      // Gerar novo projectId
      const projectRef = push(ref(db, `users/${user.uid}/projects`));
      const projectId = projectRef.key;
      console.log('[Onboarding] projectId:', projectId);
      // Salvar dados do projeto
      await set(projectRef, {
        ...data,
        createdAt: Date.now(),
      });
      console.log('[Onboarding] Projeto salvo no RTDB');
      // Buscar chave de API do usuário
      const apiKeySnap = await get(ref(db, `users/${user.uid}/googleAiApiKey`));
      const apiKey = apiKeySnap.exists() ? apiKeySnap.val() : '';
      console.log('[Onboarding] apiKey:', apiKey);
      // Para cada agente, enviar mensagem inicial e salvar resposta
      await Promise.all(
        AGENT_IDS.map(async (agentId) => {
          try {
            console.log(`[Onboarding] Acionando agente: ${agentId}`);
            const userMsg = {
              sender: 'user',
              content: JSON.stringify(data),
              timestamp: Date.now(),
            };
            const agentResponse = await getAgentResponse(projectId, agentId, JSON.stringify(data), apiKey);
            console.log(`[Onboarding] Resposta do agente ${agentId}:`, agentResponse);
            const agentMsg = {
              sender: 'agent',
              content: agentResponse,
              timestamp: Date.now(),
              agentType: AGENT_ID_MAP[agentId],
            };
            const chatPath = `users/${user.uid}/projects/${projectId}/chats/${agentId}/messages`;
            await set(ref(db, `${chatPath}/1`), userMsg);
            await set(ref(db, `${chatPath}/2`), agentMsg);
            console.log(`[Onboarding] Mensagens salvas para agente: ${agentId}`);
          } catch (agentError) {
            console.error(`[Onboarding] Erro ao acionar agente ${agentId}:`, agentError);
            throw agentError;
          }
        })
      );
      console.log('[Onboarding] Todos agentes acionados com sucesso. Redirecionando...');
      navigate(`/project/${projectId}`);
    } catch (error) {
      console.error('[Onboarding] Erro geral:', error);
      alert('Erro ao criar projeto e acionar agentes. Tente novamente.');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingStep1 data={data} updateData={updateData} />;
      case 2:
        return <OnboardingStep2 data={data} updateData={updateData} />;
      case 3:
        return <OnboardingStep3 data={data} updateData={updateData} />;
      case 4:
        return <OnboardingStep4 data={data} updateData={updateData} />;
      case 5:
        return <OnboardingStep5 data={data} updateData={updateData} />;
      case 6:
        return <OnboardingStep6 data={data} updateData={updateData} />;
      case 7:
        return <OnboardingStep7 data={data} onFinish={handleFinish} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-ideaforge-bg-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-ideaforge-bg-primary border-b border-ideaforge-text-secondary border-opacity-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-ideaforge-primary to-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">I</span>
              </div>
              <h1 className="text-xl font-bitter font-bold text-ideaforge-text-primary">
                IdeaForge
              </h1>
            </div>
            
            <button
              onClick={() => navigate('/')}
              className="p-2 text-ideaforge-text-secondary hover:text-ideaforge-text-primary ideaforge-transition"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 pb-32">
        <div className="max-w-2xl mx-auto">
          {renderCurrentStep()}
        </div>
      </main>

      {/* Navigation Footer */}
      {currentStep < 7 && (
        <div className="fixed bottom-0 left-0 right-0 bg-ideaforge-bg-primary border-t border-ideaforge-text-secondary border-opacity-20">
          <div className="container mx-auto px-4 lg:px-8 py-4">
            <div className="max-w-2xl mx-auto flex items-center justify-between">
              <IdeaForgeButton
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </IdeaForgeButton>

              <IdeaForgeButton
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2"
              >
                Avançar
              </IdeaForgeButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow;
