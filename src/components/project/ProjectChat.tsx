import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, ChevronDown } from 'lucide-react';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, set, push, onValue, off } from '@/lib/firebase';
import { getAgentResponse } from '@/services/ideiaforge_agents';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentType?: string;
}

interface ProjectChatProps {
  projectId: string;
}

const agents = [
  { id: 'valida_ia', name: 'Valida IA', description: 'Validação de ideias' },
  { id: 'strategos_ai', name: 'Strategos AI', description: 'Estratégia de negócios' },
  { id: 'pixel_ai', name: 'Pixel AI', description: 'Design e UX' },
  { id: 'impulso_ai', name: 'Impulso AI', description: 'Marketing e vendas' },
  { id: 'construtor_ai', name: 'Construtor AI', description: 'Desenvolvimento técnico' }
];

const documents = [
  { id: 'pitch', name: 'Pitch Deck' },
  { id: 'canvas', name: 'Business Canvas' },
  { id: 'landing', name: 'Landing Page' },
  { id: 'marketing', name: 'Plano de Marketing' },
  { id: 'viabilidade', name: 'Análise de Viabilidade' }
];

const ProjectChat: React.FC<ProjectChatProps> = ({ projectId }) => {
  console.log('[ProjectChat] projectId recebido:', projectId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeAgent, setActiveAgent] = useState('valida_ia');
  const [isTyping, setIsTyping] = useState(false);
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [showDocumentDropdown, setShowDocumentDropdown] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;
    const db = getDatabase();
    const chatPath = `users/${user.uid}/projects/${projectId}/chats/${activeAgent}/messages`;
    const chatRef = ref(db, chatPath);
    const handleValue = (snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const msgs = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
          timestamp: value && (value as any).timestamp ? new Date((value as any).timestamp) : new Date()
        }));
        setMessages(msgs);
      } else {
        setMessages([]);
      }
    };
    onValue(chatRef, handleValue);
    return () => off(chatRef, 'value', handleValue);
  }, [projectId, activeAgent]);

  useEffect(() => {
    console.log('[ProjectChat] activeAgent:', activeAgent);
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;
    const db = getDatabase();
    const chatPath = `users/${user.uid}/projects/${projectId}/chats/${activeAgent}/messages`;

    setIsTyping(true);
    setNewMessage('');

    // 1. Salvar mensagem do usuário no banco
    const userMsgRef = push(ref(db, chatPath));
    const userMsgData = {
      sender: 'user',
      content: newMessage,
      timestamp: Date.now(),
    };
    await set(userMsgRef, userMsgData);

    // 2. Buscar chave da API do usuário
    const apiKeySnap = await get(ref(db, `users/${user.uid}/googleAiApiKey`));
    const apiKey = apiKeySnap.exists() ? apiKeySnap.val() : '';

    // 3. Buscar resposta da IA
    const agentResponse = await getAgentResponse(projectId, activeAgent, newMessage, apiKey);

    // 4. Salvar resposta do agente no banco
    const agentMsgRef = push(ref(db, chatPath));
    const agentMsgData = {
      sender: 'agent',
      content: agentResponse,
      timestamp: Date.now(),
      agentType: activeAgent,
    };
    await set(agentMsgRef, agentMsgData);

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGenerateDocument = (documentType: string) => {
    const documentData = documents.find(doc => doc.id === documentType);
    console.log(`Gerando documento: ${documentData?.name}`);
    setShowDocumentDropdown(false);
    // TODO: Implement document generation logic
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getAgentAvatar = (agentType: string) => {
    const colors = {
      valida_ia: 'bg-green-500',
      strategos_ai: 'bg-blue-500',
      pixel_ai: 'bg-purple-500',
      impulso_ai: 'bg-orange-500',
      construtor_ai: 'bg-red-500'
    };
    return colors[agentType as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Agent Selection */}
      <div className="relative mb-4">
        <button
          onClick={() => setShowAgentDropdown(!showAgentDropdown)}
          className="w-full flex items-center justify-between p-3 bg-ideaforge-bg-secondary rounded-lg border border-ideaforge-text-secondary border-opacity-20"
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-exo ${getAgentAvatar(activeAgent)}`}>
              {agents.find(agent => agent.id === activeAgent)?.name.charAt(0)}
            </div>
            <div className="text-left">
              <p className="font-exo font-semibold text-ideaforge-text-primary">
                {agents.find(agent => agent.id === activeAgent)?.name}
              </p>
              <p className="text-xs font-exo text-ideaforge-text-secondary">
                {agents.find(agent => agent.id === activeAgent)?.description}
              </p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-ideaforge-text-secondary" />
        </button>

        {showAgentDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-ideaforge-bg-secondary border border-ideaforge-text-secondary border-opacity-20 rounded-lg z-10 max-h-64 overflow-y-auto">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => {
                  setActiveAgent(agent.id);
                  setShowAgentDropdown(false);
                }}
                className={`w-full flex items-center gap-3 p-3 hover:bg-ideaforge-bg-primary ideaforge-transition ${
                  activeAgent === agent.id ? 'bg-ideaforge-primary bg-opacity-20' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-exo ${getAgentAvatar(agent.id)}`}>
                  {agent.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-exo font-semibold text-ideaforge-text-primary">
                    {agent.name}
                  </p>
                  <p className="text-xs font-exo text-ideaforge-text-secondary">
                    {agent.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-0"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {message.sender === 'agent' && (
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-exo ${getAgentAvatar(message.agentType || 'valida_ia')}`}>
                    {agents.find(agent => agent.id === message.agentType)?.name.charAt(0)}
                  </div>
                  <span className="text-xs font-exo text-ideaforge-text-secondary">
                    {agents.find(agent => agent.id === message.agentType)?.name}
                  </span>
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-ideaforge-primary text-white rounded-br-md'
                    : 'bg-ideaforge-bg-secondary text-ideaforge-text-primary rounded-bl-md'
                }`}
              >
                {message.sender === 'agent' ? (
                  <div
                    className="font-exo text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: message.content.replace(/^```html|```$/g, '').trim() }}
                  />
                ) : (
                  <p className="font-exo text-sm leading-relaxed">{message.content}</p>
                )}
              </div>
              <p className={`text-xs font-exo text-ideaforge-text-secondary mt-1 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}>
                {formatTimestamp(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-exo ${getAgentAvatar(activeAgent)}`}>
                  {agents.find(agent => agent.id === activeAgent)?.name.charAt(0)}
                </div>
                <span className="text-xs font-exo text-ideaforge-text-secondary">
                  {agents.find(agent => agent.id === activeAgent)?.name}
                </span>
              </div>
              <div className="bg-ideaforge-bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-ideaforge-text-secondary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-ideaforge-text-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-ideaforge-text-secondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Document Generation Button */}
      <div className="relative mb-4">
        <button
          onClick={() => setShowDocumentDropdown(!showDocumentDropdown)}
          className="w-full flex items-center justify-center gap-2 p-3 bg-ideaforge-success bg-opacity-20 text-ideaforge-success border border-ideaforge-success border-opacity-40 rounded-lg hover:bg-opacity-30 ideaforge-transition"
        >
          <FileText className="w-4 h-4" />
          <span className="font-exo font-medium">Gerar Documento</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {showDocumentDropdown && (
          <div className="absolute bottom-full left-0 right-0 mb-1 bg-ideaforge-bg-secondary border border-ideaforge-text-secondary border-opacity-20 rounded-lg z-10">
            {documents.map((document) => (
              <button
                key={document.id}
                onClick={() => handleGenerateDocument(document.id)}
                className="w-full flex items-center gap-3 p-3 hover:bg-ideaforge-bg-primary ideaforge-transition first:rounded-t-lg last:rounded-b-lg"
              >
                <FileText className="w-4 h-4 text-ideaforge-text-secondary" />
                <span className="font-exo text-ideaforge-text-primary">{document.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="flex gap-3">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-ideaforge-bg-secondary text-ideaforge-text-primary placeholder-ideaforge-text-secondary px-4 py-3 rounded-lg border border-transparent focus:border-ideaforge-primary focus:outline-none resize-none font-exo ideaforge-transition"
          rows={1}
          style={{ minHeight: '48px', maxHeight: '120px' }}
        />
        <IdeaForgeButton
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || isTyping}
          className="h-12 w-12 p-0"
        >
          <Send className="w-4 h-4" />
        </IdeaForgeButton>
      </div>
    </div>
  );
};

export default ProjectChat;
