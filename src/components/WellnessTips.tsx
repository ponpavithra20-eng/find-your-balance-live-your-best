/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Eye, Moon, BellOff, Compass, TreePine, SunDim, ChevronDown, Check } from 'lucide-react';
import { WellnessTip } from '../types';

export default function WellnessTips() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Focus' | 'Digital' | 'Physical' | 'Sleep'>('All');
  const [readTips, setReadTips] = useState<string[]>([]);
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const tips: WellnessTip[] = [
    {
      id: 'eye-rule',
      category: 'Focus',
      title: 'Follow the 20-20-20 Eye Rule',
      description: 'For every 20 minutes of screen use, look at an object at least 20 feet away for 20 seconds. This allows the eye ciliary muscles to relax, combating digital eye fatigue, headaches, and near-focus accommodation spasms.',
      icon: 'fa-solid fa-eye',
    },
    {
      id: 'no-phone-sleep',
      category: 'Sleep',
      title: 'Avoid Mobiles Before Sleeping',
      description: 'Stop using screens at least 30-60 minutes before bedtime. The heavy blue-light spectrum suppresses natural melatonin production, tricking your circadian rhythm into thinking it is midday, causing insomnia.',
      icon: 'fa-solid fa-bed',
    },
    {
      id: 'mute-notifs',
      category: 'Digital',
      title: 'Turn Off Unnecessary Notifications',
      description: 'Keep notification sounds and banners active only for real-time human communications. Disable passive social media likes, promotional updates, and game alerts designed to trigger visual distraction hooks.',
      icon: 'fa-solid fa-bell-slash',
    },
    {
      id: 'mindful-scrolling',
      category: 'Digital',
      title: 'Practice Mindful Scrolling',
      description: 'Before opening any feed, state your explicit goal and set a physical mental boundary (e.g. "I will read 5 posts"). Break the infinite-scroll dopamine loop by immediately closing the app when your target is reached.',
      icon: 'fa-solid fa-arrows-spin',
    },
    {
      id: 'outdoors',
      category: 'Physical',
      title: 'Spend Quality Time Outdoors',
      description: 'Step outside daily without your phone. Exposing your eyes to natural sunlight helps regulate emotional serotonin levels, and looking at remote biological textures relaxes near-focus optic strain.',
      icon: 'fa-solid fa-tree',
    },
    {
      id: 'sleep-sched',
      category: 'Sleep',
      title: 'Maintain a Healthy Sleep Schedule',
      description: 'Wake up and go to sleep at similar times every single day (even on weekends). Consistent sleep hygiene anchors your neurobiological systems, optimizing daytime memory concentration and limiting screen relapse.',
      icon: 'fa-solid fa-clock',
    },
  ];

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReadTips((prev) =>
      prev.includes(id) ? prev.filter((tipId) => tipId !== id) : [...prev, id]
    );
  };

  const handleToggleExpand = (id: string) => {
    setExpandedTip(expandedTip === id ? null : id);
  };

  const filteredTips = selectedCategory === 'All'
    ? tips
    : tips.filter((tip) => tip.category === selectedCategory);

  const categories: ('All' | 'Focus' | 'Digital' | 'Physical' | 'Sleep')[] = [
    'All',
    'Focus',
    'Digital',
    'Physical',
    'Sleep',
  ];

  return (
    <section id="tips" className="py-20 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sky-500 font-bold text-xs uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full">
            Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight mt-3">
            Digital Wellness <span className="text-emerald-500">Guidelines</span>
          </h2>
          <p className="text-slate-600 mt-2 text-md">
            Simple, actionable habits to reclaim your focus, reduce screen fatigue, 
            and re-integrate real-world interactions into your daily schedule.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-md shadow-sky-100'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTips.map((tip) => {
            const isRead = readTips.includes(tip.id);
            const isExpanded = expandedTip === tip.id;

            return (
              <div
                key={tip.id}
                onClick={() => handleToggleExpand(tip.id)}
                className={`group glass-card rounded-3xl p-6 border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  isRead
                    ? 'border-emerald-100 bg-emerald-50/20'
                    : 'border-slate-100 bg-white/70 hover:border-sky-200 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      tip.category === 'Focus'
                        ? 'bg-purple-150 text-purple-700'
                        : tip.category === 'Digital'
                        ? 'bg-sky-100 text-sky-700'
                        : tip.category === 'Sleep'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {tip.category}
                    </span>
                    
                    <button
                      onClick={(e) => handleToggleRead(tip.id, e)}
                      className={`h-7 w-7 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                        isRead
                          ? 'bg-emerald-500 text-white border-transparent'
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-emerald-500 hover:border-emerald-200'
                      }`}
                      title={isRead ? 'Mark as unread' : 'Mark as read'}
                    >
                      {isRead ? <Check className="h-4 w-4" /> : <span className="text-xs">+</span>}
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex items-start space-x-3.5">
                    <div className={`p-3 rounded-2xl ${
                      isRead ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-50 text-sky-500 group-hover:bg-sky-100'
                    } transition-colors flex-shrink-0`}>
                      <i className={`${tip.icon} text-lg`}></i>
                    </div>

                    <div>
                      <h3 className={`text-base font-bold font-display text-slate-800 transition-colors ${
                        isRead ? 'text-emerald-800 line-through' : 'group-hover:text-sky-600'
                      }`}>
                        {tip.title}
                      </h3>
                      <p className={`text-xs mt-2 leading-relaxed text-slate-600 ${
                        isExpanded ? 'line-clamp-none' : 'line-clamp-3'
                      }`}>
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer toggle detail */}
                <div className="mt-4 pt-4 border-t border-slate-100/70 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>{isRead ? 'Completed' : 'Recommended Tip'}</span>
                  <div className="flex items-center space-x-1 text-sky-500 group-hover:text-sky-600 font-bold">
                    <span>{isExpanded ? 'Collapse' : 'Read More'}</span>
                    <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra tips progress banner */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <span className="text-2xl">🌱</span>
            <div>
              <span className="text-sm font-bold text-slate-800 block">Guideline Progress: {readTips.length} of {tips.length} learned</span>
              <p className="text-xs text-slate-500">Read and test tips to improve your daily digital comfort level.</p>
            </div>
          </div>
          <button
            onClick={() => setReadTips(tips.map(t => t.id))}
            className="px-5 py-2.5 bg-white text-slate-700 border border-slate-200/80 rounded-2xl text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all flex-shrink-0 cursor-pointer"
          >
            Mark All as Read
          </button>
        </div>

      </div>
    </section>
  );
}
