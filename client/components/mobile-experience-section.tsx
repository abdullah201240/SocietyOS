"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  CreditCard,
  UserCheck,
  Bell,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Check,
  Camera,
  Star,
} from "lucide-react";

export function MobileExperienceSection() {
  const [activeScreen, setActiveScreen] = React.useState<"complaint" | "payment" | "visitor" | "notifications">("complaint");

  const screens = [
    { id: "complaint", name: "1. Complaint Reporting", desc: "Report maintenance issues with images and notes." },
    { id: "payment", name: "2. Bills & Payments", desc: "View outstanding service fees and pay online." },
    { id: "visitor", name: "3. Visitor Approvals", desc: "Approve or deny visitor ingress in real-time." },
    { id: "notifications", name: "4. Notification Feed", desc: "Track progress updates and system notices." },
  ];

  return (
    <section id="mobile-experience" className="py-16 md:py-24 -100 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Headers */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4 rounded-full px-3 py-1-200 text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-950/40">
            Resident Mobile Application
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Designed for Residents on the Go
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Residents can report issues, pay bills, manage visitors, and receive updates directly from their phones.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Text description & Screen toggle buttons (7 Columns) */}
          <div className="lg:col-span-6 space-y-6 lg:pr-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                A Unified Mobile Interface for Building Residents
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Empower your residents with an easy-to-use application. Remove operational friction at the gate and automate monthly accounts.
              </p>
            </div>

            {/* Screen triggers stack */}
            <div className="space-y-2.5">
              {screens.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(screen.id as any)}
                  className={`w-full text-left p-3.5  transition-all flex items-start gap-4 ${
                    activeScreen === screen.id
                      ? "bg-indigo-50/20-200 dark:bg-indigo-950/20"
                      : "bg-white-100 hover:zinc-200 dark:bg-transparent dark:hover:zinc-800"
                  }`}
                >
                  <div className={`mt-0.5 rounded p-1.5  transition-colors ${
                    activeScreen === screen.id
                      ? "bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white"
                      : "bg-zinc-50 text-zinc-500-200 dark:bg-zinc-900 dark:text-zinc-400"
                  }`}>
                    {screen.id === "complaint" && <FileText className="h-4 w-4" />}
                    {screen.id === "payment" && <CreditCard className="h-4 w-4" />}
                    {screen.id === "visitor" && <UserCheck className="h-4 w-4" />}
                    {screen.id === "notifications" && <Bell className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-200">{screen.name}</h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{screen.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Highlights List */}
            <div className="grid grid-cols-2 gap-3 pt-6 text-xs font-semibold text-zinc-650 dark:text-zinc-400">
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Instant Reporting</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Digital Guest Passes</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Auto Bill Payments</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Live Staff Tracking</div>
            </div>
          </div>

          {/* RIGHT: Mobile Device Frame Preview (5 Columns) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative">
              {/* Outer phone wrapper */}
              <div className="relative mx-auto h-[530px] w-[265px][7px]-900 bg-white dark:bg-zinc-950 overflow-hidden flex flex-col justify-between">
                
                {/* Dynamic island notches */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-3.5 w-18 bg-zinc-900 rounded-full z-20 flex items-center justify-center dark:bg-zinc-800" />
                
                {/* Status bar mock */}
                <div className="flex justify-between items-center px-5 pt-3.5 pb-2 text-[9px] font-semibold text-zinc-400 bg-white dark:bg-zinc-950 z-10 select-none">
                  <span>12:04</span>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <div className="h-2 w-4 rounded-xs -400 bg-zinc-400" />
                  </div>
                </div>

                {/* APP COMPONENT ACCORDING TO STATE */}
                <div className="flex-1 bg-zinc-50/50 p-3.5 overflow-hidden dark:bg-zinc-950/20 flex flex-col">
                  
                  {/* Complaint Screen */}
                  {activeScreen === "complaint" && (
                    <div className="flex-grow flex flex-col justify-between animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 mb-2">Report Operational Incident</h4>
                        <div className="space-y-2">
                          <div className="space-y-0.5">
                            <span className="text-[8px] text-zinc-400 block font-medium">INCIDENT DETAILS</span>
                            <div className="px-2 py-1.5 rounded -100 bg-white dark:bg-zinc-900 text-[9.5px] font-medium text-zinc-800 dark:text-zinc-200">
                              Lobby Gate Lock Jammed
                            </div>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[8px] text-zinc-400 block font-medium">LOCATION</span>
                            <div className="px-2 py-1.5 rounded -100 bg-white dark:bg-zinc-900 text-[9.5px] font-medium text-zinc-800 dark:text-zinc-200">
                              Tower B Entrance Gate
                            </div>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[8px] text-zinc-400 block font-medium">INCIDENT PHOTO</span>
                            <div className="h-16 w-full rounded -200 bg-zinc-50 flex items-center justify-center text-zinc-400 dark:bg-zinc-900">
                              <Camera className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button size="xs" disabled className="w-full text-[9px] h-7.5 rounded-md mt-4">File Incident Report</Button>
                    </div>
                  )}

                  {/* Payment Screen */}
                  {activeScreen === "payment" && (
                    <div className="flex-grow flex flex-col justify-between animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 mb-2">Service Fee Ledger</h4>
                        <Card className="rounded-lg bg-indigo-600 p-3 text-white dark:bg-indigo-950/40 dark:text-indigo-400 mb-3 shadow-none ">
                          <span className="text-[7.5px] opacity-75 font-semibold">UNIT 1204</span>
                          <div className="text-lg font-bold mt-0.5">৳185.00</div>
                          <div className="text-[7.5px] opacity-80 mt-1">Due Date: June 30, 2026</div>
                        </Card>
                        <div className="space-y-1.5 text-[9px]">
                          <div className="flex justify-between items-center py-1 -100">
                            <span className="text-zinc-500">Electricity Bill</span>
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">৳54.50</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-zinc-500">Clubhouse Deposit</span>
                            <Badge variant="outline" className="text-[7px] px-1 py-0-100 text-emerald-600 dark:text-emerald-400">Paid</Badge>
                          </div>
                        </div>
                      </div>
                      <Button size="xs" disabled className="w-full text-[9px] h-7.5 rounded-md mt-4">Execute Online Payment</Button>
                    </div>
                  )}

                  {/* Visitor Screen */}
                  {activeScreen === "visitor" && (
                    <div className="flex-grow flex flex-col justify-between animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 mb-2">Gate Pass Dispatch</h4>
                        <div className="bg-amber-50 -250 p-2.5 rounded-lg text-center dark:bg-amber-950/20 mb-3">
                          <span className="text-[7px] font-bold text-amber-800 uppercase block tracking-wider dark:text-amber-400">Visitor Requesting Access</span>
                          <span className="text-[10px] font-semibold text-zinc-800 dark:text-zinc-200 block mt-1">Sarah Connor</span>
                          <span className="text-[7.5px] text-zinc-500 block">Ingress: Gate #1 (12:02 PM)</span>
                        </div>
                        <p className="text-[8px] text-zinc-500 text-center leading-normal px-2">Clicking approve grants immediate entry authorization and registers the pass in the gate registry.</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="xs" variant="outline" disabled className="flex-1 text-[9px] h-7.5 rounded-md-250">Deny</Button>
                        <Button size="xs" disabled className="flex-1 text-[9px] h-7.5 rounded-md bg-indigo-650 hover:bg-indigo-700 text-white dark:bg-indigo-500">Approve</Button>
                      </div>
                    </div>
                  )}

                  {/* Notifications Screen */}
                  {activeScreen === "notifications" && (
                    <div className="flex-grow flex flex-col justify-between animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 mb-2">Notification Inbox</h4>
                        <div className="space-y-1.5 text-[8.5px]">
                          <div className="p-2 bg-white rounded -100 dark:bg-zinc-900/60">
                            <div className="flex items-center justify-between font-semibold text-zinc-850 dark:text-zinc-200">
                              <span>Staff Dispatched</span>
                              <span className="text-[7px] text-zinc-400 font-normal">2m ago</span>
                            </div>
                            <p className="text-zinc-500 mt-0.5">Electrician David K. has been assigned to ticket #2054.</p>
                          </div>
                          <div className="p-2 bg-white rounded -100 dark:bg-zinc-900/60">
                            <div className="flex items-center justify-between font-semibold text-zinc-850 dark:text-zinc-200">
                              <span>Utilities Invoice Paid</span>
                              <span className="text-[7px] text-zinc-400 font-normal">1d ago</span>
                            </div>
                            <p className="text-zinc-500 mt-0.5">Thank you. payment of $185.00 has been verified.</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-center text-[7px] text-zinc-400 mt-4">All notifications are verified and secure.</div>
                    </div>
                  )}

                </div>

                {/* Phone Bottom Home Indicator Bar */}
                <div className="h-6 w-full flex items-center justify-center bg-white dark:bg-zinc-950 pb-2 z-10 select-none">
                  <div className="h-1 w-24 bg-zinc-300 dark:bg-zinc-800 rounded-full" />
                </div>

              </div>
              {/* Subtle phone shadow depth overlay backing */}
              <div className="absolute -inset-1 bg-zinc-200/50 dark:bg-zinc-800/40 opacity-20 blur-md -z-10" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
