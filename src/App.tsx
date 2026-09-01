import React, { useState, useEffect } from 'react';
import { CourseProvider, useCourse } from './context/CourseContext';
import { ActiveTab, AppendixTab } from './types';
import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { ConversationView } from './components/ConversationView';
import { EssentialsDrillView } from './components/EssentialsDrillView';
import { AppendicesView } from './components/AppendicesView';
import { ProfileView } from './components/ProfileView';
import { OptInModal } from './components/OptInModal';
import { Footer } from './components/Footer';

function MainApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedConversationId, setSelectedConversationId] = useState<number>(1);
  const [selectedAppendixTab, setSelectedAppendixTab] = useState<AppendixTab>('A');
  const [optInModalOpen, setOptInModalOpen] = useState(false);

  // Scroll to top whenever tab or conversation changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedConversationId, selectedAppendixTab]);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-slate-200 flex flex-col selection:bg-[#C5705D]/30 selection:text-[#F3D5CE]">
      {/* Top Fixed Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedConversationId={selectedConversationId}
        setSelectedConversationId={setSelectedConversationId}
        selectedAppendixTab={selectedAppendixTab}
        setSelectedAppendixTab={setSelectedAppendixTab}
        onOpenOptIn={() => setOptInModalOpen(true)}
        onOpenProfile={() => setActiveTab('profile')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HeroLanding
            setActiveTab={setActiveTab}
            setSelectedConversationId={setSelectedConversationId}
            setSelectedAppendixTab={setSelectedAppendixTab}
            onOpenOptIn={() => setOptInModalOpen(true)}
            onOpenProfile={() => setActiveTab('profile')}
          />
        )}

        {activeTab === 'conversations' && (
          <ConversationView
            conversationId={selectedConversationId}
            setConversationId={setSelectedConversationId}
            setActiveTab={setActiveTab}
            setSelectedAppendixTab={setSelectedAppendixTab}
          />
        )}

        {activeTab === 'essentials' && <EssentialsDrillView />}

        {activeTab === 'appendices' && (
          <AppendicesView
            selectedTab={selectedAppendixTab}
            setSelectedTab={setSelectedAppendixTab}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            onOpenOptIn={() => setOptInModalOpen(true)}
            setActiveTab={setActiveTab}
            setSelectedConversationId={setSelectedConversationId}
            setSelectedAppendixTab={setSelectedAppendixTab}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        setSelectedAppendixTab={setSelectedAppendixTab}
        onOpenOptIn={() => setOptInModalOpen(true)}
        onOpenProfile={() => setActiveTab('profile')}
      />

      {/* Optional Formspree Opt-In Registration Modal */}
      <OptInModal
        isOpen={optInModalOpen}
        onClose={() => setOptInModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CourseProvider>
      <MainApp />
    </CourseProvider>
  );
}
