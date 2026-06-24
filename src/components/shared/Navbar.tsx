'use client';

import Link from 'next/link';
import { Compass, Menu, X, Facebook, Twitter, Instagram } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:gap-6">
            <div className="flex items-center gap-4 mr-4 border-r border-border pr-4">
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
            <Link href="/events/new" className="bg-khaki text-scout-green-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-khaki-dark transition-colors border border-khaki-dark/20">
              New Event
            </Link>
          </div>

          <div className="flex items-center sm:hidden">
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
              href="/events/new"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-bold text-scout-green hover:bg-khaki rounded-md"
            >
              New Event
            </Link>
            <div className="flex items-center gap-6 px-3 py-4 border-t border-border mt-2">
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
      )}
    </nav>
  );
}
