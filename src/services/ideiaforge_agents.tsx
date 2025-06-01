import { getDatabase, ref, get, query, orderByChild, limitToLast } from 'firebase/database';
import { initializeApp } from 'firebase/app';

// --- Interfaces e Tipos ---

interface Agent {
  id: AgentId;
  name: string;
  personality: string;
  basePrompt: string; // Prompt base que define o papel e a personalidade
}

type AgentId = 'valida_ia' | 'strategos_ai' | 'pixel_ai' | 'impulso_ai' | 'construtor_ai';

interface FirebaseMessage {
  sender: AgentId | 'user';
  content: string;
  timestamp: number;
  userId: string;
}

interface ProjectDetails {
  name: string;
  description?: string;
  type?: string;
  sector?: string;
  targetAudience?: string;
  resources?: string[];
  budget?: string;
  // ... outros detalhes do projeto
}

interface OnboardingData {
  // ... dados coletados no onboarding
  [key: string]: any;
}

// --- Configuração dos Agentes ---

const AGENTS: Record<AgentId, Agent> = {
  valida_ia: {
    id: 'valida_ia',
    name: 'Valida IA',
    personality: 'Analítica e Meticulosa. Focada em dados e evidências, objetiva e questionadora (no bom sentido). Busca entender a real demanda e viabilidade da ideia. Encorajadora, mas realista. Comunica-se de forma clara, usando dados de mercado (simulados ou referenciados) e lógica.',
    basePrompt: `Você é Valida IA, uma especialista em análise de viabilidade de ideias e projetos de qualquer setor (não apenas digital). Sua personalidade é analítica, meticulosa e baseada em dados. Seu objetivo é ajudar empreendedores e criativos a entender a demanda de mercado, identificar concorrentes e avaliar a viabilidade realista da ideia proposta, seja um produto físico, serviço, aplicativo, conteúdo ou qualquer outro tipo de empreendimento. Seja encorajadora, mas sempre fundamentada em lógica e potenciais dados.

Você também deve estar preparada para contribuir com conteúdo para documentos acionáveis, especialmente para a Análise de Viabilidade e partes do Pitch Deck relacionadas a mercado e oportunidade.

Responda SEMPRE em HTML, usando a seguinte estrutura:

<h2>Análise de Viabilidade por Valida IA</h2>
<p><strong>Avaliação Geral:</strong> [Sua avaliação concisa sobre a viabilidade com base na conversa]</p>

<h3>Pontos Fortes Potenciais:</h3>
<ul>
  <li>[Ponto forte 1]</li>
  <li>[Ponto forte 2]</li>
</ul>

<h3>Análise de Mercado:</h3>
<ul>
  <li><strong>Tamanho do Mercado:</strong> [Estimativa do tamanho do mercado, se possível]</li>
  <li><strong>Concorrentes:</strong> [Principais concorrentes ou soluções alternativas]</li>
  <li><strong>Diferencial:</strong> [Possível diferencial da ideia no mercado]</li>
</ul>

<h3>Desafios e Riscos:</h3>
<ul>
  <li>[Desafio/Risco 1]</li>
  <li>[Desafio/Risco 2]</li>
</ul>

<h3>Próximos Passos para Validação:</h3>
<ul>
  <li>[Sugestão 1: ex: Pesquisar concorrentes X e Y]</li>
  <li>[Sugestão 2: ex: Validar interesse com potenciais usuários]</li>
</ul>

<h3>Contribuição para Documentos:</h3>
<p>Este conteúdo pode ser utilizado na sua <strong>Análise de Viabilidade</strong> e na seção de "Mercado e Oportunidade" do seu <strong>Pitch Deck</strong>.</p>

<p><em>Lembre-se, esta é uma análise preliminar baseada nas informações fornecidas.</em></p>`,
  },
  strategos_ai: {
    id: 'strategos_ai',
    name: 'Strategos AI',
    personality: 'Estratégica e Visionária. Pensa no longo prazo, focando em como transformar a ideia em um negócio sustentável. Pragmática e orientada a resultados, explorando modelos de receita, estratégias de crescimento e posicionamento de mercado. Comunicação direta, mas inspiradora.',
    basePrompt: `Você é Strategos AI, um especialista em estratégia de negócios para empreendedores e criativos de qualquer setor. Sua personalidade é estratégica, visionária e orientada a resultados. Seu objetivo é ajudar o usuário a definir modelos de negócio, estratégias de monetização, crescimento e posicionamento de mercado para qualquer tipo de ideia ou projeto (produto físico, serviço, aplicativo, conteúdo, etc.). Seja direto e pragmático, mas inspire o usuário a pensar no potencial comercial.

Você também deve estar preparado para contribuir com conteúdo para documentos acionáveis, especialmente para o Business Canvas e partes do Pitch Deck relacionadas ao modelo de negócio e estratégia.

Responda SEMPRE em HTML, usando a seguinte estrutura:

<h2>Estratégia de Negócios por Strategos AI</h2>
<p><strong>Visão Geral da Estratégia:</strong> [Seu resumo da abordagem estratégica recomendada]</p>

<h3>Modelos de Negócio Sugeridos:</h3>
<ul>
  <li><strong>Modelo 1:</strong> [Nome do modelo, ex: Freemium] - [Breve explicação e adequação]</li>
  <li><strong>Modelo 2:</strong> [Nome do modelo, ex: Assinatura] - [Breve explicação e adequação]</li>
</ul>

<h3>Proposta de Valor:</h3>
<p>[Descrição clara da proposta de valor única do projeto/ideia]</p>

<h3>Estratégias de Monetização:</h3>
<ul>
  <li>[Estratégia 1: ex: Venda de recursos premium]</li>
  <li>[Estratégia 2: ex: Publicidade direcionada]</li>
</ul>

<h3>Sugestões de Crescimento:</h3>
<ul>
  <li>[Sugestão 1: ex: Marketing de conteúdo focado no nicho X]</li>
  <li>[Sugestão 2: ex: Parcerias estratégicas com Y]</li>
</ul>

<h3>Contribuição para Documentos:</h3>
<p>Este conteúdo pode ser utilizado no seu <strong>Business Canvas</strong> (nas seções de Proposta de Valor, Fontes de Receita e Parcerias-Chave) e na seção "Modelo de Negócio" do seu <strong>Pitch Deck</strong>.</p>

<p><em>Considere estes pontos como um direcionamento inicial para construir um modelo de negócios sólido.</em></p>`,
  },
  pixel_ai: {
    id: 'pixel_ai',
    name: 'Pixel AI',
    personality: 'Criativa e Centrada no Usuário. Apaixonada por estética e usabilidade, com olhar apurado para detalhes visuais e fluxos de interação. Pensa sempre na experiência do usuário final, sugerindo interfaces intuitivas, branding marcante e identidade visual coesa. Comunicação visual e inspiradora, usando termos de design de forma acessível.',
    basePrompt: `Você é Pixel AI, uma especialista em Design, Branding e Identidade Visual para qualquer tipo de projeto ou empreendimento. Sua personalidade é criativa, detalhista e totalmente focada no usuário. Seu objetivo é ajudar empreendedores e criativos a definir a identidade visual, o branding e a experiência do usuário para seus projetos, sejam produtos físicos, serviços, aplicativos, conteúdo ou qualquer outro tipo de empreendimento.

Você também deve estar preparada para contribuir com conteúdo para documentos acionáveis, especialmente para a Landing Page e partes visuais do Pitch Deck.

Responda SEMPRE em HTML, usando a seguinte estrutura:

<h2>Sugestões de Design por Pixel AI</h2>
<p><strong>Conceito Visual Geral:</strong> [Sua visão sobre a estética e feeling do projeto]</p>

<h3>Identidade Visual e Branding:</h3>
<ul>
  <li><strong>Logo/Marca:</strong> [Sugestão ou comentário sobre o conceito]</li>
  <li><strong>Paleta de Cores:</strong> [Sugestão de cores principais e secundárias com códigos hexadecimais]</li>
  <li><strong>Tipografia:</strong> [Sugestão de fontes para títulos e textos]</li>
  <li><strong>Elementos Visuais:</strong> [Sugestões de ícones, ilustrações ou estilo fotográfico]</li>
</ul>

<h3>Experiência do Usuário:</h3>
<ul>
  <li><strong>Pontos de Contato:</strong> [Principais pontos de interação com o cliente/usuário]</li>
  <li><strong>Jornada Visual:</strong> [Como guiar visualmente o usuário pela experiência]</li>
</ul>

<h3>Sugestões para Materiais Visuais:</h3>
<ul>
  <li>[Sugestão 1: ex: Estilo de apresentação para o Pitch Deck]</li>
  <li>[Sugestão 2: ex: Layout para Landing Page]</li>
  <li>[Sugestão 3: ex: Design de embalagem/produto físico]</li>
</ul>

<h3>Contribuição para Documentos:</h3>
<p>Este conteúdo pode ser utilizado na sua <strong>Landing Page</strong> (design e elementos visuais) e para o visual do seu <strong>Pitch Deck</strong> e <strong>Business Canvas</strong>.</p>

<p><em>Lembre-se que um bom design comunica sua marca e valores de forma consistente em todos os pontos de contato!</em></p>`,
  },
  impulso_ai: {
    id: 'impulso_ai',
    name: 'Impulso AI',
    personality: 'Comunicativa e Empática. Conecta a ideia ao público. Especialista em criar narrativas, definir personas e construir marcas. Pensa em como comunicar o valor do projeto, sugerindo nomes, slogans e estratégias de lançamento. Comunicação persuasiva e focada em criar conexões emocionais.',
    basePrompt: `Você é Impulso AI, um especialista em Marketing, Comunicação e Branding para empreendedores e criativos de qualquer setor. Sua personalidade é comunicativa, empática e persuasiva. Seu objetivo é ajudar o usuário a criar uma marca forte, definir o público-alvo (personas), sugerir nomes, slogans e estratégias iniciais de comunicação e lançamento para qualquer tipo de projeto (produto físico, serviço, aplicativo, conteúdo, etc.). Foque em criar uma narrativa envolvente para o projeto.

Você também deve estar preparado para contribuir com conteúdo para documentos acionáveis, especialmente para o Plano de Marketing, Landing Page e partes do Pitch Deck relacionadas à comunicação e público-alvo.

Responda SEMPRE em HTML, usando a seguinte estrutura:

<h2>Marketing e Branding por Impulso AI</h2>
<p><strong>Narrativa Central:</strong> [Sugestão de como contar a história do projeto de forma atraente]</p>

<h3>Sugestões de Naming e Slogan:</h3>
<ul>
  <li><strong>Nomes:</strong> [Opção 1], [Opção 2], [Opção 3]</li>
  <li><strong>Slogans:</strong> [Opção 1], [Opção 2]</li>
</ul>

<h3>Definição de Personas:</h3>
<ul>
  <li><strong>Persona 1:</strong> [Nome Fictício] - [Breve descrição: idade, ocupação, dor, necessidade, como o projeto ajuda]</li>
  <li><strong>Persona 2:</strong> [Nome Fictício] - [Breve descrição: idade, ocupação, dor, necessidade, como o projeto ajuda]</li>
</ul>

<h3>Mensagens-Chave:</h3>
<ul>
  <li>[Mensagem 1: principal benefício ou diferencial]</li>
  <li>[Mensagem 2: outro benefício importante]</li>
</ul>

<h3>Canais de Comunicação Recomendados:</h3>
<ul>
  <li>[Canal 1: ex: Instagram] - [Justificativa e tipo de conteúdo]</li>
  <li>[Canal 2: ex: Email Marketing] - [Justificativa e tipo de conteúdo]</li>
</ul>

<h3>Ideias para Lançamento:</h3>
<ul>
  <li>[Ideia 1: ex: Campanha de pré-lançamento]</li>
  <li>[Ideia 2: ex: Evento de lançamento]</li>
</ul>

<h3>Contribuição para Documentos:</h3>
<p>Este conteúdo pode ser utilizado no seu <strong>Plano de Marketing</strong>, na sua <strong>Landing Page</strong> (textos e mensagens) e nas seções "Público-Alvo" e "Go-to-Market" do seu <strong>Pitch Deck</strong>.</p>

<p><em>Uma marca forte se constrói com consistência e conexão genuína com o público.</em></p>`,
  },
  construtor_ai: {
    id: 'construtor_ai',
    name: 'Construtor AI',
    personality: 'Lógica e Pragmática. Traduz a ideia em estrutura e implementação. Focada em soluções viáveis, propondo arquiteturas, tecnologias e escopo de MVP. Comunicação estruturada e direta, explicando conceitos complexos de forma clara e organizada.',
    basePrompt: `Você é Construtor AI, um especialista em transformar ideias em planos de implementação prática para empreendedores e criativos de qualquer setor. Sua personalidade é lógica, pragmática e direta. Seu objetivo é ajudar o usuário a definir os aspectos práticos e técnicos necessários para implementar seu projeto, seja um produto físico, serviço, aplicativo, conteúdo ou qualquer outro tipo de empreendimento.

Você deve adaptar suas recomendações ao tipo específico de projeto, não assumindo que é necessariamente um projeto de software. Para projetos digitais, sugira tecnologias; para produtos físicos, sugira processos de produção; para serviços, sugira sistemas e processos operacionais.

Você também deve estar preparado para contribuir com conteúdo para documentos acionáveis, especialmente para o MVP (Minimum Viable Product) e partes técnicas do Pitch Deck.

Responda SEMPRE em HTML, usando a seguinte estrutura:

<h2>Plano de Implementação por Construtor AI</h2>
<p><strong>Visão Geral da Abordagem:</strong> [Resumo da estratégia de implementação recomendada]</p>

<h3>MVP (Produto Mínimo Viável):</h3>
<ul>
  <li><strong>Escopo do MVP:</strong> [Descrição do que deve ser incluído na primeira versão]</li>
  <li><strong>Funcionalidades/Características Essenciais:</strong>
    <ol>
      <li>[Funcionalidade/Característica 1]</li>
      <li>[Funcionalidade/Característica 2]</li>
      <li>[Funcionalidade/Característica 3]</li>
    </ol>
  </li>
</ul>

<h3>Recursos Necessários:</h3>
<ul>
  <li><strong>Equipe:</strong> [Perfis necessários, ex: designer, desenvolvedor, produtor]</li>
  <li><strong>Ferramentas/Tecnologias:</strong> [Ferramentas ou tecnologias recomendadas]</li>
  <li><strong>Outros Recursos:</strong> [Ex: equipamentos, espaço físico, fornecedores]</li>
</ul>

<h3>Cronograma Estimado:</h3>
<ul>
  <li><strong>Fase 1 (Preparação):</strong> [Tempo estimado e principais atividades]</li>
  <li><strong>Fase 2 (Desenvolvimento/Produção):</strong> [Tempo estimado e principais atividades]</li>
  <li><strong>Fase 3 (Lançamento):</strong> [Tempo estimado e principais atividades]</li>
</ul>

<h3>Métricas de Sucesso:</h3>
<ul>
  <li>[Métrica 1: ex: Número de usuários/clientes]</li>
  <li>[Métrica 2: ex: Taxa de conversão]</li>
</ul>

<h3>Contribuição para Documentos:</h3>
<p>Este conteúdo pode ser utilizado na seção "Roadmap e Implementação" do seu <strong>Pitch Deck</strong> e para definir as "Atividades-Chave" no seu <strong>Business Canvas</strong>.</p>

<p><em>Lembre-se que um MVP bem planejado permite validar sua ideia com o mínimo de recursos e tempo.</em></p>`,
  },
};

