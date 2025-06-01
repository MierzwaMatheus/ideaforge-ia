import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';
import { Settings, Plus, FileText, CheckCircle, Calendar, User, Home, FileSearch } from 'lucide-react';

// Mock data para demonstração
const mockProjects = [
  {
    id: 1,
    name: "EcoFood App",
    type: "Aplicativo",
    description: "App para delivery de comida sustentável",
    lastUpdate: "Há 2 dias",
    documents: [
      { type: "pitch", completed: true },
      { type: "canvas", completed: true },
      { type: "landing", completed: false }
    ]
  },
  {
    id: 2,
    name: "Consultoria Verde",
    type: "Serviço/Consultoria",
    description: "Consultoria em sustentabilidade empresarial",
    lastUpdate: "Há 1 semana",
    documents: [
      { type: "pitch", completed: true },
      { type: "marketing", completed: true },
      { type: "viabilidade", completed: true }
    ]
  }
];

const mockRecentDocuments = [
  {
    id: 1,
    name: "Pitch Deck",
    project: "EcoFood App",
    type: "pitch",
    date: "2024-05-30"
  },
  {
    id: 2,
    name: "Business Canvas",
    project: "EcoFood App", 
    type: "canvas",
    date: "2024-05-28"
  },
  {
    id: 3,
    name: "Plano de Marketing",
    project: "Consultoria Verde",
    type: "marketing",
    date: "2024-05-25"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleCreateProject = () => {
    navigate('/onboarding');
  };

  const handleProjectClick = (projectId: number) => {
    navigate(`/project/${projectId}`);
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'pitch':
        return <FileText className="w-4 h-4" />;
      case 'canvas':
        return <FileText className="w-4 h-4" />;
      case 'landing':
        return <FileText className="w-4 h-4" />;
      case 'marketing':
        return <FileText className="w-4 h-4" />;
      case 'viabilidade':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ideaforge-bg-primary pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-ideaforge-bg-primary border-b border-ideaforge-text-secondary border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bitter font-bold text-ideaforge-text-primary">
              Meus Projetos
            </h1>
            <button className="p-2 text-ideaforge-text-secondary hover:text-ideaforge-primary ideaforge-transition">
              <Settings className="w-6 h-6" />
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-ideaforge-bg-secondary text-ideaforge-text-primary placeholder-ideaforge-text-secondary px-4 py-3 rounded-lg border border-ideaforge-text-secondary border-opacity-20 focus:border-ideaforge-primary focus:outline-none ideaforge-transition"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Projects List */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-4 mb-8">
            {filteredProjects.map((project) => (
              <IdeaForgeCard
                key={project.id}
                variant="default"
                className="cursor-pointer hover:border-ideaforge-primary hover:border-opacity-40"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bitter font-semibold text-ideaforge-text-primary">
                        {project.name}
                      </h3>
                      <p className="text-sm font-exo text-ideaforge-text-secondary">
                        {project.type}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm font-exo text-ideaforge-text-secondary">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-exo text-ideaforge-text-secondary">
                      <Calendar className="w-3 h-3" />
                      {project.lastUpdate}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {project.documents.map((doc, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                            doc.completed
                              ? 'bg-ideaforge-success bg-opacity-20 text-ideaforge-success'
                              : 'bg-ideaforge-text-secondary bg-opacity-20 text-ideaforge-text-secondary'
                          }`}
                        >
                          {getDocumentIcon(doc.type)}
                          {doc.completed && <CheckCircle className="w-3 h-3" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </IdeaForgeCard>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-ideaforge-bg-secondary rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-ideaforge-text-secondary" />
            </div>
            <h3 className="text-lg font-bitter font-semibold text-ideaforge-text-primary mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-ideaforge-text-secondary font-exo mb-6 max-w-xs">
              {searchTerm 
                ? "Tente ajustar sua busca ou criar um novo projeto"
                : "Que tal criar seu primeiro projeto e começar a jornada?"
              }
            </p>
            <IdeaForgeButton onClick={handleCreateProject}>
              Criar Primeiro Projeto
            </IdeaForgeButton>
          </div>
        )}

        {/* Recent Documents Section */}
        {filteredProjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bitter font-semibold text-ideaforge-text-primary mb-4">
              Documentos Recentes
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {mockRecentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex-shrink-0 w-48 bg-ideaforge-bg-secondary rounded-lg p-4 border border-ideaforge-text-secondary border-opacity-20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {getDocumentIcon(doc.type)}
                    <span className="text-sm font-exo font-semibold text-ideaforge-text-primary">
                      {doc.name}
                    </span>
                  </div>
                  <p className="text-xs font-exo text-ideaforge-text-secondary mb-1">
                    {doc.project}
                  </p>
                  <p className="text-xs font-exo text-ideaforge-text-secondary">
                    {new Date(doc.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleCreateProject}
        className="fixed bottom-24 right-4 w-14 h-14 bg-ideaforge-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 ideaforge-transition z-20"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-ideaforge-bg-secondary border-t border-ideaforge-text-secondary border-opacity-20 z-10">
        <div className="grid grid-cols-3 h-16">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center gap-1 ideaforge-transition ${
              activeTab === 'dashboard'
                ? 'text-ideaforge-primary'
                : 'text-ideaforge-text-secondary hover:text-ideaforge-text-primary'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-exo">Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex flex-col items-center justify-center gap-1 ideaforge-transition ${
              activeTab === 'documents'
                ? 'text-ideaforge-primary'
                : 'text-ideaforge-text-secondary hover:text-ideaforge-text-primary'
            }`}
          >
            <FileSearch className="w-5 h-5" />
            <span className="text-xs font-exo">Documentos</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center justify-center gap-1 ideaforge-transition ${
              activeTab === 'settings'
                ? 'text-ideaforge-primary'
                : 'text-ideaforge-text-secondary hover:text-ideaforge-text-primary'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs font-exo">Configurações</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
