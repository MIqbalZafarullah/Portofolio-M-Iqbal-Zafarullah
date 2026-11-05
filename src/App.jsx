import React, { useState, useEffect } from 'react';
import { useUISounds } from './hooks/useUISounds';
import { CustomCursor } from './components/ui/CustomCursor';
import { ContactModal } from './components/modals/ContactModal';
import { CVViewerModal } from './components/modals/CVViewerModal';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { HomeView } from './views/HomeView';
import { ExperienceView } from './views/ExperienceView';
import { WorksView } from './views/WorksView';
import { CertificatesView } from './views/CertificatesView';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);

  useUISounds();

  useEffect(() => {
    // Scroll to top when changing tab
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            onOpenCV={() => setIsCVOpen(true)}
            onOpenContact={() => setIsModalOpen(true)}
          />
        );
      case 'experience':
        return <ExperienceView />;
      case 'works':
        return <WorksView />;
      case 'certificates':
        return <CertificatesView />;
      default:
        return (
          <HomeView
            onOpenCV={() => setIsCVOpen(true)}
            onOpenContact={() => setIsModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-notebook-paper text-gray-900 font-sans selection:bg-yellow-300 selection:text-black relative pb-20 md:pb-0">
      <CustomCursor />

      {/* Modals */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CVViewerModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />

      {/* Retro Notebook Toolbar / Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenContact={() => setIsModalOpen(true)}
      />

      {/* Active Tab View */}
      <main
        key={activeTab}
        className="min-h-screen w-full relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both pt-16 sm:pt-20"
      >
        {renderContent()}
      </main>

      {/* Notebook Footer */}
      <Footer />
    </div>
  );
};

export default App;
