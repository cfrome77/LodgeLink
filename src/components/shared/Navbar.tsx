'use client';

import Link from 'next/link';
import { Compass, Menu, X, Facebook, Twitter, Instagram, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Initialize theme state from document class
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="bg-background border-b border-border relative z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-scout-green p-1.5 rounded-lg text-white shrink-0">
                <Compass size={24} />
              </div>
              <span className="text-xl font-black tracking-tight text-foreground">
                LodgeMaster <span className="text-scout-green">Companion</span>
              </span>
            </Link>

            <div className="hidden sm:flex sm:items-center sm:gap-6">
              <Link href="/" className="text-sm font-bold text-muted hover:text-scout-green transition-colors">Events</Link>
              <Link href="/members" className="text-sm font-bold text-muted hover:text-scout-green transition-colors">Master List</Link>
              <Link href="/about" className="text-sm font-bold text-muted hover:text-scout-green transition-colors">About</Link>
              <Link href="/contact" className="text-sm font-bold text-muted hover:text-scout-green transition-colors">Contact</Link>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:gap-4">
            <div className="flex items-center gap-4 mr-2 border-r border-border pr-4">
              <a href="#" className="text-muted hover:text-scout-green transition-colors" title="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted hover:text-scout-green transition-colors" title="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted hover:text-scout-green transition-colors" title="Instagram">
                <Instagram size={18} />
              </a>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 text-muted hover:text-scout-green hover:bg-surface rounded-lg transition-all mr-2"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <Link href="/events/new" className="bg-khaki text-scout-green-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-khaki-dark transition-colors border border-khaki-dark/20">
              New Event
            </Link>
          </div>

          <div className="flex items-center sm:hidden gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-muted hover:text-scout-green hover:bg-surface rounded-lg transition-all"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted hover:text-foreground focus:outline-none p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-background border-b border-border animate-in slide-in-from-top-4 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-bold text-foreground hover:bg-surface rounded-md"
            >
              Events
            </Link>
            <Link
              href="/members"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-bold text-foreground hover:bg-surface rounded-md"
            >
              Master List
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-bold text-foreground hover:bg-surface rounded-md"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-bold text-foreground hover:bg-surface rounded-md"
            >
              Contact
            </Link>
            <Link
              href="/events/new"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-bold text-scout-green hover:bg-khaki rounded-md"
            >
              New Event
            </Link>
            <div className="flex items-center justify-between px-3 py-4 border-t border-border mt-2">
              <div className="flex items-center gap-6">
                <a href="#" className="text-muted hover:text-scout-green transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-muted hover:text-scout-green transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-muted hover:text-scout-green transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
