/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, Phone, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API submission delay
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      }, 1200);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="bg-slate-900 text-white relative pt-20 overflow-hidden">
      {/* Background Decorative highlights */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16 border-b border-white/5">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-400 font-bold text-xs uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
            Connect
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight mt-3">
            Get In <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-slate-400 mt-2 text-md">
            Do you have questions about digital habits, or would you like to share suggestions? 
            Send us a message below and we will reach out as soon as possible.
          </p>
        </div>

        {/* Form and info split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Info Details column (col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-display text-slate-100">Contact Information</h3>
              <p className="text-slate-400 text-sm">
                We are committed to fostering digital-life harmony across schools and corporate environments.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-3.5 p-4 rounded-2xl bg-white/5 border border-white/5">
                <Mail className="h-5 w-5 text-sky-400" />
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Email Us</span>
                  <a href="mailto:ponpavithra20@gmail.com" className="text-slate-200 hover:text-sky-400 font-medium">
                    ponpavithra20@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-4 rounded-2xl bg-white/5 border border-white/5">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Location</span>
                  <span className="text-slate-200 font-medium">Remote Space, global</span>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-4 rounded-2xl bg-white/5 border border-white/5">
                <Phone className="h-5 w-5 text-yellow-400" />
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Call Us</span>
                  <span className="text-slate-200 font-medium">+1 (555) 019-2834</span>
                </div>
              </div>
            </div>

            {/* Micro quote card */}
            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-xs text-sky-300 leading-relaxed">
              <strong>Healthy Tech Proverb:</strong> "The best view is the one you look up from your device to see."
            </div>
          </div>

          {/* Contact form column (col-span-7) */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-fade-in">
                <CheckCircle className="h-14 w-14 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold font-display text-emerald-300">Message Transmitted!</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Thank you for writing. Your submission has been saved securely, and our team will connect with your mailbox shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Write Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Ponpavithra"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all text-white placeholder-slate-500"
                  />
                  {errors.name && <p className="text-xs text-rose-400 font-semibold">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. user@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all text-white placeholder-slate-500"
                  />
                  {errors.email && <p className="text-xs text-rose-400 font-semibold">{errors.email}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Detailed Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your feedback or guidelines query..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all text-white placeholder-slate-500 resize-none"
                  />
                  {errors.message && <p className="text-xs text-rose-400 font-semibold">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Submit Message'}</span>
                </button>

              </form>
            )}
          </div>

        </div>

      </div>

      {/* Footer Area */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center sm:text-left relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-500">
        
        {/* Left Credit and Socials */}
        <div className="space-y-3 flex flex-col items-center sm:items-start">
          <div className="flex items-center space-x-1">
            <span className="text-slate-400 font-extrabold font-display">Digital Wellbeing</span>
            <span className="text-xs font-semibold px-2 py-0.5 bg-white/5 rounded-md text-emerald-400">Dashboard</span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Maintaining mental and physical health in a modern connected universe.
          </p>

          {/* Social Icons using requested Font Awesome */}
          <div className="flex space-x-4 pt-1.5">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors text-lg" aria-label="Github link">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors text-lg" aria-label="Linkedin link">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors text-lg" aria-label="Twitter link">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors text-lg" aria-label="Youtube link">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="hover:text-white transition-colors">Home</a>
          <a href="#dashboard" onClick={(e) => handleSmoothScroll(e, '#dashboard')} className="hover:text-white transition-colors">Dashboard</a>
          <a href="#mood-habits" onClick={(e) => handleSmoothScroll(e, '#mood-habits')} className="hover:text-white transition-colors">Mood & Checklist</a>
          <a href="#tips" onClick={(e) => handleSmoothScroll(e, '#tips')} className="hover:text-white transition-colors">Tips</a>
          <a href="#break-reminder" onClick={(e) => handleSmoothScroll(e, '#break-reminder')} className="hover:text-white transition-colors">Timer</a>
        </div>

        {/* Copy and Design Credit */}
        <div className="text-center sm:text-right space-y-1">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Digital Wellbeing. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-400 font-semibold flex items-center justify-center sm:justify-end gap-1">
            <span>Designed with ♥ by</span>
            <span className="text-sky-400 hover:underline">Ponpavithra</span>
          </p>
        </div>

      </footer>
    </section>
  );
}
