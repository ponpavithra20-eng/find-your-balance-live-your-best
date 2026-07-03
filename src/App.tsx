/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import MoodAndHabits from './components/MoodAndHabits';
import WellnessTips from './components/WellnessTips';
import BreakReminder from './components/BreakReminder';
import DailyMotivation from './components/DailyMotivation';
import WeeklyProgress from './components/WeeklyProgress';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import { MoodType, Habit } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Load and state management for user metrics
  const [screenTime, setScreenTimeState] = useState<number>(4.5);
  const [waterGlasses, setWaterGlassesState] = useState<number>(4);
  const [mood, setMoodState] = useState<MoodType | 'None'>('None');
  const [habits, setHabitsState] = useState<Habit[]>([
    { id: 'water', label: 'Drank enough water', icon: 'fa-solid fa-glass-water', checked: false },
    { id: 'exercise', label: 'Exercised today', icon: 'fa-solid fa-person-running', checked: false },
    { id: 'book', label: 'Read a book', icon: 'fa-solid fa-book-open', checked: false },
    { id: 'social', label: 'Limited social media usage', icon: 'fa-solid fa-mobile-screen-button', checked: false },
    { id: 'sleep', label: 'Slept for 8 hours', icon: 'fa-solid fa-bed', checked: false }
  ]);

  // Load initial configurations from Local Storage on mount
  useEffect(() => {
    try {
      const storedMood = localStorage.getItem('wellbeing_mood');
      if (storedMood) setMoodState(storedMood as MoodType);

      const storedHabits = localStorage.getItem('wellbeing_habits');
      if (storedHabits) {
        setHabitsState(JSON.parse(storedHabits));
      }

      const storedWater = localStorage.getItem('wellbeing_water');
      if (storedWater) setWaterGlassesState(parseInt(storedWater));

      const storedScreen = localStorage.getItem('wellbeing_screen_time');
      if (storedScreen) setScreenTimeState(parseFloat(storedScreen));
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
  }, []);

  // Setters with persistent Local Storage synchronization
  const setScreenTime = (val: number) => {
    setScreenTimeState(val);
    localStorage.setItem('wellbeing_screen_time', val.toString());
  };

  const setWaterGlasses = (val: number) => {
    setWaterGlassesState(val);
    localStorage.setItem('wellbeing_water', val.toString());
  };

  const setMood = (selectedMood: MoodType) => {
    setMoodState(selectedMood);
    localStorage.setItem('wellbeing_mood', selectedMood);
  };

  const toggleHabit = (id: string) => {
    const updated = habits.map((habit) =>
      habit.id === id ? { ...habit, checked: !habit.checked } : habit
    );
    setHabitsState(updated);
    localStorage.setItem('wellbeing_habits', JSON.stringify(updated));
  };

  const resetHabits = () => {
    const cleared = habits.map((habit) => ({ ...habit, checked: false }));
    setHabitsState(cleared);
    localStorage.setItem('wellbeing_habits', JSON.stringify(cleared));
  };

  // Cohesive real-time Wellness Score computation algorithm
  const calculateWellnessScore = (): number => {
    let score = 50; // default base starting point

    // 1. Screen Time factor (Deduct points if > 2 hours)
    if (screenTime > 2) {
      const penalty = (screenTime - 2) * 6; // e.g., 6h = 24 points penalty
      score -= penalty;
    } else {
      score += 15; // bonus for staying under ideal 2 hours screen-time
    }

    // 2. Mood factor
    if (mood === '😊' || mood === '😄') {
      score += 15;
    } else if (mood === '😐') {
      score += 5;
    } else if (mood === '😔' || mood === '😴') {
      score -= 5;
    } else if (mood === '😡') {
      score -= 15;
    }

    // 3. Hydration factor (+2.5 points per glass, max 20)
    score += Math.min(waterGlasses, 8) * 2.5;

    // 4. Habits checklist completed (+6 points per checked habit, max 30)
    const habitsCompleted = habits.filter((h) => h.checked).length;
    score += habitsCompleted * 6;

    // Clamp score between 10 and 100
    return Math.max(10, Math.min(100, Math.round(score)));
  };

  const wellnessScore = calculateWellnessScore();

  // Scroll active section tracking using Intersection Observer
  useEffect(() => {
    const sections = [
      'home',
      'dashboard',
      'mood-habits',
      'tips',
      'break-reminder',
      'weekly-progress',
      'about',
      'contact',
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // focused viewport height trigger
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen text-slate-800 bg-slate-50 relative selection:bg-sky-200">
      
      {/* Sticky Top Glassmorphism Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Pages & Sections Mount Grid */}
      <main>
        {/* 1. Home Section */}
        <Hero />

        {/* 2. Interactive Wellbeing Center Dashboard */}
        <Dashboard
          screenTime={screenTime}
          setScreenTime={setScreenTime}
          waterGlasses={waterGlasses}
          setWaterGlasses={setWaterGlasses}
          activeMood={mood}
          habits={habits}
          wellnessScore={wellnessScore}
        />

        {/* 3 & 7. Mood Tracker and Habits checklist */}
        <MoodAndHabits
          activeMood={mood}
          setMood={setMood}
          habits={habits}
          toggleHabit={toggleHabit}
          resetHabits={resetHabits}
        />

        {/* 4. Digital Wellness Tips */}
        <WellnessTips />

        {/* 5. Break Reminder Focus Session */}
        <BreakReminder />

        {/* 6. Daily Motivation Quote Banner */}
        <DailyMotivation />

        {/* 8. Weekly Progress Analytics Chart */}
        <WeeklyProgress />

        {/* 9. Educational About Guide */}
        <AboutSection />

        {/* 10. Contact Section and Footer container */}
        <ContactSection />
      </main>

    </div>
  );
}
