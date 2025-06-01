import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  <div className="min-h-screen flex items-center justify-center bg-ideaforge-bg-primary">
    <Card id="auth-card" className="w-full max-w-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">Entrar no IdeaForge</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button id="google-login-btn" variant="outline" onClick={handleGoogleLogin}>
          Entrar com Google
        </Button>
        <Button id="apple-login-btn" variant="outline" onClick={handleAppleLogin}>
          Entrar com Apple
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default Auth; 