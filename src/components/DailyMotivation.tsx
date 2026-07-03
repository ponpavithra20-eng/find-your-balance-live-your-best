/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Quote as QuoteIcon, Sparkles } from 'lucide-react';
import { WELLBEING_QUOTES } from '../data/quotes';
import { Quote } from '../types';

export default function DailyMotivation() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(WELLBEING_QUOTES[0]);
  const [fadeState, setFadeState] = useState(true);

  const selectRandomQuote = () => {
    setFadeState(false);
    
    // Slight timeout to coordinate visual fade animation transition
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * WELLBEING_QUOTES.length);
      // Ensure we don't display the identical quote consecutively if possible
      while (WELLBEING_QUOTES[nextIndex].text === currentQuote.text) {
        nextIndex = Math.floor(Math.random() * WELLBEING_QUOTES.length);
      }
      
      setCurrentQuote(WELLBEING_QUOTES[nextIndex]);
      setFadeState(true);
    }, 200);
  };

  // Seed random quote on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * WELLBEING_QUOTES.length);
    setCurrentQuote(WELLBEING_QUOTES[randomIndex]);
  }, []);

  return (
    <section className="py-20 bg-radial from-sky-500 to-sky-600 text-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Decorative Badge */}
        <div className="inline-flex items-center space-x-1.5 bg-white/10 backdrop-blur-xs border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-sky-100">
          <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-pulse" />
          <span>Mindful Inspiration</span>
        </div>

        {/* Quote Text Container */}
        <div className="max-w-3xl mx-auto relative px-8 py-4">
          {/* Big quotes vector icons in background */}
          <QuoteIcon className="absolute -top-6 -left-2 h-14 w-14 text-white/10 transform rotate-180" />
          <QuoteIcon className="absolute -bottom-6 -right-2 h-14 w-14 text-white/10" />

          <div className={`transition-all duration-300 ${fadeState ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <blockquote className="text-2xl sm:text-3xl font-bold font-display italic leading-relaxed text-sky-5">
              "{currentQuote.text}"
            </blockquote>
            <cite className="text-sm font-semibold tracking-wider text-sky-200 mt-4 block uppercase not-italic">
              — {currentQuote.author}
            </cite>
          </div>
        </div>

        {/* Action button */}
        <div>
          <button
            onClick={selectRandomQuote}
            className="px-7 py-3.5 bg-white hover:bg-sky-50 text-sky-700 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 text-xs tracking-wider uppercase cursor-pointer inline-flex items-center space-x-2"
          >
            <span>Generate New Quote</span>
          </button>
        </div>

      </div>
    </section>
  );
}
