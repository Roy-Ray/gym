import React, { useState, useEffect, useRef } from "react";

// ==========================================
// 1. FULL UNIFIED APP LAYOUT
// ==========================================
export default function App() {
  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased scroll-smooth selection:bg-orange-500 selection:text-black">
      {/* Navigation Header bar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-amber-500 rounded-lg flex items-center justify-center font-black text-black">⚡</div>
            <span className="text-xl font-black tracking-wider uppercase bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">IRONPATH</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#hero" className="hover:text-orange-500 transition-colors">Overview</a>
            <a href="#calculator" className="hover:text-orange-500 transition-colors">BMI Tool</a>
            <a href="#programs" className="hover:text-orange-500 transition-colors">Memberships</a>
            <a href="#transformations" className="hover:text-orange-500 transition-colors">Results</a>
          </div>
          <a href="#hero" className="bg-white hover:bg-orange-500 text-black font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-all">
            Join Now
          </a>
        </div>
      </nav>

      {/* Landing Page Content Sections Flow */}
      <HeroSection />
      <BmiCalculator />
      <FeaturesAndPlansSection />
      <TransformationsSection />
      <FooterSection />
      
      {/* Floating Smart Overlay Assistant */}
      <DummyChatbot />
    </div>
  );
}

// ==========================================
// 2. HERO SECTION COMPONENT (With Backend Lead Capture)
// ==========================================
function HeroSection() {
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
      // Connects cleanly to your leadController.js back-end route
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("🎉 Free Pass reserved! Check your inbox for details.");
        setFormData({ name: "", email: "", phone: "" });
      } else {
        setMessage("❌ Something went wrong. Please check fields and try again.");
      }
    } catch (error) {
      setMessage("❌ Network error. Please verify your Node server layout is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hero" className="relative text-white min-h-[85vh] flex items-center overflow-hidden py-16 px-6 lg:px-16">
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <span className="inline-block bg-orange-600/20 text-orange-500 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-orange-500/30">
            Premium Fitness Community
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase">
            Transform Your Body. <br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Unleash Performance.
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Get access to standard-setting local equipment floors, certified elite coaching guides, and automated custom training routines tailored to your target variables.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-6 max-w-sm mx-auto lg:mx-0 border-t border-gray-900">
            <div>
              <p className="text-2xl font-black text-orange-500">12k+</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Workouts Tracked</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">25+</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Elite Coaches</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">4.9/5</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Member Score</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="bg-gray-950/80 backdrop-blur-md border border-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white text-center mb-1 uppercase tracking-wide">Claim Your Free 7-Day Pass</h3>
            <p className="text-xs text-gray-500 text-center mb-6">Zero risk activation. Fill out details to generate a temporary pass card.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-black border border-gray-800 focus:border-orange-500 text-sm text-white placeholder-gray-700 rounded-lg px-4 py-2.5 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-black border border-gray-800 focus:border-orange-500 text-sm text-white placeholder-gray-700 rounded-lg px-4 py-2.5 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full bg-black border border-gray-800 focus:border-orange-500 text-sm text-white placeholder-gray-700 rounded-lg px-4 py-2.5 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-black font-black uppercase tracking-widest text-xs py-3.5 rounded-lg shadow-lg hover:shadow-orange-500/10 active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {loading ? "Registering Pass..." : "Generate Pass Token"}
              </button>
            </form>
            {message && (
              <div className="mt-4 p-3 rounded-lg bg-black border border-gray-800 text-center text-xs font-medium">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. INTERACTIVE PARAMETER CALCULATOR WIDGET
// ==========================================
function BmiCalculator() {
  const [weight, setWeight] = useState(72);
  const [height, setHeight] = useState(176);

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  let status = "";
  let colorClass = "";
  if (bmi < 18.5) { status = "Underweight Target Tiers"; colorClass = "text-amber-400"; }
  else if (bmi < 25) { status = "Optimal Fitness Zone"; colorClass = "text-emerald-400"; }
  else if (bmi < 30) { status = "Conditioning Core Need"; colorClass = "text-orange-400"; }
  else { status = "Power Transformation Track"; colorClass = "text-red-400"; }

  return (
    <section id="calculator" className="bg-black text-white py-16 px-6 border-y border-gray-950">
      <div className="max-w-4xl mx-auto bg-gray-950 border border-gray-900 rounded-2xl p-6 sm:p-10 shadow-xl">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-2xl font-bold tracking-wide uppercase">Evaluate Your Performance Status</h2>
          <p className="text-gray-500 text-sm">Adjust baseline metrics to isolate your structural target band numbers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-gray-500">Stature / Height</span>
                <span className="text-orange-500">{height} cm</span>
              </div>
              <input
                type="range" min="130" max="210" value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-1 bg-gray-800 appearance-none cursor-pointer accent-orange-500 rounded"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-gray-500">Mass / Weight</span>
                <span className="text-orange-500">{weight} kg</span>
              </div>
              <input
                type="range" min="40" max="140" value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-1 bg-gray-800 appearance-none cursor-pointer accent-orange-500 rounded"
              />
            </div>
          </div>
          <div className="bg-black/60 border border-gray-900 rounded-xl p-6 text-center space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Calculated Body Index Metric</p>
            <p className="text-5xl font-black text-white tracking-tight">{bmi}</p>
            <p className="text-xs font-medium text-gray-400">
              Assigned Category: <span className={`font-bold ${colorClass}`}>{status}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. DYNAMIC MEMBERSHIP PLANS SECTION (Connects to backend)
// ==========================================
function FeaturesAndPlansSection() {
  const [dbPlans, setDbPlans] = useState([]);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    // Graceful asynchronous extraction mapping straight to your planController.js backend routes
    fetch("http://localhost:5000/api/plans")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setDbPlans(data); })
      .catch(() => console.log("Using built-in layout premium fallbacks."));
  }, []);

  // Built-in crisp fallback structure mapped dynamically if live fetch is loading
  const staticFallbackPlans = [
    { id: 1, name: "Starter Tier", price: 29, features: ["Standard Gym Floor Entry", "Cardio Deck Access", "Locker Room Open Tiers"] },
    { id: 2, name: "Elite Club", price: 59, features: ["Unlimited Access 24/7", "All Dynamic Group Classes", "Monthly Personal Assessment Strategy Guide", "Sauna Rooms Key Token"], popular: true },
    { id: 3, name: "VIP Power Track", price: 99, features: ["Private Locker Tiers", "Daily Dedicated 1-on-1 Trainer Session", "Tailored Custom Diet Matrix", "Free Protein Shake Bar Allocation"] }
  ];

  const currentPlansArray = dbPlans.length > 0 ? dbPlans : staticFallbackPlans;

  return (
    <section id="programs" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black uppercase tracking-tight">Structured Membership Tiers</h2>
        <p className="text-gray-500 max-w-md mx-auto text-sm">Transparent packages built around programmatic performance tracks. Cancel anytime rules apply.</p>
        
        {/* Toggle Switch Component Layout */}
        <div className="inline-flex items-center gap-3 bg-gray-950 p-1.5 rounded-xl border border-gray-900 mt-2">
          <button 
            onClick={() => setIsAnnual(false)}
            className={`text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-lg transition-all ${!isAnnual ? "bg-orange-600 text-black" : "text-gray-400 hover:text-white"}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setIsAnnual(true)}
            className={`text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-lg transition-all ${isAnnual ? "bg-orange-600 text-black" : "text-gray-400 hover:text-white"}`}
          >
            Annually <span className="text-[10px] text-amber-200 ml-0.5">(Save 15%)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentPlansArray.map((plan) => {
          const rawPrice = plan.price || 30;
          const displayPrice = isAnnual ? Math.floor(rawPrice * 12 * 0.85) : rawPrice;
          
          return (
            <div 
              key={plan.id}
              className={`relative bg-gray-950 border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${plan.popular ? "border-orange-500 shadow-xl shadow-orange-500/5 ring-1 ring-orange-500/30 scale-[1.02]" : "border-gray-900 hover:border-gray-800"}`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-orange-600 to-amber-500 text-black font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                  Best Value Tier
                </span>
              )}
              <div className="space-y-4">
                <p className="text-sm font-bold tracking-wide uppercase text-gray-400">{plan.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tight">${displayPrice}</span>
                  <span className="text-xs text-gray-500 font-medium">/{isAnnual ? "yr" : "mo"}</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-gray-900">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-400 leading-tight">
                      <span className="text-orange-500 font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a 
                href="#hero" 
                className={`w-full text-center font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition-all mt-8 ${plan.popular ? "bg-orange-600 text-black hover:bg-orange-500" : "bg-gray-900 hover:bg-gray-800 text-white"}`}
              >
                Select Action Route
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ==========================================
// 5. BEFORE/AFTER TRANSFORMATION & SOCIAL REVIEWS
// ==========================================
function TransformationsSection() {
  return (
    <section id="transformations" className="bg-gray-950/40 py-20 px-6 border-t border-gray-950">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Real Transformations</h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">Physical execution benchmarks achieved by real community members inside our facility doors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-black/60 border border-gray-900 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center text-xs font-bold uppercase text-gray-400 tracking-wider">
              <span>Member Track #042</span>
              <span className="text-emerald-400 font-bold">12 Weeks Result</span>
            </div>
            <div className="grid grid-cols-2 gap-2 h-48 bg-gray-900/40 rounded-xl overflow-hidden text-center relative font-black">
              <div className="flex items-center justify-center bg-gray-900/80 text-gray-600 border-r border-black">BEFORE</div>
              <div className="flex items-center justify-center bg-orange-950/20 text-orange-500">AFTER</div>
            </div>
            <p className="text-xs text-gray-400 italic">"The calculated nutritional macro guides and constant accountability loops completely overhauled my baseline routine constants."</p>
          </div>

          <div className="bg-black/60 border border-gray-900 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center text-xs font-bold uppercase text-gray-400 tracking-wider">
              <span>Member Track #109</span>
              <span className="text-emerald-400 font-bold">16 Weeks Result</span>
            </div>
            <div className="grid grid-cols-2 gap-2 h-48 bg-gray-900/40 rounded-xl overflow-hidden text-center relative font-black">
              <div className="flex items-center justify-center bg-gray-900/80 text-gray-600 border-r border-black">BEFORE</div>
              <div className="flex items-center justify-center bg-orange-950/20 text-orange-500">AFTER</div>
            </div>
            <p className="text-xs text-gray-400 italic">"The automated reservation schedules make checking in simple and clear. The strength track results are completely undeniable."</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. FLOATING AUTOMATED CHATBOT INTERACTION
// ==========================================
function DummyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: '👋 Welcome! I am your IronPath active interface agent. Select an option to query status rules:' }
  ]);
  const [showOptions, setShowOptions] = useState(true);
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const triggerWorkflowResponse = (selectedText, categoryKey) => {
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: selectedText }]);
    setShowOptions(false);

    setTimeout(() => {
      let logicResponse = "";
      if (categoryKey === 'pass') {
        logicResponse = "🎟️ Perfect choice! Use the Free Pass signup submission card positioned directly in the top Hero zone of the landing page window.";
      } else if (categoryKey === 'pricing') {
        logicResponse = "💰 Core entry parameters initialize at $29/mo. Toggle the Annual button grid layout above to visually calculate 15% system adjustments.";
      } else {
        logicResponse = "⏰ Our high-intensity weights and training track floors remain open 24/7/365 to premium tier configuration access holders.";
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: logicResponse }]);
      setTimeout(() => setShowOptions(true), 1200);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <span className="absolute top-0 right-0 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
        </span>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 rounded-full flex items-center justify-center shadow-2xl text-black font-black transition-transform active:scale-95 outline-none"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 sm:w-85 h-96 bg-gray-950 border border-gray-900 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          <div className="bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-900">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-black text-white uppercase tracking-wider">System Interface Guide</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black/30">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 text-xs rounded-lg leading-relaxed ${m.sender === 'user' ? 'bg-orange-600 text-white' : 'bg-gray-900 text-gray-300 border border-gray-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          {showOptions && (
            <div className="p-3 bg-gray-900/40 border-t border-gray-900 space-y-1.5">
              <button onClick={() => triggerWorkflowResponse("🎟️ Secure 7-Day Free Code", "pass")} className="w-full text-left bg-black border border-gray-800 hover:border-orange-500 text-[11px] text-white px-3 py-1.5 rounded transition-all">🎟️ Request Free Trial Pass</button>
              <button onClick={() => triggerWorkflowResponse("💰 Membership Pricing Check", "pricing")} className="w-full text-left bg-black border border-gray-800 hover:border-orange-500 text-[11px] text-white px-3 py-1.5 rounded transition-all">💰 Query Tier Price Constants</button>
              <button onClick={() => triggerWorkflowResponse("⏰ Check Floor Timings", "hours")} className="w-full text-left bg-black border border-gray-800 hover:border-orange-500 text-[11px] text-white px-3 py-1.5 rounded transition-all">⏰ Facility Operational Hours</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. LANDING FOOTER AREA SECTION
// ==========================================
function FooterSection() {
  return (
    <footer className="bg-black border-t border-gray-950 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        <div className="space-y-3">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center font-black text-xs text-black">⚡</div>
            <span className="font-black text-sm tracking-widest uppercase">IRONPATH</span>
          </div>
          <p className="text-xs text-gray-500 max-w-xs">Building scalable structural fitness frameworks for high-achieving local tracks since 2024.</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Floor Hours</p>
          <p className="text-xs text-gray-500">Mon - Fri: 5:00 AM — 11:00 PM</p>
          <p className="text-xs text-gray-500">Sat - Sun: 7:00 AM — 9:00 PM</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Facility Location</p>
          <p className="text-xs text-gray-500">Panihati Core Workout Grid Area</p>
          <p className="text-xs text-gray-500">Kolkata, West Bengal — India</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-950 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-600 gap-4">
        <p>© 2026 IronPath Fitness Framework Labs. All data processing variables reserved.</p>
        <div className="flex gap-4">
          <span className="hover:text-gray-400 cursor-pointer">Privacy Rule Constants</span>
          <span className="hover:text-gray-400 cursor-pointer">Service Terms Matrix</span>
        </div>
      </div>
    </footer>
  );
}