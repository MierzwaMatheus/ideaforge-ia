
import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import AgentsSection from '@/components/sections/AgentsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-ideaforge-bg-primary">
      <Header />
      <main>
        <HeroSection />
        <AgentsSection />
      </main>
    </div>
  );
};

export default Index;
