"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

interface PlanFeature {
  name: string;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  variant: "default" | "highlight" | "enterprise";
}

export function PricingSection() {
  const plans: PricingPlan[] = [
    {
      name: "Starter",
      description: "For small apartment buildings and single blocks.",
      price: "৳4,900",
      period: "per month, billed annually",
      features: [
        "Complaint management",
        "Resident management",
        "Notices & announcements",
        "Basic billing & tracking",
        "Standard email support",
      ],
      ctaText: "Start Free Trial",
      ctaHref: "/book-demo",
      variant: "default",
    },
    {
      name: "Growth",
      description: "For medium-sized buildings and growing portfolios.",
      price: "৳12,900",
      period: "per month, billed annually",
      features: [
        "Everything in Starter",
        "Parking space management",
        "Visitor & Gate approvals",
        "Maintenance dispatches",
        "Analytics dashboards",
        "Priority 24/7 support",
      ],
      ctaText: "Book Demo",
      ctaHref: "/book-demo",
      variant: "highlight",
    },
    {
      name: "Enterprise",
      description: "For large communities and building management companies.",
      price: "Custom",
      period: "tailored billing and SLA structures",
      features: [
        "Everything in Growth",
        "Multi-building portfolio hub",
        "Advanced B2B reports",
        "Custom roles & permissions",
        "Dedicated onboarding agent",
        "Uptime SLA compliance support",
      ],
      ctaText: "Contact Sales",
      ctaHref: "/#contact",
      variant: "enterprise",
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 -100 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Headers */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4 rounded-full px-3 py-1-200 text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-950/40">
            Pricing Plans
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Simple Pricing for Modern Buildings
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Flexible plans designed for apartment buildings, residential towers, and multi-building portfolios.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col justify-between p-1.5 shadow-none ${
                plan.variant === "highlight"
                  ? "indigo-650 bg-indigo-50/10 dark:bg-indigo-950/10  ring-indigo-650 dark:ring-indigo-500"
                  : "zinc-200 bg-white dark:bg-zinc-950/30 hover:zinc-300 dark:hover:zinc-700"
              }`}
            >
              <div className="p-5 flex-grow">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{plan.name}</h3>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-normal max-w-[200px]">
                      {plan.description}
                    </p>
                  </div>
                  {plan.variant === "highlight" && (
                    <Badge variant="default" className="text-[9px] font-semibold px-2 py-0.5 rounded-full">
                      Recommended
                    </Badge>
                  )}
                </div>

                {/* Price Display */}
                <div className="py-4 my-2 -100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">/mo</span>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block mt-1 leading-normal">
                    {plan.period}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 mt-6 text-xs text-zinc-650 dark:text-zinc-350">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div className={`mt-0.5 rounded-full p-0.5 text-zinc-700 dark:text-zinc-300 ${
                        plan.variant === "highlight"
                          ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                          : "bg-zinc-100 dark:bg-zinc-900"
                      }`}>
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0 mt-4">
                <Button
                  className="w-full text-xs h-9.5 rounded-md gap-1.5 font-semibold"
                  variant={
                    plan.variant === "highlight"
                      ? "default"
                      : "outline"
                  }
                  asChild
                >
                  <Link href={plan.ctaHref}>
                    {plan.ctaText}
                    {plan.variant === "highlight" && <ArrowRight className="h-3.5 w-3.5" />}
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
