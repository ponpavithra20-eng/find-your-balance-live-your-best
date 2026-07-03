/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Monitor, Heart, Smile, Activity, CupSoda, Plus, Minus, CheckCircle, Info } from 'lucide-react';
import { MoodType, Habit } from '../types';

interface DashboardProps {
  screenTime: number; // in hours
  setScreenTime: (val: number) => void;
  waterGlasses: number;
  setWaterGlasses: (val: number) => void;
  activeMood: MoodType | 'None';
  habits: Habit[];
  wellnessScore: number;
}

export default function Dashboard({
  screenTime,
  setScreenTime,
  waterGlasses,
  setWaterGlasses,
  activeMood,
  habits,
  wellnessScore,
}: DashboardProps) {
  // Calculate habits completed
  const habitsCompleted = habits.filter((h) => h.checked).length;
  const habitsTotal = habits.length;
  const habitsPercent = habitsTotal > 0 ? Math.round((habitsCompleted / habitsTotal) * 100) : 0;

  // Screen time categorization
  const getScreenTimeStatus = (hours: number) => {
    if (hours < 3) return { text: 'Healthy Balance', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (hours <= 6) return { text: 'Moderate Use', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { text: 'Excessive Strain', color: 'text-rose-600', bg: 'bg-rose-50' };
  };

  const screenStatus = getScreenTimeStatus(screenTime);

  // Score categorization text
  const getScoreMessage = (score: number) => {
    if (score >= 80) return { text: 'Excellent Mind-Digital Harmony!', sub: 'Keep doing what you are doing.' };
    if (score >= 50) return { text: 'Good, but room for growth', sub: 'Try decreasing screen time or checking off habits.' };
    return { text: 'High Digital Fatigue', sub: 'Take a break! Go offline, stretch, or practice breathing.' };
  };

  const scoreMsg = getScoreMessage(wellnessScore);

  const handleIncrementWater = () => {
    if (waterGlasses < 10) setWaterGlasses(waterGlasses + 1);
  };

  const handleDecrementWater = () => {
    if (waterGlasses > 0) setWaterGlasses(waterGlasses - 1);
  };

  return (
    <section id="dashboard" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight">
            Your Calming <span className="text-sky-500">Wellness Center</span>
          </h2>
          <p className="text-slate-600 mt-2 text-md">
            All aspects of your lifestyle affect your digital health. Try updating the statistics below
            (use the screen time slider and water buttons) to witness your Wellness Score adjust live.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* CARD 1: Wellness Score */}
          <div className="glass-card rounded-3xl p-6 shadow-xs border border-white hover:border-sky-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Core Harmony</span>
                <div className="p-2 bg-sky-100 text-sky-600 rounded-xl">
                  <Heart className="h-5 w-5 fill-sky-500/10" />
                </div>
              </div>
              
              <h3 className="text-lg font-bold font-display text-slate-800">Wellness Score</h3>
              <p className="text-xs text-slate-500 mt-1">Calculated in real-time from screen use, habits, and mood.</p>
              
              {/* Circular Score representation */}
              <div className="flex flex-col items-center justify-center my-6">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {/* Outer SVG ring */}
                  <svg className="absolute w-full h-full transform -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      className="stroke-slate-100"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      className="transition-all duration-500"
                      strokeDasharray={2 * Math.PI * 60}
                      strokeDashoffset={2 * Math.PI * 60 * (1 - wellnessScore / 100)}
                      strokeWidth="10"
                      strokeLinecap="round"
                      stroke={wellnessScore >= 80 ? '#10b981' : wellnessScore >= 50 ? '#f59e0b' : '#f43f5e'}
                      fill="transparent"
                    />
                  </svg>
                  
                  {/* Inside Circle Data */}
                  <div className="text-center z-10">
                    <span className="text-4xl font-extrabold font-display text-slate-800">{wellnessScore}</span>
                    <span className="text-slate-400 font-bold block text-xs">/ 100</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center p-3 rounded-2xl bg-slate-50/70 border border-slate-100/50">
              <span className="text-sm font-bold block text-slate-800">{scoreMsg.text}</span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">{scoreMsg.sub}</span>
            </div>
          </div>

          {/* CARD 2: Screen Time Demo Data (Interactive Slider) */}
          <div className="glass-card rounded-3xl p-6 shadow-xs border border-white hover:border-sky-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Time Logger</span>
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                  <Monitor className="h-5 w-5" />
                </div>
              </div>

              <h3 className="text-lg font-bold font-display text-slate-800">Today's Screen Time</h3>
              <p className="text-xs text-slate-500 mt-1">Simulate or drag your screen exposure to check threshold alerts.</p>

              {/* Slider Representation */}
              <div className="my-8">
                <div className="flex items-baseline justify-center space-x-1 mb-4">
                  <span className="text-5xl font-extrabold font-display text-slate-800">{screenTime}</span>
                  <span className="text-slate-500 font-medium text-lg">hours</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={screenTime}
                  onChange={(e) => setScreenTime(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-500 hover:accent-sky-600 focus:outline-hidden"
                />
                
                <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium">
                  <span>0h (Ideal)</span>
                  <span>6h (Moderate)</span>
                  <span>12h (Heavy)</span>
                </div>
              </div>
            </div>

            <div className={`text-center p-3 rounded-2xl border border-slate-100/30 ${screenStatus.bg}`}>
              <span className={`text-sm font-bold block ${screenStatus.color}`}>
                Status: {screenStatus.text}
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {screenTime > 6 
                  ? 'High risk of dry eyes and neck strain!' 
                  : screenTime > 3 
                  ? 'Try to take brief eye-rests every 20 minutes.'
                  : 'Great! Your screen strain is low.'}
              </p>
            </div>
          </div>

          {/* CARD 3: Water Intake Tracker (Reminder with direct simulation) */}
          <div className="glass-card rounded-3xl p-6 shadow-xs border border-white hover:border-sky-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hydration Guard</span>
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                  <CupSoda className="h-5 w-5" />
                </div>
              </div>

              <h3 className="text-lg font-bold font-display text-slate-800">Water Intake Tracker</h3>
              <p className="text-xs text-slate-500 mt-1">Healthy physical hydration reduces eye fatigue and brain fog.</p>

              {/* Water level indicator SVG or glass representation */}
              <div className="flex items-center justify-center my-6 space-x-6">
                <div className="relative w-16 h-24 border-3 border-sky-200 rounded-b-2xl rounded-t-sm overflow-hidden bg-slate-50 flex items-end">
                  {/* Water level height based on waterGlasses */}
                  <div
                    className="w-full bg-gradient-to-t from-sky-400 to-sky-300 transition-all duration-500 ease-in-out"
                    style={{ height: `${Math.min((waterGlasses / 8) * 100, 100)}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-700 text-xs">
                    {waterGlasses} / 8
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <button
                    onClick={handleIncrementWater}
                    className="p-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    aria-label="Add a glass of water"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleDecrementWater}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-all active:scale-95 cursor-pointer"
                    aria-label="Remove a glass of water"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center p-3 rounded-2xl bg-sky-50/60 border border-sky-100/50">
              <span className="text-sm font-bold block text-sky-700">
                {waterGlasses >= 8 ? 'Hydrated Expert! 💧' : 'Water Reminder'}
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {waterGlasses < 8 
                  ? `Drink ${8 - waterGlasses} more glasses to achieve today's goal.` 
                  : 'Wonderful! You have hit your daily hydration target.'}
              </p>
            </div>
          </div>

          {/* CARD 4: Mood Status */}
          <div className="glass-card rounded-3xl p-6 shadow-xs border border-white hover:border-sky-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Emotion Hub</span>
                <div className="p-2 bg-yellow-100 text-yellow-600 rounded-xl">
                  <Smile className="h-5 w-5" />
                </div>
              </div>

              <h3 className="text-lg font-bold font-display text-slate-800">Your Mood Today</h3>
              <p className="text-xs text-slate-500 mt-1">Logged from our daily mood check-in tracker below.</p>
              
              <div className="flex flex-col items-center justify-center my-6">
                <div className="text-5xl animate-bounce mb-2 h-14 flex items-center justify-center">
                  {activeMood !== 'None' ? activeMood : '❔'}
                </div>
                <span className="text-sm font-bold text-slate-700 mt-1">
                  {activeMood !== 'None' ? `Feeling ${activeMood}` : 'No Mood Selected'}
                </span>
                <p className="text-xs text-slate-500 text-center max-w-[200px] mt-1.5">
                  {activeMood === '😊' || activeMood === '😄'
                    ? 'Excellent energy! Keep sharing positive vibes.'
                    : activeMood === '😐'
                    ? 'A neutral, stable state. Great for focus.'
                    : activeMood === '😔' || activeMood === '😴'
                    ? 'Energy is running low. Take some screen-free rest.'
                    : activeMood === '😡'
                    ? 'Feeling stressed? Close your eyes and deep-breathe.'
                    : 'Select today\'s mood emoji in the tracker below.'}
                </p>
              </div>
            </div>

            <div className="text-center p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
              <span className="text-xs text-slate-500 font-medium block">
                {activeMood !== 'None' ? 'Saved to local memory.' : 'Scroll to Mood Tracker.'}
              </span>
            </div>
          </div>

          {/* CARD 5: Daily Goal Progress */}
          <div className="glass-card rounded-3xl p-6 shadow-xs border border-white hover:border-sky-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Habit Progress</span>
                <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>

              <h3 className="text-lg font-bold font-display text-slate-800">Daily Goal Progress</h3>
              <p className="text-xs text-slate-500 mt-1">Shows how close you are to ticking off your daily offline habits.</p>

              {/* Progress bar visualizer */}
              <div className="my-8">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-3xl font-extrabold font-display text-slate-800">{habitsPercent}%</span>
                  <span className="text-slate-400 text-xs font-semibold">
                    {habitsCompleted} / {habitsTotal} Done
                  </span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${habitsPercent}%` }}
                  />
                </div>
                
                {/* Micro milestones status */}
                <div className="flex space-x-1 mt-3">
                  {habits.map((habit, idx) => (
                    <div
                      key={habit.id}
                      className={`h-1.5 flex-1 rounded-sm transition-all duration-300 ${
                        habit.checked ? 'bg-teal-400' : 'bg-slate-200'
                      }`}
                      title={habit.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center p-3 rounded-2xl bg-teal-50/50 border border-teal-100/50">
              <span className="text-xs text-teal-800 font-bold block">
                {habitsPercent === 100 
                  ? 'All Habits Completed! Superb 🌟' 
                  : habitsPercent > 50 
                  ? 'Over halfway there. Go offline and finish!'
                  : 'Start checked habits below to boost your score.'}
              </span>
            </div>
          </div>

          {/* CARD 6: Interactive Mindful Breathing Quick Tips */}
          <div className="glass-card rounded-3xl p-6 shadow-xs border border-white hover:border-sky-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Mindfulness helper</span>
                <div className="p-2 bg-pink-100 text-pink-600 rounded-xl">
                  <Activity className="h-5 w-5 animate-pulse" />
                </div>
              </div>

              <h3 className="text-lg font-bold font-display text-slate-800">Quick Well-being Check</h3>
              <p className="text-xs text-slate-500 mt-1">A simple reference checklist to see if screen overuse is causing stress.</p>

              <ul className="space-y-2 mt-4 text-xs text-slate-600 font-medium">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✔</span>
                  <span>Eyes feeling comfortable, not itchy or blurred.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✔</span>
                  <span>Shoulders and neck relaxed, posture upright.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✔</span>
                  <span>Mind feels spacious and present, not rushed.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✔</span>
                  <span>Aware of physical environment around you.</span>
                </li>
              </ul>
            </div>

            <div className="text-center p-3 rounded-2xl bg-rose-50/40 border border-rose-100/30 flex items-center justify-center space-x-1">
              <Info className="h-3.5 w-3.5 text-sky-500 flex-shrink-0" />
              <span className="text-[10px] text-slate-500 leading-snug">
                Feeling digital strain? Scroll down to the <strong>Break Reminder</strong> focus session.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
