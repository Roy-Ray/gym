import React from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DummyChatbot from './components/DummyChatbot';

export default function App() {
  return (
    <div className="font-sans antialiased bg-black min-h-screen">
      {/* Simple Navigation Menu */}
      <nav className="absolute top-0 w-full p-6 z-20 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter uppercase text-yellow-500">
          Iron<span className="text-white">Core</span>
        </div>
        <div className="hidden md:flex space-x-6 font-semibold text-white">
          <a href="#" className="hover:text-yellow-500 transition">Programs</a>
          <a href="#" className="hover:text-yellow-500 transition">Memberships</a>
          <a href="#" className="hover:text-yellow-500 transition">Contact</a>
        </div>
      </nav>

      {/* Page Content */}
      <HeroSection />
      <FeaturesSection />
      <DummyChatbot />
    </div>
  );
}