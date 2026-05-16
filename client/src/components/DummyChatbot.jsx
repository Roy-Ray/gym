import React, { useState, useEffect, useRef } from 'react';

export default function DummyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: '👋 Hi there! Welcome to our Gym community. How can I assist your transformation today?' }
  ]);
  const [showOptions, setShowOptions] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleOptionClick = (optionText, optionType) => {
    // Append user selection message
    const userMsg = { id: Date.now(), sender: 'user', text: optionText };
    setMessages(prev => [...prev, userMsg]);
    setShowOptions(false);

    setTimeout(() => {
      let botResponse = "";
      if (optionType === 'pass') {
        botResponse = "🎟️ Awesome choice! Scroll directly to the form container in the top Hero area to instantly register your information for a Free 7-Day Workout Pass.";
      } else if (optionType === 'pricing') {
        botResponse = "💰 Our core plans start as low as $29/mo! You can toggle between monthly and annual discounts further down on our pricing grid section.";
      } else {
        botResponse = "⏰ Our training floor is open 24/7 for premium tier holders! General hours run from 5:00 AM to 11:00 PM daily.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
      
      // Reset options after workflow context finishes
      setTimeout(() => setShowOptions(true), 1500);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Pulse Notification Ring on Launcher Button */}
      {!isOpen && (
        <span className="absolute top-0 right-0 flex h-3 w-3 z-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
        </span>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 rounded-full flex items-center justify-center shadow-xl hover:shadow-orange-500/30 text-black font-bold transition-all duration-300 transform active:scale-95"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
      </button>

      {/* Chat Window Frame */}
      {isOpen && (
        <div className="absolute bottom-18 right-0 w-80 sm:w-96 h-[450px] bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          {/* Header Banner */}
          <div className="bg-gray-900 border-b border-gray-800 px-4 py-3.5 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="text-sm font-bold text-white">Fitness Assistant</p>
              <p className="text-xs text-gray-500">Replies instantly</p>
            </div>
          </div>

          {/* Message Thread Streams */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm rounded-xl leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-orange-600 text-white rounded-br-none'
                      : 'bg-gray-900 text-gray-200 border border-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Interaction Workflow Layer */}
          {showOptions && (
            <div className="px-4 py-3 bg-gray-900/60 border-t border-gray-900 space-y-2">
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Select a quick inquiry:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleOptionClick("🎟️ Get a Free Day Pass", "pass")}
                  className="bg-black hover:bg-gray-800 text-xs border border-gray-800 hover:border-orange-500/50 text-white px-3 py-1.5 rounded-lg transition-all"
                >
                  🎟️ Free Day Pass
                </button>
                <button
                  onClick={() => handleOptionClick("💰 Check Membership Tiers", "pricing")}
                  className="bg-black hover:bg-gray-800 text-xs border border-gray-800 hover:border-orange-500/50 text-white px-3 py-1.5 rounded-lg transition-all"
                >
                  💰 Pricing Plans
                </button>
                <button
                  onClick={() => handleOptionClick("⏰ Show Gym Hours", "hours")}
                  className="bg-black hover:bg-gray-800 text-xs border border-gray-800 hover:border-orange-500/50 text-white px-3 py-1.5 rounded-lg transition-all"
                >
                  ⏰ Gym Hours
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}