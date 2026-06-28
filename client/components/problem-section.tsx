"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquareOff,
  FileSpreadsheet,
  Clock,
  BookOpen,
  EyeOff,
  AlertTriangle,
} from "lucide-react";

interface PainCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function PainCard({ icon, title, description }: PainCardProps) {
  return (
    <div className="group flex items-start gap-4 p-4 rounded-lg border border-zinc-200/80 bg-white hover:border-zinc-300 hover:shadow-xs transition-all dark:border-zinc-800/80 dark:bg-zinc-950/20 dark:hover:border-zinc-700">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700 transition-all group-hover:bg-indigo-50/60 group-hover:text-indigo-600 group-hover:border-indigo-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:group-hover:bg-indigo-950/30 dark:group-hover:text-indigo-400 dark:group-hover:border-indigo-900">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function ProblemSection() {
  const painPoints = [
    {
      icon: <MessageSquareOff className="h-4.5 w-4.5" />,
      title: "Complaints Lost in WhatsApp Groups",
      description: "Critical resident reports get buried in messy chat history, leading to missed resolutions and resident frustration.",
    },
    {
      icon: <FileSpreadsheet className="h-4.5 w-4.5" />,
      title: "Manual Billing & Payment Tracking",
      description: "Reconciling maintenance dues and utility charges on spreadsheets leads to accounting errors and delayed cash flow.",
    },
    {
      icon: <Clock className="h-4.5 w-4.5" />,
      title: "Maintenance Requests Delayed",
      description: "Without tracking systems, task dispatching slips through the cracks, leaving facilities and assets broken for days.",
    },
    {
      icon: <BookOpen className="h-4.5 w-4.5" />,
      title: "Visitor Logs Managed on Paper",
      description: "Gate registries are unreadable, impossible to audit, and leave community security compromised and slow.",
    },
    {
      icon: <EyeOff className="h-4.5 w-4.5" />,
      title: "No Visibility Across Multiple Buildings",
      description: "Property and estate managers struggle to monitor staff logs, complaints, and billing status across different blocks.",
    },
    {
      icon: <AlertTriangle className="h-4.5 w-4.5" />,
      title: "Residents Frustrated by Slow Response",
      description: "A complete lack of real-time transparency leaves residents in the dark about resolution timelines and status updates.",
    },
  ];

  return (
    <section id="challenges" className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Title & Subtitle (Sticky on Desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-24 self-start">
            <Badge variant="outline" className="w-fit rounded-full px-3 py-1 border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-950/40">
              The Challenges
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl leading-tight">
              Building Operations Shouldn't Be Chaos
            </h2>
            <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
              Most societies still rely on WhatsApp groups, spreadsheets, phone calls, and paper logs to manage daily operations.
            </p>
          </div>

          {/* Right Column: Pain Point Cards Stack */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {painPoints.map((point) => (
              <PainCard
                key={point.title}
                icon={point.icon}
                title={point.title}
                description={point.description}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
