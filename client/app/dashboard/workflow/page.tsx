"use client";

import * as React from "react";
import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Network,
  Clock,
  ArrowRight,
  AlertTriangle,
  Play,
  Settings2,
  CheckCircle,
  HelpCircle,
  FileText,
  DollarSign,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
} from "lucide-react";

// Flow Step Interface
interface FlowStep {
  name: string;
  status: "complete" | "pending" | "delayed";
  count: number;
  slaTimer: string;
}

// Live Workflow Item Interface
interface WorkflowItem {
  ticketId: string;
  society: string;
  building: string;
  flat: string;
  stage: string;
  staff: string;
  slaStatus: "On Time" | "Warning" | "Breached";
  lastUpdate: string;
}

export default function OperationalWorkflowDashboard() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Mock steps
  const steps: FlowStep[] = [
    { name: "Complaint Created", status: "complete", count: 22, slaTimer: "2h SLA" },
    { name: "Assigned", status: "complete", count: 14, slaTimer: "4h SLA" },
    { name: "Maintenance", status: "delayed", count: 8, slaTimer: "24h SLA" },
    { name: "Verified", status: "pending", count: 5, slaTimer: "12h SLA" },
    { name: "Bill Generated", status: "complete", count: 18, slaTimer: "8h SLA" },
    { name: "Payment Received", status: "complete", count: 12, slaTimer: "48h SLA" },
    { name: "Owner Updated", status: "complete", count: 12, slaTimer: "2h SLA" },
  ];

  // Mock table records
  const workflowItems: WorkflowItem[] = [
    { ticketId: "WFK-101", society: "Grandview Towers", building: "Tower Alpha", flat: "Flat 1402", stage: "Maintenance", staff: "Dave Miller (Tech)", slaStatus: "Warning", lastUpdate: "3h ago" },
    { ticketId: "WFK-102", society: "Grandview Towers", building: "Tower Alpha", flat: "Flat 805", stage: "Verified", staff: "Sarah Connor", slaStatus: "On Time", lastUpdate: "1h ago" },
    { ticketId: "WFK-103", society: "Pine Crest Society", building: "Oak Block", flat: "Flat 302", stage: "Bill Generated", staff: "Auto system", slaStatus: "On Time", lastUpdate: "5m ago" },
    { ticketId: "WFK-104", society: "Grandview Towers", building: "Tower Beta", flat: "Flat 201", stage: "Payment Received", staff: "Stripe auto webhook", slaStatus: "On Time", lastUpdate: "10m ago" },
    { ticketId: "WFK-105", society: "Grandview Towers", building: "Tower Alpha", flat: "Flat 101", stage: "Assigned", staff: "Unassigned", slaStatus: "Breached", lastUpdate: "26h ago" }
  ];

  // Automations Toggles
  const [triggers, setTriggers] = React.useState({
    autoAssign: true,
    autoInvoice: true,
    autoNotifyOwner: false,
    autoEscalate: true
  });

  const toggleTrigger = (key: keyof typeof triggers) => {
    setTriggers((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      toast.success(`Rule "${key.replace(/([A-Z])/g, " $1")}" updated.`);
      return next;
    });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans selection:bg-zinc-200">
      <Toaster position="top-right" />

      {/* Sidebar Links */}
      <DashboardSidebar
        currentOrg={currentOrg}
        orgs={orgs}
        onOrgChange={(org) => setCurrentOrg(org)}
      />

      {/* Main Workspace */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <DashboardNavbar currentOrg={currentOrg} />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Operational Workflow Center
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Track how issues move from complaint to resolution, billing, and payment collection.
              </p>
            </div>
            
            {/* Direct Action Linkage Views */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <Link href="/dashboard/workflow/complaint-maintenance">
                <Button
                  variant="outline"
                  size="xs"
                  className="h-8 rounded-sm text-[10.5px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm"
                >
                  Complaint → Maintenance
                </Button>
              </Link>
              <Link href="/dashboard/workflow/maintenance-billing">
                <Button
                  variant="outline"
                  size="xs"
                  className="h-8 rounded-sm text-[10.5px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm"
                >
                  Maintenance → Billing
                </Button>
              </Link>
              <Link href="/dashboard/workflow/billing-payment">
                <Button
                  variant="outline"
                  size="xs"
                  className="h-8 rounded-sm text-[10.5px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm"
                >
                  Billing → Payment
                </Button>
              </Link>
            </div>
          </div>

          {/* MAIN FLOW VISUAL */}
          <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <Network className="h-4 w-4 text-indigo-600" /> End-to-End Operational Pipeline
            </h2>
            <div className="overflow-x-auto w-full pb-2">
              <div className="flex items-center gap-2.5 min-w-[900px] justify-between">
                {steps.map((step, idx) => {
                  const isLast = idx === steps.length - 1;
                  return (
                    <React.Fragment key={idx}>
                      <div className="flex-1 rounded border border-zinc-150 p-2.5 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-950/40 text-center space-y-1 select-none relative">
                        <span className="text-[10px] font-bold text-zinc-900 dark:text-white block truncate">
                          {step.name}
                        </span>
                        
                        <div className="flex items-center justify-center gap-2 mt-1">
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            {step.count} items
                          </span>
                          <span className={`inline-flex items-center rounded-sm px-1 py-0.5 text-[8.5px] font-bold border ${
                            step.status === "complete"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                              : step.status === "delayed"
                              ? "bg-rose-50 text-rose-700 border-rose-250 dark:bg-rose-955/20 dark:text-rose-455"
                              : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-955/20 dark:text-amber-450"
                          }`}>
                            {step.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-1 text-[9px] text-zinc-400 mt-1">
                          <Clock className="h-2.5 w-2.5" />
                          <span>{step.slaTimer}</span>
                        </div>
                      </div>

                      {!isLast && (
                        <ArrowRight className="h-4.5 w-4.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* MAIN GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Live Workflow Table (Columns 1 & 2) */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
                <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider">Live Active Workflows</CardTitle>
                  <CardDescription className="text-[10px]">End-to-end active pipelines directory.</CardDescription>
                </CardHeader>
                <div className="overflow-x-auto w-full">
                  <Table>
                    <TableHeader className="bg-zinc-50/50">
                      <TableRow>
                        <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 h-9">Ticket ID</TableHead>
                        <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 h-9">Building/Flat</TableHead>
                        <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center h-9">Stage</TableHead>
                        <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 h-9">Assigned Staff</TableHead>
                        <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center h-9">SLA Status</TableHead>
                        <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-right h-9">Last Update</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workflowItems.map((item) => (
                        <TableRow key={item.ticketId}>
                          <TableCell className="text-xs font-semibold py-2.5">{item.ticketId}</TableCell>
                          <TableCell className="text-xs py-2.5 font-medium">
                            {item.building} • {item.flat}
                          </TableCell>
                          <TableCell className="text-center py-2.5">
                            <Badge variant="outline" className="text-[9px] font-bold rounded-sm border-zinc-200 bg-zinc-50/50">
                              {item.stage}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs py-2.5">{item.staff}</TableCell>
                          <TableCell className="text-center py-2.5">
                            <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[8.5px] font-bold border ${
                              item.slaStatus === "On Time"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                : item.slaStatus === "Warning"
                                ? "bg-amber-50 text-amber-700 border-amber-205 dark:bg-amber-955/20 dark:text-amber-450"
                                : "bg-rose-50 text-rose-700 border-rose-250 dark:bg-rose-955/20 dark:text-rose-455"
                            }`}>
                              {item.slaStatus}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-right py-2.5 text-zinc-400">{item.lastUpdate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Workflow Analytics Panel */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="rounded-md border border-zinc-200 bg-white p-3 dark:border-zinc-850 dark:bg-zinc-950">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block">Avg completion time</span>
                  <div className="text-lg font-bold mt-1 text-indigo-600 dark:text-indigo-400">14.2 Hours</div>
                  <span className="text-[8px] text-emerald-600 font-semibold block mt-0.5">↓ 2.4h from past cycle</span>
                </Card>
                <Card className="rounded-md border border-zinc-200 bg-white p-3 dark:border-zinc-850 dark:bg-zinc-950">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block">Conversion Rate</span>
                  <div className="text-lg font-bold mt-1">94.1%</div>
                  <span className="text-[8px] text-zinc-400 block mt-0.5">Complaint → Paid balance</span>
                </Card>
                <Card className="rounded-md border border-zinc-200 bg-white p-3 dark:border-zinc-850 dark:bg-zinc-950">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block">SLA breach rate</span>
                  <div className="text-lg font-bold mt-1 text-rose-600 dark:text-rose-455">3.8%</div>
                  <span className="text-[8px] text-rose-600 font-semibold block mt-0.5">Warning: 2 items breached</span>
                </Card>
                <Card className="rounded-md border border-zinc-200 bg-white p-3 dark:border-zinc-850 dark:bg-zinc-950">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block">Efficiency Score</span>
                  <div className="text-lg font-bold mt-1">98.2 / 100</div>
                  <span className="text-[8px] text-emerald-600 font-semibold block mt-0.5">Highly Optimized</span>
                </Card>
              </div>

            </div>

            {/* Side Action Panels (Column 3) */}
            <div className="space-y-6">
              
              {/* Bottleneck Analysis Panel */}
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-2 mb-3.5 dark:border-zinc-900 flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4 text-zinc-400" /> Bottleneck Analysis
                </h3>
                <div className="space-y-3.5 text-xs text-zinc-650 dark:text-zinc-355">
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                    <div>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">Stuck Complaints</span>
                      <span className="text-[9px] text-zinc-400 block">Over 48h unassigned.</span>
                    </div>
                    <Badge className="bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-955/20 dark:text-rose-455 text-[10px] font-bold rounded-sm">
                      3 Tickets
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                    <div>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">Delayed Maintenance</span>
                      <span className="text-[9px] text-zinc-400 block">Overdue scheduled repairs.</span>
                    </div>
                    <Badge className="bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-955/20 dark:text-rose-455 text-[10px] font-bold rounded-sm">
                      5 Actions
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                    <div>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">Unpaid Invoices</span>
                      <span className="text-[9px] text-zinc-400 block">Pending resident reviews.</span>
                    </div>
                    <Badge className="bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-955/20 dark:text-amber-450 text-[10px] font-bold rounded-sm">
                      18 Invoices
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">Overdue Payments</span>
                      <span className="text-[9px] text-zinc-400 block">Collection SLA warning.</span>
                    </div>
                    <Badge className="bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-955/20 dark:text-rose-455 text-[10px] font-bold rounded-sm">
                      2 Invoices
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Automation Triggers Panel */}
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-2 mb-3.5 dark:border-zinc-900 flex items-center gap-1">
                  <SlidersHorizontal className="h-4 w-4 text-zinc-400" /> Automation Triggers
                </h3>
                <div className="space-y-3.5 text-xs text-zinc-650 dark:text-zinc-350">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-zinc-850 dark:text-zinc-200 block">Auto Assign Technician</span>
                      <span className="text-[9px] text-zinc-400 block">Match skillsets instantly.</span>
                    </div>
                    <button
                      onClick={() => toggleTrigger("autoAssign")}
                      className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer outline-none ${
                        triggers.autoAssign ? "bg-indigo-600" : "bg-zinc-200 dark:bg-zinc-800"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full transition-transform ${
                        triggers.autoAssign ? "translate-x-4" : ""
                      }`} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-zinc-855 dark:text-zinc-200 block">Auto Generate Invoice</span>
                      <span className="text-[9px] text-zinc-400 block">Generates invoice after repair.</span>
                    </div>
                    <button
                      onClick={() => toggleTrigger("autoInvoice")}
                      className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer outline-none ${
                        triggers.autoInvoice ? "bg-indigo-600" : "bg-zinc-200 dark:bg-zinc-800"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full transition-transform ${
                        triggers.autoInvoice ? "translate-x-4" : ""
                      }`} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-zinc-850 dark:text-zinc-200 block">Auto Notify Owner</span>
                      <span className="text-[9px] text-zinc-400 block">Pushes updates on completion.</span>
                    </div>
                    <button
                      onClick={() => toggleTrigger("autoNotifyOwner")}
                      className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer outline-none ${
                        triggers.autoNotifyOwner ? "bg-indigo-600" : "bg-zinc-200 dark:bg-zinc-800"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full transition-transform ${
                        triggers.autoNotifyOwner ? "translate-x-4" : ""
                      }`} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-zinc-850 dark:text-zinc-200 block">Auto Escalate Delay</span>
                      <span className="text-[9px] text-zinc-400 block">Auto notify supervisor.</span>
                    </div>
                    <button
                      onClick={() => toggleTrigger("autoEscalate")}
                      className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer outline-none ${
                        triggers.autoEscalate ? "bg-indigo-600" : "bg-zinc-200 dark:bg-zinc-800"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full transition-transform ${
                        triggers.autoEscalate ? "translate-x-4" : ""
                      }`} />
                    </button>
                  </div>
                </div>
              </Card>

            </div>

          </div>

        </main>
      </div>

    </div>
  );
}
