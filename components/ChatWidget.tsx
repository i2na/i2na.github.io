import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello. I am YenaAI. I am here to provide clear and structured answers about Yena Lee.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToGemini(messages, userMsg.text);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[calc(100vw-32px)] md:w-[350px] max-h-[60vh] md:max-h-[500px] h-[500px] glass-panel rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-float transition-all border border-brand-purple/30 bg-black/80 backdrop-blur-xl">
          <div className="p-4 bg-brand-purple/20 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icons.Sparkles className="w-4 h-4 text-brand-purple" />
              <span className="font-bold text-sm text-white">YenaAI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-purple text-white rounded-br-none' 
                    : 'bg-white/10 text-white/90 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-black/40 border-t border-white/10">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about my philosophy..."
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-purple transition-colors text-white"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="p-2 bg-brand-purple rounded-full text-white hover:bg-brand-purple/80 disabled:opacity-50 shrink-0"
              >
                <Icons.ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative w-12 h-12 md:w-14 md:h-14 bg-brand-purple rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      >
        {isOpen ? (
            <span className="text-xl md:text-2xl font-bold text-white">✕</span>
        ) : (
            <Icons.Chat className="w-5 h-5 md:w-6 md:h-6 text-white" />
        )}
        
        {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-brand-green rounded-full border border-black animate-pulse"></span>
        )}
      </button>
    </div>
  );
};