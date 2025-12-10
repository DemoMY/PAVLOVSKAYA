
import React, { useState } from 'react';
import { TaxiService } from '../types';

const TAXI_SERVICES: TaxiService[] = [
  { id: '1', name: 'Лидер', phone: '+79180000001', type: 'local', description: 'Быстро', brandColor: 'from-amber-400 to-orange-600' },
  { id: '2', name: 'Виктория', phone: '+79180000002', type: 'local', description: 'Эконом', brandColor: 'from-blue-600 to-slate-800' },
  { id: '3', name: 'Яндекс Go', phone: '', type: 'app', url: 'https://go.yandex.ru', description: 'Приложение', brandColor: 'bg-yellow-400 text-black' },
  { id: '4', name: 'Попутчики', phone: '', type: 'chat', url: 'https://whatsapp.com', description: 'WhatsApp', brandColor: 'bg-emerald-800/50 text-emerald-400' },
  { id: '5', name: 'Диспетчер', phone: '', type: 'chat', url: 'https://t.me/pavltaxi', description: 'Telegram' },
  { id: '6', name: 'Служба заботы', phone: '', type: 'chat', url: 'https://wa.me/79180000003', description: 'Поддержка' },
];

const EMERGENCY_NUMBERS = [
  { id: '112', name: '112', label: '112', color: 'bg-red-500', icon: '🚨' },
  { id: '03', name: '103', label: 'Скорая', color: 'bg-pink-500', icon: '🚑' },
  { id: 'gas', name: '104', label: 'Газ', color: 'bg-blue-600', icon: '🔥' },
  { id: 'res', name: '+78619151515', label: 'Свет', color: 'bg-yellow-500', icon: '⚡' },
];

const BUS_SCHEDULE = [
  { id: 1, dest: 'Краснодар', times: ['06:00', '09:30', '12:15', '15:40'], price: '650 ₽' },
  { id: 2, dest: 'Ростов-на-Дону', times: ['07:15', '11:00', '16:20'], price: '800 ₽' },
  { id: 3, dest: 'Тихорецк', times: ['08:00', '10:30', '14:00', '18:30'], price: '250 ₽' },
];

const PHARMACIES = [
  { id: 1, name: 'Апрель', address: 'ул. Горького, 15', hours: 'Круглосуточно', is247: true },
  { id: 2, name: 'Вита Экспресс', address: 'ул. Ленина, 20', hours: '08:00 - 21:00', is247: false },
  { id: 3, name: 'Здоровье', address: 'ул. Пушкина, 5', hours: '08:00 - 22:00', is247: false },
  { id: 4, name: 'Социальная', address: 'ул. Крупской, 102', hours: '08:00 - 20:00', is247: false },
];

const FOOD_PLACES = [
  { id: 1, name: 'Суши Wok', desc: 'Роллы, Пицца', phone: '+79180001111' },
  { id: 2, name: 'Додо Пицца', desc: 'Доставка', phone: '+78000000000' },
  { id: 3, name: 'Кафе "Уют"', desc: 'Обеды, Шашлык', phone: '+79180002222' },
];

const GOV_SERVICES = [
  { id: 1, name: 'МФЦ (Мои документы)', address: 'ул. Ленина, 18', hours: '08:00 - 17:00' },
  { id: 2, name: 'Почта России', address: 'ул. Горького, 305', hours: '08:00 - 18:00' },
  { id: 3, name: 'Пенсионный фонд', address: 'ул. Гладкова, 11', hours: '08:00 - 16:00' },
];

