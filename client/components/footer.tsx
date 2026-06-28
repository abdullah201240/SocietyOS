import * as React from "react";
import Link from "next/link";
import { Building } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-150 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20 py-12 md:py-16 text-xs text-zinc-500 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Branding */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-50 text-sm">
              <div className="h-5.5 w-5.5 rounded bg-indigo-600 text-white flex items-center justify-center dark:bg-indigo-500 dark:text-white">
                <Building className="h-3.5 w-3.5" />
              </div>
              <span>SocietyOS</span>
            </Link>
            <p className="text-zinc-450 dark:text-zinc-505 leading-relaxed max-w-xs text-[11px]">
              Modern operating system for apartment societies, residential communities, and building management teams.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-[11px] uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Solutions</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Capabilities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-[11px] uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Complaint Management</Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Billing & Payments</Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Visitor Management</Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Maintenance Operations</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-[11px] uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link>
              </li>
              <li>
                <Link href="#privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="#support" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Support Hub</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Footer Metas */}
        <div className="pt-8 border-t border-zinc-150 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left text-[10px] text-zinc-400">
            <p>SocietyOS © 2026. Empowering modern residential communities worldwide.</p>
            <p className="text-[9px] text-zinc-400/85">
              Designed for compliance with property management and local housing committee regulations.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex gap-4 items-center text-zinc-450 dark:text-zinc-600">
            <a href="#twitter" aria-label="Twitter Profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#github" aria-label="GitHub Repository" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="#linkedin" aria-label="LinkedIn Profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
