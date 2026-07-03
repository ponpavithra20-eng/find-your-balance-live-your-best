/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';

export default function BreakReminder() {
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [notifGranted, setNotifGranted] = useState(false);
  const [showInAppAlert, setShowInAppAlert] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initial duration based on type
  const initialDuration = sessionType === 'focus' ? 25 * 60 : 5 * 60;

  // Sync notification permissions on mount
  useEffect(() => {
    if ('Notification' in window) {
      setNotifGranted(Notification.permission === 'granted');
    }
  }, []);

  // Request browser notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotifGranted(permission === 'granted');
      if (permission === 'granted') {
        new Notification("Digital Wellbeing", {
          body: "Awesome! You will now receive reminders when it is time for your offline breaks.",
          icon: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
        });
      }
    } else {
      alert("Browser notifications are not supported in this browser.");
    }
  };

  // Synthesize a calming audio tone using Web Audio API (no assets required)
  const playCalmingChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Calming chime sound sequence
      const playNote = (freq: number, delay: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        
        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
        
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration);
      };

      // Play major pentatonic calming chime (E5, G5, A5, C6)
      playNote(659.25, 0, 1.5); // E5
      playNote(783.99, 0.25, 1.5); // G5
      playNote(880.00, 0.5, 1.5); // A5
      playNote(1046.50, 0.75, 2.0); // C6
    } catch (e) {
      console.warn("Audio synthesis was blocked or failed", e);
    }
  };

  // Timer Core Loop
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Session finished!
      setIsActive(false);
      playCalmingChime();
      triggerNotification();
      setShowInAppAlert(true);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  // Handle Switch focus/break
  const switchSession = (type: 'focus' | 'break') => {
    setIsActive(false);
    setSessionType(type);
    setTimeLeft(type === 'focus' ? 25 * 60 : 5 * 60);
    setShowInAppAlert(false);
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(initialDuration);
    setShowInAppAlert(false);
  };

  // Trigger browser notification
  const triggerNotification = () => {
    const title = sessionType === 'focus' ? 'Time for an Offline Break!' : 'Break Over, Stay Mindful!';
    const body = sessionType === 'focus'
      ? 'Step away from your screen. Do the 20-20-20 rule, grab some water, or stretch your limbs!'
      : 'Ready to focus again? Remember to keep your screen time balanced and healthy.';

    if (notifGranted && 'Notification' in window) {
      new Notification(title, {
        body: body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
        tag: 'wellbeing-break',
        requireInteraction: true
      });
    }
  };

  // Formatting minutes and seconds
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Progress circle offset calculation
  const progressRatio = timeLeft / initialDuration;
  const strokeDashoffset = 2 * Math.PI * 110 * (1 - progressRatio);

  return (
    <section id="break-reminder" className="py-20 bg-slate-50 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-500 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Focus & Recover
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight mt-3">
            Mindful <span className="text-sky-500">Break Reminder</span>
          </h2>
          <p className="text-slate-600 mt-2 text-md">
            Working long hours on computers creates extreme posture and visual load.
            Use our built-in Pomodoro timer to partition your tasks into 25-minute focus segments and 5-minute offline stretches.
          </p>
        </div>

        {/* Central Timer Card */}
        <div className="max-w-xl mx-auto glass-card bg-white/70 p-8 rounded-3xl border border-white shadow-xl flex flex-col items-center">
          
          {/* Selectors */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-8 space-x-1.5 w-full">
            <button
              onClick={() => switchSession('focus')}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                sessionType === 'focus'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🎯 Focus Session (25m)
            </button>
            <button
              onClick={() => switchSession('break')}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                sessionType === 'break'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🍃 Short Break (5m)
            </button>
          </div>

          {/* Graphical Clock Dial */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-8">
            <svg className="absolute w-full h-full transform -rotate-90">
              {/* Background grey ring */}
              <circle
                cx="128"
                cy="128"
                r="110"
                className="stroke-slate-100"
                strokeWidth="6"
                fill="transparent"
              />
              {/* Main colored progress ring */}
              <circle
                cx="128"
                cy="128"
                r="110"
                className="transition-all duration-300"
                strokeDasharray={2 * Math.PI * 110}
                strokeDashoffset={strokeDashoffset}
                strokeWidth="10"
                strokeLinecap="round"
                stroke={sessionType === 'focus' ? '#0ea5e9' : '#10b981'} // sky-500 vs emerald-500
                fill="transparent"
              />
            </svg>

            {/* Time readout */}
            <div className="text-center z-10 space-y-1">
              <span className="text-5xl font-extrabold font-display text-slate-800 tracking-tight block">
                {formatTime(timeLeft)}
              </span>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
                {isActive ? 'Session Active' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center space-x-4 w-full">
            <button
              onClick={handleReset}
              className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-all border border-slate-200 flex items-center justify-center space-x-2 cursor-pointer"
              title="Reset session timer"
            >
              <RotateCcw className="h-4.5 w-4.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleStartPause}
              className={`flex-2 py-3.5 text-white font-semibold rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5 cursor-pointer ${
                isActive
                  ? 'bg-slate-700 hover:bg-slate-800'
                  : sessionType === 'focus'
                  ? 'bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-600'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600'
              }`}
            >
              {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              <span>{isActive ? 'Pause' : 'Start Focus'}</span>
            </button>
          </div>

          {/* Desktop Notifications trigger button */}
          <div className="mt-8 pt-6 border-t border-slate-100/70 w-full text-center flex flex-col items-center justify-center">
            {notifGranted ? (
              <div className="flex items-center space-x-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>Desktop notifications are active</span>
              </div>
            ) : (
              <button
                onClick={requestNotificationPermission}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline transition-all cursor-pointer"
              >
                <Bell className="h-4 w-4 text-sky-500 animate-bounce" />
                <span>Enable Desktop Break Notifications</span>
              </button>
            )}
            <p className="text-[10px] text-slate-400 mt-1 max-w-[280px]">
              We respect your focus. Real notifications pop up on your computer desktop even if you scroll away or switch tabs.
            </p>
          </div>
        </div>

        {/* Modal-style in-app break completion overlay */}
        {showInAppAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-md">
            <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 text-center space-y-4 animate-fade-in">
              <div className="h-16 w-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">
                🎉
              </div>
              <h3 className="text-xl font-bold font-display text-slate-800">
                {sessionType === 'focus' ? 'Time for your well-being break!' : 'Break session finished!'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {sessionType === 'focus'
                  ? 'Fantastic work focusing! Stand up, walk around, look at something 20 feet away to relax your eyes, or have a refreshing glass of water.'
                  : 'Your relaxation break has concluded. Ready to kickstart another session of high-efficiency focused work?'}
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowInAppAlert(false);
                    switchSession(sessionType === 'focus' ? 'break' : 'focus');
                    setIsActive(true);
                  }}
                  className="flex-1 py-3 bg-gradient-to-tr from-sky-500 to-sky-400 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  {sessionType === 'focus' ? 'Start Break Now (5m)' : 'Start Next Focus (25m)'}
                </button>
                <button
                  onClick={() => setShowInAppAlert(false)}
                  className="px-5 py-3 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
