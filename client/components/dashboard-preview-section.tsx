"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  Wrench,
  CreditCard,
  Users,
  Building,
  Activity,
  CheckCircle2,
  Clock,
  Car,
  Bell,
  Eye,
} from "lucide-react";

export function DashboardPreviewSection() {
  return (
    <section id="dashboard-preview" className="py-20 md:py-28 border-t border-zinc-100/80 dark:border-zinc-900/80 bg-gradient-to-b from-zinc-50/50 to-white dark:from-black/60 dark:to-zinc-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Headers */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24 xoss-fade-in">
          <Badge variant="outline" className="mb-4 rounded-full px-4 py-1.5 border-zinc-200/60 text-zinc-700 dark:border-zinc-800/60 dark:text-zinc-300 bg-white/80 dark:bg-zinc-950/60 shadow-sm backdrop-blur-sm">
            Unified Management Console
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            Centralized Visibility Across Every Building
          </h2>
          <p className="mt-5 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Monitor complaints, maintenance operations, payments, parking, and resident activity from one unified dashboard.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Main Dashboard Card (8 Columns) */}
          <div className="lg:col-span-8 w-full border border-zinc-200/60 bg-white dark:border-zinc-800/60 dark:bg-zinc-950/60 overflow-hidden">
            {/* Console topbar */}
            <div className="flex h-14 items-center justify-between border-b border-zinc-200/60 bg-zinc-50/80 backdrop-blur-sm px-5 dark:border-zinc-800/60 dark:bg-zinc-950/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-850 dark:text-zinc-250">
                <Building className="h-4 w-4 text-zinc-500" />
                <span>Central Operations Console</span>
                <span className="text-zinc-300 dark:text-zinc-800">|</span>
                <span className="text-[10px] text-zinc-450 font-normal">Real-time Analytics Feed</span>
              </div>
              <Badge variant="outline" className="text-[9px] px-2 py-0.5 border-emerald-200/60 text-emerald-700 bg-emerald-50/80 dark:border-emerald-900/60 dark:text-emerald-400 dark:bg-emerald-950/30 shadow-sm">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block xoss-pulse-soft" />
                Live Feed
              </Badge>
            </div>

            {/* Core Summary Metrics */}
            <div className="p-5 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
              <div className="space-y-2 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 p-3 transition-all">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Complaints Stat</span>
                <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-baseline gap-2">
                  <span>4 Open</span>
                  <span className="text-[11px] text-zinc-400 font-normal">/ 12 solved</span>
                </div>
                <div className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500 inline-block" />
                  <span>2 high priority</span>
                </div>
              </div>

              <div className="space-y-2 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 p-3 transition-all">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Maintenance Progress</span>
                <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">88.5%</div>
                <div className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                  <span>18 resolved weekly</span>
                </div>
              </div>

              <div className="space-y-2 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 p-3 transition-all">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Collection Dues</span>
                <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">96.4%</div>
                <div className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                  <span className="font-semibold text-emerald-600">+$142.5k</span>
                  <span>collected</span>
                </div>
              </div>

              <div className="space-y-2 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 p-3 transition-all">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Active Residents</span>
                <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">1,248</div>
                <div className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                  <span>342 units occupied</span>
                </div>
              </div>
            </div>

            {/* Occupancy and Utility Analytics Section */}
            <div className="p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Portfolio Building Occupancy & SLA Trends</h4>
                  <p className="text-[10px] text-zinc-500 mt-1">Comparing Grandview Tower A occupancy rates to average ticket resolution speed.</p>
                </div>
                <div className="flex gap-4 text-[10px] text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 inline-block" />
                    <span>Occupancy Rate</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 inline-block" />
                    <span>Resolution Speed (hrs)</span>
                  </div>
                </div>
              </div>

              {/* Graphic Chart (SVG) */}
              <div className="w-full h-48 flex items-end">
                <svg className="w-full h-full text-zinc-100 dark:text-zinc-900" viewBox="0 0 500 150" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="currentColor" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="currentColor" strokeDasharray="3,3" strokeWidth="0.5" />

                  {/* Area fill */}
                  <path
                    d="M 0,110 Q 50,90 100,85 T 200,60 T 300,55 T 400,42 T 500,35 L 500,150 L 0,150 Z"
                    fill="rgb(99, 102, 241)"
                    fillOpacity="0.06"
                  />

                  {/* Graph line 1: Occupancy Rate (Sleek curve) */}
                  <path
                    d="M 0,110 Q 50,90 100,85 T 200,60 T 300,55 T 400,42 T 500,35"
                    fill="none"
                    stroke="rgb(99, 102, 241)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Graph line 2: Resolution time (Muted line) */}
                  <path
                    d="M 0,50 Q 50,75 100,90 T 200,105 T 300,95 T 400,115 T 500,125"
                    fill="none"
                    stroke="rgb(161, 161, 170)"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                  />

                  {/* Highlights Dots */}
                  <circle cx="400" cy="42" r="4" fill="rgb(99, 102, 241)" stroke="white" strokeWidth="2" className="xoss-pulse-soft" />
                  <circle cx="400" cy="115" r="3" fill="gray" stroke="white" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex justify-between border-t border-zinc-200/60 pt-3 text-[10px] text-zinc-500 dark:border-zinc-800/60">
                <span>Nov 2025</span>
                <span>Dec 2025</span>
                <span>Jan 2026</span>
                <span>Feb 2026</span>
                <span>Mar 2026</span>
                <span>Apr 2026</span>
                <span>May 2026 (Recent)</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Side Widgets Stack (4 Columns) */}
          <div className="lg:col-span-4 w-full flex flex-col gap-4">
            
            {/* Widget 1: Pending Complaints */}
            <Card className="border border-zinc-200/60 bg-white dark:border-zinc-800/60 dark:bg-zinc-950/60 p-4 space-y-3 hover:shadow-md transition-all duration-200" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><AlertCircle className="h-4 w-4 text-zinc-500" /> Pending Complaints</span>
                <span className="text-[9px] font-medium text-rose-600">2 Critical</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-900 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 px-2 transition-all cursor-pointer">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">Elevator B Brake malfunction</span>
                  <Badge variant="outline" className="text-[8px] px-1.5 py-0.5 border-rose-200/60 text-rose-700 bg-rose-50/80 dark:border-rose-900/60 dark:text-rose-400 dark:bg-rose-950/30 shadow-sm">High</Badge>
                </div>
                <div className="flex items-center justify-between py-2 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 px-2 rounded-lg transition-all cursor-pointer">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">Corridor Lobby leaking water</span>
                  <Badge variant="outline" className="text-[8px] px-1.5 py-0.5 border-rose-200/60 text-rose-700 bg-rose-50/80 dark:border-rose-900/60 dark:text-rose-400 dark:bg-rose-950/30 shadow-sm">Critical</Badge>
                </div>
              </div>
            </Card>

            {/* Widget 2: Today's Maintenance Tasks */}
            <Card className="border border-zinc-200/60 bg-white dark:border-zinc-800/60 dark:bg-zinc-950/60 p-4 space-y-3 hover:shadow-md transition-all duration-200" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Wrench className="h-4 w-4 text-zinc-500" /> Dispatch Tasks</span>
                <span className="text-[9px] font-medium text-zinc-500">4 Remaining</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-900 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 px-2 transition-all cursor-pointer">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">Fire safety inspection - T2</span>
                  <span className="text-[9px] text-amber-600 font-medium">In Progress</span>
                </div>
                <div className="flex items-center justify-between py-2 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 px-2 rounded-lg transition-all cursor-pointer">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">Solar grid utility clean-up</span>
                  <span className="text-[9px] text-zinc-500">Scheduled 15:00</span>
                </div>
              </div>
            </Card>

            {/* Widget 3: Parking Occupancy */}
            <Card className="border border-zinc-200/60 bg-white dark:border-zinc-800/60 dark:bg-zinc-950/60 p-4 space-y-3 hover:shadow-md transition-all duration-200" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Car className="h-4 w-4 text-zinc-500" /> Parking Occupancy</span>
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">82.3% Filled</span>
              </div>
              <div className="space-y-3 text-[11px]">
                <div>
                  <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                    <span>Resident Lots (124/150)</span>
                    <span className="font-semibold">82%</span>
                  </div>
                  <Progress value={82} className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                    <span>Visitor Lots (14/30)</span>
                    <span className="font-semibold">46%</span>
                  </div>
                  <Progress value={46} className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                </div>
              </div>
            </Card>

            {/* Widget 4: Pending Utility Payments */}
            <Card className="border border-zinc-200/60 bg-white dark:border-zinc-800/60 dark:bg-zinc-950/60 p-4 space-y-3 hover:shadow-md transition-all duration-200" style={{ animationDelay: '0.25s' }}>
              <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><CreditCard className="h-4 w-4 text-zinc-500" /> Pending Utilities</span>
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">5 Accounts</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-900 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 px-2 transition-all cursor-pointer">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">Unit 803 • Water & Waste Dues</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">$45.00</span>
                </div>
                <div className="flex items-center justify-between py-2 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 px-2 rounded-lg transition-all cursor-pointer">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">Unit 1104 • Grid Electricity</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">$112.50</span>
                </div>
              </div>
            </Card>

            {/* Widget 5: Recent Visitor Entries */}
            <Card className="border border-zinc-200/60 bg-white dark:border-zinc-800/60 dark:bg-zinc-950/60 p-4 space-y-3 hover:shadow-md transition-all duration-200" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-zinc-500" /> Live Gate Passes</span>
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">Gate #2</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-900 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 px-2 transition-all cursor-pointer">
                  <div>
                    <div className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">Sarah Connor</div>
                    <div className="text-[9px] text-zinc-500 mt-0.5">Visitor • Guest Check-Out</div>
                  </div>
                  <span className="text-[9px] text-zinc-500 font-medium">11:32 AM</span>
                </div>
                <div className="flex items-center justify-between py-2 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 px-2 rounded-lg transition-all cursor-pointer">
                  <div>
                    <div className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">FedEx Cargo Delivery</div>
                    <div className="text-[9px] text-zinc-500 mt-0.5">Logistics • Ingress Gate</div>
                  </div>
                  <span className="text-[9px] text-zinc-500 font-medium">11:45 AM</span>
                </div>
              </div>
            </Card>

          </div>

        </div>

      </div>
    </section>
  );
}
