/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Activity, Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Mood & Habits', href: '#mood-habits' },
    { label: 'Tips', href: '#tips' },
    { label: 'Break Reminder', href: '#break-reminder' },
    { label: 'Weekly Progress', href: '#weekly-progress' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-md py-3'
          : 'bg-white/10 backdrop-blur-xs py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-200">
              <Activity className="h-5.5 w-5.5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display tracking-tight bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                Digital Wellbeing
              </h1>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase block -mt-1">
                Healthy Digital Life
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-50 text-sky-600 shadow-sm border border-sky-100/50'
                      : 'text-slate-600 hover:text-sky-500 hover:bg-slate-50/50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* CTA/Heart Rate visual decoration */}
          <div className="hidden lg:flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100 text-xs font-semibold">
            <Heart className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500" />
            <span>Digital Harmony Active</span>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-sky-500 hover:bg-slate-50 focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out absolute left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-lg ${
          isMenuOpen
            ? 'opacity-100 translate-y-0 visible pointer-events-auto'
            : 'opacity-0 -translate-y-4 invisible pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-sky-500 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-4 border-t border-slate-100 mt-2 flex items-center justify-between px-4 text-xs font-medium text-emerald-600 bg-emerald-50/50 py-2 rounded-xl">
            <div className="flex items-center space-x-1.5">
              <Heart className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
              <span>Staying healthy and balanced today</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
