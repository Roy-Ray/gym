import React, { useState, useEffect, useRef } from "react";

// ==========================================
// 1. FULL UNIFIED APP LAYOUT
// ==========================================
export default function App() {
  // Simple state routing to switch between 'home' and 'terms'
  const [currentPage, setCurrentPage] = useState("home");

  // Helper to scroll to top when changing pages
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased scroll-smooth selection:bg-orange-500 selection:text-black">
      {/* Navigation Header bar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigateTo("home")}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-amber-500 rounded-lg flex items-center justify-center font-black text-black">⚡</div>
            <span className="text-xl font-black tracking-wider uppercase bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">IRONPATH</span>
          </div>
          
          {currentPage === "home" ? (
            <div className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-gray-400 uppercase tracking-wider">
              <a href="#hero" className="hover:text-orange-500 transition-colors">Overview</a>
              <a href="#about" className="hover:text-orange-500 transition-colors">About Us</a>
              <a href="#calculator" className="hover:text-orange-500 transition-colors">BMI</a>
              <a href="#programs" className="hover:text-orange-500 transition-colors">Plans</a>
              <a href="#transformations" className="hover:text-orange-500 transition-colors">Results</a>
              <a href="#community" className="hover:text-orange-500 transition-colors">Community</a>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-gray-400 uppercase tracking-wider">
               <button onClick={() => navigateTo("home")} className="hover:text-orange-500 transition-colors">← Back to Home</button>
            </div>
          )}

          <button onClick={() => navigateTo("home")} className="bg-white hover:bg-orange-500 text-black font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-all">
            Join Now
          </button>
        </div>
      </nav>

      {/* Page Routing Logic */}
      {currentPage === "home" ? (
        <>
          <HeroSection />
          <BmiCalculator />
          <AboutSection />
          <FeaturesAndPlansSection />
          <TransformationsSection />
          <CommunitySection />
        </>
      ) : (
        <ServiceTermsPage onBack={() => navigateTo("home")} />
      )}

      {/* Footer receives the navigation function to trigger the Terms page */}
      <FooterSection navigateTo={navigateTo} />
      
      {/* Floating Smart Overlay Assistant */}
      <DummyChatbot />
    </div>
  );
}