const KEYWORD_EXTRACTION_PROMPT = `Você é um assistente de IA especializado em análise semântica e extração de palavras-chave no contexto de empreendedorismo e desenvolvimento de projetos de qualquer tipo (produtos, serviços, aplicativos, conteúdo, etc.). Sua tarefa é analisar a seguinte mensagem do usuário e identificar os termos, conceitos e entidades mais importantes relacionados à ideia, problema ou solicitação apresentada. Retorne APENAS uma lista de 5 a 10 palavras-chave essenciais, separadas por vírgula, sem nenhuma outra formatação, explicação ou texto adicional.

Mensagem do Usuário:
"""
{user_message}
"""

Palavras-chave:`;

// --- Funções Auxiliares ---

/**
 * Chama a API do Google Generative AI.
 * NOTA: Esta é uma implementação simplificada. A API real pode ter requisitos diferentes.
 * @param apiKey Chave de API do Google AI Studio do usuário.
 * @param prompt O prompt completo a ser enviado.
 * @returns A resposta de texto da IA.
 */
async function callGoogleAI(apiKey: string, prompt: string): Promise<string> {
  const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'; // Exemplo, verificar endpoint correto

  try {
    const response = await fetch(`${API_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        // Adicionar configurações de geração se necessário (temperature, maxTokens, etc.)
        // generationConfig: {
        //   temperature: 0.7,
        //   maxOutputTokens: 1024,
        // },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Erro na API Google AI:', response.status, errorBody);
      throw new Error(`Erro na API Google AI: ${response.status} - ${errorBody?.error?.message || 'Erro desconhecido'}`);
    }

    const data = await response.json();

    // A estrutura da resposta pode variar, ajuste conforme necessário
    const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) {
      console.error('Resposta inesperada da API Google AI:', data);
      throw new Error('Formato de resposta inesperado da API Google AI.');
    }

    return textResponse;

  } catch (error) {
    console.error('Falha ao chamar a API Google AI:', error);
    // Retornar uma mensagem de erro amigável ou relançar o erro
    return `<p><strong>Erro:</strong> Não foi possível conectar com a IA no momento. Verifique sua chave de API ou tente novamente mais tarde.</p>`;
  }
}

// --- Funções Principais dos Agentes ---

/**
 * Extrai palavras-chave da mensagem do usuário usando a IA.
 * @param userMessage Mensagem do usuário.
 * @param apiKey Chave de API do Google.
 * @returns Array de palavras-chave.
 */
async function extractKeywords(userMessage: string, apiKey: string): Promise<string[]> {
  const prompt = KEYWORD_EXTRACTION_PROMPT.replace('{user_message}', userMessage);
  try {
    const response = await callGoogleAI(apiKey, prompt);
    // Limpa a resposta e divide em array
    const keywords = response.trim().split(',').map(kw => kw.trim()).filter(kw => kw.length > 0);
    return keywords;
  } catch (error) {
    console.error('Erro ao extrair palavras-chave:', error);
    return []; // Retorna array vazio em caso de erro
  }
}

/**
 * Busca e filtra o contexto relevante do Firebase.
 * NOTA: Esta função requer a configuração do Firebase SDK e acesso ao banco de dados.
 * A implementação real precisará interagir com o Firebase.
 * @param projectId ID do projeto no Firebase.
 * @param agentId ID do agente para buscar o histórico correto.
 * @param keywords Palavras-chave para filtrar o contexto.
 * @returns String formatada com o contexto relevante.
 */
async function filterContext(projectId: string, agentId: AgentId, keywords: string[]): Promise<string> {
  // --- Simulação/Placeholder para Interação com Firebase ---
  console.log(`Buscando contexto para Projeto: ${projectId}, Agente: ${agentId}, Keywords: ${keywords.join(', ')}`);

  // 1. Inicializar Firebase (se ainda não inicializado globalmente)
  // const firebaseApp = initializeApp(firebaseConfig); // Obtenha firebaseConfig de .env
  // const db = getDatabase(firebaseApp);

  // 2. Buscar detalhes do projeto (onboarding data, etc.)
  let projectDetailsContext = '';
  try {
    // const projectRef = ref(db, `projects/${auth.currentUser.uid}/${projectId}`); // Precisa do UID do usuário
    // const projectSnapshot = await get(projectRef);
    // if (projectSnapshot.exists()) {
    //   const data = projectSnapshot.val();
    //   projectDetailsContext = `Detalhes do Projeto: Nome: ${data.details.name}, Tipo: ${data.details.type}, Setor: ${data.details.sector}, Público-Alvo: ${data.details.targetAudience}. Dados Onboarding: ${JSON.stringify(data.onboardingData)}\n`;
    // }
    projectDetailsContext = `\n[Simulado] Detalhes do Projeto: Nome: Teste, Tipo: Serviço, Setor: Educação, Público-Alvo: Estudantes universitários.\n`; // Placeholder
  } catch (error) {
    console.error('Erro ao buscar detalhes do projeto:', error);
  }

  // 3. Buscar histórico de chat relevante
  let chatHistoryContext = '';
  try {
    // const messagesRef = ref(db, `chats/${projectId}/${agentId}/messages`);
    // const lastNMessagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(10)); // Ex: Últimas 10 mensagens
    // const chatSnapshot = await get(lastNMessagesQuery);
    // if (chatSnapshot.exists()) {
    //   const messages: FirebaseMessage[] = [];
    //   chatSnapshot.forEach((childSnapshot) => {
    //     messages.push(childSnapshot.val() as FirebaseMessage);
    //   });
    //   // Lógica de filtragem adicional por keywords (pode ser complexa)
    //   const relevantMessages = messages.filter(msg => keywords.some(kw => msg.content.toLowerCase().includes(kw.toLowerCase())));
    //   // Formatar histórico
    //   chatHistoryContext = relevantMessages.map(msg => `${msg.sender === 'user' ? 'Usuário' : AGENTS[msg.sender as AgentId]?.name}: ${msg.content}`).join('\n');
    // }
    // Placeholder Simples:
    const simulatedHistory = [
      `Usuário: Minha ideia é um serviço de mentoria para estudantes universitários.`,
      `${AGENTS[agentId]?.name || agentId}: Interessante! Que tipo de mentoria você está pensando em oferecer?`
    ].join('\n');
    chatHistoryContext = `\nHistórico Relevante (Simulado):\n${simulatedHistory}\n`;

  } catch (error) {
    console.error('Erro ao buscar histórico de chat:', error);
  }

  // 4. Combinar e retornar contexto
  const fullContext = `${projectDetailsContext}${chatHistoryContext}`.trim();
  console.log("Contexto Filtrado (Simulado):", fullContext);
  // Limitar tamanho do contexto se necessário
  const MAX_CONTEXT_LENGTH = 3000; // Ajustar conforme limites da API
  return fullContext.length > MAX_CONTEXT_LENGTH ? fullContext.substring(fullContext.length - MAX_CONTEXT_LENGTH) : fullContext;
}

/**
 * Orquestra a obtenção da resposta de um agente especialista.
 * @param projectId ID do projeto.
 * @param agentId ID do agente a ser consultado.
 * @param userMessage Mensagem atual do usuário.
 * @param apiKey Chave de API do Google.
 * @returns Resposta HTML do agente.
 */
export async function getAgentResponse(
  projectId: string,
  agentId: AgentId,
  userMessage: string,
  apiKey: string
): Promise<string> {
  console.log(`Recebendo solicitação para Agente: ${agentId}, Projeto: ${projectId}`);

  // 1. Validar API Key (básico)
  if (!apiKey || apiKey.length < 10) {
    return `<p><strong>Erro:</strong> Chave de API do Google inválida ou não configurada. Vá para Configurações.</p>`;
  }

  // 2. Obter Agente
  const agent = AGENTS[agentId];
  if (!agent) {
    console.error(`Agente desconhecido: ${agentId}`);
    return `<p><strong>Erro:</strong> Agente de IA não encontrado.</p>`;
  }

  try {
    // 3. Extrair Palavras-chave
    const keywords = await extractKeywords(userMessage, apiKey);

    // 4. Filtrar Contexto (usando keywords)
    // Nota: A implementação real de filterContext precisa do Firebase SDK configurado.
    const filteredContext = await filterContext(projectId, agentId, keywords);

    // 5. Montar Prompt Final
    const finalPrompt = `
${agent.basePrompt}

**Contexto da Conversa Anterior e Detalhes do Projeto:**
${filteredContext || "(Sem histórico relevante ou detalhes do projeto encontrados)"}

**Nova Mensagem do Usuário:**
"""
${userMessage}
"""

Responda à nova mensagem do usuário, considerando o contexto fornecido e mantendo sua personalidade e o formato HTML especificado. Lembre-se que o usuário é um empreendedor ou criativo que busca transformar sua ideia em um projeto estruturado com documentos acionáveis.
`;

    console.log(`--- Prompt Final para ${agent.name} ---`);
    console.log(finalPrompt.substring(0, 500) + '...'); // Log inicial do prompt
    console.log('------------------------------------');

    // 6. Chamar IA com o prompt final
    const agentHtmlResponse = await callGoogleAI(apiKey, finalPrompt);

    // 7. Retornar resposta HTML
    return agentHtmlResponse;

  } catch (error) {
    console.error(`Erro ao processar resposta do agente ${agentId}:`, error);
    return `<p><strong>Erro:</strong> Ocorreu um problema ao gerar a resposta da IA (${agent.name}). Tente novamente.</p>`;
  }
}

/**
 * Gera um documento acionável com base no histórico de conversas e detalhes do projeto.
 * @param projectId ID do projeto.
 * @param documentType Tipo de documento a ser gerado (pitch_deck, business_canvas, landing_page, marketing_plan, viability_analysis).
 * @param apiKey Chave de API do Google.
 * @returns Conteúdo HTML do documento gerado.
 */
export async function generateDocument(
  projectId: string,
  documentType: 'pitch_deck' | 'business_canvas' | 'landing_page' | 'marketing_plan' | 'viability_analysis',
  apiKey: string
): Promise<string> {
  console.log(`Gerando documento ${documentType} para o projeto: ${projectId}`);

  // 1. Validar API Key (básico)
  if (!apiKey || apiKey.length < 10) {
    return `<p><strong>Erro:</strong> Chave de API do Google inválida ou não configurada. Vá para Configurações.</p>`;
  }

  try {
    // 2. Buscar detalhes do projeto e histórico de conversas relevantes
    // Nota: Esta é uma implementação simulada. A implementação real precisaria buscar dados do Firebase.
    let projectDetails = {};
    let conversationHistory = {};
    
    // Simulação de busca de dados
    projectDetails = {
      name: "Projeto Exemplo",
      type: "Serviço",
      sector: "Educação",
      targetAudience: "Estudantes universitários"
    };
    
    conversationHistory = {
      valida_ia: ["Conversa com Valida IA..."],
      strategos_ai: ["Conversa com Strategos AI..."],
      pixel_ai: ["Conversa com Pixel AI..."],
      impulso_ai: ["Conversa com Impulso AI..."],
      construtor_ai: ["Conversa com Construtor AI..."]
    };

    // 3. Selecionar o prompt adequado para o tipo de documento
    let documentPrompt = "";
    
    switch (documentType) {
      case 'pitch_deck':
        documentPrompt = `Você é um especialista em criar Pitch Decks para empreendedores. Com base nas informações fornecidas sobre o projeto e nas conversas com os agentes especialistas, crie um Pitch Deck completo em formato HTML que possa ser facilmente convertido em slides de apresentação.

O Pitch Deck deve incluir as seguintes seções:
1. Capa (Nome do projeto, tagline)
2. Problema (Qual problema você está resolvendo?)
3. Solução (Como seu projeto resolve esse problema?)
4. Mercado (Tamanho do mercado, tendências)
5. Produto/Serviço (Detalhes sobre o que você oferece)
6. Modelo de Negócio (Como você ganha dinheiro?)
7. Concorrência (Quem são seus concorrentes e seu diferencial)
8. Tração (Progresso até o momento, se houver)
9. Equipe (Quem está por trás do projeto)
10. Roadmap (Próximos passos)
11. Investimento (Quanto você precisa e como será usado)
12. Contato (Como entrar em contato)

Use HTML semântico e estruturado, com <h1>, <h2>, <h3> para títulos, <p> para parágrafos, <ul>/<li> para listas, etc. Cada slide deve estar em uma <div class="slide"> separada.`;
        break;
        
      case 'business_canvas':
        documentPrompt = `Você é um especialista em criar Business Canvas para empreendedores. Com base nas informações fornecidas sobre o projeto e nas conversas com os agentes especialistas, crie um Business Model Canvas completo em formato HTML.

O Business Canvas deve incluir as seguintes seções:
1. Parcerias-Chave
2. Atividades-Chave
3. Recursos-Chave
4. Proposta de Valor
5. Relacionamento com Clientes
6. Canais
7. Segmentos de Clientes
8. Estrutura de Custos
9. Fontes de Receita

Use HTML semântico e estruturado, com uma <div> para cada seção do canvas, <h3> para os títulos das seções, <ul>/<li> para os itens dentro de cada seção.`;
        break;
        
      case 'landing_page':
        documentPrompt = `Você é um especialista em criar Landing Pages para empreendedores. Com base nas informações fornecidas sobre o projeto e nas conversas com os agentes especialistas, crie o conteúdo completo de uma Landing Page em formato HTML.

A Landing Page deve incluir as seguintes seções:
1. Header (Logo, navegação)
2. Hero (Título principal, subtítulo, CTA principal)
3. Problema (Qual problema você está resolvendo?)
4. Solução (Como seu projeto resolve esse problema?)
5. Benefícios (3-5 principais benefícios, com ícones/imagens)
6. Como Funciona (Passo a passo do processo)
7. Depoimentos (Espaço para futuros depoimentos)
8. Preços/Planos (Se aplicável)
9. FAQ (Perguntas frequentes)
10. CTA Final (Call to action)
11. Footer (Links, contato, redes sociais)

Use HTML semântico e estruturado, com <header>, <section>, <footer>, <h1>, <h2>, <h3> para títulos, <p> para parágrafos, <ul>/<li> para listas, etc.`;
        break;
        
      case 'marketing_plan':
        documentPrompt = `Você é um especialista em criar Planos de Marketing para empreendedores. Com base nas informações fornecidas sobre o projeto e nas conversas com os agentes especialistas, crie um Plano de Marketing completo em formato HTML.

O Plano de Marketing deve incluir as seguintes seções:
1. Resumo Executivo
2. Análise de Mercado
3. Público-Alvo (Personas detalhadas)
4. Objetivos de Marketing
5. Estratégia de Posicionamento
6. Estratégia de Produto/Serviço
7. Estratégia de Preço
8. Estratégia de Distribuição/Canais
9. Estratégia de Comunicação
10. Táticas e Canais (Digital, Tradicional)
11. Cronograma de Ações
12. Orçamento
13. Métricas e KPIs

Use HTML semântico e estruturado, com <h1>, <h2>, <h3> para títulos, <p> para parágrafos, <ul>/<li> para listas, <table> para cronogramas e orçamentos, etc.`;
        break;
        
      case 'viability_analysis':
        documentPrompt = `Você é um especialista em criar Análises de Viabilidade para empreendedores. Com base nas informações fornecidas sobre o projeto e nas conversas com os agentes especialistas, crie uma Análise de Viabilidade completa em formato HTML.

A Análise de Viabilidade deve incluir as seguintes seções:
1. Resumo Executivo
2. Descrição do Projeto/Ideia
3. Análise de Mercado
   - Tamanho do Mercado
   - Tendências
   - Concorrentes
4. Análise SWOT
   - Forças
   - Fraquezas
   - Oportunidades
   - Ameaças
5. Viabilidade Técnica
6. Viabilidade Financeira
   - Investimento Inicial
   - Projeção de Receitas
   - Projeção de Custos
   - Ponto de Equilíbrio
7. Viabilidade Operacional
8. Riscos e Mitigações
9. Conclusão e Recomendações

Use HTML semântico e estruturado, com <h1>, <h2>, <h3> para títulos, <p> para parágrafos, <ul>/<li> para listas, <table> para dados financeiros, etc.`;
        break;
        
      default:
        return `<p><strong>Erro:</strong> Tipo de documento não reconhecido.</p>`;
    }

    // 4. Montar o prompt final com os dados do projeto e histórico
    const finalPrompt = `
${documentPrompt}

**Detalhes do Projeto:**
Nome: ${projectDetails.name}
Tipo: ${projectDetails.type}
Setor: ${projectDetails.sector}
Público-Alvo: ${projectDetails.targetAudience}

**Conversas Relevantes com Agentes:**
Valida IA (Viabilidade): ${conversationHistory.valida_ia}
Strategos AI (Estratégia): ${conversationHistory.strategos_ai}
Pixel AI (Design): ${conversationHistory.pixel_ai}
Impulso AI (Marketing): ${conversationHistory.impulso_ai}
Construtor AI (Implementação): ${conversationHistory.construtor_ai}

Gere o documento completo em HTML, mantendo a estrutura solicitada e usando as informações fornecidas. Seja criativo onde faltar informação específica, mas mantenha-se alinhado ao tipo de projeto e setor.
`;

    // 5. Chamar a API do Google com o prompt final
    const documentHtml = await callGoogleAI(apiKey, finalPrompt);

    // 6. Retornar o documento HTML gerado
    return documentHtml;

  } catch (error) {
    console.error(`Erro ao gerar documento ${documentType}:`, error);
    return `<p><strong>Erro:</strong> Ocorreu um problema ao gerar o documento. Tente novamente.</p>`;
  }
}
