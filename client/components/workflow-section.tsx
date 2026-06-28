"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Inbox,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Star,
} from "lucide-react";

export function WorkflowSection() {
  return (
    <section id="workflow" className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Headers */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4 rounded-full px-3 py-1 border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-950/40">
            Operations & Flow
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Built Around Real Operational Workflows
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            From resident complaints to maintenance resolution, every workflow is centralized, trackable, and transparent.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          
          {/* Desktop horizontal line connector */}
          <div className="hidden lg:block absolute top-7 left-16 right-16 h-0.5 border-t border-dashed border-zinc-200 dark:border-zinc-800 -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Step 1: Resident Reports Issue */}
            <div className="relative flex flex-col items-start gap-4">
              {/* Connector and Step Indicator */}
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="lg:hidden h-0.5 flex-1 border-t border-dashed border-zinc-200 dark:border-zinc-800" />
                <span className="text-xs font-bold text-zinc-450 dark:text-zinc-550 lg:hidden">STEP 1</span>
              </div>
              <span className="hidden lg:block text-[10px] font-bold tracking-wider text-zinc-450 dark:text-zinc-550">STEP 1</span>
              
              {/* Card content */}
              <div className="w-full flex-1 flex flex-col justify-between border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/20">
                {/* Visual mini-mockup */}
                <div className="w-full h-36 rounded border border-zinc-150 bg-white p-3 mb-4 text-[10px] flex flex-col justify-between dark:border-zinc-900 dark:bg-zinc-950">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">New Complaint Form</span>
                    <Badge variant="outline" className="text-[7.5px] px-1 py-0 border-zinc-200 text-zinc-500 dark:border-zinc-800">Unit 1204</Badge>
                  </div>
                  <div className="space-y-1.5 my-2">
                    <div className="space-y-0.5">
                      <span className="text-[7.5px] text-zinc-400">ISSUE TITLE</span>
                      <div className="px-1.5 py-1 rounded border border-zinc-100 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-900/50 font-medium text-zinc-700 dark:text-zinc-300">
                        Broken Lobby Door Lock
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 space-y-0.5">
                        <span className="text-[7.5px] text-zinc-400">PRIORITY</span>
                        <div className="px-1.5 py-0.5 rounded border border-zinc-100 bg-zinc-50/50 text-center font-semibold text-zinc-700 dark:border-zinc-900 dark:bg-zinc-900/50 dark:text-zinc-350">
                          High
                        </div>
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <span className="text-[7.5px] text-zinc-400">CATEGORY</span>
                        <div className="px-1.5 py-0.5 rounded border border-zinc-100 bg-zinc-50/50 text-center font-semibold text-zinc-700 dark:border-zinc-900 dark:bg-zinc-900/50 dark:text-zinc-350">
                          Security
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button size="xs" disabled className="w-full text-[8.5px] h-6 rounded-md">Submit Complaint</Button>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-1">Resident Reports Issue</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Residents submit complaints with images, notes, and priority levels.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Management Reviews Request */}
            <div className="relative flex flex-col items-start gap-4">
              {/* Connector and Step Indicator */}
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400">
                  <Inbox className="h-5 w-5" />
                </div>
                <div className="lg:hidden h-0.5 flex-1 border-t border-dashed border-zinc-200 dark:border-zinc-800" />
                <span className="text-xs font-bold text-zinc-450 dark:text-zinc-550 lg:hidden">STEP 2</span>
              </div>
              <span className="hidden lg:block text-[10px] font-bold tracking-wider text-zinc-450 dark:text-zinc-550">STEP 2</span>
              
              {/* Card content */}
              <div className="w-full flex-1 flex flex-col justify-between border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/20">
                {/* Visual mini-mockup */}
                <div className="w-full h-36 rounded border border-zinc-150 bg-white p-3 mb-4 text-[10px] flex flex-col justify-between dark:border-zinc-900 dark:bg-zinc-950">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">Management Dispatch</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  </div>
                  <div className="space-y-1.5 my-2">
                    <div className="p-1.5 rounded border border-zinc-100 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-900/50">
                      <div className="font-medium text-zinc-700 dark:text-zinc-300">Ticket #2054</div>
                      <div className="text-[7.5px] text-zinc-400">Assigned from Inbox • Grandview A</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[7.5px] text-zinc-400">ASSIGN STAFF MEMBER</span>
                      <div className="flex items-center justify-between px-1.5 py-1 rounded border border-zinc-100 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-350">
                        <span>David K. (Technician)</span>
                        <ChevronRight className="h-3 w-3 text-zinc-400 transform rotate-90" />
                      </div>
                    </div>
                  </div>
                  <Button size="xs" disabled className="w-full text-[8.5px] h-6 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500">Dispatch Work Order</Button>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-1">Management Reviews</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Managers receive instant notifications and assign tasks to the appropriate staff.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Maintenance Team Resolves Issue */}
            <div className="relative flex flex-col items-start gap-4">
              {/* Connector and Step Indicator */}
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400">
                  <Wrench className="h-5 w-5" />
                </div>
                <div className="lg:hidden h-0.5 flex-1 border-t border-dashed border-zinc-200 dark:border-zinc-800" />
                <span className="text-xs font-bold text-zinc-450 dark:text-zinc-550 lg:hidden">STEP 3</span>
              </div>
              <span className="hidden lg:block text-[10px] font-bold tracking-wider text-zinc-450 dark:text-zinc-550">STEP 3</span>
              
              {/* Card content */}
              <div className="w-full flex-1 flex flex-col justify-between border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/20">
                {/* Visual mini-mockup */}
                <div className="w-full h-36 rounded border border-zinc-150 bg-white p-3 mb-4 text-[10px] flex flex-col justify-between dark:border-zinc-900 dark:bg-zinc-950">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">Staff Work Progress</span>
                    <span className="text-[7.5px] font-bold text-amber-600">80% Done</span>
                  </div>
                  <div className="space-y-1.5 my-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <input type="checkbox" checked disabled className="h-2.5 w-2.5 rounded text-zinc-800 border-zinc-300" />
                        <span className="text-zinc-550 dark:text-zinc-400 line-through">Inspect lock alignment</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input type="checkbox" checked disabled className="h-2.5 w-2.5 rounded text-zinc-800 border-zinc-300" />
                        <span className="text-zinc-550 dark:text-zinc-400 line-through">Replace core cylinder</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input type="checkbox" disabled className="h-2.5 w-2.5 rounded text-zinc-800 border-zinc-300" />
                        <span className="text-zinc-700 dark:text-zinc-300">Upload completion photo</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 rounded-full dark:bg-zinc-850 overflow-hidden">
                    <div className="h-full bg-indigo-600 dark:bg-indigo-500 w-[80%] transition-all" />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-1">Maintenance Resolves</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Technicians update progress, upload proof of work, and complete assigned tasks.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4: Resident Receives Updates */}
            <div className="relative flex flex-col items-start gap-4">
              {/* Connector and Step Indicator */}
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-zinc-450 dark:text-zinc-550 lg:hidden">STEP 4</span>
              </div>
              <span className="hidden lg:block text-[10px] font-bold tracking-wider text-zinc-450 dark:text-zinc-550">STEP 4</span>
              
              {/* Card content */}
              <div className="w-full flex-1 flex flex-col justify-between border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/20">
                {/* Visual mini-mockup */}
                <div className="w-full h-36 rounded border border-zinc-150 bg-white p-3 mb-4 text-[10px] flex flex-col justify-between dark:border-zinc-900 dark:bg-zinc-950">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">Resident Notification</span>
                    <span className="text-[7.5px] font-bold text-emerald-600">Resolved</span>
                  </div>
                  <div className="space-y-1 my-1.5 text-center">
                    <div className="font-semibold text-zinc-750 dark:text-zinc-300">Ticket Closed Successfully</div>
                    <p className="text-[7px] text-zinc-400 leading-tight">Door lock core has been replaced. Please rate the service.</p>
                    <div className="flex justify-center gap-0.5 pt-1 text-indigo-600 dark:text-indigo-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-2.5 w-2.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <Button size="xs" disabled className="w-full text-[8.5px] h-6 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500">Confirm & Close Ticket</Button>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-1">Resident Receives Updates</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Residents track status updates and confirm issue resolution directly from the platform.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
