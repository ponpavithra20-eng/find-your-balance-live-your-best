/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Smile, CheckSquare, Calendar, CloudSun, Award } from 'lucide-react';
import { MoodType, Habit } from '../types';

interface MoodAndHabitsProps {
  activeMood: MoodType | 'None';
  setMood: (mood: MoodType) => void;
  habits: Habit[];
  toggleHabit: (id: string) => void;
  resetHabits: () => void;
}

export default function MoodAndHabits({
  activeMood,
  setMood,
  habits,
  toggleHabit,
  resetHabits,
}: MoodAndHabitsProps) {
  const moods: { emoji: MoodType; label: string; color: string; desc: string }[] = [
    { emoji: '😊', label: 'Happy', color: 'hover:bg-emerald-50 hover:text-emerald-600', desc: 'Feeling joyful and calm' },
    { emoji: '😄', label: 'Excited', color: 'hover:bg-sky-50 hover:text-sky-600', desc: 'Full of positive energy' },
    { emoji: '😐', label: 'Neutral', color: 'hover:bg-slate-100 hover:text-slate-600', desc: 'Level-headed and steady' },
    { emoji: '😔', label: 'Sad/Tired', color: 'hover:bg-amber-50 hover:text-amber-600', desc: 'Feeling a bit low or down' },
    { emoji: '😴', label: 'Sleepy', color: 'hover:bg-blue-50 hover:text-blue-700', desc: 'Exhausted, needs offline rest' },
    { emoji: '😡', label: 'Stressed', color: 'hover:bg-rose-50 hover:text-rose-600', desc: 'Overwhelmed or agitated' },
  ];

  const checkedCount = habits.filter((h) => h.checked).length;
  const isAllChecked = checkedCount === habits.length;

  return (
    <section id="mood-habits" className="py-20 bg-gradient-to-b from-slate-50 to-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* COLUMN 1: Mood Tracker (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-sky-50 text-sky-500 rounded-lg">
                <Smile className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-bold font-display text-slate-800">Daily Mood Tracker</h2>
            </div>
            
            <p className="text-slate-600 text-sm">
              How are you feeling right now? Select an emoji to log today's mood. 
              Checking in regularly with your mental state helps build a healthier awareness of digital fatigue.
            </p>

            {/* Mood Emojis Selection Grid */}
            <div className="glass-card bg-white/40 p-6 rounded-3xl border border-white shadow-xs space-y-6">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {moods.map((m) => {
                  const isSelected = activeMood === m.emoji;
                  return (
                    <button
                      key={m.emoji}
                      onClick={() => setMood(m.emoji)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-tr from-sky-500 to-sky-400 text-white border-transparent scale-105 shadow-md shadow-sky-100'
                          : `bg-white/80 text-slate-600 border-slate-100 ${m.color} hover:-translate-y-1 hover:shadow-xs`
                      }`}
                    >
                      <span className="text-3xl mb-1">{m.emoji}</span>
                      <span className="text-[10px] font-bold tracking-wider uppercase block">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Today's Logged Mood Response Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Today's Selection</span>
                  <span className="text-base font-bold text-slate-700 mt-1 block">
                    {activeMood !== 'None' 
                      ? `Feeling: ${activeMood} ${moods.find(m => m.emoji === activeMood)?.label}` 
                      : 'No mood logged yet'}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {activeMood !== 'None' 
                      ? `${moods.find(m => m.emoji === activeMood)?.desc}. Auto-saved to Local Storage.` 
                      : 'Click an emoji above to record.'}
                  </p>
                </div>
                {activeMood !== 'None' && (
                  <div className="text-2xl p-2 bg-white rounded-xl shadow-xs border border-slate-100 animate-pulse">
                    {activeMood}
                  </div>
                )}
              </div>
            </div>

            {/* Mental Wellness Note */}
            <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100/50 flex space-x-3">
              <span className="text-lg mt-0.5 text-sky-500">💡</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Mindful Hint:</strong> Feeling fatigued or stressed is often a signal that your nervous system is over-stimulated by blue screens. Take a 10-minute quiet walk or close your eyes.
              </p>
            </div>
          </div>

          {/* COLUMN 2: Healthy Habits Checklist (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-2 justify-between">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg">
                  <CheckSquare className="h-5 w-5" />
                </span>
                <h2 className="text-2xl font-bold font-display text-slate-800">Healthy Habits Checklist</h2>
              </div>
              <button
                onClick={resetHabits}
                className="text-xs text-slate-400 hover:text-rose-500 transition-colors font-semibold flex items-center space-x-1 cursor-pointer"
                title="Reset all habit marks to false"
              >
                <span>Reset Habits</span>
              </button>
            </div>

            <p className="text-slate-600 text-sm">
              Check off these healthy wellness guidelines as you perform them today. Sticking to simple offline
              routines is the most effective approach to limiting passive screen reliance.
            </p>

            {/* Checklist items list */}
            <div className="glass-card bg-white/40 p-6 rounded-3xl border border-white shadow-xs space-y-3">
              {habits.map((habit) => (
                <label
                  key={habit.id}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    habit.checked
                      ? 'bg-emerald-50/70 border-emerald-100 shadow-xs'
                      : 'bg-white/85 border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    {/* Checkbox Input element */}
                    <input
                      type="checkbox"
                      checked={habit.checked}
                      onChange={() => toggleHabit(habit.id)}
                      className="w-5.5 h-5.5 rounded-md border-slate-300 text-emerald-500 focus:ring-emerald-400 cursor-pointer accent-emerald-500"
                    />
                    
                    {/* Habit Icon from Font Awesome */}
                    <div className={`p-2 rounded-xl text-xs flex items-center justify-center ${
                      habit.checked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <i className={`${habit.icon} text-sm`}></i>
                    </div>

                    <span className={`text-sm font-semibold transition-all ${
                      habit.checked ? 'text-slate-700 line-through' : 'text-slate-800'
                    }`}>
                      {habit.label}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                    habit.checked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {habit.checked ? 'Done' : 'Todo'}
                  </span>
                </label>
              ))}

              {/* Congratulatory badge */}
              {isAllChecked && (
                <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white text-center flex items-center justify-center space-x-2 shadow-md">
                  <Award className="h-5 w-5 text-yellow-300 animate-bounce" />
                  <span className="text-xs font-bold">Incredible! You completed all 5 habits today!</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
