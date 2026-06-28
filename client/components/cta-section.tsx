"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wrench, Shield, CheckCircle2 } from "lucide-react";

import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 -100 bg-zinc-50/20 dark:bg-black/30 overflow-hidden relative">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] dark:bg-[linear-gradient(to_right,#151518_1px,transparent_1px),linear-gradient(to_bottom,#151518_1px,transparent_1px)] opacity-70" />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <div className="200/80 bg-white/80 dark:bg-zinc-950/40 p-8 md:p-12 text-center max-w-4xl mx-auto">
          
          <div className="flex flex-col items-center max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-4 rounded-full px-3 py-1-200 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-950">
              Get Started
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Modernize Your Building Operations
            </h2>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Centralize complaints, maintenance, billing, security, and resident communication in one modern platform built for residential buildings.
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button size="default" className="text-xs h-9.5 font-semibold gap-1.5 px-5 rounded-md" asChild>
                <Link href="/book-demo">
                  Book Demo
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button size="default" variant="outline" className="text-xs h-9.5 font-semibold px-5 rounded-md-200 hover:bg-zinc-50 dark:hover:bg-zinc-900" asChild>
                <Link href="/#contact">Contact Sales</Link>
              </Button>
            </div>

            {/* Micro Operational Checkpoints */}
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] text-zinc-450 dark:text-zinc-505 font-medium -100 pt-8 w-full">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Free Setup & Onboarding
              </span>
              <span className="flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Multi-Building Ready
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Role-Based Access Controls
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
