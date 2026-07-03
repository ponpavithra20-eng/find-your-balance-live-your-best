/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Shield, Heart, Eye } from 'lucide-react';

export default function Hero() {
  const [breatheText, setBreatheText] = useState('Inhale...');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBreatheText((prev) => (prev === 'Inhale...' ? 'Exhale...' : 'Inhale...'));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStartJourney = () => {
    const target = document.querySelector('#dashboard');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-radial from-sky-50 via-teal-50/20 to-slate-50"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left text column */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-sky-100/70 border border-sky-200/50 px-3 py-1.5 rounded-full text-xs font-semibold text-sky-700">
            <Sparkles className="h-3.5 w-3.5 text-sky-500 animate-spin" />
            <span>Digital Wellbeing Assistant</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight leading-tight text-slate-900">
            Find Your Balance in a <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">Digital World</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
            Take control of your technology habits, cultivate screen-time awareness, 
            and elevate your daily peace of mind with our beautifully simple wellbeing dashboard.
          </p>

          {/* Core features highlighters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-lg mx-auto lg:mx-0">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Eye className="h-4.5 w-4.5 text-sky-500" />
              <span>Reduce screen strain</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Shield className="h-4.5 w-4.5 text-emerald-500" />
              <span>Build robust habits</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Heart className="h-4.5 w-4.5 text-rose-500" />
              <span>Track mental health</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={handleStartJourney}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Start Your Wellness Journey</span>
              <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </button>
            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-sm transition-all text-center"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Animated Wellbeing Illustration Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            {/* Pulsing breathing background rings */}
            <div className="absolute inset-0 rounded-full border border-sky-300/20 breathing-circle" style={{ animationDelay: '0s' }} />
            <div className="absolute inset-10 rounded-full border border-sky-300/30 breathing-circle" style={{ animationDelay: '2s' }} />
            <div className="absolute inset-20 rounded-full border border-teal-300/40 breathing-circle" style={{ animationDelay: '4s' }} />

            {/* Inner Glowing Card */}
            <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-white/80 backdrop-blur-md border border-white flex flex-col items-center justify-center shadow-2xl text-center p-6 group hover:border-sky-200 transition-colors duration-500">
              <div className="p-3 bg-gradient-to-tr from-sky-50 to-emerald-50 rounded-full mb-3 text-sky-500">
                <Heart className="h-8 w-8 text-sky-500 animate-pulse fill-sky-500/20" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Breathing Guide</p>
              <h3 className="text-2xl font-bold text-slate-800 font-display transition-all duration-1000 mt-1">
                {breatheText}
              </h3>
              <p className="text-[11px] text-slate-500 mt-2 max-w-[160px]">
                Inhale peace, exhale digital distractions. Match the expansion ring.
              </p>
            </div>

            {/* Floating Wellbeing Indicator tags */}
            <div className="absolute -top-4 right-4 bg-white/90 backdrop-blur-xs border border-slate-100 p-2.5 rounded-2xl shadow-lg flex items-center space-x-2 animate-bounce">
              <span className="text-emerald-500 text-sm">✓</span>
              <span className="text-xs font-semibold text-slate-700">8h Sleep Met</span>
            </div>

            <div className="absolute bottom-6 -left-6 bg-white/90 backdrop-blur-xs border border-slate-100 p-2.5 rounded-2xl shadow-lg flex items-center space-x-2 animate-pulse">
              <span className="text-sky-500 text-xs">💧</span>
              <span className="text-xs font-semibold text-slate-700">Hydrated</span>
            </div>

            <div className="absolute bottom-1/2 -right-8 bg-white/90 backdrop-blur-xs border border-slate-100 p-2.5 rounded-2xl shadow-lg flex items-center space-x-2">
              <span className="text-teal-500 text-xs">🧘</span>
              <span className="text-xs font-semibold text-slate-700">25m Focus</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
