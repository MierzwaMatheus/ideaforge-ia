import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from '@/lib/firebase';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';
import { Settings, Plus, FileText, CheckCircle, Calendar, User, Home, FileSearch } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('Usuário não autenticado');
        const db = getDatabase();
        const projectsRef = ref(db, `users/${user.uid}/projects`);
        const snapshot = await get(projectsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Converter objeto para array
          const projectsArray = Object.entries(data).map(([id, value]) => ({ id, ...value }));
          setProjects(projectsArray);
        } else {
          setProjects([]);
        }
      } catch (error) {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleCreateProject = () => {
    navigate('/onboarding');
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const getDocumentIcon = (type) => {
    return <FileText className="w-4 h-4" />;
  };

  const filteredProjects = projects.filter(project =>
    project.projectName?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <button className="p-2 text-ideaforge-text-secondary hover:text-ideaforge-primary ideaforge-transition" title="Configurações">
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
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-ideaforge-bg-secondary rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-ideaforge-text-secondary animate-pulse" />
            </div>
            <h3 className="text-lg font-bitter font-semibold text-ideaforge-text-primary mb-2">
              Carregando projetos...
            </h3>
          </div>
        )}
        {/* Projects List */}
        {!loading && filteredProjects.length > 0 ? (
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
                        {project.projectName}
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
                      {(project.documents || []).map((doc, index) => (
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
        ) : null}
        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
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
        {/* Recent Documents Section - pode ser adaptado para buscar do DB também */}
      </div>
      {/* Floating Action Button */}
      <button
        onClick={handleCreateProject}
        className="fixed bottom-24 right-4 w-14 h-14 bg-ideaforge-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 ideaforge-transition z-20"
        title="Criar novo projeto"
      >
        <Plus className="w-6 h-6" />
      </button>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-ideaforge-bg-secondary border-t border-ideaforge-text-secondary border-opacity-20 z-10">
        <div className="grid grid-cols-3 h-16">
          <button
            onClick={() => { setActiveTab('dashboard'); navigate('/dashboard'); }}
            className={`flex flex-col items-center justify-center gap-1 ideaforge-transition ${
              activeTab === 'dashboard'
                ? 'text-ideaforge-primary'
                : 'text-ideaforge-text-secondary hover:text-ideaforge-text-primary'
            }`}
            title="Dashboard"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-exo">Dashboard</span>
          </button>
          <button
            onClick={() => { setActiveTab('documents'); navigate('/dashboard?tab=documents'); }}
            className={`flex flex-col items-center justify-center gap-1 ideaforge-transition ${
              activeTab === 'documents'
                ? 'text-ideaforge-primary'
                : 'text-ideaforge-text-secondary hover:text-ideaforge-text-primary'
            }`}
            title="Documentos"
          >
            <FileSearch className="w-5 h-5" />
            <span className="text-xs font-exo">Documentos</span>
          </button>
          <button
            onClick={() => { setActiveTab('settings'); navigate('/settings'); }}
            className={`flex flex-col items-center justify-center gap-1 ideaforge-transition ${
              activeTab === 'settings'
                ? 'text-ideaforge-primary'
                : 'text-ideaforge-text-secondary hover:text-ideaforge-text-primary'
            }`}
            title="Configurações"
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
