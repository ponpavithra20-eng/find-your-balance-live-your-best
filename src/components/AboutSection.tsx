/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, Heart, Star, ShieldAlert, Monitor, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const points = [
    {
      icon: <HelpCircle className="h-6 w-6 text-sky-500" />,
      title: "What is Digital Wellbeing?",
      description: "Digital Wellbeing is a conscious and intentional state of relationship with technology. It is about understanding how digital devices, websites, and notifications impact your mental, emotional, and physical health, and designing deliberate safeguards to ensure technology serves you, rather than controls you.",
      bg: "bg-sky-50/50 border-sky-100/50"
    },
    {
      icon: <Heart className="h-6 w-6 text-emerald-500" />,
      title: "Why is it Important?",
      description: "Modern applications are engineered with algorithmic dopamine triggers (infinite scroll, sudden red dots) to maximize your screen engagement. Without digital wellbeing frameworks, we fall into cycles of chronic focus depletion, phantom notification anxiety, and constant real-world distraction.",
      bg: "bg-emerald-50/50 border-emerald-100/50"
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: "Benefits of Healthy Habits",
      description: "By creating robust tech barriers (such as phone-free sleep, scheduled mutes, and deep-focus blocks), you immediately restore deep concentration, enhance slow-wave physical sleep, reduce daily cortisol/anxiety levels, and rediscover deep face-to-face family presence.",
      bg: "bg-yellow-50/40 border-yellow-100/50"
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-rose-500" />,
      title: "Common Screen-Time Problems",
      description: "Excessive exposure to active screens is clinically linked to dry-eye syndrome (decreased blink rate), text-neck posture alignment spinal strain, chronic circadian rhythm disruptions, attention span fragmentation, and persistent loneliness caused by superficial connections.",
      bg: "bg-rose-50/40 border-rose-100/30"
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-500 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Educational Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight mt-3">
            About <span className="text-sky-500">Digital Wellbeing</span>
          </h2>
          <p className="text-slate-600 mt-2 text-md">
            Understanding the biological and psychological effects of modern technology 
            empowers us to cultivate healthier habits.
          </p>
        </div>

        {/* Bento Grid Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border bg-white/75 backdrop-blur-md shadow-xs hover:shadow-xl hover:border-sky-200 transition-all duration-300 flex flex-col space-y-4`}
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-100">
                  {pt.icon}
                </div>
                <h3 className="text-lg font-bold font-display text-slate-800">
                  {pt.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {pt.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing takeaway message */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-tr from-sky-500 to-emerald-500 text-white max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest font-bold text-sky-100 flex items-center justify-center md:justify-start space-x-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The Core Takeaway</span>
              </span>
              <h4 className="text-xl font-bold font-display">Technology is a tool, not a lifestyle.</h4>
              <p className="text-xs text-sky-5 leading-relaxed max-w-xl">
                The objective is not to isolate yourself from technology entirely, but to design a healthy, proactive rhythm where technology empowers your real life rather than distracting you from it.
              </p>
            </div>
            <a
              href="#break-reminder"
              className="px-6 py-3.5 bg-white text-sky-700 hover:bg-sky-50 font-bold text-xs rounded-xl shadow-lg transition-all text-center flex-shrink-0 cursor-pointer"
            >
              Start Focus Session
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
