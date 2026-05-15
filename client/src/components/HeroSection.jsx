import React, { useState } from "react";

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Successfully registered for free trial.");
        setFormData({
          name: "",
          email: "",
          phone: "",
        });
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,208,0,0.18),transparent_35%)]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Side */}
        <div>
          <p className="uppercase tracking-[6px] text-yellow-400 text-sm mb-6">
            Transform Your Body
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] mb-8">
            Train Hard.
            <br />
            Become <span className="text-yellow-400">Unstoppable.</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            Experience elite-level fitness with cutting-edge equipment,
            certified trainers, nutrition guidance, and a motivating premium
            environment.
          </p>

          <div className="flex flex-wrap gap-5 mb-12">
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/20">
              Start Free Trial
            </button>
            <button className="border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <div className="bg-white/5 rounded-[2rem] p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">Free Trial</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name"
                className="w-full rounded-full border border-white/20 bg-transparent px-5 py-4 text-white outline-none focus:border-yellow-400"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                className="w-full rounded-full border border-white/20 bg-transparent px-5 py-4 text-white outline-none focus:border-yellow-400"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Phone"
                className="w-full rounded-full border border-white/20 bg-transparent px-5 py-4 text-white outline-none focus:border-yellow-400"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-yellow-400 px-5 py-4 font-bold text-black transition hover:scale-105"
              >
                {loading ? "Submitting..." : "Get Free Trial"}
              </button>
            </form>
            {message && (
              <p className="mt-4 text-sm text-green-300">{message}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;