import React, { useEffect, useState } from 'react';
import { GeminiStatusState } from '../types';
import { fetchVillageStatus } from '../services/geminiService-mvp'; // Using MVP version

export const LifeModule: React.FC = () => {
  const [status, setStatus] = useState<GeminiStatusState>({
    loading: true,
    data: null,
    sources: [],
    error: null,
  });

  const loadData = async () => {
    setStatus(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await fetchVillageStatus();
      setStatus({
        loading: false,
        data: result.text,
        sources: result.sources,
        error: null,
      });
    } catch (err) {
      setStatus({
        loading: false,
        data: null,
        sources: [],
        error: (err as Error).message
      });
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col space-y-6 pb-40 p-5 animate-fade-in">
      
      {/* 1. Visual Header Card */}
      <div className="relative h-40 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 group shrink-0">
         {/* Background Image */}
         <img 
           src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1000&auto=format&fit=crop" 
           alt="Pavlovskaya Night" 
           className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
         />
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent"></div>
         
         <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-1 drop-shadow-md">Пульс</h2>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-green-100 text-xs font-bold backdrop-blur-md bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30 animate-pulse shadow-[0_0_15px_rgba(74,222,128,0.3)] tracking-wide">
                Мониторинг 24/7
              </p>
            </div>
         </div>

         {/* Refresh Button */}
         <button 
            onClick={loadData}
            disabled={status.loading}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90 transition-all hover:bg-white/20 ${status.loading ? 'animate-spin' : ''}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
         </button>
      </div>

      {/* 2. System Indicators (Fixed Position Top) */}
      <div className="shrink-0">
         <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">Инженерные сети</h3>
         <div className="space-y-3">
            
            <SystemRow 
              label="Электросети" 
              subLabel="РЭС"
              status="Норма" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              colorClass="yellow"
              barWidth="w-[95%]"
            />

            <SystemRow 
              label="Газоснабжение" 
              subLabel="Райгаз"
              status="План. работы" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>}
              colorClass="indigo"
              barWidth="w-[80%]"
            />

            <SystemRow 
              label="Водоснабжение" 
              subLabel="Водоканал"
              status="Норма" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
              colorClass="blue"
              barWidth="w-[92%]"
            />

         </div>
      </div>

      {/* 3. Main Intelligence Card (AI Content below) */}
      <div className="relative w-full min-h-[160px] glass-panel rounded-3xl overflow-hidden border border-slate-700/50 shadow-xl transition-all duration-500">

        {/* Loading State Overlay */}
        {status.loading && (
          <div className="absolute inset-0 bg-slate-900/95 z-20 flex flex-col items-center justify-center p-6">
            <div className="relative w-12 h-12 mb-4">
               <div className="absolute inset-0 border-t-2 border-pavl-info rounded-full animate-spin"></div>
            </div>
            <div className="text-pavl-info font-mono text-[10px] uppercase tracking-[0.2em] animate-pulse mb-2">Загрузка данных...</div>
            <div className="w-full space-y-1">
                <div className="h-0.5 bg-slate-800 rounded-full w-full overflow-hidden">
                   <div className="h-full bg-pavl-info animate-scan w-1/2"></div>
                </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5 relative z-10">
          <div className="flex items-center justify-between mb-3 border-b border-slate-700/50 pb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Отчет ИИ</span>
            <span className="text-[10px] font-mono text-slate-600">{new Date().toLocaleTimeString().slice(0,5)}</span>
          </div>

          {status.error ? (
            <div className="flex items-center gap-3 py-2">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <p className="text-sm text-slate-300">Ошибка связи с сервером.</p>
            </div>
          ) : (
             <div className="prose prose-invert prose-sm max-w-none">
               <div className="whitespace-pre-wrap text-slate-200 leading-relaxed font-light text-sm">
                 {status.data}
               </div>
            </div>
          )}
        </div>

        {/* Sources Bar */}
        {!status.loading && status.sources.length > 0 && (
          <div className="bg-slate-900/30 px-5 py-2 border-t border-slate-700/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {status.sources.map((source, idx) => (
              <a 
                key={idx} 
                href={source.uri} 
                target="_blank" 
                rel="noreferrer"
                className="shrink-0 text-[9px] text-slate-400 bg-slate-800/50 px-2 py-1 rounded border border-slate-700 hover:text-white transition-colors truncate max-w-[100px]"
              >
                {source.title}
              </a>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

// Helper Component for System Rows with Enhanced Effects
const SystemRow: React.FC<{ label: string; subLabel: string; status: string; icon: React.ReactNode; colorClass: 'yellow' | 'blue' | 'indigo'; barWidth: string }> = ({ label, subLabel, status, icon, colorClass, barWidth }) => {

  // Color mapping based on prop
  const colors = {
    yellow: { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'hover:border-yellow-500/50', shadow: 'hover:shadow-yellow-500/20' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'hover:border-blue-500/50', shadow: 'hover:shadow-blue-500/20' },
    indigo: { text: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'hover:border-indigo-500/50', shadow: 'hover:shadow-indigo-500/20' },
  };

  const c = colors[colorClass];

  return (
    <div className={`glass-panel p-3 rounded-2xl flex items-center justify-between group active:scale-95 transition-all duration-300 border border-transparent ${c.border} hover:shadow-lg ${c.shadow} cursor-default relative overflow-hidden`}>
        {/* Subtle hover gradient background */}
        <div className={`absolute inset-0 ${c.bg} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
        
        <div className="flex items-center gap-4 relative z-10">
           <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ${c.text} shadow-inner`}>
              {icon}
           </div>
           <div>
              <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{label}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide group-hover:text-slate-400">{subLabel}</div>
           </div>
        </div>
        <div className="text-right w-1/3 relative z-10">
           <div className={`text-sm font-bold ${c.text} mb-1 flex justify-end items-center gap-1 drop-shadow-sm`}>
              {status}
              <div className={`w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor] animate-pulse`}></div>
           </div>
           {/* Load Bar with Shimmer */}
           <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden w-full relative">
              <div className={`h-full ${c.text} bg-current opacity-50 rounded-full ${barWidth} relative overflow-hidden`}>
                 <div className="absolute inset-0 bg-white/30 skew-x-12 -translate-x-full animate-[scan_2s_infinite]"></div>
              </div>
           </div>
        </div>
    </div>
  );
};