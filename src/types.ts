/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MoodType = '😊' | '😄' | '😐' | '😔' | '😴' | '😡';

export interface MoodEntry {
  date: string; // YYYY-MM-DD
  mood: MoodType;
  note?: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface Habit {
  id: string;
  label: string;
  icon: string; // Font Awesome class name
  checked: boolean;
}

export interface WellnessTip {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide or Font Awesome name
  category: 'Focus' | 'Physical' | 'Digital' | 'Sleep';
}

export interface DayProgress {
  dayName: string; // e.g. "Mon", "Tue"
  score: number; // 0-100 wellness score
  screenTime: number; // in hours, e.g., 4.5
}

export interface DashboardStats {
  screenTime: number; // in minutes (or hours)
  wellnessScore: number; // out of 100
  moodToday: MoodType | 'None';
  goalProgress: number; // 0-100 %
  waterGlasses: number; // 0-10 count
}