// ==========================================
// NEW: SERVICE TERMS PAGE (14 Rules)
// ==========================================
function ServiceTermsPage({ onBack }) {
  const rules = [
    "Membership is strictly non-transferable and non-refundable under any circumstances.",
    "Proper athletic attire and closed-toe sports shoes are mandatory on the gym floor.",
    "Members must re-rack all weights, dumbbells, and plates immediately after use.",
    "Wipe down benches and equipment with provided sanitary wipes after your set.",
    "Cardio equipment usage is limited to 30 minutes during peak operational hours.",
    "Personal training by unauthorized individuals or external coaches is strictly prohibited.",
    "IronPath Management is not responsible for any lost, stolen, or damaged personal items.",
    "Respect the personal space and privacy of others; harassment will result in immediate termination.",
    "Slamming or deliberately dropping heavy weights is prohibited to protect the flooring and equipment.",
    "Gym bags, helmets, and large personal items must be stored in the designated locker rooms.",
    "Photography or videography of other members without their explicit consent is strictly forbidden.",
    "Facility access is granted only during the designated operational hours of your specific membership tier.",
    "Membership cancelation requests require a standard 30-day written notice submitted to administration.",
    "Right of admission is strictly reserved by IronPath Fitness Framework Labs management."
  ];

  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 border-b border-gray-900 pb-10">
          <button 
            onClick={onBack}
            className="text-gray-500 hover:text-orange-500 text-xs font-bold uppercase tracking-widest mb-6 transition-colors"
          >
            ← Return to Main Grid
          </button>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Service <span className="text-orange-500">Rules & Terms</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
            To maintain an elite, safe, and highly functional training environment, all active members of the IronPath facility are strictly bound by the following 14 operational rules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
          {rules.map((rule, index) => (
            <div key={index} className="bg-gray-950 border border-gray-900 p-6 rounded-2xl flex gap-4 hover:border-orange-500/30 transition-colors">
              <span className="text-orange-500 font-black text-xl opacity-80 mt-[-2px]">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <p className="text-gray-400 text-sm leading-relaxed">
                {rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. HERO SECTION COMPONENT 
// ==========================================
function HeroSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
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
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 scale-105">
          <source src="https://res.cloudinary.com/dlvpmxac5/video/upload/v1779115642/gym-bg.mp4_hva7h2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
      </div>

      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-amber-500/20 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <span className="inline-block bg-orange-600/20 text-orange-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-orange-500/30 backdrop-blur-sm">
            Premium Fitness Community
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase text-white drop-shadow-lg">
            Transform Your Body. <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              Unleash Performance.
            </span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed drop-shadow-md">
            Get access to standard-setting local equipment floors, certified elite coaching guides, and automated custom training routines.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-6 max-w-sm mx-auto lg:mx-0 border-t border-gray-800/80">
            <div><p className="text-2xl font-black text-orange-500">12k+</p><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Workouts</p></div>
            <div><p className="text-2xl font-black text-white">25+</p><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Coaches</p></div>
            <div><p className="text-2xl font-black text-white">4.9/5</p><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Rating</p></div>
          </div>
        </div>

        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="bg-black/40 backdrop-blur-xl border border-gray-800/60 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white text-center mb-1 uppercase tracking-wide">Claim Your Free 7-Day Pass</h3>
            <p className="text-xs text-gray-400 text-center mb-6">Zero risk activation. Fill out details to generate a temporary pass card.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full bg-black/60 border border-gray-800 focus:border-orange-500 text-sm text-white placeholder-gray-600 rounded-lg px-4 py-3 outline-none transition-all" /></div>
              <div><input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full bg-black/60 border border-gray-800 focus:border-orange-500 text-sm text-white placeholder-gray-600 rounded-lg px-4 py-3 outline-none transition-all" /></div>
              <div><input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full bg-black/60 border border-gray-800 focus:border-orange-500 text-sm text-white placeholder-gray-600 rounded-lg px-4 py-3 outline-none transition-all" /></div>
              <button type="submit" disabled={loading} className="w-full mt-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-black font-black uppercase tracking-widest text-xs py-4 rounded-lg shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all disabled:opacity-50">
                {loading ? "Registering Pass..." : "Generate Pass Token"}
              </button>
            </form>
            {message && <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center text-xs font-bold">{message}</div>}
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
              <input type="range" min="130" max="210" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full h-1 bg-gray-800 appearance-none cursor-pointer accent-orange-500 rounded" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-gray-500">Mass / Weight</span>
                <span className="text-orange-500">{weight} kg</span>
              </div>
              <input type="range" min="40" max="140" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full h-1 bg-gray-800 appearance-none cursor-pointer accent-orange-500 rounded" />
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
// 4. ABOUT US SECTION (Premium Layout)
// ==========================================
function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-[10px]">The IronPath Protocol</span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-[1.1] text-white">
              Forged in Iron.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">
                Driven by Data.
              </span>
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Founded in the core workout grid of Panihati, <strong className="text-gray-200">IronPath Fitness Framework Labs</strong> was built with a singular vision: to bring evidence-based training algorithms and elite-level facility standards to the local community.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              We are not just a gym. We are an ecosystem of certified trainers, automated progression tracking, and an unrelenting supportive community.
            </p>
          </div>
          <div className="pt-6 border-t border-gray-900 flex gap-10">
            <div><p className="text-2xl font-black text-white">2024</p><p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">Established</p></div>
            <div><p className="text-2xl font-black text-white">10k<span className="text-orange-500 text-lg">+</span></p><p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">Sq.Ft Facility</p></div>
          </div>
        </div>

        <div className="lg:col-span-7 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-950/80 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl flex flex-col justify-center space-y-4 transform transition-all hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(234,88,12,0.1)]">
              <div className="w-12 h-12 bg-black border border-gray-800 rounded-xl flex items-center justify-center text-orange-500 text-xl shadow-inner shadow-orange-500/10">🔬</div>
              <div><h4 className="text-base font-black text-white uppercase tracking-wider mb-2">Evidence Based</h4><p className="text-xs text-gray-400 leading-relaxed">No guesswork. Our programming is built on scientifically backed hypertrophy and conditioning metrics.</p></div>
            </div>
            <div className="bg-gray-950/80 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl flex flex-col justify-center space-y-4 transform sm:translate-y-12 transition-all hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(234,88,12,0.1)] mt-4 sm:mt-0">
              <div className="w-12 h-12 bg-black border border-gray-800 rounded-xl flex items-center justify-center text-amber-500 text-xl shadow-inner shadow-amber-500/10">🛡️</div>
              <div><h4 className="text-base font-black text-white uppercase tracking-wider mb-2">Elite Arsenal</h4><p className="text-xs text-gray-400 leading-relaxed">Equipped with standard-setting, biomechanically accurate machines and a massive free-weight deck.</p></div>
            </div>
            <div className="bg-gray-950/80 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl flex flex-col justify-center space-y-4 sm:col-span-2 transform sm:translate-y-12 transition-all hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(234,88,12,0.1)] mt-4 sm:mt-0">
              <div className="w-12 h-12 bg-black border border-gray-800 rounded-xl flex items-center justify-center text-emerald-500 text-xl shadow-inner shadow-emerald-500/10">🤝</div>
              <div><h4 className="text-base font-black text-white uppercase tracking-wider mb-2">Iron Community</h4><p className="text-xs text-gray-400 leading-relaxed max-w-xl">A zero-judgment, high-accountability environment where every member pushes the other towards their ultimate baseline. We grow together.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. DYNAMIC MEMBERSHIP PLANS SECTION
// ==========================================
function FeaturesAndPlansSection() {
  const [dbPlans, setDbPlans] = useState([]);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    fetch("https://ironpath-api.onrender.com/api/plans")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setDbPlans(data); })
      .catch(() => console.log("Using built-in layout premium fallbacks."));
  }, []);

  const staticFallbackPlans = [
    { id: 1, name: "Starter Tier", price: 29, features: ["Standard Gym Floor Entry", "Cardio Deck Access", "Locker Room Open Tiers"] },
    { id: 2, name: "Elite Club", price: 59, features: ["Unlimited Access 24/7", "All Dynamic Group Classes", "Monthly Personal Assessment Strategy Guide", "Sauna Rooms Key Token"], popular: true },
    { id: 3, name: "VIP Power Track", price: 99, features: ["Private Locker Tiers", "Daily Dedicated 1-on-1 Trainer Session", "Tailored Custom Diet Matrix", "Free Protein Shake Bar Allocation"] }
  ];

  const currentPlansArray = dbPlans.length > 0 ? dbPlans : staticFallbackPlans;

  return (
    <section id="programs" className="bg-gray-950/30 py-24 px-6 border-y border-gray-950">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tight">Structured Membership Tiers</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">Transparent packages built around programmatic performance tracks. Cancel anytime rules apply.</p>
          <div className="inline-flex items-center gap-3 bg-black p-1.5 rounded-xl border border-gray-900 mt-2">
            <button onClick={() => setIsAnnual(false)} className={`text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-lg transition-all ${!isAnnual ? "bg-orange-600 text-black" : "text-gray-400 hover:text-white"}`}>Monthly</button>
            <button onClick={() => setIsAnnual(true)} className={`text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-lg transition-all ${isAnnual ? "bg-orange-600 text-black" : "text-gray-400 hover:text-white"}`}>
              Annually <span className="text-[10px] text-amber-200 ml-0.5">(Save 15%)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentPlansArray.map((plan) => {
            const rawPrice = plan.price || 30;
            const displayPrice = isAnnual ? Math.floor(rawPrice * 12 * 0.85) : rawPrice;
            return (
              <div key={plan.id} className={`relative bg-black border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${plan.popular ? "border-orange-500 shadow-xl shadow-orange-500/5 ring-1 ring-orange-500/30 scale-[1.02]" : "border-gray-900 hover:border-gray-800"}`}>
                {plan.popular && <span className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-orange-600 to-amber-500 text-black font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">Best Value Tier</span>}
                <div className="space-y-4">
                  <p className="text-sm font-bold tracking-wide uppercase text-gray-400">{plan.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tight">${displayPrice}</span>
                    <span className="text-xs text-gray-500 font-medium">/{isAnnual ? "yr" : "mo"}</span>
                  </div>
                  <ul className="space-y-3 pt-4 border-t border-gray-900">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-400 leading-tight">
                        <span className="text-orange-500 font-bold">✓</span><span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className={`w-full text-center font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition-all mt-8 ${plan.popular ? "bg-orange-600 text-black hover:bg-orange-500" : "bg-gray-900 hover:bg-gray-800 text-white"}`}>Select Action Route</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. BEFORE/AFTER TRANSFORMATION SECTION
// ==========================================
function BeforeAfterSlider({ beforeImage, afterImage }) {
  const [position, setPosition] = useState(50);
  
  return (
    <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-gray-900 select-none group shadow-inner border border-gray-800">
      
      {/* AFTER State (Background Image) */}
      <div 
        className="absolute inset-0 bg-cover bg-center flex items-end justify-end p-4"
        style={{ backgroundImage: `url(${afterImage})` }}
      >
        <span className="bg-black/60 backdrop-blur text-orange-500 font-black tracking-widest text-xs px-3 py-1 rounded uppercase">
          After
        </span>
      </div>

      {/* BEFORE State (Foreground Image, clipped by slider) */}
      <div 
        className="absolute inset-y-0 left-0 overflow-hidden shadow-[4px_0_15px_rgba(0,0,0,0.8)] z-10" 
        style={{ width: `${position}%` }}
      >
         <div 
           className="absolute inset-0 h-full bg-cover bg-center flex items-end justify-start p-4"
           style={{ backgroundImage: `url(${beforeImage})`, width: '100vw', maxWidth: '100%' }}
         >
           <span className="bg-black/60 backdrop-blur text-gray-300 font-black tracking-widest text-xs px-3 py-1 rounded uppercase">
             Before
           </span>
         </div>
      </div>

      {/* Invisible HTML Range Input for Mobile/Desktop dragging */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={position} 
        onChange={(e) => setPosition(e.target.value)} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30" 
      />

      {/* Custom Draggable Line & Thumb */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-orange-500 pointer-events-none flex items-center justify-center z-20" 
        style={{ left: `calc(${position}% - 1px)` }}
      >
        <div className="w-8 h-8 bg-black rounded-full shadow-[0_0_15px_rgba(234,88,12,0.5)] flex items-center justify-center border-2 border-orange-500 text-orange-500 group-hover:scale-110 transition-transform">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 9l-4 4 4 4m8-8l4 4-4 4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TransformationsSection() {
  return (
    <section id="transformations" className="py-24 px-6 border-b border-gray-950 bg-black">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="inline-block bg-orange-600/10 text-orange-500 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-orange-500/20">Proven Results</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Real Transformations</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">Physical execution benchmarks achieved by real community members. Drag the sliders below to view structural changes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1 */}
          <div className="bg-gray-950/50 backdrop-blur-sm border border-gray-900 p-1.5 rounded-3xl shadow-2xl transition-all duration-300 hover:border-gray-800">
            <div className="bg-black border border-gray-900/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div><h4 className="text-white font-black tracking-wide uppercase text-sm">Marcus T. <span className="text-gray-600 font-normal">/ 32</span></h4><p className="text-xs text-gray-500 font-medium mt-1">Software Engineer</p></div>
                <span className="inline-block bg-emerald-500/10 text-emerald-400 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border border-emerald-500/20">12 Weeks</span>
              </div>
              
              <BeforeAfterSlider 
                beforeImage="https://images.unsplash.com/photo-1606902965551-dce093cda6e7?q=80&w=800&auto=format&fit=crop"
                afterImage="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"
              />
              
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-900/80">
                <div className="text-center"><p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mb-1">Weight</p><p className="text-xl font-black text-white">-14 <span className="text-xs text-orange-500">lbs</span></p></div>
                <div className="text-center border-l border-gray-900/80"><p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mb-1">Body Fat</p><p className="text-xl font-black text-white">-6.5 <span className="text-xs text-orange-500">%</span></p></div>
                <div className="text-center border-l border-gray-900/80"><p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mb-1">Strength</p><p className="text-xl font-black text-white">+35 <span className="text-xs text-emerald-500">%</span></p></div>
              </div>
              <p className="text-sm text-gray-400 italic leading-relaxed relative"><span className="text-gray-800 text-3xl font-serif absolute -top-2 -left-2">"</span>&nbsp;&nbsp;The calculated nutritional macro guides and constant accountability loops completely overhauled my baseline routine constants. Best 12 weeks of my life.</p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-gray-950/50 backdrop-blur-sm border border-gray-900 p-1.5 rounded-3xl shadow-2xl transition-all duration-300 hover:border-gray-800">
            <div className="bg-black border border-gray-900/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div><h4 className="text-white font-black tracking-wide uppercase text-sm">Sarah L. <span className="text-gray-600 font-normal">/ 28</span></h4><p className="text-xs text-gray-500 font-medium mt-1">Marketing Director</p></div>
                <span className="inline-block bg-emerald-500/10 text-emerald-400 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border border-emerald-500/20">16 Weeks</span>
              </div>
              
              <BeforeAfterSlider 
                beforeImage="https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=800&auto=format&fit=crop"
                afterImage="https://images.unsplash.com/photo-1571019614242-c5c5adee9f50?q=80&w=800&auto=format&fit=crop"
              />
              
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-900/80">
                <div className="text-center"><p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mb-1">Weight</p><p className="text-xl font-black text-white">-8 <span className="text-xs text-orange-500">lbs</span></p></div>
                <div className="text-center border-l border-gray-900/80"><p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mb-1">Body Fat</p><p className="text-xl font-black text-white">-9.0 <span className="text-xs text-orange-500">%</span></p></div>
                <div className="text-center border-l border-gray-900/80"><p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mb-1">Endurance</p><p className="text-xl font-black text-white">+50 <span className="text-xs text-emerald-500">%</span></p></div>
              </div>
              <p className="text-sm text-gray-400 italic leading-relaxed relative"><span className="text-gray-800 text-3xl font-serif absolute -top-2 -left-2">"</span>&nbsp;&nbsp;The automated reservation schedules make checking in simple and clear. I stopped guessing and started following the data. The results speak for themselves.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
// ==========================================
// 7. COMMUNITY & SOCIAL HANDLES SECTION
// ==========================================
function CommunitySection() {
  const socials = [
    { name: "Instagram", icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.067 3.282.15 4.54 1.418 4.69 4.7.055 1.266.067 1.646.067 4.85s-.012 3.584-.067 4.85c-.15 3.282-1.408 4.54-4.69 4.7-1.266.055-1.646.067-4.85.067s-3.584-.012-4.85-.067c-3.282-.15-4.54-1.418-4.69-4.7-.055-1.266-.067-1.646-.067-4.85s.012-3.584.067-4.85c.15-3.282 1.408-4.54 4.69-4.7 1.266-.055 1.646-.067 4.85-.067zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>, classes: "text-[#E1306C] border-[#E1306C]/40 bg-[#E1306C]/10 hover:bg-[#E1306C]/20 hover:border-[#E1306C]", url: "#" },
    { name: "X (Twitter)", icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>, classes: "text-white border-white/30 bg-white/5 hover:bg-white/10 hover:border-white", url: "#" },
    { name: "Facebook", icon: <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>, classes: "text-[#1877F2] border-[#1877F2]/40 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 hover:border-[#1877F2]", url: "#" },
    { name: "YouTube", icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>, classes: "text-[#FF0000] border-[#FF0000]/40 bg-[#FF0000]/10 hover:bg-[#FF0000]/20 hover:border-[#FF0000]", url: "#" },
    { name: "Discord", icon: <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>, classes: "text-[#5865F2] border-[#5865F2]/40 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 hover:border-[#5865F2]", url: "#" }
  ];

  return (
    <section id="community" className="py-24 px-6 bg-gradient-to-b from-black to-gray-950/50">
      <div className="max-w-7xl mx-auto text-center space-y-10">
        <div className="space-y-4">
          <span className="inline-block bg-orange-600/10 text-orange-500 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-orange-500/20">Stay Connected</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Join the IronPath Syndicate</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">Follow our official channels for daily form checks, community challenges, exclusive merchandise drops, and sudden slot openings.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {socials.map((social) => (
            <a key={social.name} href={social.url} className={`flex flex-col items-center justify-center gap-3 p-6 border rounded-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${social.classes}`}>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">{social.icon}</svg>
              <span className="text-[11px] font-bold uppercase tracking-wider">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 8. FLOATING AUTOMATED CHATBOT INTERACTION
// ==========================================
function DummyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: 1, sender: 'bot', text: '👋 Welcome! I am your IronPath active interface agent. Select an option to query status rules:' }]);
  const [showOptions, setShowOptions] = useState(true);
  const endRef = useRef(null);

  useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const triggerWorkflowResponse = (selectedText, categoryKey) => {
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: selectedText }]);
    setShowOptions(false);
    setTimeout(() => {
      let logicResponse = "";
      if (categoryKey === 'pass') logicResponse = "🎟️ Perfect choice! Use the Free Pass signup submission card positioned directly in the top Hero zone of the landing page window.";
      else if (categoryKey === 'pricing') logicResponse = "💰 Core entry parameters initialize at $29/mo. Toggle the Annual button grid layout above to visually calculate 15% system adjustments.";
      else logicResponse = "⏰ Our high-intensity weights and training track floors remain open 24/7/365 to premium tier configuration access holders.";
      
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
      <button onClick={() => setIsOpen(!isOpen)} className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 rounded-full flex items-center justify-center shadow-2xl text-black font-black transition-transform active:scale-95 outline-none">
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
                <div className={`max-w-[85%] px-3 py-2 text-xs rounded-lg leading-relaxed ${m.sender === 'user' ? 'bg-orange-600 text-white' : 'bg-gray-900 text-gray-300 border border-gray-800'}`}>{m.text}</div>
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
// 9. LANDING FOOTER AREA SECTION
// ==========================================
function FooterSection({ navigateTo }) {
  return (
    <footer className="bg-black border-t border-gray-950 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        <div className="space-y-3">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center font-black text-xs text-black">⚡</div>
            <span className="font-black text-sm tracking-widest uppercase text-white">IRONPATH</span>
          </div>
          <p className="text-xs text-gray-500 max-w-xs mx-auto sm:mx-0">Building scalable structural fitness frameworks for high-achieving local tracks since 2024.</p>
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
        <p>© {new Date().getFullYear()} IronPath Fitness Framework Labs. All variables reserved.</p>
        <div className="flex gap-4">
          <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Rules</span>
          
          {/* Linked to load the new ServiceTermsPage */}
          <span 
            onClick={() => navigateTo("terms")}
            className="hover:text-orange-500 cursor-pointer transition-colors font-bold"
          >
            Service Terms
          </span>

        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 text-center text-[10px] text-gray-700 font-medium uppercase tracking-widest opacity-80">
        <p>
          Developed by <span className="text-gray-500 font-bold">Roy & Ray Developers Org &trade;</span>
        </p>
        <p className="mt-1">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </footer>
  );
}