"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { StatsRow } from "@/components/dashboard/stats-row";
import { OperationalWidgets } from "@/components/dashboard/operational-widgets";
import { AnalyticsWidgets } from "@/components/dashboard/analytics-widgets";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { UserPlus, Wrench, CreditCard, ShieldCheck, RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const activityFeed = [
    {
      id: 1,
      type: "resident",
      text: "Unit 803 registered a new vehicle (White Audi A4)",
      time: "10m ago",
      icon: UserPlus,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20",
    },
    {
      id: 2,
      type: "maintenance",
      text: "Elevator B safety brake testing completed & certified",
      time: "1h ago",
      icon: Wrench,
      color: "text-zinc-650 bg-zinc-100 dark:bg-zinc-900",
    },
    {
      id: 3,
      type: "payment",
      text: "Unit 1402 completed June Maintenance fee transaction",
      time: "2h ago",
      icon: CreditCard,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      id: 4,
      type: "visitor",
      text: "Gate #1 auto-approved access for Amazon delivery crew",
      time: "3h ago",
      icon: ShieldCheck,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20",
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans selection:bg-zinc-200">
      <Toaster position="top-right" />

      {/* Sidebar Mockup */}
      <DashboardSidebar
        currentOrg={currentOrg}
        orgs={orgs}
        onOrgChange={(org) => setCurrentOrg(org)}
      />

      {/* Main Workspace Pane */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <DashboardNavbar currentOrg={currentOrg} />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Operational Overview
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Monitor complaints, maintenance, residents, and financial operations across your communities.
              </p>
            </div>
            
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 self-start sm:self-auto rounded border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 cursor-pointer shadow-sm outline-none transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-indigo-600" : "text-zinc-400"}`} />
              <span>{isRefreshing ? "Syncing..." : "Sync Ledger"}</span>
            </button>
          </div>

          {/* Stats Cards Row */}
          <StatsRow currentOrg={currentOrg} />

          {/* Operational Area (Feed & Task Board) */}
          <OperationalWidgets currentOrg={currentOrg} />

          {/* Bottom Grid: Analytics & Actions Feed */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Analytics Dashboard (Spans 2 columns on large screens) */}
            <div className="lg:col-span-2">
              <AnalyticsWidgets currentOrg={currentOrg} />
            </div>

            {/* Quick Actions & Live Activity (Takes 1 column) */}
            <div className="space-y-6">
              
              {/* Quick Actions Card */}
              <QuickActions />

              {/* Recent Activity Timeline Feed */}
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900">
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Recent Activity Audit
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flow-root">
                    <ul role="list" className="-mb-8">
                      {activityFeed.map((event, eventIdx) => {
                        const Icon = event.icon;
                        return (
                          <li key={event.id}>
                            <div className="relative pb-6.5">
                              {eventIdx !== activityFeed.length - 1 ? (
                                <span className="absolute left-3 top-3 -ml-px h-full w-0.5 bg-zinc-100 dark:bg-zinc-900" aria-hidden="true" />
                              ) : null}
                              <div className="relative flex items-start space-x-3">
                                <div className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${event.color} border border-transparent`}>
                                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                </div>
                                <div className="min-w-0 flex-1 py-0.5">
                                  <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-normal">
                                    {event.text}
                                  </p>
                                  <span className="text-[9.5px] text-zinc-400 mt-1 block">
                                    {event.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
