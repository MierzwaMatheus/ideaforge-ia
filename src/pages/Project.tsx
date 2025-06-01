
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectChat from '@/components/project/ProjectChat';
import ProjectDocuments from '@/components/project/ProjectDocuments';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';

const Project = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat');

  // Mock project data - in real app, would fetch based on projectId
  const project = {
    id: projectId,
    name: "EcoFood App",
    type: "Aplicativo",
    description: "App para delivery de comida sustentável"
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-ideaforge-bg-primary flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-ideaforge-bg-primary border-b border-ideaforge-text-secondary border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="p-2 text-ideaforge-text-secondary hover:text-ideaforge-primary ideaforge-transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bitter font-bold text-ideaforge-text-primary">
                  {project.name}
                </h1>
                <p className="text-sm font-exo text-ideaforge-text-secondary">
                  {project.type}
                </p>
              </div>
            </div>
            <button className="p-2 text-ideaforge-text-secondary hover:text-ideaforge-primary ideaforge-transition">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 bg-ideaforge-bg-secondary rounded-lg p-1 mb-4">
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-ideaforge-primary data-[state=active]:text-white text-ideaforge-text-secondary font-exo"
            >
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-ideaforge-primary data-[state=active]:text-white text-ideaforge-text-secondary font-exo"
            >
              Documentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 mt-0">
            <ProjectChat projectId={project.id} />
          </TabsContent>

          <TabsContent value="documents" className="flex-1 mt-0">
            <ProjectDocuments projectId={project.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Project;
