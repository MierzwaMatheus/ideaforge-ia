
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-ideaforge-bg-secondary px-4 py-2 rounded-full mb-8 border border-ideaforge-primary border-opacity-20">
            <Sparkles className="w-4 h-4 text-ideaforge-primary" />
            <span className="text-sm font-exo text-ideaforge-text-primary">
              5 Agentes de IA Especializados
            </span>
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bitter font-bold text-ideaforge-text-primary mb-6 leading-tight">
            Transforme Suas{' '}
            <span className="text-transparent bg-gradient-to-r from-ideaforge-primary to-blue-400 bg-clip-text">
              Ideias
            </span>{' '}
            em Negócios
          </h1>

          {/* Hero Subtitle */}
          <p className="text-lg md:text-xl text-ideaforge-text-secondary font-exo mb-8 max-w-2xl mx-auto leading-relaxed">
            Valide e desenvolva suas ideias com nossa plataforma de IA especializada. 
            Análise completa em minutos, não meses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <IdeaForgeButton size="lg" className="group">
              Validar Minha Ideia
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 ideaforge-transition" />
            </IdeaForgeButton>
            <IdeaForgeButton variant="secondary" size="lg">
              Ver Demo
            </IdeaForgeButton>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <IdeaForgeCard variant="glass" className="text-center">
              <div className="w-12 h-12 bg-ideaforge-primary bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-bitter font-semibold mb-2">Validação Rápida</h3>
              <p className="text-ideaforge-text-secondary font-exo text-sm">
                Análise completa de viabilidade em poucos minutos
              </p>
            </IdeaForgeCard>

            <IdeaForgeCard variant="glass" className="text-center">
              <div className="w-12 h-12 bg-ideaforge-success bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-bitter font-semibold mb-2">IA Especializada</h3>
              <p className="text-ideaforge-text-secondary font-exo text-sm">
                5 agentes focados em diferentes aspectos do negócio
              </p>
            </IdeaForgeCard>

            <IdeaForgeCard variant="glass" className="text-center">
              <div className="w-12 h-12 bg-ideaforge-warning bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-bitter font-semibold mb-2">Relatórios Detalhados</h3>
              <p className="text-ideaforge-text-secondary font-exo text-sm">
                Documentos profissionais prontos para usar
              </p>
            </IdeaForgeCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
