"use client";

import * as React from "react";
import { AlertCircle, Wrench, CreditCard, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    ? { amount: "৳142,500", target: "৳148,000", percent: 96.3, trend: "96.3% collected" }
    : { amount: "৳94,200", target: "৳98,000", percent: 96.1, trend: "96.1% collected" };

  const occupiedFlats = isGrandview
    ? { occupied: 312, total: 342, percent: 91.2, trend: "+1.2% this month" }
    : { occupied: 182, total: 200, percent: 91.0, trend: "+0.8% this month" };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Active Complaints */}
      <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
        <CardContent className="p-2.5">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Active Complaints</span>
            <AlertCircle className="h-4 w-4 text-zinc-400 shrink-0" />
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {activeComplaints.total}
            </span>
            <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 uppercase">
              {activeComplaints.high} Urgent
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 2. Pending Maintenance */}
      <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
        <CardContent className="p-2.5">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Pending Maintenance</span>
            <Wrench className="h-4 w-4 text-zinc-400 shrink-0" />
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {pendingMaintenance.total}
            </span>
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 uppercase">
              {pendingMaintenance.overdue} Overdue
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 3. Monthly Collections */}
      <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
        <CardContent className="p-2.5">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Monthly Collections</span>
            <CreditCard className="h-4 w-4 text-zinc-400 shrink-0" />
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {monthlyCollections.amount}
            </span>
            <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
              of {monthlyCollections.target}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 4. Occupied Flats */}
      <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
        <CardContent className="p-2.5">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Occupied Flats</span>
            <Home className="h-4 w-4 text-zinc-400 shrink-0" />
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {occupiedFlats.occupied} <span className="text-xs font-normal text-zinc-400">/ {occupiedFlats.total}</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-450">
              {occupiedFlats.percent}%
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
