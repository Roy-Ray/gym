import React, { useState } from 'react';

export default function HeroSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessage('Success! We will contact you shortly.');
        setFormData({ name: '', email: '', phone: '' });
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center pt-20">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      
      <div className="relative z-10 px-4 w-full max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-wider">
          Forge Your <span className="text-yellow-500">Legacy</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-12">
          Join the elite. Access world-class equipment and a community of champions.
        </p>

        {/* Lead Capture Form */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md mx-auto border border-gray-700">
          <h2 className="text-2xl font-bold text-yellow-500 mb-6">Claim 1-Day Free Trial</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input 
              type="text" placeholder="Full Name" required
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              className="p-3 rounded bg-gray-900 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
            />
            <input 
              type="email" placeholder="Email Address" required
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              className="p-3 rounded bg-gray-900 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
            />
            <input 
              type="tel" placeholder="Phone Number"
              value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
              className="p-3 rounded bg-gray-900 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
            />
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded transition duration-300">
              Get Started
            </button>
          </form>
          {message && <p className="mt-4 text-sm font-semibold text-white">{message}</p>}
        </div>
      </div>
    </div>
  );
}