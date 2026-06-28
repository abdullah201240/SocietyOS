"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  property: string;
}

interface Metric {
  value: string;
  label: string;
  desc: string;
}

export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      quote: "Before SocietyOS, complaints were scattered across WhatsApp. Now we have centralized logs, auto-assignments, and real-time status updates. Our response time dropped from days to under two hours.",
      name: "Rajesh Mehta",
      role: "Apartment Committee President",
      property: "Grandview Heights (320 units)",
    },
    {
      quote: "Managing accounts and utility billing for five different properties used to be a full-time Excel nightmare. SocietyOS consolidated everything into one dashboard. Rent collection is now automated.",
      name: "Sarah Jenkins",
      role: "Property Operations Manager",
      property: "Apex Management Portfolios",
    },
    {
      quote: "The preventive maintenance schedule has saved us thousands in emergency elevator and plumbing repairs. Resident satisfaction is at an all-time high due to clear push alerts and transparency.",
      name: "Marcus Vance",
      role: "Residential Tower Administrator",
      property: "Vanguard Prestige Towers",
    },
  ];

  const metrics: Metric[] = [
    {
      value: "150+",
      label: "Buildings Managed",
      desc: "Residential towers & gated estates",
    },
    {
      value: "95,000+",
      label: "Complaints Resolved",
      desc: "Under 2 hours average SLA",
    },
    {
      value: "1.2M",
      label: "Resident Actions",
      desc: "Monthly billing, logs, & approvals",
    },
    {
      value: "99.98%",
      label: "Billing Accuracy",
      desc: "Zero ledger discrepancies",
    },
  ];

  const logoPartners = [
    "GRANDVIEW PROP",
    "APEX HOMES",
    "BELVEDERE ESTATE",
    "PACIFIC TOWERS",
    "VANGUARD LIVING",
  ];

  return (
    <section id="trust" className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Headers */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4 rounded-full px-3 py-1 border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400 bg-white dark:bg-zinc-950">
            Trust & Credibility
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Trusted by Modern Residential Communities
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Designed for apartment societies, gated communities, and building management teams that need operational clarity and resident satisfaction.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-24">
          {testimonials.map((t, idx) => (
            <Card
              key={idx}
              className="rounded-lg border border-zinc-200/80 bg-white p-6 hover:border-zinc-300 dark:border-zinc-850 dark:bg-zinc-950/30 dark:hover:border-zinc-700 shadow-none flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5 stars */}
                <div className="flex gap-0.5 text-indigo-600 dark:text-indigo-455">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-zinc-650 dark:text-zinc-350 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{t.name}</div>
                <div className="text-[10px] text-zinc-450 mt-0.5">{t.role}</div>
                <div className="text-[9px] text-zinc-500 font-medium mt-1">{t.property}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-zinc-200/80 dark:border-zinc-900 mb-16 md:mb-24">
          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-1.5 text-center sm:text-left">
              <span className="text-3xl font-extrabold text-indigo-650 dark:text-indigo-400 block tracking-tight">
                {m.value}
              </span>
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
                {m.label}
              </span>
              <span className="text-[10px] text-zinc-450 dark:text-zinc-505 block leading-normal">
                {m.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Logo Cloud Partners */}
        <div className="flex flex-col items-center gap-6">
          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
            MANAGED PORTFOLIO BRANDS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40 dark:opacity-30">
            {logoPartners.map((logo) => (
              <span
                key={logo}
                className="text-[11px] font-black tracking-widest text-zinc-900 dark:text-zinc-50"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
