import React, { useState } from 'react';

export default function DummyChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-gray-900 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-700">
          <div className="bg-yellow-500 p-4 flex justify-between items-center">
            <h3 className="font-bold text-black uppercase tracking-wide">IronCore Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-black font-bold text-2xl leading-none">&times;</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-800">
            <div className="bg-gray-700 p-3 rounded-lg w-3/4 mb-4 text-sm text-white">
              Hi there! 💪 How can I help you crush your fitness goals today?
            </div>
          </div>
          <div className="p-3 border-t border-gray-700 bg-gray-900 flex">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 p-2 bg-gray-800 text-white rounded-l focus:outline-none"
              disabled
            />
            <button className="bg-yellow-500 text-black font-bold px-4 rounded-r">Send</button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-yellow-500 hover:bg-yellow-400 text-black p-4 rounded-full shadow-lg font-bold flex items-center justify-center w-14 h-14 transition duration-300 transform hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        </button>
      )}
    </div>
  );
}