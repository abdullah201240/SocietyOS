"use client";

import * as React from "react";
import { AlertCircle, Wrench, CreditCard, Users, Check, X, ShieldAlert, Car, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface OperationalWidgetsProps {
  currentOrg: string;
}

export function OperationalWidgets({ currentOrg }: OperationalWidgetsProps) {
  // 1. Interactive Pending Approvals State
  const [approvals, setApprovals] = React.useState([
    { id: 1, type: "Resident Move-in", name: "David Vance", unit: "Flat 1204", date: "Today, 10:15 AM" },
    { id: 2, type: "Contractor Gate Pass", name: "Apex Elevator Team (3 crew)", unit: "Block C Service", date: "Today, 9:30 AM" },
    { id: 3, type: "Vehicle Registration", name: "Regina George (White Audi A4)", unit: "Flat 402", date: "Yesterday, 4:10 PM" },
  ]);

  const handleApprovalAction = (id: number, approved: boolean) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  // 2. Complaint Activity Feed State
  const [complaints, setComplaints] = React.useState([
    { id: 1, title: "Lobby double door stuck closed", flat: "Block A Lobby", priority: "Critical", status: "Assigned", category: "Facilities", time: "10m ago" },
    { id: 2, title: "Low tap pressure in master bathroom", flat: "Flat 805", priority: "High", status: "In Progress", category: "Plumbing", time: "45m ago" },
    { id: 3, title: "Flickering lights in basement parking level L2", flat: "Basement L2", priority: "Medium", status: "Resolved", category: "Electrical", time: "2h ago" },
    { id: 4, title: "Intercom line dead since morning", flat: "Flat 1402", priority: "Low", status: "Reported", category: "Comms", time: "3h ago" },
  ]);

  const handleStatusChange = (id: number) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === "Reported" ? "Assigned" : c.status === "Assigned" ? "In Progress" : c.status === "In Progress" ? "Resolved" : "Reported";
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  // 3. Maintenance Tasks
  const maintenanceTasks = [
    { id: 1, title: "Water treatment plant chemical dosing", trade: "Plumbing", due: "Today, 02:00 PM", status: "Scheduled", assignee: "P. Contractor" },
    { id: 2, title: "Fire alarm system weekly diagnostics", trade: "Safety", due: "Today, 04:00 PM", status: "In Progress", assignee: "S. Marshall" },
    { id: 3, title: "Diesel generator fuel tank refilling", trade: "Utilities", due: "Tomorrow, 10:00 AM", status: "Scheduled", assignee: "G. Singh" },
  ];

  // 4. Recent Payments
  const payments = [
    { id: 1, flat: "Flat 1402", description: "June Maintenance dues", amount: "৳185.00", date: "Today, 11:20 AM", type: "Maintenance" },
    { id: 2, flat: "Flat 805", description: "Water surcharge (Q2)", amount: "৳45.00", date: "Today, 10:45 AM", type: "Utility" },
    { id: 3, flat: "Flat 301", description: "Clubhouse event booking", amount: "৳250.00", date: "Yesterday, 3:30 PM", type: "Amenities" },
  ];

  // 5. Visitor Activity Log
  const [visitors, setVisitors] = React.useState([
    { id: 1, name: "Amazon Delivery (Mark)", unit: "Flat 604", time: "11:50 AM", status: "Checked In" },
    { id: 2, name: "Sarah Connor (Guest)", unit: "Flat 1104", time: "10:30 AM", status: "Checked In" },
    { id: 3, name: "FedEx Courier (Alice)", unit: "Flat 302", time: "09:45 AM", status: "Checked Out" },
  ]);

  const handleVisitorCheckOut = (id: number) => {
    setVisitors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Checked Out" } : v))
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* COLUMN 1 & 2 (Takes 2 columns space on large screens) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* COMPLAINTS FEED */}
        <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
          <CardHeader className="p-4 -100">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4 text-indigo-650" /> Complaint Activity Inbox
                </CardTitle>
                <CardDescription className="text-[10px] text-zinc-550">Click a complaint status badge to step through stages.</CardDescription>
              </div>
              <Badge variant="outline" className="text-[9px] px-2 py-0.5-200/60 font-semibold text-zinc-500">
                {complaints.filter(c => c.status !== "Resolved").length} Unresolved
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-2 space-y-1">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="group flex items-center justify-between p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900/40  hover:zinc-100 dark:hover:zinc-900 transition-all"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className={`mt-0.5 rounded-full p-1 ${
                    c.priority === "Critical"
                      ? "bg-rose-50 text-rose-600 dark:bg-rose-950/20"
                      : c.priority === "High"
                      ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20"
                      : "bg-zinc-100 text-zinc-600 dark:bg-zinc-900"
                  }`}>
                    <ShieldAlert className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-zinc-900 dark:text-white block truncate leading-tight">
                      {c.title}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-1">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-350">{c.flat}</span>
                      <span>•</span>
                      <span>{c.category}</span>
                      <span>•</span>
                      <span className="text-[9px]">{c.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant="outline"
                    className={`text-[9.5px] px-1.5 py-0.5 rounded-sm-200/60 font-semibold ${
                      c.priority === "Critical"
                        ? "text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30"
                        : c.priority === "High"
                        ? "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30"
                        : "text-zinc-600 bg-zinc-100 dark:bg-zinc-850"
                    }`}
                  >
                    {c.priority}
                  </Badge>
                  <button
                    onClick={() => handleStatusChange(c.id)}
                    className={`text-[9.5px] px-1.5 py-0.5 rounded-sm font-bold  transition-colors outline-none cursor-pointer ${
                      c.status === "Resolved"
                        ? "bg-emerald-50 text-emerald-700-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                        : c.status === "In Progress"
                        ? "bg-blue-50 text-blue-700-250 dark:bg-blue-950/20 dark:text-blue-450"
                        : c.status === "Assigned"
                        ? "bg-purple-50 text-purple-700-250 dark:bg-purple-950/20 dark:text-purple-450"
                        : "bg-zinc-100 text-zinc-650-200 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {c.status}
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* RECENT PAYMENTS */}
        <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
          <CardHeader className="p-4 -100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="h-4 w-4 text-indigo-650" /> Recent Transactions
              </CardTitle>
              <span className="text-[10px] text-zinc-400">June Ledger Feed</span>
            </div>
          </CardHeader>
          <CardContent className="p-2 space-y-1">
            {payments.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900/40  transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded bg-zinc-100 dark:bg-zinc-900 p-2 text-zinc-600 dark:text-zinc-400">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-900 dark:text-white">{p.flat}</span>
                    <span className="text-[10px] text-zinc-550 dark:text-zinc-455 block mt-0.5">{p.description}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white block">{p.amount}</span>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">{p.date}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* COLUMN 3 (Sidebar Widgets) */}
      <div className="space-y-6">

        {/* PENDING APPROVALS */}
        <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
          <CardHeader className="p-4 -100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users className="h-4 w-4 text-indigo-650" /> Pending Approvals
              </CardTitle>
              {approvals.length > 0 && (
                <span className="h-4.5 w-4.5 rounded-full bg-indigo-600 flex items-center justify-center text-[9px] font-bold text-white leading-none">
                  {approvals.length}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-3">
            {approvals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center text-zinc-400 select-none">
                <ShieldCheck className="h-8 w-8 text-zinc-300 mb-2" />
                <span className="text-xs font-semibold">All approvals processed</span>
                <span className="text-[10px] mt-0.5">Queue is currently clear.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {approvals.map((a) => (
                  <div key={a.id} className="rounded -150 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-2">
                    <div className="flex justify-between items-start gap-1">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wide block">
                          {a.type}
                        </span>
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white block mt-0.5">
                          {a.name}
                        </span>
                        <span className="text-[10px] text-zinc-500 mt-0.5 block">
                          {a.unit} • {a.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 -100 pt-2">
                      <Button
                        onClick={() => handleApprovalAction(a.id, false)}
                        variant="ghost"
                        size="xs"
                        className="h-6.5 text-[9.5px] font-semibold text-zinc-550 dark:text-zinc-400 hover:bg-zinc-100 flex-1 rounded-sm gap-1 hover:text-zinc-900"
                      >
                        <X className="h-3 w-3" /> Reject
                      </Button>
                      <Button
                        onClick={() => handleApprovalAction(a.id, true)}
                        size="xs"
                        className="h-6.5 text-[9.5px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white flex-1 rounded-sm gap-1"
                      >
                        <Check className="h-3 w-3" /> Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* VISITOR ACTIVITY LOG */}
        <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
          <CardHeader className="p-4 -100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-indigo-650" /> Gate visitor log
              </CardTitle>
              <Badge variant="secondary" className="text-[8px] bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 font-bold uppercase rounded-sm -100">
                Gate #1 Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-2 space-y-1">
            {visitors.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900/40  transition-all"
              >
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-white block truncate">
                    {v.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 mt-0.5 block">
                    {v.unit} • {v.time}
                  </span>
                </div>
                <div className="shrink-0 ml-2">
                  {v.status === "Checked In" ? (
                    <Button
                      onClick={() => handleVisitorCheckOut(v.id)}
                      variant="outline"
                      size="xs"
                      className="h-6 text-[9px] font-semibold-200 hover:bg-zinc-100 text-zinc-650 rounded-sm hover:text-zinc-900"
                    >
                      Check Out
                    </Button>
                  ) : (
                    <Badge variant="outline" className="text-[8.5px] px-1.5 py-0.5 rounded-sm-200/60 font-semibold text-zinc-400 bg-zinc-50/50">
                      Departed
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* PARKING OCCUPANCY */}
        <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
          <CardHeader className="p-4 -100">
            <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Car className="h-4 w-4 text-indigo-650" /> Parking utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3.5">
            <div className="space-y-1">
              <div className="flex justify-between text-[10.5px] text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold">Resident Parking Slots (L1 & L2)</span>
                <span className="font-bold text-zinc-850 dark:text-zinc-350">84% (126 / 150)</span>
              </div>
              <Progress value={84} className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10.5px] text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold">Visitor Valet Parking Slots</span>
                <span className="font-bold text-zinc-850 dark:text-zinc-350">46% (14 / 30)</span>
              </div>
              <Progress value={46} className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
