import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, TrendingUp, Zap, CheckCircle } from 'lucide-react';

const features = [
  'Everything in Map PowerBoost',
  'Everything in Cloud Stack Boost',
  'Everything in Local Citations',
  'Priority implementation & support',
  'Dedicated account manager',
  'Full reporting & consultation',
  'Best for businesses who want to dominate their local market',
];

export default function PlatinumLocalSEO() {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 text-gray-900 flex flex-col items-center justify-center py-0 px-0">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center px-4 md:px-12 py-16">
        <div className="w-full bg-white/90 rounded-3xl shadow-2xl p-8 md:p-16 mb-12 border-4 border-yellow-400">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-yellow-600 text-center drop-shadow-lg tracking-tight flex items-center justify-center gap-4"><Star className="w-12 h-12 text-yellow-400" /> Platinum Local SEO Package</h1>
          <p className="text-2xl text-yellow-900 mb-10 text-center max-w-3xl mx-auto leading-relaxed">The ultimate local SEO solution: includes Map PowerBoost, Cloud Stack Boost, and Local Citations. Maximum ranking power, authority, and visibility for your business. Perfect for those who want to dominate their local market.</p>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-extrabold mb-6 text-yellow-700 flex items-center gap-2"><span>What You Get</span> <span className="text-2xl">🌟</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="bg-yellow-100 rounded-2xl p-6 border-l-4 border-yellow-400 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="font-semibold text-yellow-800 text-lg mb-1 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-yellow-500" /> {f}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-6 mt-8">
            <div className="text-2xl text-center text-yellow-800 mb-2 font-semibold">Ready to become #1 in your local market?</div>
            <a
              href="https://buy.stripe.com/5kQdR92gU7XieNM8CydAk06"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-12 py-5 rounded-2xl font-bold text-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 inline-block"
            >
              Get Started
            </a>
            <button
              onClick={() => navigate(-1)}
              className="text-yellow-700 underline text-lg hover:text-yellow-900 transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 