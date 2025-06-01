
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ApiKeySection from '@/components/settings/ApiKeySection';
import DocumentPreferences from '@/components/settings/DocumentPreferences';
import AccountSection from '@/components/settings/AccountSection';
import IndustryPreferences from '@/components/settings/IndustryPreferences';

const Settings = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-ideaforge-bg-primary">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-ideaforge-bg-primary border-b border-ideaforge-text-secondary border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 text-ideaforge-text-secondary hover:text-ideaforge-primary ideaforge-transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bitter font-bold text-ideaforge-text-primary">
              Configurações
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-8">
        <AccountSection />
        <ApiKeySection />
        <DocumentPreferences />
        <IndustryPreferences />
      </div>
    </div>
  );
};

export default Settings;
