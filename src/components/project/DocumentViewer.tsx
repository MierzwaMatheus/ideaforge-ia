
import React from 'react';
import { ArrowLeft, Download, Share, ChevronLeft, ChevronRight } from 'lucide-react';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';

interface Document {
  id: string;
  title: string;
  type: string;
  content: string;
  createdAt: Date;
  preview: string;
}

interface DocumentViewerProps {
  document: Document;
  onBack: () => void;
  onExport: () => void;
  onShare: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  onBack,
  onExport,
  onShare
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-ideaforge-text-secondary border-opacity-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-ideaforge-text-secondary hover:text-ideaforge-primary ideaforge-transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bitter font-bold text-ideaforge-text-primary">
              {document.title}
            </h1>
            <p className="text-sm font-exo text-ideaforge-text-secondary">
              Gerado em {document.createdAt.toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <IdeaForgeButton variant="secondary" size="sm" onClick={onExport}>
            <Download className="w-4 h-4" />
            Exportar
          </IdeaForgeButton>
          <IdeaForgeButton variant="ghost" size="sm" onClick={onShare}>
            <Share className="w-4 h-4" />
            Compartilhar
          </IdeaForgeButton>
        </div>
      </div>

      {/* Document Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-ideaforge-bg-secondary rounded-lg p-6">
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: document.content }}
            style={{
              color: '#E5E5E7',
              fontFamily: 'Exo, sans-serif'
            }}
          />
        </div>
      </div>

      {/* Navigation (for multi-page documents like Pitch Deck) */}
      {document.type === 'pitch' && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-ideaforge-text-secondary border-opacity-20">
          <IdeaForgeButton variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </IdeaForgeButton>
          
          <span className="text-sm font-exo text-ideaforge-text-secondary">
            Slide 1 de 10
          </span>
          
          <IdeaForgeButton variant="ghost" size="sm">
            Próximo
            <ChevronRight className="w-4 h-4" />
          </IdeaForgeButton>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;
