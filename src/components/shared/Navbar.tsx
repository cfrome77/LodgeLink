'use client';

import Link from 'next/link';
import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 relative z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-scout-green p-1.5 rounded-lg text-white">
                <Compass size={24} />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900">LodgeMaster <span className="text-scout-green">Companion</span></span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:gap-6">
            <Link href="/" className="text-sm font-bold text-gray-600 hover:text-scout-green transition-colors">Events</Link>
            <Link href="/events/new" className="bg-khaki text-scout-green-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-khaki-dark transition-colors border border-khaki-dark/20">New Event</Link>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200 animate-in slide-in-from-top-4 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-bold text-gray-700 hover:bg-gray-50 rounded-md"
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
          </div>
        </div>
      )}
    </nav>
  );
}
