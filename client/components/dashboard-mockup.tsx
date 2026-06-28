"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Wrench,
  AlertCircle,
  CreditCard,
  Plus,
  Search,
  Bell,
  ChevronRight,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Building,
  TrendingUp,
} from "lucide-react";

export function DashboardMockup() {
  const [activeTab, setActiveTab] = React.useState<"overview" | "complaints" | "maintenance" | "billing">("overview");

  // Simulated state for complaint interactions
  const [complaints, setComplaints] = React.useState([
    { id: 1, title: "Elevator B Malfunction", block: "Block C", priority: "High", status: "In Progress", category: "Elevator" },
    { id: 2, title: "Water leak in basement", block: "Parking L2", priority: "Critical", status: "Assigned", category: "Plumbing" },
    { id: 3, title: "Lobby ceiling light out", block: "Main Tower", priority: "Low", status: "Resolved", category: "Electrical" },
    { id: 4, title: "Gym AC not cooling", block: "Clubhouse", priority: "Medium", status: "Pending", category: "HVAC" },
  ]);

  const toggleComplaintStatus = (id: number) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === id) {
          const nextStatus = c.status === "Pending" ? "Assigned" : c.status === "Assigned" ? "In Progress" : c.status === "In Progress" ? "Resolved" : "Pending";
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  return (
    <div className="w-full -200/80 bg-zinc-50 overflow-hidden dark:bg-zinc-950">
      {/* App Header Mockup */}
      <div className="flex h-14 items-center justify-between -200/60 bg-white/80 backdrop-blur-sm px-5 dark:bg-zinc-900/60">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center bg-zinc-50 dark:bg-zinc-900">
            <Building className="h-3 w-3 text-zinc-800 dark:text-zinc-200" />
          </div>
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">BuildingOS Console</span>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">/</span>
          <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Tower A - Grandview</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block group">
            <Search className="absolute top-2 left-2.5 h-3.5 w-3.5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              disabled
              className="h-8 w-44 -200/80 bg-zinc-50/80 pl-8 pr-3 text-[11px] text-zinc-600 outline-none transition-all hover:bg-zinc-100/80 focus:indigo-300 disabled:cursor-not-allowed dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
            />
          </div>
          <Button variant="ghost" size="icon-xs" className="relative text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-all">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-indigo-500 xoss-pulse-soft" />
          </Button>
          <div className="h-7 w-7 bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white cursor-pointer">
            JD
          </div>
        </div>
      </div>

      <div className="flex min-h-[380px] flex-col lg:flex-row">
        {/* Sidebar Mockup */}
        <div className="hidden lg:flex w-40 flex-col -200/60 bg-gradient-to-b from-zinc-50/80 to-zinc-100/40 p-3 dark:bg-gradient-to-b dark:from-zinc-950/40 dark:to-zinc-900/20">
          <div className="space-y-1.5">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[11px] font-medium transition-all duration-200 ${
                activeTab === "overview"
                  ? "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 font-semibold"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-zinc-200"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("complaints")}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[11px] font-medium transition-all duration-200 ${
                activeTab === "complaints"
                  ? "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 font-semibold"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-zinc-200"
              }`}
            >
              <AlertCircle className="h-4 w-4" />
              Complaints
            </button>
            <button
              onClick={() => setActiveTab("maintenance")}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[11px] font-medium transition-all duration-200 ${
                activeTab === "maintenance"
                  ? "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 font-semibold"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-zinc-200"
              }`}
            >
              <Wrench className="h-4 w-4" />
              Maintenance
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[11px] font-medium transition-all duration-200 ${
                activeTab === "billing"
                  ? "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 font-semibold"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-zinc-200"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Billing & Rent
            </button>
          </div>
        </div>
 
        {/* Mobile View Toggle Bar */}
        <div className="flex lg:hidden overflow-x-auto -200/60 bg-white/80 backdrop-blur-sm p-1.5 gap-1.5 dark:bg-zinc-900/80">
          {(["overview", "complaints", "maintenance", "billing"] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="xs"
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] rounded-lg shrink-0 capitalize transition-all duration-200 ${
                activeTab === tab ? "shadow-md" : "hover:translate-y-0.5"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>
 
        {/* Main Content Pane */}
        <div className="flex-1 bg-gradient-to-br from-white to-zinc-50/50 p-4 sm:p-5 dark:bg-gradient-to-br dark:from-black/95 dark:to-zinc-950/90">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 xoss-fade-in">
              {/* Header Section */}
              <div className="flex items-center justify-between pb-3 -200/60">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Grandview Towers Overview</h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Live operational status and building health indicators.</p>
                </div>
                <Badge variant="outline" className="text-[10px] px-2.5 py-1 rounded-full-200/60 bg-emerald-50/50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 shadow-sm">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  System Online
                </Badge>
              </div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Card size="sm" className="bg-zinc-50-200/60 dark:bg-zinc-900/50">
                  <CardHeader className="p-2.5 pb-1 sm:p-3 sm:pb-1.5">
                    <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 gap-1.5 min-w-0">
                      <span className="text-[9px] uppercase tracking-normal font-semibold truncate">Residents</span>
                      <Users className="h-3.5 w-3.5 shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-2.5 pt-0 sm:p-3 sm:pt-0">
                    <div className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">1,248</div>
                    <div className="text-[8.5px] sm:text-[9px] text-zinc-500 dark:text-zinc-400 flex items-start gap-0.5 mt-0.5">
                      <TrendingUp className="h-3 w-3 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight truncate">
                        <span className="text-emerald-600 font-semibold">+1.2%</span> occupancy
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card size="sm" className="bg-zinc-50-200/60 dark:bg-zinc-900/50">
                  <CardHeader className="p-2.5 pb-1 sm:p-3 sm:pb-1.5">
                    <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 gap-1.5 min-w-0">
                      <span className="text-[9px] uppercase tracking-normal font-semibold truncate">Complaints</span>
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-2.5 pt-0 sm:p-3 sm:pt-0">
                    <div className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">4 <span className="text-[10px] font-normal text-zinc-400">/ 12</span></div>
                    <div className="text-[8.5px] sm:text-[9px] text-zinc-500 dark:text-zinc-400 flex items-start gap-1 mt-0.5">
                      <span className="h-1 w-1 rounded-full bg-amber-500 shrink-0 mt-1.5 inline-block"></span>
                      <span className="leading-tight truncate">
                        <span className="text-amber-600 font-semibold">8 active</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card size="sm" className="bg-zinc-50-200/60 dark:bg-zinc-900/50">
                  <CardHeader className="p-2.5 pb-1 sm:p-3 sm:pb-1.5">
                    <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 gap-1.5 min-w-0">
                      <span className="text-[9px] uppercase tracking-normal font-semibold truncate">Maintenance</span>
                      <Wrench className="h-3.5 w-3.5 shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-2.5 pt-0 sm:p-3 sm:pt-0">
                    <div className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">18</div>
                    <div className="text-[8.5px] sm:text-[9px] text-zinc-500 dark:text-zinc-400 flex items-start gap-0.5 mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight truncate">
                        <span className="text-zinc-600 dark:text-zinc-300 font-semibold">14 today</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card size="sm" className="bg-zinc-50-200/60 dark:bg-zinc-900/50">
                  <CardHeader className="p-2.5 pb-1 sm:p-3 sm:pb-1.5">
                    <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 gap-1.5 min-w-0">
                      <span className="text-[9px] uppercase tracking-normal font-semibold truncate">Billing</span>
                      <CreditCard className="h-3.5 w-3.5 shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-2.5 pt-0 sm:p-3 sm:pt-0">
                    <div className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">96.4%</div>
                    <div className="text-[8.5px] sm:text-[9px] text-zinc-500 dark:text-zinc-400 flex items-start gap-0.5 mt-0.5">
                      <TrendingUp className="h-3 w-3 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight truncate">
                        <span className="text-emerald-600 font-semibold">+৳14.2k</span> this week
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analytics and Active tasks preview */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Chart Card */}
                <Card size="sm" className="md:col-span-3 -200/60 bg-white dark:bg-zinc-900/50">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Building Energy & Maintenance Expenses</CardTitle>
                      <Badge variant="outline" className="text-[9px] px-2 py-0.5-200/60 text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50">Utility Analytics</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    {/* SVG Line Graph */}
                    <div className="w-full h-36 flex items-end">
                      <svg className="w-full h-full text-zinc-200 dark:text-zinc-800" viewBox="0 0 300 100" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" strokeDasharray="3,3" strokeWidth="0.5" />
                        <line x1="0" y1="50" x2="300" y2="50" stroke="currentColor" strokeDasharray="3,3" strokeWidth="0.5" />
                        <line x1="0" y1="80" x2="300" y2="80" stroke="currentColor" strokeDasharray="3,3" strokeWidth="0.5" />
                        {/* Area Gradient Simulated */}
                        <path
                          d="M0,80 Q30,50 60,65 T120,40 T180,55 T240,25 T300,35 L300,100 L0,100 Z"
                          fill="rgb(99, 102, 241)"
                          fillOpacity="0.08"
                        />
                        {/* Analytics Line */}
                        <path
                          d="M0,80 Q30,50 60,65 T120,40 T180,55 T240,25 T300,35"
                          fill="none"
                          stroke="rgb(99, 102, 241)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Interactive Dot */}
                        <circle cx="240" cy="25" r="4" fill="rgb(99, 102, 241)" stroke="white" strokeWidth="2" className="dark:stroke-zinc-950 xoss-pulse-soft" />
                      </svg>
                    </div>
                    <div className="w-full flex justify-between mt-3 text-[10px] text-zinc-500 dark:text-zinc-400">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun (Peak)</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick tasks overview */}
                <Card size="sm" className="md:col-span-2 -200/60 bg-white dark:bg-zinc-900/50">
                  <CardHeader className="p-5 pb-3">
                    <CardTitle className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Active Incidents</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 space-y-3">
                    <div className="flex items-center justify-between text-xs pb-3 -100 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 p-2 rounded-lg transition-all cursor-pointer -m-2">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">Water Tank C level low</span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Sensor Warning • Block A</span>
                      </div>
                      <Badge variant="outline" className="text-[9px] px-2 py-0.5-200/60 text-amber-700 bg-amber-50/50 dark:text-amber-400 dark:bg-amber-950/30 shadow-sm">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs pb-3 -100 group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 p-2 rounded-lg transition-all cursor-pointer -m-2">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">Visitor Gate #2 system offline</span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Hardware Failure • Security</span>
                      </div>
                      <Badge variant="outline" className="text-[9px] px-2 py-0.5-200/60 text-rose-700 bg-rose-50/50 dark:text-rose-400 dark:bg-rose-950/30 shadow-sm">Critical</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 p-2 rounded-lg transition-all cursor-pointer -m-2">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">Pest Control scheduled</span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Gardens & Parking • 14:00</span>
                      </div>
                      <Badge variant="outline" className="text-[9px] px-2 py-0.5-200/60 text-zinc-600 bg-zinc-50/50 dark:text-zinc-400 dark:bg-zinc-900/50 shadow-sm">Upcoming</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* TAB 2: COMPLAINTS */}
          {activeTab === "complaints" && (
            <div className="space-y-4 xoss-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Complaints & Tickets Inbox</h3>
                  <p className="text-[10px] text-zinc-500">Click a complaint row to toggle through progress stages.</p>
                </div>
                <Button size="xs" className="h-7 text-[10px] gap-1.5">
                  <Plus className="h-3 w-3" /> Raise Ticket
                </Button>
              </div>

              <div className="space-y-2.5">
                {complaints.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => toggleComplaintStatus(item.id)}
                    className="group flex items-center justify-between -200/60 bg-zinc-50/80 p-3 hover:bg-zinc-100/80 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/40 transition-all cursor-pointer"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        <AlertCircle className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-50">
                          {item.title}
                        </div>
                        <div className="flex items-center gap-2 text-[9px] text-zinc-500 dark:text-zinc-400 mt-1">
                          <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">{item.category}</span>
                          <span>•</span>
                          <span>{item.block}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Badge
                        variant="outline"
                        className={`text-[9px] px-2 py-0.5 rounded-lg-200/60 font-medium ${
                          item.priority === "Critical"
                            ? "text-rose-700 bg-rose-50/80 dark:text-rose-400 dark:bg-rose-950/30"
                            : item.priority === "High"
                            ? "text-amber-700 bg-amber-50/80 dark:text-amber-400 dark:bg-amber-950/30"
                            : item.priority === "Medium"
                            ? "text-zinc-700 bg-zinc-100/80 dark:text-zinc-400 dark:bg-zinc-900/50"
                            : "text-zinc-500 bg-zinc-50/50 dark:text-zinc-500"
                        }`}
                      >
                        {item.priority}
                      </Badge>
                      <Badge
                        className={`text-[9px] px-2 py-0.5 rounded-lg font-medium  shadow-sm ${
                          item.status === "Resolved"
                            ? "bg-emerald-50 text-emerald-700-200/60 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : item.status === "In Progress"
                            ? "bg-blue-50 text-blue-700-200/60 dark:bg-blue-950/30 dark:text-blue-400"
                            : item.status === "Assigned"
                            ? "bg-purple-50 text-purple-700-200/60 dark:bg-purple-950/30 dark:text-purple-400"
                            : "bg-zinc-100 text-zinc-600-200/60 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {item.status}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-zinc-300 group-hover:text-zinc-500 dark:text-zinc-700 dark:group-hover:text-zinc-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MAINTENANCE */}
          {activeTab === "maintenance" && (
            <div className="space-y-4 xoss-fade-in">
              <div>
                <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Maintenance & Equipment Status</h3>
                <p className="text-[10px] text-zinc-500">Preventative maintenance, certifications, and tasks.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card size="sm" className="200/60 bg-white dark:bg-zinc-900/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Upcoming Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="flex items-start justify-between text-[11px] group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 p-2 rounded-lg transition-all">
                      <div className="flex gap-2.5">
                        <Clock className="h-4 w-4 text-zinc-400 mt-0.5" />
                        <div>
                          <div className="font-semibold text-zinc-800 dark:text-zinc-200">Fire Hydrant Calibration</div>
                          <div className="text-[9px] text-zinc-500 mt-0.5">June 29, 09:00 AM • Safety Team</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[9px] rounded-lg bg-zinc-100/80 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400 shadow-sm">Scheduled</Badge>
                    </div>

                    <div className="flex items-start justify-between text-[11px] group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 p-2 rounded-lg transition-all">
                      <div className="flex gap-2.5">
                        <Clock className="h-4 w-4 text-zinc-400 mt-0.5" />
                        <div>
                          <div className="font-semibold text-zinc-800 dark:text-zinc-200">Swimming Pool Filtration</div>
                          <div className="text-[9px] text-zinc-500 mt-0.5">July 01, 06:00 AM • Contractor</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[9px] rounded-lg bg-zinc-100/80 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400 shadow-sm">Recurring</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card size="sm" className="200/60 bg-white dark:bg-zinc-900/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Asset Health</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-medium text-zinc-700 dark:text-zinc-300">
                        <span>Passenger Elevator A (Tower 1)</span>
                        <span className="text-emerald-600 font-semibold">99.8% Uptime</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[99.8%] rounded-full xoss-shimmer" style={{ backgroundSize: '1000px 100%' }} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-medium text-zinc-700 dark:text-zinc-300">
                        <span>Central Water Treatment Plant</span>
                        <span className="text-emerald-600 font-semibold">Optimal</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[92%] rounded-full xoss-shimmer" style={{ backgroundSize: '1000px 100%' }} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-medium text-zinc-700 dark:text-zinc-300">
                        <span>Clubhouse HVAC Compressor B</span>
                        <span className="text-amber-500 font-semibold">Needs Service</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 w-[65%] rounded-full xoss-shimmer" style={{ backgroundSize: '1000px 100%' }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* TAB 4: BILLING */}
          {activeTab === "billing" && (
            <div className="space-y-4 xoss-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Billing & Rent Collection</h3>
                  <p className="text-[10px] text-zinc-500">June 2026 Maintenance collection status.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">৳142,500</span>
                  <span className="text-[10px] text-zinc-500">collected of ৳148,000</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-2 bg-zinc-50/80 p-3.5 -200/60 dark:bg-zinc-900/40">
                <div className="flex justify-between text-[10px] text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold">Collection Progress</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">96.3%</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-200/60 dark:bg-zinc-800/60 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 w-[96.3%] transition-all duration-500 rounded-full xoss-shimmer" style={{ backgroundSize: '1000px 100%' }} />
                </div>
              </div>

              {/* Transaction list */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] p-3 -200/60 bg-zinc-50/50 hover:bg-zinc-100/50 transition-all duration-200 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/30">
                  <div className="flex flex-col">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">Unit 1402 (H. Brooks)</span>
                    <span className="text-[9px] text-zinc-500 mt-0.5">Maintenance Fee • June 26</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">৳185.00</span>
                    <Badge variant="outline" className="text-[9px] px-2 py-0.5-200/60 text-emerald-700 bg-emerald-50/80 dark:text-emerald-400 dark:bg-emerald-950/30 shadow-sm">Paid</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] p-3 -200/60 bg-zinc-50/50 hover:bg-zinc-100/50 transition-all duration-200 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/30">
                  <div className="flex flex-col">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">Unit 805 (A. Patel)</span>
                    <span className="text-[9px] text-zinc-500 mt-0.5">Maintenance Fee • June 25</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">৳185.00</span>
                    <Badge variant="outline" className="text-[9px] px-2 py-0.5-200/60 text-emerald-700 bg-emerald-50/80 dark:text-emerald-400 dark:bg-emerald-950/30 shadow-sm">Paid</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] p-3 -200/60 bg-zinc-50/50 hover:bg-zinc-100/50 transition-all duration-200 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/30">
                  <div className="flex flex-col">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">Unit 301 (S. Henderson)</span>
                    <span className="text-[9px] text-zinc-500 mt-0.5">Clubhouse Deposit • June 24</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">৳250.00</span>
                    <Badge variant="outline" className="text-[9px] px-2 py-0.5-200/60 text-rose-700 bg-rose-50/80 dark:text-rose-400 dark:bg-rose-950/30 shadow-sm">Overdue</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
