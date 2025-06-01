import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IdeaForgeCard } from '@/components/ui/ideaforge-card';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';
import { Chrome, Apple } from 'lucide-react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import '@/lib/firebase';

const Auth = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      alert('Erro ao autenticar com Google.');
    }
  };

  const handleAppleLogin = () => {
    alert('Login com Apple ainda não implementado.');
  };

  return (
    <div className="flex min-h-screen bg-ideaforge-bg-primary p-4 items-center justify-center">
      <IdeaForgeCard className="w-full max-w-3xl p-0 overflow-hidden flex flex-col md:flex-row shadow-2xl">
        {/* Lateral com imagem e recorte diagonal */}
        <div
          className="hidden md:flex md:w-1/2 relative bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&w=800&q=80)',
            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)',
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
            <h3 className="text-4xl font-bold font-bitter mb-2 drop-shadow">Login</h3>
            <p className="text-lg text-gray-200 font-exo drop-shadow">Welcome back!</p>
          </div>
        </div>
        {/* Área de botões */}
        <div className="flex-1 flex flex-col justify-center items-center p-10 gap-8 bg-ideaforge-bg-secondary">
          <h3 className="text-2xl font-bold text-ideaforge-primary mb-2 font-bitter text-center">Entrar na sua conta</h3>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <IdeaForgeButton id="google-login-btn" variant="primary" className="w-full flex items-center gap-2 justify-center text-base py-3" onClick={handleGoogleLogin}>
              <Chrome className="w-5 h-5" /> Entrar com Google
            </IdeaForgeButton>
            <IdeaForgeButton id="apple-login-btn" variant="secondary" className="w-full flex items-center gap-2 justify-center text-base py-3" onClick={handleAppleLogin}>
              <Apple className="w-5 h-5" /> Entrar com Apple
            </IdeaForgeButton>
          </div>
        </div>
      </IdeaForgeCard>
    </div>
  );
};

export default Auth; 