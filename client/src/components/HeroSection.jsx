import React, { useState } from "react";

const HeroSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Connects cleanly to your leadController.js backend endpoint
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("🎉 Your 7-Day Free Pass has been reserved! Check your email.");
        setFormData({ name: "", email: "", phone: "" });
      } else {
        setMessage("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("❌ Network error. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-black text-white min-h-[90vh] flex items-center overflow-hidden py-12 px-6 lg:px-16">
      {/* Background abstract gradient accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Copy and Impact Stats */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <span className="inline-block bg-orange-600/20 text-orange-500 text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full border border-orange-500/30">
            Crush Your Fitness Goals
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Transform Your Body. <br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Unleash Your Power.
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0">
            Get access to premium local gym floors, certified personal trainers, and high-intensity group fitness classes tailored to your schedule.
          </p>

          {/* Social Proof Trust Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto lg:mx-0 border-t border-gray-800">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-orange-500">5k+</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Active Members</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">20+</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Certified Coaches</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">4.9/5</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Google Rating</p>
            </div>
          </div>
        </div>

        {/* Right Side: Free Pass Conversion Lead Form Card */}
        <div className="lg:col-span-5">
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:border-gray-700">
            <h3 className="text-xl font-bold text-white text-center mb-2">Claim Your Free 7-Day Pass</h3>
            <p className="text-sm text-gray-400 text-center mb-6">Limited slots available this week. No credit card required.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-black border border-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white placeholder-gray-600 rounded-lg px-4 py-2.5 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-black border border-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white placeholder-gray-600 rounded-lg px-4 py-2.5 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-black border border-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white placeholder-gray-600 rounded-lg px-4 py-2.5 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-black font-bold uppercase tracking-wider text-sm py-3 px-4 rounded-lg shadow-lg hover:shadow-orange-500/20 active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {loading ? "Processing..." : "Get My Free Pass"}
              </button>
            </form>

            {message && (
              <div className="mt-4 p-3 rounded-lg bg-black border border-gray-800 text-center text-sm font-medium animate-fadeIn">
                {message}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;