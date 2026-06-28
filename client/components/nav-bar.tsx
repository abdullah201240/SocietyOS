"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Building2 } from "lucide-react";

export function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Features", href: "/#features" },
    { name: "Solutions", href: "/#solutions" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200  ${
        isScrolled
          ? "zinc-200 bg-white/80 backdrop-blur-md dark:bg-black/80"
          : "transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            <div className="flex h-8 w-8 items-center justify-center bg-zinc-50 dark:bg-zinc-900">
              <Building2 className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-base font-bold tracking-tight">BuildingOS</span>
          </Link>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xs font-semibold text-zinc-500 transition-colors hover:text-indigo-650 dark:text-zinc-400 dark:hover:text-indigo-400"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/book-demo">Book Demo</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="text-zinc-600 dark:text-zinc-400"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="md:hidden -200 bg-white px-4 pt-2 pb-6 dark:bg-black">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 pt-4 -100">
              <Button variant="outline" size="sm" className="w-full justify-center" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" className="w-full justify-center" asChild>
                <Link href="/book-demo">Book Demo</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
