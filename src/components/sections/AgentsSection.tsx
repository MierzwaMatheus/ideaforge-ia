
import React from 'react';
import { CheckCircle, Users, Palette, Megaphone, Code, Target } from 'lucide-react';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';

const AgentsSection = () => {
  const agents = [
    {
      name: 'Agente de Validação',
      icon: Target,
      color: 'text-ideaforge-primary',
      bgColor: 'bg-ideaforge-primary bg-opacity-20',
      description: 'Analisa a viabilidade da sua ideia no mercado atual',
      features: [
        'Análise de mercado',
        'Identificação de concorrentes',
        'Validação de demanda',
        'Riscos e oportunidades'
      ]
    },
    {
      name: 'Agente de Negócios',
      icon: Users,
      color: 'text-ideaforge-success',
      bgColor: 'bg-ideaforge-success bg-opacity-20',
      description: 'Desenvolve o modelo de negócio e estratégias de monetização',
      features: [
        'Canvas do modelo de negócio',
        'Estratégias de monetização',
        'Análise de custos',
        'Projeções financeiras'
      ]
    },
    {
      name: 'Agente de Design',
      icon: Palette,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400 bg-opacity-20',
      description: 'Cria a identidade visual e experiência do usuário',
      features: [
        'Identidade visual',
        'Wireframes básicos',
        'Paleta de cores',
        'Guidelines de design'
      ]
    },
    {
      name: 'Agente de Marketing',
      icon: Megaphone,
      color: 'text-ideaforge-warning',
      bgColor: 'bg-ideaforge-warning bg-opacity-20',
      description: 'Desenvolve estratégias de marketing e posicionamento',
      features: [
        'Estratégia de marketing',
        'Persona do cliente',
        'Canais de aquisição',
        'Campanha de lançamento'
      ]
    },
    {
      name: 'Agente Técnico',
      icon: Code,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400 bg-opacity-20',
      description: 'Define a arquitetura e stack tecnológico ideal',
      features: [
        'Arquitetura do sistema',
        'Stack tecnológico',
        'Cronograma de desenvolvimento',
        'Estimativas de recursos'
      ]
    }
  ];

  return (
    <section id="agents" className="py-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bitter font-bold text-ideaforge-text-primary mb-4">
            Conheça Nossos Agentes Especialistas
          </h2>
          <p className="text-lg text-ideaforge-text-secondary font-exo max-w-2xl mx-auto">
            Cada agente é especializado em uma área específica do desenvolvimento de negócios, 
            garantindo uma análise completa e profissional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <IdeaForgeCard 
                key={index} 
                variant="agent" 
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 ${agent.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`w-6 h-6 ${agent.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bitter font-semibold text-ideaforge-text-primary mb-2">
                      {agent.name}
                    </h3>
                    <p className="text-ideaforge-text-secondary font-exo text-sm leading-relaxed">
                      {agent.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {agent.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-ideaforge-success flex-shrink-0" />
                      <span className="text-sm font-exo text-ideaforge-text-primary">{feature}</span>
                    </div>
                  ))}
                </div>
              </IdeaForgeCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
