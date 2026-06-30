"use client";

import { Compass, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12 px-4 mt-auto text-center md:text-left">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/lodgelink-logo-horizontal.png"
                alt="LodgeLink"
                width={120}
                height={34}
                priority
              />
            </Link>
            <p className="text-muted text-sm max-w-xs mb-6">
              Empowering Lodge leaders with clean data management for the Order
              of the Arrow. Simplify your event check-ins and LodgeMaster
              imports.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted hover:text-scout-green transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-muted hover:text-scout-green transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-muted hover:text-scout-green transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-muted hover:text-scout-green transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted hover:text-scout-green transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/events/new"
                  className="text-muted hover:text-scout-green transition-colors"
                >
                  New Event
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-scout-green transition-colors"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-foreground mb-4">
              Organization
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted hover:text-scout-green transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted hover:text-scout-green transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted hover:text-scout-green transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted font-bold uppercase tracking-wider">
          <p>
            © {new Date().getFullYear()} LodgeLink. Not an official Boy Scouts
            of America product.
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="hover:text-scout-green transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-scout-green transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="hover:text-scout-green transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
