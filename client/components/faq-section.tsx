"use client";

import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export function FAQSection() {
  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      question: "Can multiple buildings be managed from one dashboard?",
      answer: "Yes, SocietyOS supports centralized portfolio management across multiple buildings, towers, and residential estates. Managers can toggle between complexes with a single click, comparing financials, tickets, and staffing in real time.",
    },
    {
      id: "faq-2",
      question: "Can both owners and tenants use the platform?",
      answer: "Absolutely. Owners, tenants, committee members, security guards, and third-party maintenance dispatchers all get access to distinct, role-based interfaces. Permission levels restrict data access to maintain confidentiality.",
    },
    {
      id: "faq-3",
      question: "Does the platform support maintenance billing and utility charges?",
      answer: "Yes. The platform automates rent ledgers, service charge breakdowns, utility consumption dues, and penalties. It integrates payment gateways so residents can pay directly via credit card, ACH, or mobile wallets.",
    },
    {
      id: "faq-4",
      question: "Is the platform mobile friendly?",
      answer: "Yes, the portal is fully responsive. Residents and staff can view accounts, submit complaints, authorize visitors, and track schedules from any smartphone, tablet, or desktop browser.",
    },
    {
      id: "faq-5",
      question: "Can residents submit complaints and track status?",
      answer: "Yes. The resident dashboard allows users to submit service tickets, attach photos, designate priority tiers, and follow real-time progress steps as a technician reviews, starts, and resolves the issue.",
    },
    {
      id: "faq-6",
      question: "Does the system support visitor and parking management?",
      answer: "Yes, visitor entry approvals, gate passes, parking spot assignments, and security gate check-in logs are fully integrated into the operations dashboard for gated communities.",
    },
    {
      id: "faq-7",
      question: "Is onboarding and setup support included?",
      answer: "Yes, onboarding assistance, data imports (resident lists, building units), and training guidance are included to ensure a seamless transition for your community committee and staff.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Headers */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 rounded-full px-3 py-1 border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-950/40">
            Support & Help
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Everything you need to know about managing communities with SocietyOS.
          </p>
        </div>

        {/* Accordion List */}
        <div className="border border-zinc-200/80 bg-zinc-50/10 p-2 dark:border-zinc-850 dark:bg-zinc-950/20">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-zinc-100 dark:border-zinc-900 px-4 last:border-b-0">
                <AccordionTrigger className="text-xs font-bold text-zinc-850 dark:text-zinc-200 hover:no-underline py-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed pb-4 pt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
