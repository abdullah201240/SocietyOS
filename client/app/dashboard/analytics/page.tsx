"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  Clock,
  Filter,
  Download,
  HelpCircle,
  ShieldCheck,
  DollarSign,
  Activity,
  Briefcase,
  Users,
} from "lucide-react";

export default function AnalyticsPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Filters State
  const [selectedBuilding, setSelectedBuilding] = React.useState("All");
  const [dateRange, setDateRange] = React.useState("Last 30 Days");
  const [threshold, setThreshold] = React.useState("All");

  const handleExport = () => {
    toast.success("Operational analytics dataset exported as CSV.");
  };

  const handleReportSchedule = () => {
    toast.success("Insight PDF report scheduled for weekly email delivery.");
  };

  const handleCompare = () => {
    toast.info("Opening multi-building comparison grid.");
  };

  // Mock Ranking Data
  const buildingComparison = [
    { name: "Tower Alpha", occupancy: 94.4, health: 96, complaints: 2, tasks: 12, risk: "healthy" },
    { name: "Tower Beta", occupancy: 89.6, health: 92, complaints: 5, tasks: 8, risk: "healthy" },
    { name: "Tower Gamma", occupancy: 88.1, health: 81, complaints: 4, tasks: 15, risk: "warning" },
    { name: "Block East", occupancy: 92.0, health: 98, complaints: 2, tasks: 4, risk: "healthy" },
    { name: "Clubhouse Wing", occupancy: 80.0, health: 95, complaints: 0, tasks: 2, risk: "neutral" }
  ];

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 -200/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Advanced Analytics & Insights
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Gain deep operational intelligence across all communities, buildings, and residents.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleCompare}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm"
              >
                Compare Buildings
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleReportSchedule}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm"
              >
                Schedule Reports
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Analytics Data</span>
              </Button>
              <Button
                size="xs"
                onClick={() => toast.success("PDF Insights Summary generated.")}
                className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm"
              >
                Generate Insight Report
              </Button>
            </div>
          </div>

          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Operational Efficiency</span>
                  <Activity className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">94.2%</span>
                  <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-emerald-600">
                    <TrendingUp className="h-3 w-3" /> +1.2%
                  </span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Complaint Resolution</span>
                  <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">14.0 Hrs</span>
                  <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-emerald-600">
                    <TrendingUp className="h-3 w-3" /> -2.4 Hrs
                  </span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-455 dark:text-zinc-500">Collection Rate</span>
                  <DollarSign className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">96.3%</span>
                  <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-rose-600">
                    -0.4%
                  </span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-455 dark:text-zinc-500">SLA Compliance</span>
                  <ShieldCheck className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">92.4%</span>
                  <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-emerald-600">
                    +0.8%
                  </span>
              </div>
            </CardContent>
            </Card>
          </div>

          {/* Grid Workspace */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters */}
            <div className="w-full lg:w-56 shrink-0 space-y-4">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
                <CardHeader className="p-3.5 -100 flex flex-row items-center gap-1.5 space-y-0">
                  <Filter className="h-3.5 w-3.5 text-zinc-450" />
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Analytics Scope
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 space-y-4">
                  
                  {/* Building Scope */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Building Scope</Label>
                    <select
                      value={selectedBuilding}
                      onChange={(e) => setSelectedBuilding(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All buildings</option>
                      <option value="Tower Alpha">Tower Alpha</option>
                      <option value="Tower Beta">Tower Beta</option>
                      <option value="Tower Gamma">Tower Gamma</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Reporting Range</Label>
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="Today">Today</option>
                      <option value="Last 7 Days">Last 7 Days</option>
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option value="This Quarter">This Quarter</option>
                    </select>
                  </div>

                  {/* Threshold */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Performance Threshold</Label>
                    <select
                      value={threshold}
                      onChange={(e) => setThreshold(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All ranges</option>
                      <option value="High Risk">High Risk Alerts (&lt; 85%)</option>
                      <option value="Warning">Warning Alerts (&lt; 90%)</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedBuilding("All");
                      setDateRange("Last 30 Days");
                      setThreshold("All");
                      toast.success("Filters reset to default.");
                    }}
                    variant="outline"
                    className="w-full h-7 text-[10px] font-semibold-200 hover:bg-zinc-50 rounded-sm"
                  >
                    Reset filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Charts & Table Area */}
            <div className="flex-1 space-y-6">
              
              {/* Row 1: Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Complaint Pattern Analysis */}
                <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950 p-4">
                  <div className="flex items-center gap-1 -100 pb-2 mb-3.5">
                    <AlertCircle className="h-4 w-4 text-zinc-400" />
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Complaint Pattern Analysis</h3>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center text-[11px] text-zinc-555">
                      <span>Plumbing issues frequency</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">42% (Recurring)</span>
                    </div>
                    <Progress value={42} className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    <div className="flex justify-between items-center text-[11px] text-zinc-555">
                      <span>Electrical issues frequency</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">28%</span>
                    </div>
                    <Progress value={28} className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    <div className="flex justify-between items-center text-[11px] text-zinc-550">
                      <span>Elevator faults frequency</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">18%</span>
                    </div>
                    <Progress value={18} className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    <div className="pt-2 -100 flex justify-between text-[10px] text-zinc-455 uppercase font-bold">
                      <span>Peak Hours: 08:30 AM - 10:00 AM</span>
                      <span className="text-rose-600">Unresolved Clusters: 2</span>
                    </div>
                  </div>
                </Card>

                {/* 2. Financial Behavior Insights */}
                <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950 p-4">
                  <div className="flex items-center gap-1 -100 pb-2 mb-3.5">
                    <DollarSign className="h-4 w-4 text-zinc-400" />
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Financial Behavior Insights</h3>
                  </div>
                  <div className="space-y-3.5">
                    {/* SVG bar chart */}
                    <div className="h-28 w-full flex items-end justify-between gap-1.5 pt-4 px-2">
                      <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div className="w-full bg-zinc-200 dark:bg-zinc-800 hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors rounded-t-sm h-[80%]" />
                        <span className="text-[9px] text-zinc-400 font-semibold">Mar</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div className="w-full bg-zinc-200 dark:bg-zinc-800 hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors rounded-t-sm h-[85%]" />
                        <span className="text-[9px] text-zinc-400 font-semibold">Apr</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div className="w-full bg-zinc-200 dark:bg-zinc-800 hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors rounded-t-sm h-[92%]" />
                        <span className="text-[9px] text-zinc-400 font-semibold">May</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-t-sm h-[96%]" />
                        <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold">Jun</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-455 -100 pt-2">
                      <span>Overdue aging avg: 4.8 days</span>
                      <span>Leakage indicators: None</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Row 2: Building Performance Ranking Comparison Grid */}
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
                <div className="p-4 -100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <BarChart3 className="h-4 w-4 text-zinc-400" />
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Building Performance Comparison</h3>
                  </div>
                  <span className="text-[10px] text-zinc-450 font-bold">Ranking based on Health Score</span>
                </div>
                <Table>
                  <TableHeader className="bg-zinc-50/50 -200 dark:bg-zinc-950/20">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider h-8">Building Name</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider text-center h-8">Occupancy Rate</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider text-center h-8">Complaints</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider text-center h-8">Tasks Closed</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider text-right h-8">Operational Health</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider text-center h-8">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                    {buildingComparison.map((item, idx) => (
                      <TableRow key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                        <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2">{item.name}</TableCell>
                        <TableCell className="text-xs font-medium text-center text-zinc-800 dark:text-zinc-200 py-2">{item.occupancy}%</TableCell>
                        <TableCell className="text-xs font-medium text-center text-zinc-800 dark:text-zinc-200 py-2">{item.complaints}</TableCell>
                        <TableCell className="text-xs font-medium text-center text-zinc-800 dark:text-zinc-200 py-2">{item.tasks}</TableCell>
                        <TableCell className="text-xs font-bold text-right text-zinc-900 dark:text-white py-2">{item.health}%</TableCell>
                        <TableCell className="text-center py-2">
                          <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold  ${
                            item.risk === "healthy"
                              ? "bg-emerald-50 text-emerald-700-200 dark:bg-emerald-950/20 dark:text-emerald-450"
                              : item.risk === "warning"
                              ? "bg-amber-50 text-amber-700-200 dark:bg-amber-955/20 dark:text-amber-450"
                              : "bg-zinc-100 text-zinc-650-200 dark:bg-zinc-800 dark:text-zinc-400"
                          }`}>
                            {item.risk}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Row 3: Staff & Resident Engagement metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Staff completion efficiency */}
                <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950 p-4">
                  <div className="flex items-center gap-1 -100 pb-2 mb-3.5">
                    <Briefcase className="h-4 w-4 text-zinc-400" />
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Staff Workload Distribution</h3>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center text-[11px] text-zinc-555">
                      <span>Steve Rogers (Security)</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">96% Completed</span>
                    </div>
                    <Progress value={96} className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    <div className="flex justify-between items-center text-[11px] text-zinc-555">
                      <span>Marcus Stone (Manager)</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">90% Completed</span>
                    </div>
                    <Progress value={90} className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    <div className="flex justify-between items-center text-[11px] text-zinc-555">
                      <span>Bruce Banner (Maintenance)</span>
                      <span className="font-semibold text-rose-600">65% (Overloaded)</span>
                    </div>
                    <Progress value={65} className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                  </div>
                </Card>

                {/* Resident engagement metrics */}
                <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950 p-4">
                  <div className="flex items-center gap-1 -100 pb-2 mb-3.5">
                    <Users className="h-4 w-4 text-zinc-400" />
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Resident Engagement Metrics</h3>
                  </div>
                  <div className="space-y-3.5 text-xs text-zinc-550 dark:text-zinc-350">
                    <div className="flex justify-between -100 pb-2">
                      <span>Complaint Submission Rate</span>
                      <span className="font-semibold text-zinc-850 dark:text-zinc-200">12% / month</span>
                    </div>
                    <div className="flex justify-between -100 pb-2">
                      <span>Payment Consistency Rating</span>
                      <span className="font-bold text-emerald-600">Optimal (98%)</span>
                    </div>
                    <div className="flex justify-between -100 pb-2">
                      <span>Mobile App Usage Frequency</span>
                      <span className="font-semibold text-zinc-850 dark:text-zinc-200">84% Daily Active</span>
                    </div>
                  </div>
                </Card>

              </div>

            </div>

          </div>

        </main>
      </div>

    </div>
  );
}
