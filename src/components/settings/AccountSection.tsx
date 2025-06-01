
import React from 'react';
import { IdeaForgeButton } from '@/components/ui/ideaforge-button';

const AccountSection = () => {
  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logout clicked');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bitter font-semibold text-ideaforge-text-primary">
        Conta
      </h2>
      
      <div className="bg-ideaforge-bg-secondary rounded-lg p-4 space-y-4">
        <div>
          <label className="block text-sm font-exo text-ideaforge-text-secondary mb-1">
            Email
          </label>
          <p className="text-base font-exo text-ideaforge-text-primary">
            usuario@example.com
          </p>
        </div>
        
        <div className="pt-2 border-t border-ideaforge-text-secondary border-opacity-20">
          <IdeaForgeButton 
            variant="error" 
            size="sm"
            onClick={handleLogout}
          >
            Sair
          </IdeaForgeButton>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;
