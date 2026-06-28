"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { StatsRow } from "@/components/dashboard/stats-row";
import { OperationalWidgets } from "@/components/dashboard/operational-widgets";
import { AnalyticsWidgets } from "@/components/dashboard/analytics-widgets";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  Wrench,
  CreditCard,
  ShieldCheck,
  RefreshCw,
  Home,
  DollarSign,
  AlertCircle,
  Percent,
  Clock,
  Plus,
  Send,
  Car,
  FileText,
} from "lucide-react";

export default function DashboardPage() {
  const orgs = ["Tower A - Grandview", "Tower B - Grandview", "Tower C - Grandview"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  // Stakeholder role switcher state
  const [role, setRole] = React.useState<"building_owner" | "flat_owner" | "tenant">("building_owner");

  React.useEffect(() => {
    const saved = localStorage.getItem("buildingos-user-role");
    if (saved) {
      setRole(saved as any);
    }
  }, []);

  const handleRoleChange = (newRole: typeof role) => {
    setRole(newRole);
    localStorage.setItem("buildingos-user-role", newRole);
    toast.success(`Switched dashboard view to ${newRole.replace("_", " ").toUpperCase()} layout.`);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Ledger synced successfully with real-time pipeline records.");
    }, 500);
  };

  // Mock Tenant data
  const [tenantComplaints, setTenantComplaints] = React.useState([
    { id: "TKT-302", category: "Plumbing", text: "Low water pressure in kitchen faucet", status: "In Progress", time: "2h ago" },
    { id: "TKT-301", category: "Electrical", text: "Generator switch fuse tripped", status: "Resolved", time: "2 days ago" },
  ]);
  const [newComplaintText, setNewComplaintText] = React.useState("");
  const [newComplaintCat, setNewComplaintCat] = React.useState("Plumbing");

  const handleTenantComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplaintText.trim()) return;
    const newTkt = {
      id: `TKT-${303 + tenantComplaints.length}`,
      category: newComplaintCat,
      text: newComplaintText,
      status: "Submitted",
      time: "Just now",
    };
    setTenantComplaints((prev) => [newTkt, ...prev]);
    setNewComplaintText("");
    toast.success(`Complaint ticket "${newTkt.id}" submitted successfully to building office.`);
  };

  const activityFeed = [
    {
      id: 1,
      type: "resident",
      text: "Unit 803 registered a new vehicle (White Audi A4)",
      time: "10m ago",
      icon: UserPlus,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20",
    },
    {
      id: 2,
      type: "maintenance",
      text: "Elevator B safety brake testing completed & certified",
      time: "1h ago",
      icon: Wrench,
      color: "text-zinc-600 bg-zinc-100 dark:bg-zinc-900",
    },
    {
      id: 3,
      type: "payment",
      text: "Unit 1402 completed June Maintenance fee transaction",
      time: "2h ago",
      icon: CreditCard,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      id: 4,
      type: "visitor",
      text: "Gate #1 auto-approved access for Amazon delivery crew",
      time: "3h ago",
      icon: ShieldCheck,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20",
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans selection:bg-zinc-200">
      <Toaster position="top-right" />

      {/* Sidebar navigation */}
      <DashboardSidebar
        currentOrg={currentOrg}
        orgs={orgs}
        onOrgChange={(org) => setCurrentOrg(org)}
      />

      {/* Main Workspace Pane */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <DashboardNavbar currentOrg={currentOrg} />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white capitalize">
                {role.replace("_", " ")} Workspace
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                {role === "building_owner"
                  ? "Monitor complaints, maintenance, residents, and financial operations across your buildings."
                  : role === "flat_owner"
                  ? "Track your owned flat assets, collect monthly rent collections, and audit tenant complaints."
                  : "View active utility bills, file complaint tickets, and check parking allocations."}
              </p>
            </div>
            
            {/* View Selector for Demonstration/Testing */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <select
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as any)}
                className="h-8.5 text-[11px] font-bold rounded-sm border border-zinc-200 bg-white px-2.5 dark:border-zinc-850 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 outline-none shadow-sm"
              >
                <option value="building_owner">View: Building Owner</option>
                <option value="flat_owner">View: Flat Owner</option>
                <option value="tenant">View: Varatia (Tenant)</option>
              </select>

              <button
                onClick={handleRefresh}
                className="flex items-center gap-1.5 rounded border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-zinc-750 hover:bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 cursor-pointer shadow-sm outline-none transition-colors"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-indigo-600" : "text-zinc-400"}`} />
                <span>{isRefreshing ? "Syncing..." : "Sync Ledger"}</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* VIEW RENDER BLOCK 1: BUILDING OWNER (Comprehensive Dashboard) */}
          {/* ========================================================================= */}
          {role === "building_owner" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Stats Cards Row */}
              <StatsRow currentOrg={currentOrg} />

              {/* Operational Area (Feed & Task Board) */}
              <OperationalWidgets currentOrg={currentOrg} />

              {/* Bottom Grid: Analytics & Actions Feed */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Analytics Dashboard (Spans 2 columns on large screens) */}
                <div className="lg:col-span-2">
                  <AnalyticsWidgets currentOrg={currentOrg} />
                </div>

                {/* Quick Actions & Live Activity (Takes 1 column) */}
                <div className="space-y-6">
                  {/* Quick Actions Card */}
                  <QuickActions />

                  {/* Recent Activity Timeline Feed */}
                  <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                    <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900">
                      <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                        Recent Activity Audit
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flow-root">
                        <ul role="list" className="-mb-8">
                          {activityFeed.map((event, eventIdx) => {
                            const Icon = event.icon;
                            return (
                              <li key={event.id}>
                                <div className="relative pb-6.5">
                                  {eventIdx !== activityFeed.length - 1 ? (
                                    <span className="absolute left-3 top-3 -ml-px h-full w-0.5 bg-zinc-100 dark:bg-zinc-900" aria-hidden="true" />
                                  ) : null}
                                  <div className="relative flex items-start space-x-3">
                                    <div className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${event.color} `}>
                                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                    </div>
                                    <div className="min-w-0 flex-1 py-0.5">
                                      <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-normal">
                                        {event.text}
                                      </p>
                                      <span className="text-[9.5px] text-zinc-400 mt-1 block">
                                        {event.time}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW RENDER BLOCK 2: FLAT OWNER (Portfolio & Rent Dashboard) */}
          {/* ========================================================================= */}
          {role === "flat_owner" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Custom flat owner stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-3.5 rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Flats Portfolio</span>
                    <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">4 Units</span>
                  </div>
                  <Home className="h-4.5 w-4.5 text-zinc-400" />
                </Card>

                <Card className="p-3.5 rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Monthly Rental Revenue</span>
                    <span className="text-lg font-bold tracking-tight text-emerald-600">৳85,000</span>
                  </div>
                  <DollarSign className="h-4.5 w-4.5 text-emerald-500" />
                </Card>

                <Card className="p-3.5 rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Active Occupancy</span>
                    <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">100% (4/4)</span>
                  </div>
                  <Percent className="h-4.5 w-4.5 text-zinc-400" />
                </Card>

                <Card className="p-3.5 rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Tenant Claims</span>
                    <span className="text-lg font-bold tracking-tight text-rose-600">1 Ticket Open</span>
                  </div>
                  <AlertCircle className="h-4.5 w-4.5 text-rose-500" />
                </Card>
              </div>

              {/* Main table details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-8">
                  <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
                    <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900">
                      <CardTitle className="text-xs font-bold uppercase tracking-wider">My Owned Flats Directory</CardTitle>
                      <CardDescription className="text-[10px]">Registry of rental properties, tenant leases, and ledger balance status.</CardDescription>
                    </CardHeader>
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-zinc-50/50 border-b border-zinc-200 text-zinc-500 dark:bg-zinc-955/20 dark:border-zinc-850">
                          <tr>
                            <th className="px-4 py-2.5 font-bold uppercase text-[9.5px]">Flat ID</th>
                            <th className="px-4 py-2.5 font-bold uppercase text-[9.5px]">Building Block</th>
                            <th className="px-4 py-2.5 font-bold uppercase text-[9.5px]">Active Tenant</th>
                            <th className="px-4 py-2.5 font-bold uppercase text-[9.5px] text-right">Rent Income</th>
                            <th className="px-4 py-2.5 font-bold uppercase text-[9.5px] text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                          {[
                            { id: "Flat 1402", bld: "Tower Alpha", tenant: "Dave Miller", rent: "৳22,000", status: "Paid" },
                            { id: "Flat 805", bld: "Tower Alpha", tenant: "Sarah Connor", rent: "৳20,000", status: "Paid" },
                            { id: "Flat 201", bld: "Tower Beta", tenant: "Peter Parker", rent: "৳25,000", status: "Paid" },
                            { id: "Flat 302", bld: "Oak Block", tenant: "Diana Prince", rent: "৳18,000", status: "Unpaid" },
                          ].map((item, idx) => (
                            <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                              <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">{item.id}</td>
                              <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{item.bld}</td>
                              <td className="px-4 py-3 text-zinc-650 dark:text-zinc-300 font-medium">{item.tenant}</td>
                              <td className="px-4 py-3 text-right font-bold text-zinc-900 dark:text-white">{item.rent}</td>
                              <td className="px-4 py-3 text-center">
                                <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold border ${
                                  item.status === "Paid"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                    : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-955/20 dark:text-amber-450"
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>

                {/* Sidebar list: Tenant complaints */}
                <div className="lg:col-span-4 space-y-4">
                  <Card className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-850 dark:bg-zinc-950 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Tenant Issues Queue</h3>
                    <div className="space-y-3">
                      <div className="p-2.5 rounded border border-zinc-150 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-950/40 text-xs space-y-1.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <Badge variant="outline" className="text-[8.5px] px-1 rounded bg-rose-50 border-rose-200 text-rose-700">Plumbing</Badge>
                          <span className="text-zinc-400">Flat 302 • 1h ago</span>
                        </div>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-snug">Kitchen wall seepage leak reported by Diana Prince.</p>
                        <div className="flex gap-1.5 justify-end pt-1">
                          <Button size="xs" onClick={() => toast.info("Dispatching technician to Diana Prince flat...")} className="h-6.5 text-[9px] bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm">Assign Technician</Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-850 dark:bg-zinc-950 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <Button onClick={() => toast.success("Lease documentation template generated.")} variant="outline" className="w-full justify-start h-8 text-[11px] font-semibold rounded-sm">
                        <FileText className="h-3.5 w-3.5 mr-2 text-zinc-400" /> New Tenant Lease Contract
                      </Button>
                      <Button onClick={() => toast.success("Rent collection reminder emails sent to Diana Prince.")} variant="outline" className="w-full justify-start h-8 text-[11px] font-semibold rounded-sm">
                        <DollarSign className="h-3.5 w-3.5 mr-2 text-zinc-400" /> Remind Outstanding Payments
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW RENDER BLOCK 3: TENANT (Varatia Self-Service Portal) */}
          {/* ========================================================================= */}
          {role === "tenant" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Custom tenant stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-3.5 rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Utility Balance Dues</span>
                    <span className="text-lg font-bold tracking-tight text-rose-600">৳2,450</span>
                  </div>
                  <CreditCard className="h-4.5 w-4.5 text-rose-500" />
                </Card>

                <Card className="p-3.5 rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Registered Cars</span>
                    <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">1 Unit</span>
                  </div>
                  <Car className="h-4.5 w-4.5 text-zinc-400" />
                </Card>

                <Card className="p-3.5 rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Submitted Tickets</span>
                    <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                      {tenantComplaints.filter((c) => c.status !== "Resolved").length} Active
                    </span>
                  </div>
                  <AlertCircle className="h-4.5 w-4.5 text-zinc-400" />
                </Card>

                <Card className="p-3.5 rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">My Parking Spot</span>
                    <span className="text-lg font-bold tracking-tight text-indigo-600">Bay P-12</span>
                  </div>
                  <Home className="h-4.5 w-4.5 text-indigo-500" />
                </Card>
              </div>

              {/* Main bodies */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Pay utility and view active lease */}
                <div className="lg:col-span-7 space-y-5">
                  
                  {/* Bill Card */}
                  <Card className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-850 dark:bg-zinc-950 space-y-4">
                    <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900 pb-2">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Outstanding Statement</h3>
                        <span className="text-[10px] text-zinc-400">June Utility Statement due by July 10, 2026</span>
                      </div>
                      <Badge variant="outline" className="text-[9px] font-bold rounded-sm border-rose-200 bg-rose-50 text-rose-700">Unpaid Dues</Badge>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Water Consumption (2,400 Litres):</span>
                        <span className="font-semibold text-zinc-850 dark:text-zinc-200">৳750</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Generator Fuel Allocation (14.5 Hrs):</span>
                        <span className="font-semibold text-zinc-850 dark:text-zinc-200">৳900</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Common Building Maintenance:</span>
                        <span className="font-semibold text-zinc-850 dark:text-zinc-200">৳800</span>
                      </div>
                      <div className="flex justify-between border-t border-zinc-100 pt-2 font-bold text-zinc-900 dark:text-white text-sm">
                        <span>Total Utility Amount:</span>
                        <span>৳2,450</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => toast.success("Redirecting to online payment gateway...")}
                      className="w-full h-9 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-sm gap-1.5 shadow-sm"
                    >
                      <CreditCard className="h-4 w-4" /> Pay Bill Online (Secure)
                    </Button>
                  </Card>

                  {/* Lease Detail Card */}
                  <Card className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-850 dark:bg-zinc-950 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">My Active Lease Contract</h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-zinc-400 block text-[9.5px]">ALLOCATED FLAT</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">Flat 1402 (Tower Alpha)</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[9.5px]">LANDLORD PROPERTY OWNER</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">Stephen Strange</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[9.5px]">RENT AMOUNT</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">৳22,000 / month</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[9.5px]">LEASE PERIOD RANGE</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">June 2025 - Dec 2026</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Submit complaints form & recent filed tickets */}
                <div className="lg:col-span-5 space-y-5">
                  {/* File ticket */}
                  <Card className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-850 dark:bg-zinc-950 space-y-3.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Submit Maintenance Request</h3>
                    <form onSubmit={handleTenantComplaintSubmit} className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="tkt-cat" className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">Category</Label>
                        <select
                          id="tkt-cat"
                          value={newComplaintCat}
                          onChange={(e) => setNewComplaintCat(e.target.value)}
                          className="w-full h-8 text-xs rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-850 dark:bg-zinc-950 outline-none"
                        >
                          <option value="Plumbing">Plumbing Leak</option>
                          <option value="Electrical">Electrical Switchboard</option>
                          <option value="Elevator">Elevator / Lift Service</option>
                          <option value="Security">Security Access / Gate</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="tkt-desc" className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">Problem Description</Label>
                        <textarea
                          id="tkt-desc"
                          rows={2.5}
                          required
                          value={newComplaintText}
                          onChange={(e) => setNewComplaintText(e.target.value)}
                          placeholder="e.g. Bathroom drain is clogged or lights flickering in hall room..."
                          className="w-full rounded border border-zinc-205 p-2 text-xs bg-white dark:border-zinc-850 dark:bg-zinc-950 outline-none resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-8 bg-zinc-900 hover:bg-zinc-850 text-white font-semibold text-xs rounded-sm gap-1.5"
                      >
                        <Send className="h-3.5 w-3.5" /> Dispatch Ticket
                      </Button>
                    </form>
                  </Card>

                  {/* My Tickets list */}
                  <Card className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-850 dark:bg-zinc-950 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">My Maintenance Log</h3>
                    <div className="space-y-2.5">
                      {tenantComplaints.map((item) => (
                        <div key={item.id} className="p-2.5 rounded border border-zinc-150 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-950/40 text-xs space-y-1">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-bold text-zinc-900 dark:text-white">{item.id} ({item.category})</span>
                            <span className="text-zinc-400">{item.time}</span>
                          </div>
                          <p className="text-zinc-700 dark:text-zinc-300 leading-snug">{item.text}</p>
                          <div className="flex justify-between items-center pt-1 border-t border-zinc-200/50 dark:border-zinc-800/50 text-[9.5px]">
                            <span className="text-zinc-400">Current Stage:</span>
                            <span className={`font-bold ${
                              item.status === "Resolved"
                                ? "text-emerald-600"
                                : item.status === "In Progress"
                                ? "text-amber-600"
                                : "text-zinc-600"
                            }`}>{item.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}
