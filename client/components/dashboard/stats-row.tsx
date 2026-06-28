"use client";

import * as React from "react";
import { AlertCircle, Wrench, CreditCard, Home, TrendingUp, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface StatsRowProps {
  currentOrg: string;
}

export function StatsRow({ currentOrg }: StatsRowProps) {
  // Mock data varying slightly by organization for operational realism
  const isGrandview = currentOrg === "Grandview Towers";

  const activeComplaints = isGrandview
    ? { total: 12, high: 8, medium: 4, trend: "+3 this week" }
    : { total: 5, high: 2, medium: 3, trend: "-2 this week" };

  const pendingMaintenance = isGrandview
    ? { total: 18, overdue: 4, scheduled: 14, trend: "4 tasks urgent" }
    : { total: 9, overdue: 1, scheduled: 8, trend: "1 task urgent" };

  const monthlyCollections = isGrandview
    ? { amount: "$142,500", target: "$148,000", percent: 96.3, trend: "96.3% collected" }
    : { amount: "$94,200", target: "$98,000", percent: 96.1, trend: "96.1% collected" };

  const occupiedFlats = isGrandview
    ? { occupied: 312, total: 342, percent: 91.2, trend: "+1.2% this month" }
    : { occupied: 182, total: 200, percent: 91.0, trend: "+0.8% this month" };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Active Complaints */}
      <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
        <CardContent className="p-3">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Active Complaints</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-zinc-400 hover:text-zinc-650 outline-none">
                    <HelpCircle className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-900 text-white-800 rounded px-2 py-1 text-[10px]">
                  Unresolved resident service tickets.
                </TooltipContent>
              </Tooltip>
            </div>
            <AlertCircle className="h-4 w-4 text-zinc-400 shrink-0" />
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {activeComplaints.total}
            </span>
            <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 uppercase">
              {activeComplaints.high} Urgent
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between -100 pt-2 text-[10px] text-zinc-500 dark:text-zinc-455">
            <span>{activeComplaints.medium} normal priority</span>
            <span className="font-medium text-rose-600 dark:text-rose-400">{activeComplaints.trend}</span>
          </div>
        </CardContent>
      </Card>

      {/* 2. Pending Maintenance */}
      <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
        <CardContent className="p-3">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Pending Maintenance</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-zinc-400 hover:text-zinc-650 outline-none">
                    <HelpCircle className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-900 text-white-800 rounded px-2 py-1 text-[10px]">
                  Scheduled assets & equipment tasks.
                </TooltipContent>
              </Tooltip>
            </div>
            <Wrench className="h-4 w-4 text-zinc-400 shrink-0" />
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {pendingMaintenance.total}
            </span>
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 uppercase">
              {pendingMaintenance.overdue} Overdue
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between -100 pt-2 text-[10px] text-zinc-500 dark:text-zinc-455">
            <span>{pendingMaintenance.scheduled} dispatch jobs</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">{pendingMaintenance.trend}</span>
          </div>
        </CardContent>
      </Card>

      {/* 3. Monthly Collections */}
      <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
        <CardContent className="p-3">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Monthly Collections</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-zinc-400 hover:text-zinc-650 outline-none">
                    <HelpCircle className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-900 text-white-800 rounded px-2 py-1 text-[10px]">
                  Maintenance & invoice collection progress.
                </TooltipContent>
              </Tooltip>
            </div>
            <CreditCard className="h-4 w-4 text-zinc-400 shrink-0" />
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {monthlyCollections.amount}
            </span>
            <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
              of {monthlyCollections.target}
            </span>
          </div>
          <div className="mt-3 space-y-1.5 -100 pt-2">
            <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-455">
              <span>Collection rate</span>
              <span className="font-bold text-zinc-850 dark:text-zinc-300">{monthlyCollections.percent}%</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${monthlyCollections.percent}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Occupied Flats */}
      <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
        <CardContent className="p-3">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Occupied Flats</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-zinc-400 hover:text-zinc-650 outline-none">
                    <HelpCircle className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-900 text-white-800 rounded px-2 py-1 text-[10px]">
                  Flats occupied by active residents.
                </TooltipContent>
              </Tooltip>
            </div>
            <Home className="h-4 w-4 text-zinc-400 shrink-0" />
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {occupiedFlats.occupied} <span className="text-xs font-normal text-zinc-400">/ {occupiedFlats.total}</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-450">
              {occupiedFlats.percent}% Occupied
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between -100 pt-2 text-[10px] text-zinc-500 dark:text-zinc-455">
            <span>{occupiedFlats.total - occupiedFlats.occupied} vacant units</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-450 flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" />
              {occupiedFlats.trend}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
