import React, { useEffect, useState } from 'react';

export default function FeaturesSection() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('https://ironpath-api.onrender.com/api/leads');
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="bg-black py-20 px-6 text-white border-t border-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 uppercase">Premium <span className="text-yellow-500">Memberships</span></h2>
        
        {plans.length === 0 ? (
          <p className="text-gray-400">Loading plans from database...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Array.isArray(plans) && plans.map((plan) => (
              <div key={plan.id} className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-yellow-500 transition duration-300 flex flex-col">
                <h3 className="text-3xl font-bold mb-2 text-white">{plan.name}</h3>
                <p className="text-4xl font-extrabold text-yellow-500 mb-6">₹{plan.price} <span className="text-sm text-gray-400 font-normal">/ {plan.duration_months} mo</span></p>
                
                <ul className="text-left text-gray-300 mb-8 flex-1 space-y-3">
                  {/* MySQL JSON columns are parsed automatically by mysql2 */}
                  {plan.benefits && plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-yellow-500 mr-2">✓</span> {benefit}
                    </li>
                  ))}
                </ul>
                <button className="w-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-3 rounded transition duration-300">
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}