"use client";

import * as React from "react";
import { BarChart3, TrendingUp, DollarSign, Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnalyticsWidgetsProps {
  currentOrg: string;
}

export function AnalyticsWidgets({ currentOrg }: AnalyticsWidgetsProps) {
  const isGrandview = currentOrg === "Grandview Towers";

  // Data for custom charts
  const monthlyCollectionsData = isGrandview
    ? [
        { month: "Jan", collected: 135000, pending: 13000 },
        { month: "Feb", collected: 138000, pending: 10000 },
        { month: "Mar", collected: 140000, pending: 8000 },
        { month: "Apr", collected: 142000, pending: 6000 },
        { month: "May", collected: 145000, pending: 3000 },
        { month: "Jun", collected: 142500, pending: 5500 },
      ]
    : [
        { month: "Jan", collected: 88000, pending: 10000 },
        { month: "Feb", collected: 90000, pending: 8000 },
        { month: "Mar", collected: 91000, pending: 7000 },
        { month: "Apr", collected: 93000, pending: 5000 },
        { month: "May", collected: 95000, pending: 3000 },
        { month: "Jun", collected: 94200, pending: 3800 },
      ];

  const complaintTrendData = isGrandview
    ? [24, 28, 19, 15, 12, 8] // open complaints over 6 months
    : [12, 14, 10, 8, 5, 3];

  const buildingOccupancy = isGrandview
    ? [
        { tower: "Tower Alpha", rate: 94.5, units: "118 / 125" },
        { tower: "Tower Beta", rate: 89.6, units: "112 / 125" },
        { tower: "Tower Gamma", rate: 88.2, units: "82 / 93" },
      ]
    : [
        { tower: "Block East", rate: 92.0, units: "92 / 100" },
        { tower: "Block West", rate: 90.0, units: "90 / 100" },
      ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* 1. COMPLAINT RESOLUTION TREND */}
      <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
        <CardHeader className="p-4 -100">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4 text-indigo-650" /> SLA ticket trend
              </CardTitle>
              <CardDescription className="text-[10px] text-zinc-550">Open active complaints count (6 month trend)</CardDescription>
            </div>
            <Badge variant="outline" className="text-[8.5px] px-1.5 py-0.5-200/60 font-semibold text-zinc-500">
              Avg: 14 Hrs SLA
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="w-full h-32 flex items-end">
            <svg className="w-full h-full text-zinc-100 dark:text-zinc-900" viewBox="0 0 300 100" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="300" y2="25" stroke="currentColor" strokeDasharray="3,3" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="300" y2="50" stroke="currentColor" strokeDasharray="3,3" strokeWidth="0.5" />
              <line x1="0" y1="75" x2="300" y2="75" stroke="currentColor" strokeDasharray="3,3" strokeWidth="0.5" />

              {/* Area fill under curve */}
              <path
                d={`M 0,${100 - (complaintTrendData[0] / 30) * 80} 
                    Q 60,${100 - (complaintTrendData[1] / 30) * 80} 120,${100 - (complaintTrendData[2] / 30) * 80} 
                    T 180,${100 - (complaintTrendData[3] / 30) * 80} 
                    T 240,${100 - (complaintTrendData[4] / 30) * 80} 
                    T 300,${100 - (complaintTrendData[5] / 30) * 80} L 300,100 L 0,100 Z`}
                fill="rgb(79, 70, 229)"
                fillOpacity="0.04"
              />

              {/* Trend Line */}
              <path
                d={`M 0,${100 - (complaintTrendData[0] / 30) * 80} 
                    Q 60,${100 - (complaintTrendData[1] / 30) * 80} 120,${100 - (complaintTrendData[2] / 30) * 80} 
                    T 180,${100 - (complaintTrendData[3] / 30) * 80} 
                    T 240,${100 - (complaintTrendData[4] / 30) * 80} 
                    T 300,${100 - (complaintTrendData[5] / 30) * 80}`}
                fill="none"
                stroke="rgb(79, 70, 229)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dots */}
              {complaintTrendData.map((val, idx) => (
                <circle
                  key={idx}
                  cx={idx * 60}
                  cy={100 - (val / 30) * 80}
                  r="3.5"
                  fill="rgb(79, 70, 229)"
                  stroke="white"
                  strokeWidth="1.5"
                  className="dark:stroke-zinc-950"
                />
              ))}
            </svg>
          </div>
          <div className="w-full flex justify-between mt-2.5 text-[9px] font-semibold text-zinc-400 dark:text-zinc-550 -100 pt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </CardContent>
      </Card>

      {/* 2. MONTHLY COLLECTION OVERVIEW */}
      <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
        <CardHeader className="p-4 -100">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-indigo-650" /> Collection overview
              </CardTitle>
              <CardDescription className="text-[10px] text-zinc-550">Comparing collected (indigo) vs pending (slate)</CardDescription>
            </div>
            <Badge variant="outline" className="text-[8.5px] px-1.5 py-0.5-200/60 font-semibold text-zinc-500">
              Auto-Invoiced
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="w-full h-32 flex items-end justify-between px-2 gap-3.5">
            {monthlyCollectionsData.map((data, idx) => {
              const total = data.collected + data.pending;
              const colHeight = (data.collected / 160000) * 90;
              const penHeight = (data.pending / 160000) * 90;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center group relative cursor-help">
                  <div className="w-full flex flex-col items-center">
                    {/* Pending stack */}
                    <div
                      className="w-4 bg-zinc-300 dark:bg-zinc-800 rounded-t-sm"
                      style={{ height: `${penHeight}px` }}
                    />
                    {/* Collected stack */}
                    <div
                      className="w-4 bg-indigo-600 dark:bg-indigo-500"
                      style={{ height: `${colHeight}px` }}
                    />
                  </div>
                  <span className="text-[9px] font-semibold text-zinc-400 dark:text-zinc-550 mt-2">{data.month}</span>
                  
                  {/* Custom Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-zinc-900 text-white rounded p-1.5 text-[9px] w-28 text-center pointer-events-none shadow-md z-15 -850">
                    <div className="font-bold -800 pb-0.5 mb-0.5">{data.month} Breakdown</div>
                    <div>Paid: ${(data.collected/1000).toFixed(1)}k</div>
                    <div className="text-zinc-400">Due: ${(data.pending/1000).toFixed(1)}k</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 3. BUILDING OCCUPANCY METRICS */}
      <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
        <CardHeader className="p-4 -100">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-indigo-650" /> Portfolio occupancy
              </CardTitle>
              <CardDescription className="text-[10px] text-zinc-550">Occupancy & unit tracking per tower block</CardDescription>
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-400 cursor-pointer" />
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3.5">
          {buildingOccupancy.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[10.5px] text-zinc-650 dark:text-zinc-400">
                <span className="font-semibold">{item.tower}</span>
                <span className="font-bold text-zinc-850 dark:text-zinc-300">
                  {item.rate}% <span className="text-[9.5px] font-normal text-zinc-450 dark:text-zinc-500">({item.units})</span>
                </span>
              </div>
              <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${item.rate}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
