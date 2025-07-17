import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { trackContact, trackCustomEvent } from '../utils/metaPixel';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      const userMessage = message.trim();
      setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
      setMessage('');
      setIsLoading(true);

            // Track chat message sent
      trackContact({
        method: 'chat_widget',
        value: 0,
        currency: 'USD'
      });

      // Temporarily disabled AI chat
      setMessages(prev => [...prev, { type: 'ai', content: 'Chat feature is currently being updated. Please contact us directly for assistance.' }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Floating Bubble */}
      {!open && (
        <div className="flex flex-col items-center">
          <button
            className="bg-[#0F172A] hover:bg-[#1e3350] text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center transition-all duration-300 border-4 border-orange-500 animate-bounce"
            onClick={() => {
              // Track chat widget open
              trackCustomEvent('ChatWidgetOpen', {
                widget_location: 'bottom_right',
                content_category: 'support'
              });
              setOpen(true);
            }}
            aria-label="Open chat"
          >
            <MessageCircle className="w-8 h-8 text-orange-500" />
          </button>
          <span className="mt-1 text-xs text-orange-500 font-semibold">Live Chat</span>
        </div>
      )}
      {/* Chat Panel */}
      {open && (
        <div className="w-[420px] max-w-[95vw] sm:max-w-[98vw] bg-[#0F172A] text-white rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 animate-fadeInUp border-2 border-orange-500 relative h-[500px] sm:h-[600px]">
          <button
            className="absolute top-3 right-3 text-orange-500 hover:text-orange-400"
            onClick={() => { setOpen(false); setMessages([]); }}
            aria-label="Close chat"
          >
            <X className="w-7 h-7" />
          </button>
          {/* Avatar and Name at the top */}
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <img src="/images/bot-avatar.png" alt="Ray Avatar" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-orange-500 bg-white" />
            <span className="font-bold text-lg sm:text-2xl">Ray</span>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-3">
            {messages.length === 0 && (
              <div className="text-sm text-gray-300">
                👋 Need help ranking on Google Maps? Ask me anything about our services!
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-700 text-white'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="flex gap-2">
            <textarea
              className="flex-1 rounded-lg p-2 text-gray-900 min-h-[40px] max-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              placeholder="Type your message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              disabled={isLoading}
              required
              style={{ minHeight: '44px' }}
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 shadow-md disabled:cursor-not-allowed active:scale-95 touch-manipulation"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
      <style>{`
        @media (max-width: 640px) {
          .fixed.bottom-6.right-6 { bottom: 1rem; right: 1rem; }
          .w-80 { width: 95vw !important; }
        }
        @media (max-width: 480px) {
          .fixed.bottom-6.right-6 { bottom: 0.5rem; right: 0.5rem; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s cubic-bezier(.39,.575,.565,1) both;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ChatWidget; 