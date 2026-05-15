import React from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import DummyChatbot from "./components/DummyChatbot";

export default function App() {
  return (
    <div className="bg-[#050505] text-white overflow-x-hidden">
      
      {/* Hero */}
      <HeroSection />

      {/* Features + Plans */}
      <FeaturesSection />

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-yellow-400 uppercase tracking-[4px] mb-3">
              Success Stories
            </p>

            <h2 className="text-5xl font-black mb-4">
              What Members Say
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Real transformations from our premium fitness community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul",
                review:
                  "The best gym experience I've ever had. Premium atmosphere and amazing trainers.",
              },
              {
                name: "Ananya",
                review:
                  "My transformation journey became easier because of the structured coaching.",
              },
              {
                name: "Arjun",
                review:
                  "Modern equipment, energetic environment, and excellent support staff.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-yellow-400/40 transition-all duration-300"
              >
                <div className="text-yellow-400 text-3xl mb-4">
                  ★★★★★
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {item.review}
                </p>

                <h4 className="font-bold text-lg">
                  {item.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t border-white/10 py-10 px-6 text-center text-gray-400"
      >
        <h3 className="text-3xl font-black text-white mb-4">
          Iron<span className="text-yellow-400">Core</span>
        </h3>

        <p className="mb-3">
          Premium Fitness & Performance Center
        </p>

        <p className="text-sm">
          © 2026 IronCore Gym. All rights reserved.
        </p>
      </footer>

      {/* Chatbot */}
      <DummyChatbot />
    </div>
  );
}