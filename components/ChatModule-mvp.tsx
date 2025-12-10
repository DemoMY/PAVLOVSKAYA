import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '../services/geminiService-mvp'; // Using MVP version

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export const ChatModule: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const telegramUrl = "https://t.me/pavlovskaya_all";

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pavl_chat_history');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      // Initial greeting
      setMessages([{
        id: 'init',
        text: 'Привет! Я — цифровой помощник станицы Павловской. Подскажу номера служб, расписание или просто поболтаю. Чем помочь?',
        sender: 'bot',
        timestamp: Date.now()
      }]);
    }
  }, []);

  // Save to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('pavl_chat_history', JSON.stringify(messages));
    }
    // Small delay to ensure render is complete before scrolling
    setTimeout(scrollToBottom, 100);
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearHistory = () => {
     if(window.confirm('Очистить переписку?')) {
        localStorage.removeItem('pavl_chat_history');
        setMessages([{
          id: Date.now().toString(),
          text: 'История очищена. О чем поговорим?',
          sender: 'bot',
          timestamp: Date.now()
        }]);
     }
  };

  const handleShare = () => {
    if (messages.length === 0) return;

    const text = messages.map(m => {
      const time = new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      const role = m.sender === 'user' ? 'Вы' : 'Помощник';
      return `[${time}] ${role}:\n${m.text}`;
    }).join('\n\n');

    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Prepare history for API
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model' as 'user' | 'model',
        parts: [{ text: m.text }]
      }));

      const response = await sendChatMessage(history, userMsg.text);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Helper to render text with links
  const renderText = (text: string) => {
    // Simple regex to detect markdown links [Title](url)
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        return <a key={i} href={match[2]} target="_blank" rel="noreferrer" className="text-blue-300 underline hover:text-white">{match[1]}</a>;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-full relative">
      
      {/* 1. Header with Telegram Link */}
      <div className="flex-none p-4 pb-2 z-10">
         <div className="glass-panel p-3 rounded-2xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
               </div>
               <div>
                  <h2 className="font-bold text-white leading-tight">Помощник</h2>
                  <div className="flex items-center gap-1">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                     <span className="text-[10px] text-green-400 font-medium">Онлайн (MVP)</span>
                  </div>
               </div>
            </div>
            
            <div className="flex gap-2">
              {/* Clear History Button */}
              <button onClick={handleClearHistory} className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
              
              <a href={telegramUrl} target="_blank" rel="noreferrer" className="bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 rounded-xl px-3 py-2 flex flex-col items-center justify-center transition-all active:scale-95 group min-w-[50px]">
                 <svg className="w-4 h-4 text-blue-400 group-hover:text-white mb-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.062 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.751-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                 <span className="text-[8px] font-bold text-blue-300 group-hover:text-white leading-none">Чат</span>
              </a>
            </div>
         </div>
      </div>

      {/* 2. Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
               msg.sender === 'user' 
                 ? 'bg-blue-600 text-white rounded-br-none' 
                 : 'glass-panel text-slate-200 rounded-bl-none border border-slate-700/50'
             }`}>
                {renderText(msg.text)}
             </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
              <div className="glass-panel px-4 py-3 rounded-2xl rounded-bl-none flex gap-1.5 items-center">
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
              </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. Input Area (Fixed above nav) */}
      <div className="flex-none p-4 pb-40 bg-gradient-to-t from-pavl-bg via-pavl-bg to-transparent z-20">
         <div className="glass-panel p-1.5 rounded-full flex items-center shadow-xl border border-slate-700">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Спроси что-нибудь..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4 placeholder-slate-500 text-sm"
              autoFocus
            />
            
            {/* Share Button */}
             <button 
              onClick={handleShare}
              disabled={messages.length <= 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all mr-1 text-slate-400 hover:text-white hover:bg-slate-800 ${isCopied ? 'text-green-500' : ''}`}
              title="Скопировать диалог"
            >
               {isCopied ? (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
               ) : (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
               )}
            </button>

            {/* Send Button */}
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                inputValue.trim() ? 'bg-blue-600 text-white active:scale-90' : 'bg-slate-800 text-slate-600'
              }`}
            >
               <svg className="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
         </div>
      </div>

    </div>
  );
};