
import React, { useEffect, useState } from 'react';
import { EventItem } from '../types';
import { fetchVillageEvents } from '../services/geminiService';

const MOCK_EVENTS: (EventItem & { type: string, color: string })[] = [
  { 
    id: '1', 
    title: 'Чебурашка 2: Возвращение', 
    date: 'Сегодня, 18:00', 
    place: 'Кинотеатр', 
    price: '350 ₽', 
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
    type: 'Кино',
    color: 'bg-purple-500',
    contact: '+78619152020',
    actionType: 'call',
    actionLabel: 'Бронь'
  },
  { 
    id: '2', 
    title: 'День Станицы', 
    date: 'Суббота, 10:00', 
    place: 'Площадь', 
    price: 'Бесплатно', 
    imageUrl: 'https://images.unsplash.com/photo-1514525253440-b393332569ac?q=80&w=800&auto=format&fit=crop',
    type: 'Праздник',
    color: 'bg-pink-500',
    actionType: 'none'
  },
  { 
    id: '3', 
    title: 'Футбол: Кубок', 
    date: 'Вс, 16:00', 
    place: 'Стадион', 
    price: '100 ₽', 
    imageUrl: 'https://images.unsplash.com/photo-1548810960-e8369e5d762c?q=80&w=800&auto=format&fit=crop',
    type: 'Спорт',
    color: 'bg-green-500',
    actionType: 'none'
  },
   { 
    id: '4', 
    title: 'Аттракционы', 
    date: 'Ежедневно', 
    place: 'Парк', 
    price: 'от 100 ₽', 
    imageUrl: 'https://images.unsplash.com/photo-1571518903525-455b51b3391b?q=80&w=800&auto=format&fit=crop',
    type: 'Детям',
    color: 'bg-blue-500',
    actionType: 'none'
  },
];

export const EventsModule: React.FC = () => {
  const [events, setEvents] = useState<(EventItem & { type: string, color: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchVillageEvents();
        if (data && data.length > 0) {
          const formatted = data.map((e: any) => ({
            ...e,
            color: e.type === 'Кино' ? 'bg-purple-500' : e.type === 'Спорт' ? 'bg-green-500' : e.type === 'Праздник' ? 'bg-pink-500' : 'bg-blue-500',
            imageUrl: e.imageUrl || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop'
          }));
          setEvents(formatted);
        } else {
          setEvents(MOCK_EVENTS);
        }
      } catch (e) {
        setEvents(MOCK_EVENTS);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  return (
    <div className="flex flex-col h-full space-y-4 pb-40 p-4 animate-fade-in">
       {/* Header */}
       <div className="flex items-end justify-between mt-2 mb-2">
        <div>
           <h2 className="text-2xl font-black tracking-tight text-white">Афиша</h2>
           <p className="text-slate-400 text-xs font-medium">Культурная жизнь станицы</p>
        </div>
        <div className="text-[10px] bg-slate-800 px-2 py-1 rounded-lg text-slate-400 border border-slate-700">Сегодня</div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3">
           <div className="col-span-2 h-48 rounded-3xl bg-slate-800/50 animate-pulse border border-slate-700"></div>
           <div className="h-40 rounded-3xl bg-slate-800/50 animate-pulse border border-slate-700"></div>
           <div className="h-40 rounded-3xl bg-slate-800/50 animate-pulse border border-slate-700"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {events.map((event, index) => {
             // Logic for layout: First item is big (Featured), others are smaller grid items
             const isFeatured = index === 0;
             const cardHeight = isFeatured ? 'h-52' : 'h-44';
             const colSpan = isFeatured ? 'col-span-2' : 'col-span-1';

             return (
              <div key={event.id} className={`group relative w-full ${colSpan} ${cardHeight} rounded-3xl overflow-hidden shadow-xl active:scale-[0.98] transition-all duration-300 border border-slate-800/50`}>
                
                {/* Background Image with Zoom Effect */}
                <img src={event.imageUrl} alt={event.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                {/* Content Container */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  
                  {/* Top: Tags */}
                  <div className="flex justify-between items-start">
                    <span className={`${event.color} text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-lg backdrop-blur-sm`}>
                      {event.type}
                    </span>
                    <span className="bg-black/30 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/10">
                      {event.price}
                    </span>
                  </div>

                  {/* Bottom: Info & Action */}
                  <div className="relative z-10">
                    <h3 className={`${isFeatured ? 'text-2xl' : 'text-sm'} font-black text-white leading-none mb-1 drop-shadow-md line-clamp-2`}>{event.title}</h3>
                    
                    <div className="flex flex-col gap-0.5 mb-2">
                      <div className="flex items-center text-slate-300 text-[10px] font-medium">
                        <svg className="w-3 h-3 mr-1 text-pavl-taxi shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="truncate">{event.date}</span>
                      </div>
                      <div className="flex items-center text-slate-300 text-[10px] font-medium">
                        <svg className="w-3 h-3 mr-1 text-pavl-taxi shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="truncate">{event.place}</span>
                      </div>
                    </div>

                    {/* Contact/Action Button */}
                    {(event.contact || event.actionType === 'call' || event.actionType === 'link') && (
                       <a 
                         href={event.actionType === 'call' ? `tel:${event.contact}` : event.contact} 
                         target={event.actionType === 'link' ? "_blank" : "_self"}
                         className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[10px] font-bold transition-colors shadow-lg backdrop-blur-sm
                           ${isFeatured 
                             ? 'bg-white text-black hover:bg-slate-200' 
                             : 'bg-slate-800/60 text-white border border-slate-600 hover:bg-slate-700'
                           }`}
                       >
                          {event.actionType === 'call' ? (
                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          ) : (
                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          )}
                          {event.actionLabel || (event.actionType === 'call' ? 'Позвонить' : 'Подробнее')}
                       </a>
                    )}
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-4 p-4 glass-panel rounded-2xl flex items-center justify-between">
          <div className="text-xs text-slate-400">Хотите добавить событие?</div>
          <button className="text-[10px] font-bold bg-slate-800 border border-slate-700 text-white px-3 py-1.5 rounded-lg">Написать</button>
      </div>

    </div>
  );
};
