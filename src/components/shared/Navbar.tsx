"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Facebook, Twitter, Instagram, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="bg-background border-b border-border z-30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT: Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/">
            <Image
              src="/lodgelink-logo-horizontal.png"
              alt="LodgeLink"
              width={120}
              height={34}
              priority
            />
          </Link>
        </div>

        {/* RIGHT: Links, Socials, Toggle, and Button */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Main Links - Changed 'md' to 'lg' */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-bold text-muted hover:text-scout-green transition-colors"
            >
              Events
            </Link>
            <Link
              href="/members"
              className="text-sm font-bold text-muted hover:text-scout-green transition-colors"
            >
              Master List
            </Link>
            <Link
              href="/stats"
              className="text-sm font-bold text-muted hover:text-scout-green transition-colors"
            >
              Stats
            </Link>
            <Link
              href="/contact"
              className="text-sm font-bold text-muted hover:text-scout-green transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Socials - Changed 'lg' visibility to keep them visible longer (only hidden at < 1024px) */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#" className="text-muted hover:text-scout-green">
              <Facebook size={16} />
            </a>
            <a href="#" className="text-muted hover:text-scout-green">
              <Twitter size={16} />
            </a>
            <a href="#" className="text-muted hover:text-scout-green">
              <Instagram size={16} />
            </a>
          </div>

          {/* Utilities: Theme Toggle & Button with Separator */}
          <div className="flex items-center gap-4 border-l border-border pl-4">
            <button
              onClick={toggleTheme}
              className="text-muted hover:text-scout-green transition-colors"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link
              href="/events/new"
              className="bg-khaki text-scout-green-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-khaki-dark transition-all border border-khaki-dark/20 whitespace-nowrap shadow-sm"
            >
              New Event
            </Link>
          </div>

          {/* Mobile Menu Toggle - Changed 'md' to 'lg' */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-muted hover:text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - Changed 'md' to 'lg' */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background p-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-base font-bold text-foreground"
            >
              Events
            </Link>
            <Link
              href="/members"
              onClick={() => setIsOpen(false)}
              className="text-base font-bold text-foreground"
            >
              Master List
            </Link>
            <Link
              href="/stats"
              onClick={() => setIsOpen(false)}
              className="text-base font-bold text-foreground"
            >
              Stats
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="text-base font-bold text-foreground"
            >
              Contact
            </Link>
            <div className="flex gap-6 pt-4 border-t border-border">
              <a href="#" className="text-muted hover:text-scout-green">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted hover:text-scout-green">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted hover:text-scout-green">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
