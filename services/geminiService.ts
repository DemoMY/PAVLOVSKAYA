import { GoogleGenerativeAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

// Проверяем, есть ли API-ключ
const hasApiKey = API_KEY && API_KEY !== 'your_api_key_here' && API_KEY.trim() !== '';

let genAI: GoogleGenerativeAI | null = null;

if (hasApiKey) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

export const sendChatMessage = async (history: Array<{ role: 'user' | 'model', parts: Array<{ text: string }> }>, input: string) => {
  // Если нет API-ключа, возвращаем предопределенный ответ
  if (!hasApiKey) {
    return 'API-ключ для нейросети не установлен. Пожалуйста, настройте VITE_GEMINI_API_KEY в файле .env';
  }

  try {
    if (!genAI) {
      throw new Error('GoogleGenerativeAI не инициализирован');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Filter out any messages with empty text
    const filteredHistory = history.filter(msg => msg.parts && msg.parts.length > 0 && msg.parts[0].text.trim() !== '');
    
    const chat = model.startChat({
      history: filteredHistory,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
    
    const result = await chat.sendMessage(input);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Возвращаем ответ по умолчанию при ошибке
    return 'Извините, возникла проблема с подключением к нейросети. Пожалуйста, попробуйте еще раз позже.';
  }
};