export const TaxiModule: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'bus' | 'pharma' | 'food' | 'gov' | null>(null);

  // Mock Date and Weather
  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
  
  return (
    <div className="flex flex-col space-y-5 pb-40 p-4 animate-fade-in relative">
      
      {/* 1. Header: Weather (Compact) */}
      <div className="flex items-center justify-between glass-panel rounded-2xl px-4 py-2 mt-2 shadow-lg hover:bg-slate-800/80 transition-colors">
        <div className="text-xs font-bold text-slate-300 capitalize">{today}</div>
        <div className="flex items-center gap-2">
           <svg className="w-5 h-5 text-yellow-400 animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
           <span className="text-sm font-black text-white">+18°C</span>
        </div>
      </div>

      {/* 2. Emergency Grid (SMALLER CARDS) */}
      <div>
        <div className="grid grid-cols-4 gap-2">
          {EMERGENCY_NUMBERS.map((item) => (
            <a key={item.id} href={`tel:${item.name}`} className="relative group cursor-pointer active:scale-95 hover:scale-105 transition-transform duration-200">
              <div className="glass-panel rounded-xl p-1 flex flex-col items-center justify-center gap-1 h-16 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-500/50 hover:shadow-lg hover:shadow-slate-700/30">
                 <div className={`w-6 h-6 rounded-full ${item.color} bg-opacity-20 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform`}>
                   {item.icon}
                 </div>
                 <span className="text-[9px] font-bold text-slate-400 text-center leading-tight group-hover:text-white">{item.label}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 3. AD SLOT (ENLARGED) */}
      <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-900/30 group active:scale-[0.99] hover:scale-[1.01] transition-transform duration-300 cursor-pointer">
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 relative z-10 h-32 flex flex-col justify-center items-start">
           <span className="bg-purple-500/20 text-purple-300 text-[9px] font-bold px-2 py-0.5 rounded mb-2 border border-purple-500/30">РЕКЛАМА</span>
           <h3 className="text-white font-extrabold text-lg leading-tight mb-1">Ваш бизнес на ладони</h3>
           <p className="text-slate-400 text-xs mb-3">Увидят все жители станицы</p>
           <button className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg shadow hover:bg-slate-200 transition-colors">
              Разместить
           </button>
        </div>
        {/* Decorative Blur */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/30 blur-2xl rounded-full pointer-events-none group-hover:bg-pink-500/50 transition-colors"></div>
      </div>

      {/* 4. Directory (MOVED UP) */}
      <div>
         <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Справочник</h3>
         <div className="grid grid-cols-2 gap-2">
            
            <DirectoryCard 
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
              title="Автобусы"
              subtitle="Краснодар, Ростов"
              color="blue"
              onClick={() => setActiveModal('bus')}
            />
            
            <DirectoryCard 
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
              title="Аптеки"
              subtitle="Дежурные 24/7"
              color="green"
              onClick={() => setActiveModal('pharma')}
            />

            <DirectoryCard 
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              title="Еда"
              subtitle="Доставка, Кафе"
              color="orange"
              onClick={() => setActiveModal('food')}
            />

            <DirectoryCard 
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
              title="Услуги"
              subtitle="МФЦ, Почта"
              color="purple"
              onClick={() => setActiveModal('gov')}
            />

         </div>
      </div>

      {/* 5. Navigator/Taxi (MOVED DOWN) */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Навигатор такси</h3>
        <div className="grid grid-cols-2 gap-3">
          
          {/* Leader (Orange Brand) */}
          <a href={`tel:${TAXI_SERVICES[0].phone}`} className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-4 shadow-lg active:scale-[0.98] hover:scale-[1.02] hover:shadow-orange-500/40 transition-all duration-300 group border border-orange-400/30">
             <div className="absolute right-[-15px] top-[-15px] opacity-20 transform group-hover:rotate-12 transition-transform text-black">
               <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/></svg>
             </div>
             <div className="relative z-10">
               <div className="text-white font-black text-xl drop-shadow-md tracking-tight uppercase">{TAXI_SERVICES[0].name}</div>
               <div className="text-orange-100 text-xs font-bold mb-4 opacity-90">{TAXI_SERVICES[0].description}</div>
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-600 shadow-xl group-hover:scale-110 transition-transform">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
               </div>
             </div>
          </a>

          {/* Victoria (Blue Brand) */}
          <a href={`tel:${TAXI_SERVICES[1].phone}`} className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-slate-800 rounded-2xl p-4 shadow-lg active:scale-[0.98] hover:scale-[1.02] hover:shadow-blue-500/40 transition-all duration-300 group border border-blue-500/30">
              <div className="absolute right-[-10px] top-[10px] opacity-10">
                 <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                 <div>
                    <div className="text-white font-black text-xl tracking-tight">{TAXI_SERVICES[1].name}</div>
                    <div className="text-blue-200 text-xs">{TAXI_SERVICES[1].description}</div>
                 </div>
                 <div className="mt-4 self-end w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-blue-400 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                 </div>
              </div>
          </a>

          {/* Yandex (Yellow/Black Brand) */}
          <a href={TAXI_SERVICES[2].url} target="_blank" rel="noreferrer" className="bg-[#fcce00] border border-yellow-500 rounded-2xl p-4 flex flex-col justify-between active:scale-[0.98] hover:scale-[1.02] shadow-lg relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-16 h-16 bg-black opacity-5 -rotate-45 transform translate-x-8 -translate-y-8"></div>
             <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center text-[12px] font-bold text-[#fcce00]">Y</div>
                  <span className="text-black font-black text-lg">Go</span>
                </div>
                <div className="text-black/70 text-[10px] font-bold">{TAXI_SERVICES[2].description}</div>
             </div>
             <div className="self-end mt-2">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </div>
          </a>

           {/* Poputchiki (Green Chat) */}
           <a href={TAXI_SERVICES[3].url} target="_blank" rel="noreferrer" className="glass-panel rounded-2xl p-4 flex flex-col justify-between active:scale-[0.98] transition-all duration-300 bg-emerald-900/20 border-emerald-500/30 hover:bg-emerald-900/30 hover:border-emerald-500 hover:scale-[1.02] shadow-lg group">
             <div>
                <div className="flex items-center gap-2 mb-1">
                   <svg className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2z"/></svg>
                   <span className="text-white font-bold text-sm">Попутчики</span>
                </div>
                <div className="text-emerald-500/80 text-[10px] group-hover:text-emerald-400 transition-colors">Группа WhatsApp</div>
             </div>
          </a>

        </div>
      </div>

      {/* 6. Support Links (Footer) */}
      <div className="flex gap-3 mt-4">
          <a href={TAXI_SERVICES[4].url} target="_blank" rel="noreferrer" className="flex-1 glass-panel p-2 rounded-xl flex items-center justify-center gap-2 active:scale-95 hover:bg-slate-800 hover:scale-105 transition-all duration-300">
             <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
             </div>
             <span className="text-[10px] font-bold text-slate-300">Диспетчер</span>
          </a>
          <a href={TAXI_SERVICES[5].url} target="_blank" rel="noreferrer" className="flex-1 glass-panel p-2 rounded-xl flex items-center justify-center gap-2 active:scale-95 hover:bg-slate-800 hover:scale-105 transition-all duration-300">
             <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" /></svg>
             </div>
             <span className="text-[10px] font-bold text-slate-300">Поддержка</span>
          </a>
      </div>

      {/* MODALS */}
      {activeModal && (
        <InfoModal 
          title={
            activeModal === 'bus' ? 'Расписание автобусов' : 
            activeModal === 'pharma' ? 'Аптеки' : 
            activeModal === 'food' ? 'Еда и Доставка' : 'Госуслуги'
          } 
          onClose={() => setActiveModal(null)}
        >
          {activeModal === 'bus' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 mb-2">Автостанция Павловская<br/>Тел: +7 (86191) 5-21-21</div>
              {BUS_SCHEDULE.map(bus => (
                <div key={bus.id} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-bold">{bus.dest}</span>
                      <span className="text-pavl-taxi text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded">{bus.price}</span>
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {bus.times.map((t, i) => (
                        <span key={i} className="text-xs text-slate-300 bg-slate-700 px-2 py-1 rounded">{t}</span>
                      ))}
                   </div>
                </div>
              ))}
            </div>
          )}
          {activeModal === 'pharma' && (
            <div className="space-y-3">
              {PHARMACIES.map(pharma => (
                <div key={pharma.id} className={`p-3 rounded-xl border ${pharma.is247 ? 'bg-green-900/10 border-green-500/30' : 'bg-slate-800/50 border-slate-700'}`}>
                   <div className="flex justify-between items-start mb-1">
                      <span className="text-white font-bold">{pharma.name}</span>
                      {pharma.is247 && <span className="text-[10px] text-green-400 font-bold border border-green-500/30 px-1.5 rounded">24/7</span>}
                   </div>
                   <div className="text-slate-400 text-xs">{pharma.address}</div>
                   <div className="text-slate-500 text-[10px] mt-1">{pharma.hours}</div>
                </div>
              ))}
            </div>
          )}
          {activeModal === 'food' && (
             <div className="space-y-3">
               {FOOD_PLACES.map(place => (
                 <div key={place.id} className="glass-panel p-3 rounded-xl flex justify-between items-center">
                    <div>
                       <div className="text-white font-bold">{place.name}</div>
                       <div className="text-slate-500 text-xs">{place.desc}</div>
                    </div>
                    <a href={`tel:${place.phone}`} className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg active:scale-95">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </a>
                 </div>
               ))}
             </div>
          )}
           {activeModal === 'gov' && (
             <div className="space-y-3">
               {GOV_SERVICES.map(srv => (
                 <div key={srv.id} className="glass-panel p-3 rounded-xl">
                    <div className="text-white font-bold mb-1">{srv.name}</div>
                    <div className="text-slate-400 text-xs mb-1">{srv.address}</div>
                    <div className="flex items-center gap-1">
                       <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                       <span className="text-[10px] text-slate-300">{srv.hours}</span>
                    </div>
                 </div>
               ))}
             </div>
          )}
        </InfoModal>
      )}

    </div>
  );
};

// Reusable Components
const DirectoryCard: React.FC<{ icon: React.ReactNode; title: string; subtitle: string; color: string; onClick: () => void }> = ({ icon, title, subtitle, color, onClick }) => {
    const colorClasses = {
        blue: 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white',
        green: 'bg-green-500/20 text-green-400 group-hover:bg-green-500 group-hover:text-white',
        orange: 'bg-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white',
        purple: 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white',
    };
    const activeColor = colorClasses[color as keyof typeof colorClasses];

    return (
        <div onClick={onClick} className="glass-panel p-3 rounded-xl flex items-center gap-3 hover:bg-slate-800 transition-all duration-300 group cursor-pointer active:scale-95 hover:scale-[1.02] border-b-2 border-transparent hover:border-slate-500/30">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeColor}`}>
                {icon}
            </div>
            <div>
                <div className="font-bold text-slate-200 text-sm leading-tight group-hover:text-white">{title}</div>
                <div className="text-[10px] text-slate-500 group-hover:text-slate-400">{subtitle}</div>
            </div>
        </div>
    )
}

// Reusable Glass Modal (Same as before)
const InfoModal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
    <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col max-h-[75vh]">
       <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30 rounded-t-3xl">
          <h3 className="font-bold text-white text-lg tracking-tight">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
       </div>
       <div className="p-4 overflow-y-auto no-scrollbar">
          {children}
       </div>
    </div>
  </div>
);
