"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  Wrench,
  CreditCard,
  Building,
  TrendingUp,
  Clock,
  ArrowUpRight,
  TrendingDown,
  UserCheck,
  Building2,
  ListTodo,
  Users,
} from "lucide-react";

export function AnalyticsSection() {
  return (
    <section id="analytics" className="py-16 md:py-24 -100 bg-zinc-50/30 dark:bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Headers */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4 rounded-full px-3 py-1-200 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-950">
            Real-Time Reporting
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Operational Insights That Improve Community Management
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Track complaints, monitor payments, analyze maintenance performance, and gain visibility across every building and resident operation.
          </p>
        </div>

        {/* Bento Grid Layout (12 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Complaint Resolution Analytics (lg:col-span-7) */}
          <Card className="lg:col-span-7 -200/80 bg-white dark:bg-zinc-950/30 flex flex-col justify-between p-1.5">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Complaint Resolution Analytics</CardTitle>
                <Badge variant="secondary" className="text-[8px] bg-zinc-100 dark:bg-zinc-900">SLA Tracked</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4 flex-1 flex flex-col justify-between">
              {/* KPIs */}
              <div className="grid grid-cols-3 gap-2 py-1 -100">
                <div>
                  <span className="text-[8.5px] text-zinc-400 font-semibold block">AVG RESOLUTION TIME</span>
                  <div className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50 mt-0.5 flex items-baseline gap-1">
                    <span>1.8 hrs</span>
                    <span className="text-[8px] text-emerald-500 font-normal">(-54%)</span>
                  </div>
                </div>
                <div>
                  <span className="text-[8.5px] text-zinc-400 font-semibold block">RESOLUTION RATE</span>
                  <div className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50 mt-0.5">
                    95.8%
                  </div>
                </div>
                <div>
                  <span className="text-[8.5px] text-zinc-400 font-semibold block">ACTIVE QUEUE</span>
                  <div className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50 mt-0.5">
                    8 open
                  </div>
                </div>
              </div>

              {/* Categorization & Visual Breakdown */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">Incident Share by Category</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[9px] text-zinc-500 mb-0.5">
                      <span>Plumbing & Leaks (34 resolved)</span>
                      <span className="font-semibold">42%</span>
                    </div>
                    <Progress value={42} className="h-1 bg-zinc-100 dark:bg-zinc-900 rounded-full" />
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] text-zinc-500 mb-0.5">
                      <span>Electrical & Elevators (22 resolved)</span>
                      <span className="font-semibold">28%</span>
                    </div>
                    <Progress value={28} className="h-1 bg-zinc-100 dark:bg-zinc-900 rounded-full" />
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] text-zinc-500 mb-0.5">
                      <span>HVAC & Security (14 resolved)</span>
                      <span className="font-semibold">18%</span>
                    </div>
                    <Progress value={18} className="h-1 bg-zinc-100 dark:bg-zinc-900 rounded-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Financial Overview (lg:col-span-5) */}
          <Card className="lg:col-span-5 -200/80 bg-white dark:bg-zinc-950/30 flex flex-col justify-between p-1.5">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Financial Overview</CardTitle>
                <Badge variant="outline" className="text-[8px]-200 text-emerald-600">Accounting</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[8.5px] text-zinc-400 font-semibold block">MONTHLY COLLECTION RATE</span>
                <div className="text-lg font-extrabold text-emerald-650 dark:text-emerald-400 mt-0.5">
                  96.3% <span className="text-[10px] text-zinc-400 font-normal">($142,500 collected)</span>
                </div>
              </div>

              {/* Utility Tracking Ledger Mini Table */}
              <div className="space-y-1.5 pt-2">
                <h4 className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">Pending Dues & Utilities</h4>
                <div className="space-y-1 text-[9px]">
                  <div className="flex justify-between py-1 -50">
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">Unit 1402 • Water & Waste Dues</span>
                    <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-zinc-200">
                      <span>$45.00</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    </div>
                  </div>
                  <div className="flex justify-between py-1 -50">
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">Unit 811 • Parking Service Dues</span>
                    <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-zinc-200">
                      <span>$50.00</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    </div>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">Unit 305 • Generator Surcharge</span>
                    <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-zinc-200">
                      <span>$112.50</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Maintenance Performance (lg:col-span-4) */}
          <Card className="lg:col-span-4 -200/80 bg-white dark:bg-zinc-950/30 p-1.5">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Maintenance SLA</CardTitle>
                <Wrench className="h-3.5 w-3.5 text-zinc-400" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3.5">
              <div>
                <span className="text-[8.5px] text-zinc-400 font-semibold block">TECHNICIAN SLA COMPLIANCE</span>
                <div className="text-base font-extrabold text-zinc-900 dark:text-zinc-50 mt-0.5">94.2%</div>
              </div>
              
              {/* Dispatch ratings list */}
              <div className="space-y-2 text-[9px] pt-1">
                <h4 className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">Technician Dispatch List</h4>
                <div className="flex items-center justify-between text-zinc-650 dark:text-zinc-400">
                  <div className="flex flex-col">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">David K. (Plumbing)</span>
                    <span className="text-[7.5px] text-zinc-400">SLA: 98% • 12 resolved</span>
                  </div>
                  <Badge variant="outline" className="text-[7.5px] px-1 py-0-100 text-emerald-600 dark:text-emerald-400">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-zinc-650 dark:text-zinc-400">
                  <div className="flex flex-col">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">Marcus A. (Electrical)</span>
                    <span className="text-[7.5px] text-zinc-400">SLA: 91% • 16 resolved</span>
                  </div>
                  <Badge variant="outline" className="text-[7.5px] px-1 py-0-100 text-emerald-600 dark:text-emerald-400">Active</Badge>
                </div>
              </div>

              {/* Preventative Schedule preview */}
              <div className="pt-2.5 -100 flex items-center justify-between text-[9px] text-zinc-500">
                <span className="flex items-center gap-1 font-medium"><ListTodo className="h-3.5 w-3.5 text-zinc-400" /> Elevator safety inspection</span>
                <span className="text-[8px] text-amber-600 font-semibold bg-amber-50 px-1 py-0.2 rounded -100 dark:bg-amber-950/20">2 days left</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Building Occupancy Metrics (lg:col-span-4) */}
          <Card className="lg:col-span-4 -200/80 bg-white dark:bg-zinc-950/30 p-1.5">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Occupancy Metrics</CardTitle>
                <Users className="h-3.5 w-3.5 text-zinc-400" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[8px] text-zinc-400 font-semibold block uppercase">Occupied Units</span>
                  <span className="text-sm font-extrabold text-zinc-855 dark:text-zinc-100">342 <span className="text-[9px] font-normal text-zinc-400">(98.4%)</span></span>
                </div>
                <div>
                  <span className="text-[8px] text-zinc-400 font-semibold block uppercase">Vacant Units</span>
                  <span className="text-sm font-extrabold text-zinc-855 dark:text-zinc-100">6 <span className="text-[9px] font-normal text-zinc-400">(1.6%)</span></span>
                </div>
              </div>

              {/* Graphic mini line chart: Tenant Movement Trends */}
              <div className="pt-2 space-y-1.5">
                <span className="text-[9px] font-bold text-zinc-800 dark:text-zinc-200 block">Resident Occupancy Trend</span>
                <div className="w-full h-18 flex items-end">
                    <svg className="w-full h-full text-zinc-100 dark:text-zinc-900" viewBox="0 0 200 60" preserveAspectRatio="none">
                      {/* Curve representing steady occupancy growth */}
                      <path
                        d="M 0,55 Q 30,50 60,42 T 120,28 T 180,24 T 200,20"
                        fill="none"
                        stroke="rgb(79, 70, 229)"
                        strokeWidth="1.5"
                      />
                      <circle cx="200" cy="20" r="2.5" fill="rgb(79, 70, 229)" stroke="white" strokeWidth="0.5" className="dark:stroke-zinc-950" />
                    </svg>
                </div>
                <div className="flex justify-between text-[7px] text-zinc-400">
                  <span>Q1</span>
                  <span>Q2</span>
                  <span>Q3</span>
                  <span>Q4 (Peak)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 5: Multi-Building Insights (lg:col-span-4) */}
          <Card className="lg:col-span-4 -200/80 bg-white dark:bg-zinc-950/30 p-1.5">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Multi-Building Hub</CardTitle>
                <Building2 className="h-3.5 w-3.5 text-zinc-400" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3.5">
              <span className="text-[8.5px] text-zinc-400 font-semibold block uppercase">Comparative Portfolio Metrics</span>
              
              {/* Comparative table */}
              <div className="space-y-1.5 text-[9px]">
                <div className="flex items-center justify-between py-1 -50 font-semibold text-zinc-400 text-[8px] uppercase">
                  <span>Building</span>
                  <span>Collection</span>
                  <span>Active SLA</span>
                </div>
                <div className="flex items-center justify-between py-1 -50">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">Apex Towers</span>
                  <span className="font-semibold text-emerald-600">98.2%</span>
                  <span className="text-zinc-500">1.4 hrs</span>
                </div>
                <div className="flex items-center justify-between py-1 -50">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">Belvedere Estate</span>
                  <span className="font-semibold text-emerald-600">95.4%</span>
                  <span className="text-zinc-500">2.1 hrs</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">Pacific Plaza</span>
                  <span className="font-semibold text-emerald-600">94.8%</span>
                  <span className="text-zinc-500">1.9 hrs</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </section>
  );
}
