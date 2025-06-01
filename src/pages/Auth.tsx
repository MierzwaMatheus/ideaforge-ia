import React from 'react';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';
import { IdeaForgeInput } from '@/components/ui/ideaforge-input';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Chrome, Apple } from 'lucide-react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import '@/lib/firebase';

const handleGoogleLogin = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    // Redirecionar ou atualizar estado após login
  } catch (error) {
    alert('Erro ao autenticar com Google.');
  }
};

const handleAppleLogin = () => {
  alert('Login com Apple ainda não implementado.');
};

const Auth = () => (
  <div className="flex min-h-screen bg-ideaforge-bg-primary p-4">
    <div className="flex flex-1 items-center justify-center">
      <IdeaForgeCard className="w-full max-w-md p-0 overflow-hidden flex flex-col md:flex-row shadow-2xl">
        {/* Lateral com imagem (visível apenas em md+) */}
        <div className="hidden md:flex md:w-1/2 bg-gray-600 relative bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&w=600&q=80)'}}>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-3xl font-bold font-bitter mb-1">Bem-vindo!</h3>
            <p className="text-gray-300 text-base font-exo">Acesse sua conta para criar ideias incríveis.</p>
          </div>
        </div>
        {/* Formulário */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-ideaforge-primary mb-2 font-bitter">Entrar <span className="text-gray-400 font-light font-exo">na sua conta</span></h3>
          <div className="flex flex-col gap-3 mt-6">
            <IdeaForgeInput id="email" type="email" label="Email" placeholder="Digite seu email" autoComplete="email" />
            <IdeaForgeInput id="password" type="password" label="Senha" placeholder="Digite sua senha" autoComplete="current-password" />
            <IdeaForgeButton variant="primary" className="mt-2 w-full">Entrar</IdeaForgeButton>
            <div className="flex items-center gap-2 my-2">
              <Separator className="flex-1" />
              <span className="text-xs text-gray-400 font-exo">ou</span>
              <Separator className="flex-1" />
            </div>
            <Button id="google-login-btn" variant="outline" className="w-full flex items-center gap-2 justify-center" onClick={handleGoogleLogin}>
              <Chrome className="w-5 h-5" /> Entrar com Google
            </Button>
            <Button id="apple-login-btn" variant="outline" className="w-full flex items-center gap-2 justify-center" onClick={handleAppleLogin}>
              <Apple className="w-5 h-5" /> Entrar com Apple
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-500 font-exo gap-2">
            <a href="#" className="hover:text-ideaforge-primary transition-colors">Esqueci minha senha</a>
            <span>
              Não tem uma conta? <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">Cadastre-se</a>
            </span>
          </div>
        </div>
      </IdeaForgeCard>
    </div>
  </div>
);

export default Auth; 