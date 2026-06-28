"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Wrench,
  CreditCard,
  ShieldAlert,
  Car,
  Building2,
  CheckCircle2,
  Clock,
  UserCheck,
  ChevronDown,
  Building,
} from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 -100 bg-zinc-50/30 dark:bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Headers */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4 rounded-full px-3 py-1-200 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-950">
            Platform Capabilities
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Everything Needed to Run Modern Communities
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Manage residents, buildings, maintenance operations, billing, security, and communication from one centralized platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Complaint Tracking */}
          <div className="group flex flex-col justify-between -200/80 bg-white p-5 hover:zinc-300 dark:bg-zinc-950/30 dark:hover:zinc-700">
            {/* Micro Dashboard Mockup */}
            <div className="w-full h-32 -100 bg-zinc-50/50 p-3 mb-5 overflow-hidden dark:bg-zinc-900/10 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[9px] text-zinc-400 font-semibold -150 pb-1.5">
                <span>RECENT COMPLAINTS</span>
                <span className="text-zinc-500">4 Active</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between bg-white px-2 py-1.5 rounded -100 text-[10px] dark:bg-zinc-900/60">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Elevator A Shaking</span>
                  </div>
                  <span className="text-[8px] px-1 py-0.2 rounded bg-amber-50 text-amber-600 -100 dark:bg-amber-950/20 dark:text-amber-400">In Progress</span>
                </div>
                <div className="flex items-center justify-between bg-white px-2 py-1.5 rounded -100 text-[10px] dark:bg-zinc-900/60">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Water Leak Block C</span>
                  </div>
                  <span className="text-[8px] px-1 py-0.2 rounded bg-rose-50 text-rose-600 -100 dark:bg-rose-950/20 dark:text-rose-400">Assigned</span>
                </div>
              </div>
            </div>
            
            {/* Meta details */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/30 dark:group-hover:text-indigo-400 transition-colors">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Complaint Tracking</h3>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Track resident complaints with real-time status updates, technician assignment, and escalation workflows.
              </p>
            </div>
          </div>

          {/* Card 2: Maintenance Operations */}
          <div className="group flex flex-col justify-between -200/80 bg-white p-5 hover:zinc-300 dark:bg-zinc-950/30 dark:hover:zinc-700">
            {/* Micro Dashboard Mockup */}
            <div className="w-full h-32 -100 bg-zinc-50/50 p-3 mb-5 overflow-hidden dark:bg-zinc-900/10 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[9px] text-zinc-400 font-semibold -150 pb-1.5">
                <span>STAFF DISPATCH</span>
                <span className="text-emerald-500 font-medium">92% Resolved</span>
              </div>
              <div className="space-y-2 pt-0.5">
                <div>
                  <div className="flex justify-between text-[9px] text-zinc-650 dark:text-zinc-450 mb-1">
                    <span>Electrician Team</span>
                    <span>3 / 4 busy</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 rounded-full dark:bg-zinc-900 overflow-hidden">
                    <div className="h-full bg-primary w-[75%] transition-all" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] text-zinc-650 dark:text-zinc-450 mb-1">
                    <span>Plumbing Team</span>
                    <span>1 / 3 busy</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 rounded-full dark:bg-zinc-900 overflow-hidden">
                    <div className="h-full bg-primary w-[33%] transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Meta details */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/30 dark:group-hover:text-indigo-400 transition-colors">
                  <Wrench className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Maintenance Operations</h3>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Assign maintenance staff, monitor ongoing work, and track repair history across buildings.
              </p>
            </div>
          </div>

          {/* Card 3: Billing & Service Charges */}
          <div className="group flex flex-col justify-between -200/80 bg-white p-5 hover:zinc-300 dark:bg-zinc-950/30 dark:hover:zinc-700">
            {/* Micro Dashboard Mockup */}
            <div className="w-full h-32 -100 bg-zinc-50/50 p-3 mb-5 overflow-hidden dark:bg-zinc-900/10 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[9px] text-zinc-400 font-semibold -150 pb-1.5">
                <span>INVOICES OVERVIEW</span>
                <span className="text-emerald-500 font-medium">96.3%</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[9px] bg-white p-1.5 rounded -100 dark:bg-zinc-900/60">
                  <span className="text-zinc-500 font-medium">Unit 402 Maintenance</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">$185.00</span>
                    <span className="text-[8px] text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded -100 dark:bg-emerald-950/20">Paid</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[9px] bg-white p-1.5 rounded -100 dark:bg-zinc-900/60">
                  <span className="text-zinc-500 font-medium">Unit 811 Parking Fee</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">$50.00</span>
                    <span className="text-[8px] text-amber-600 bg-amber-50 px-1 py-0.2 rounded -100 dark:bg-amber-950/20">Pending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Meta details */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/30 dark:group-hover:text-indigo-400 transition-colors">
                  <CreditCard className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Billing & Service Charges</h3>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Manage rent, service fees, utility charges, invoices, and payment tracking from one dashboard.
              </p>
            </div>
          </div>

          {/* Card 4: Visitor & Security Management */}
          <div className="group flex flex-col justify-between -200/80 bg-white p-5 hover:zinc-300 dark:bg-zinc-950/30 dark:hover:zinc-700">
            {/* Micro Dashboard Mockup */}
            <div className="w-full h-32 -100 bg-zinc-50/50 p-3 mb-5 overflow-hidden dark:bg-zinc-900/10 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[9px] text-zinc-400 font-semibold -150 pb-1.5">
                <span>GATE ACTIVITY</span>
                <span className="text-zinc-500">Live</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between bg-white p-1.5 rounded -100 text-[9px] dark:bg-zinc-900/60">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="h-3 w-3 text-zinc-400" />
                    <div>
                      <div className="font-semibold text-zinc-700 dark:text-zinc-300">Johnathan Doe</div>
                      <div className="text-[7px] text-zinc-400">Visitor • Gate #1</div>
                    </div>
                  </div>
                  <span className="text-[7.5px] px-1 py-0.2 rounded bg-emerald-50 text-emerald-600 -100 dark:bg-emerald-950/20 dark:text-emerald-400">Approved</span>
                </div>
                <div className="flex items-center justify-between bg-white p-1.5 rounded -100 text-[9px] dark:bg-zinc-900/60">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-zinc-400" />
                    <div>
                      <div className="font-semibold text-zinc-700 dark:text-zinc-300">UPS Courier</div>
                      <div className="text-[7px] text-zinc-400">Delivery • Gate #2</div>
                    </div>
                  </div>
                  <span className="text-[7.5px] px-1 py-0.2 rounded bg-zinc-100 text-zinc-500 -200 dark:bg-zinc-800 dark:text-zinc-400">Checked In</span>
                </div>
              </div>
            </div>

            {/* Meta details */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/30 dark:group-hover:text-indigo-400 transition-colors">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Visitor & Security</h3>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Digitize visitor approvals, gate entries, delivery tracking, and security operations.
              </p>
            </div>
          </div>

          {/* Card 5: Parking Management */}
          <div className="group flex flex-col justify-between -200/80 bg-white p-5 hover:zinc-300 dark:bg-zinc-950/30 dark:hover:zinc-700">
            {/* Micro Dashboard Mockup */}
            <div className="w-full h-32 -100 bg-zinc-50/50 p-3 mb-5 overflow-hidden dark:bg-zinc-900/10 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[9px] text-zinc-400 font-semibold -150 pb-1.5">
                <span>PARKING ASSIGNMENT</span>
                <span className="text-zinc-500">82% Occupied</span>
              </div>
              {/* Parking slot visual grid */}
              <div className="grid grid-cols-4 gap-1.5 pt-1.5">
                {["A-01", "A-02", "A-03", "A-04", "A-05", "A-06", "A-07", "A-08"].map((slot, i) => (
                  <div
                    key={slot}
                    className={`flex flex-col items-center justify-center py-1 rounded  text-[8px] font-semibold transition-colors ${
                      i % 3 === 0
                        ? "bg-zinc-200 text-zinc-700-300 dark:bg-zinc-800 dark:text-zinc-400"
                        : i % 5 === 0
                        ? "bg-zinc-105-200 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-650"
                        : "bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white"
                    }`}
                  >
                    <span>{slot}</span>
                    <span className="text-[6px] font-normal leading-none opacity-80">
                      {i % 3 === 0 ? "Res" : i % 5 === 0 ? "Free" : "Occ"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meta details */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/30 dark:group-hover:text-indigo-400 transition-colors">
                  <Car className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Parking Management</h3>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Assign parking slots, register vehicles, and manage visitor parking efficiently.
              </p>
            </div>
          </div>

          {/* Card 6: Multi-Building Dashboard */}
          <div className="group flex flex-col justify-between -200/80 bg-white p-5 hover:zinc-300 dark:bg-zinc-950/30 dark:hover:zinc-700">
            {/* Micro Dashboard Mockup */}
            <div className="w-full h-32 -100 bg-zinc-50/50 p-3 mb-5 overflow-hidden dark:bg-zinc-900/10 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[9px] text-zinc-400 font-semibold -150 pb-1.5">
                <span>PROPERTY HUB</span>
                <span className="text-zinc-500">3 Portfolios</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between bg-white p-1.5 rounded -100 text-[9px] dark:bg-zinc-900/60">
                  <div className="flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-zinc-750 dark:text-zinc-300" />
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">Apex Towers</span>
                  </div>
                  <span className="text-[7.5px] text-zinc-400">124 Units</span>
                </div>
                <div className="flex items-center justify-between bg-zinc-100/60 p-1.5 rounded  text-[9px] dark:bg-zinc-900/20">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">Pacific Plaza</span>
                  </div>
                  <span className="text-[7.5px] text-zinc-400">88 Units</span>
                </div>
              </div>
            </div>

            {/* Meta details */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/30 dark:group-hover:text-indigo-400 transition-colors">
                  <Building2 className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Multi-Building Hub</h3>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Monitor multiple societies, buildings, and properties from a unified operational dashboard.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
