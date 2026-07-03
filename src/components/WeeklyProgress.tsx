/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BarChart, TrendingUp, RefreshCw, Eye, Calendar, Sparkles } from 'lucide-react';
import { DayProgress } from '../types';

export default function WeeklyProgress() {
  const [data, setData] = useState<DayProgress[]>([
    { dayName: 'Mon', score: 65, screenTime: 5.2 },
    { dayName: 'Tue', score: 72, screenTime: 4.5 },
    { dayName: 'Wed', score: 85, screenTime: 3.0 },
    { dayName: 'Thu', score: 55, screenTime: 6.8 },
    { dayName: 'Fri', score: 80, screenTime: 3.5 },
    { dayName: 'Sat', score: 92, screenTime: 2.1 },
    { dayName: 'Sun', score: 88, screenTime: 2.5 },
  ]);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [animate, setAnimate] = useState(false);

  // Trigger entering animation on mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Handler to randomize mock data to showcase beautiful CSS height transition animations
  const handleRandomize = () => {
    setAnimate(false);
    setTimeout(() => {
      const randomData = data.map((d) => {
        const randomScore = Math.floor(Math.random() * 45) + 50; // Between 50 and 95
        const randomScreen = parseFloat((Math.random() * 6 + 1.5).toFixed(1)); // Between 1.5h and 7.5h
        return {
          ...d,
          score: randomScore,
          screenTime: randomScreen,
        };
      });
      setData(randomData);
      setAnimate(true);
    }, 150);
  };

  // Compute stats based on current data
  const avgScore = Math.round(data.reduce((sum, d) => sum + d.score, 0) / data.length);
  const avgScreen = parseFloat((data.reduce((sum, d) => sum + d.screenTime, 0) / data.length).toFixed(1));
  const bestDay = data.reduce((best, d) => (d.score > best.score ? d : best), data[0]);

  return (
    <section id="weekly-progress" className="py-20 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-500 font-bold text-xs uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full">
            Historical Data
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight mt-3">
            Weekly <span className="text-emerald-500">Wellness Analytics</span>
          </h2>
          <p className="text-slate-600 mt-2 text-md">
            Review your digital health ratings over the last seven days. 
            Hover over any bar to inspect daily screen exposure thresholds and logged wellness score indexes.
          </p>
        </div>

        {/* Main Section Content Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Chart column (col-span-7) */}
          <div className="lg:col-span-7 glass-card bg-slate-50/50 p-8 rounded-3xl border border-slate-100/80 shadow-md">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <BarChart className="h-5 w-5 text-sky-500" />
                <span className="text-sm font-bold text-slate-700">7-Day Progress Chart</span>
              </div>
              <button
                onClick={handleRandomize}
                className="px-3 py-1.5 bg-white text-slate-600 hover:text-sky-500 rounded-xl border border-slate-200 shadow-xs text-xs font-semibold hover:border-sky-100 transition-all flex items-center space-x-1 cursor-pointer"
                title="Randomize mock score parameters to check graph responsiveness"
              >
                <RefreshCw className="h-3 w-3 animate-spin-slow" />
                <span>Animate Chart</span>
              </button>
            </div>

            {/* Chart Area */}
            <div className="relative h-64 flex items-end justify-between space-x-2 sm:space-x-4 border-b border-slate-200 pb-2 px-2">
              {data.map((day, idx) => {
                const isHovered = hoveredIdx === idx;
                const barHeight = animate ? `${day.score}%` : '0%';
                
                return (
                  <div
                    key={day.dayName}
                    className="flex-1 flex flex-col items-center group relative cursor-pointer"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {/* Tooltip Popup on Hover */}
                    <div className={`absolute bottom-full mb-3 bg-slate-800 text-white rounded-xl p-2.5 shadow-xl transition-all duration-300 text-left space-y-1 z-20 pointer-events-none w-28 text-xs ${
                      isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90 pointer-events-none'
                    }`}>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                      <p className="font-bold text-[10px] text-sky-400 uppercase tracking-widest">{day.dayName} Statistics</p>
                      <p className="font-semibold text-slate-200">Score: <strong className="text-white font-extrabold text-sm">{day.score}</strong></p>
                      <p className="text-[10px] text-slate-300">Screen: <strong className="text-white font-bold">{day.screenTime}h</strong></p>
                    </div>

                    {/* Chart Vertical Bar */}
                    <div className="w-full relative flex items-end justify-center h-48">
                      <div
                        className={`w-8 sm:w-12 rounded-t-lg transition-all duration-700 ease-out relative overflow-hidden shadow-xs hover:shadow-md ${
                          day.score >= 80
                            ? 'bg-gradient-to-t from-emerald-500 to-emerald-400'
                            : day.score >= 60
                            ? 'bg-gradient-to-t from-sky-500 to-sky-400'
                            : 'bg-gradient-to-t from-amber-500 to-amber-400'
                        }`}
                        style={{ height: barHeight }}
                      >
                        {/* Shimmer/Overlay highlights on hover */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Day label */}
                    <span className="text-xs font-semibold text-slate-500 mt-2">{day.dayName}</span>
                  </div>
                );
              })}
            </div>

            {/* Chart Legend indicators */}
            <div className="flex justify-center space-x-6 text-[10px] text-slate-400 font-semibold mt-6 uppercase tracking-wider">
              <div className="flex items-center space-x-1.5">
                <span className="h-2.5 w-2.5 bg-emerald-400 rounded-full" />
                <span>Optimal (≥80)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="h-2.5 w-2.5 bg-sky-400 rounded-full" />
                <span>Moderate (60-79)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="h-2.5 w-2.5 bg-amber-400 rounded-full" />
                <span>Rest Needed (&lt;60)</span>
              </div>
            </div>
          </div>

          {/* Analytical summary data widgets column (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg">
                <TrendingUp className="h-5 w-5 animate-pulse" />
              </span>
              <h3 className="text-xl font-bold font-display text-slate-800">Weekly Health Summary</h3>
            </div>

            <p className="text-slate-600 text-sm">
              Your trends illustrate a consistent balance. On days with higher sleep duration and frequent water intervals, 
              your score remains optimal (above 80). Reducing screen hours below 4h yields the highest score boosts.
            </p>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Stat 1: Average Score */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Average Score</span>
                <span className="text-3xl font-extrabold font-display text-sky-600 block">{avgScore} / 100</span>
                <span className="text-[10px] text-slate-500 block">Healthy rating</span>
              </div>

              {/* Stat 2: Avg Screen Time */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Avg Screen Time</span>
                <span className="text-3xl font-extrabold font-display text-emerald-600 block">{avgScreen}h</span>
                <span className="text-[10px] text-slate-500 block">Daily exposure</span>
              </div>

            </div>

            {/* Highlighted best day card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-100 flex items-center space-x-3">
              <span className="text-2xl">🏆</span>
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">Best Balanced Day</span>
                <p className="text-xs text-slate-600 mt-0.5">
                  <strong>{bestDay.dayName}</strong> achieved a wellness score of <strong>{bestDay.score}/100</strong> with only <strong>{bestDay.screenTime}h</strong> of screen time!
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
