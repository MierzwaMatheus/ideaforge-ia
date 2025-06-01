
import React, { useState } from 'react';
import { FileText, Download, Eye, Edit, Share, Calendar } from 'lucide-react';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';
import DocumentViewer from './DocumentViewer';

interface Document {
  id: string;
  title: string;
  type: 'pitch' | 'canvas' | 'landing' | 'marketing' | 'viabilidade';
  content: string;
  createdAt: Date;
  preview: string;
}

interface ProjectDocumentsProps {
  projectId: string;
}

// Mock documents data
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Pitch Deck',
    type: 'pitch',
    content: '<h1>EcoFood App - Pitch Deck</h1><p>Revolucionando o delivery sustentável...</p>',
    createdAt: new Date('2024-05-30'),
    preview: 'Apresentação completa do projeto EcoFood App para investidores, incluindo problema, solução, mercado e projeções financeiras.'
  },
  {
    id: '2',
    title: 'Business Canvas',
    type: 'canvas',
    content: '<h1>Business Model Canvas</h1><p>Modelo de negócio visual do EcoFood App...</p>',
    createdAt: new Date('2024-05-28'),
    preview: 'Canvas visual do modelo de negócio, destacando parceiros-chave, atividades principais e proposta de valor.'
  }
];

const getDocumentIcon = (type: string) => {
  const iconProps = { className: "w-5 h-5" };
  switch (type) {
    case 'pitch':
      return <FileText {...iconProps} />;
    case 'canvas':
      return <FileText {...iconProps} />;
    case 'landing':
      return <FileText {...iconProps} />;
    case 'marketing':
      return <FileText {...iconProps} />;
    case 'viabilidade':
      return <FileText {...iconProps} />;
    default:
      return <FileText {...iconProps} />;
  }
};

const getDocumentTypeLabel = (type: string) => {
  const labels = {
    pitch: 'Pitch Deck',
    canvas: 'Business Canvas',
    landing: 'Landing Page',
    marketing: 'Plano de Marketing',
    viabilidade: 'Análise de Viabilidade'
  };
  return labels[type as keyof typeof labels] || type;
};

const ProjectDocuments: React.FC<ProjectDocumentsProps> = ({ projectId }) => {
  const [documents] = useState<Document[]>(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleExportDocument = (document: Document) => {
    console.log('Exportando documento:', document.title);
    // TODO: Implement export functionality
  };

  const handleShareDocument = (document: Document) => {
    console.log('Compartilhando documento:', document.title);
    // TODO: Implement share functionality
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (selectedDocument) {
    return (
      <DocumentViewer
        document={selectedDocument}
        onBack={() => setSelectedDocument(null)}
        onExport={() => handleExportDocument(selectedDocument)}
        onShare={() => handleShareDocument(selectedDocument)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {documents.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bitter font-semibold text-ideaforge-text-primary">
            Documentos Gerados
          </h2>
          
          {documents.map((document) => (
            <IdeaForgeCard key={document.id} variant="document">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-ideaforge-primary bg-opacity-20 rounded-lg flex items-center justify-center">
                    <div className="text-ideaforge-primary">
                      {getDocumentIcon(document.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bitter font-semibold text-ideaforge-text-primary">
                      {document.title}
                    </h3>
                    <p className="text-sm font-exo text-ideaforge-text-secondary">
                      {getDocumentTypeLabel(document.type)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-ideaforge-text-secondary" />
                      <span className="text-xs font-exo text-ideaforge-text-secondary">
                        {formatDate(document.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm font-exo text-ideaforge-text-secondary leading-relaxed">
                  {document.preview}
                </p>

                <div className="flex flex-wrap gap-2">
                  <IdeaForgeButton
                    size="sm"
                    onClick={() => handleViewDocument(document)}
                    className="flex-1 sm:flex-none"
                  >
                    <Eye className="w-4 h-4" />
                    Visualizar
                  </IdeaForgeButton>
                  
                  <IdeaForgeButton
                    variant="secondary"
                    size="sm"
                    onClick={() => handleExportDocument(document)}
                    className="flex-1 sm:flex-none"
                  >
                    <Download className="w-4 h-4" />
                    Exportar
                  </IdeaForgeButton>
                  
                  <IdeaForgeButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShareDocument(document)}
                    className="flex-1 sm:flex-none"
                  >
                    <Share className="w-4 h-4" />
                    Compartilhar
                  </IdeaForgeButton>
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
            Nenhum documento gerado
          </h3>
          <p className="text-ideaforge-text-secondary font-exo mb-6 max-w-sm">
            Vá para a aba Chat e converse com nossos agentes de IA para gerar seus primeiros documentos.
          </p>
          <IdeaForgeButton variant="secondary">
            Ir para Chat
          </IdeaForgeButton>
        </div>
      )}
    </div>
  );
};

export default ProjectDocuments;
