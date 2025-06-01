
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Lightbulb } from 'lucide-react';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleStartNow = () => {
    navigate('/onboarding');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 ideaforge-glass border-b border-ideaforge-text-secondary border-opacity-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-ideaforge-primary to-blue-400 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bitter font-bold text-ideaforge-text-primary">
              IdeaForge
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#agents" className="text-ideaforge-text-primary hover:text-ideaforge-primary ideaforge-transition font-exo">
              Agentes
            </a>
            <a href="#como-funciona" className="text-ideaforge-text-primary hover:text-ideaforge-primary ideaforge-transition font-exo">
              Como Funciona
            </a>
            <a href="#preco" className="text-ideaforge-text-primary hover:text-ideaforge-primary ideaforge-transition font-exo">
              Preços
            </a>
            <IdeaForgeButton size="sm" onClick={handleStartNow}>
              Começar Agora
            </IdeaForgeButton>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-ideaforge-text-primary hover:text-ideaforge-primary ideaforge-transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-ideaforge-bg-secondary border border-ideaforge-text-secondary border-opacity-20 rounded-b-xl">
            <nav className="flex flex-col p-4 gap-4">
              <a 
                href="#agents" 
                className="text-ideaforge-text-primary hover:text-ideaforge-primary ideaforge-transition font-exo py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Agentes
              </a>
              <a 
                href="#como-funciona" 
                className="text-ideaforge-text-primary hover:text-ideaforge-primary ideaforge-transition font-exo py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Como Funciona
              </a>
              <a 
                href="#preco" 
                className="text-ideaforge-text-primary hover:text-ideaforge-primary ideaforge-transition font-exo py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Preços
              </a>
              <IdeaForgeButton className="mt-2" onClick={handleStartNow}>
                Começar Agora
              </IdeaForgeButton>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
