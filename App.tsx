import React, { useState } from 'react';
import { AppTab } from './types';
import { TaxiModule } from './components/TaxiModule';
import { LifeModule } from './components/LifeModule';
import { EventsModule } from './components/EventsModule';
import { ChatModule } from './components/ChatModule';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.TAXI);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.TAXI:
        return <TaxiModule />;
      case AppTab.LIFE:
        return <LifeModule />;
      case AppTab.EVENTS:
        return <EventsModule />;
      case AppTab.CHAT:
        return <ChatModule />;
      default:
        return <TaxiModule />;
    }
  };

  return (
    // CHANGED: h-[100dvh] for robust mobile viewport height handling (ignores URL bar)
    <div className="h-[100dvh] w-full bg-pavl-bg text-pavl-text font-sans flex flex-col relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Dynamic Content Area */}
      {/* overflow-y-auto handles the scrolling here */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative z-10 w-full">
         <div className="max-w-md mx-auto min-h-full w-full">
            {renderContent()}
         </div>
      </main>

      {/* Floating Glass Navigation */}
      <nav className="fixed bottom-6 left-4 right-4 z-50 max-w-md mx-auto">
        <div className="glass-panel rounded-2xl p-2 flex justify-between items-center shadow-2xl shadow-black/50">
          
          <NavButton 
            active={activeTab === AppTab.TAXI} 
            onClick={() => setActiveTab(AppTab.TAXI)}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            label="Такси"
            activeColor="bg-amber-500 text-white"
          />

          <NavButton 
            active={activeTab === AppTab.LIFE} 
            onClick={() => setActiveTab(AppTab.LIFE)}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            label="Пульс"
            activeColor="bg-blue-600 text-white"
          />

          <NavButton 
            active={activeTab === AppTab.EVENTS} 
            onClick={() => setActiveTab(AppTab.EVENTS)}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            label="Афиша"
            activeColor="bg-pink-600 text-white"
          />
          
          <NavButton 
            active={activeTab === AppTab.CHAT} 
            onClick={() => setActiveTab(AppTab.CHAT)}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
            label="Общение"
            activeColor="bg-slate-100 text-blue-600"
          />

        </div>
      </nav>
    </div>
  );
};

// Helper Component for Nav Items
const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; activeColor: string }> = ({ active, onClick, icon, label, activeColor }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 ${active ? `${activeColor} shadow-lg scale-105` : 'text-slate-500 hover:text-slate-300'}`}
  >
    <div className={`${active ? 'mb-0' : 'mb-0'} transition-all`}>{icon}</div>
    {active && <span className="text-[10px] font-bold mt-1 tracking-wide animate-fade-in">{label}</span>}
  </button>
);

export default App;