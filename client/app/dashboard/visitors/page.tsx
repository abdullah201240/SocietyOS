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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Fingerprint,
  Users,
  AlertCircle,
  ChevronRight,
  Filter,
  Plus,
  Upload,
  Download,
  Search,
  User,
  Clock,
  HelpCircle,
  ShieldCheck,
  FileText,
  Key,
} from "lucide-react";

// Types
interface VisitorRecord {
  id: string; // e.g. VIS-1002
  name: string;
  hostName: string;
  flatNumber: string;
  buildingName: string;
  purpose: "Delivery" | "Guest" | "Maintenance" | "Emergency" | "Other";
  entryTime: string;
  exitTime: string;
  status: "Approved" | "Pending" | "Rejected" | "Checked-in";
  verificationStatus: "Verified (OTP)" | "Verified (Manual)" | "Pending" | "Failed";
  vehicleNumber: string;
  timeline: { title: string; time: string; note: string }[];
  incidentNotes?: string;
  securityApprovalLog: string[];
}

export default function VisitorsPage() {
  const orgs = ["Grandview Towers", "Meadow View Complex", "Parkside Residences"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Initial Mock Visitor Records
  const [visitors, setVisitors] = React.useState<VisitorRecord[]>([
    {
      id: "VIS-1082",
      name: "Marcus Aurelius",
      hostName: "Harold Brooks",
      flatNumber: "1402",
      buildingName: "Tower Alpha",
      purpose: "Guest",
      entryTime: "10:30 AM",
      exitTime: "Active",
      status: "Checked-in",
      verificationStatus: "Verified (OTP)",
      vehicleNumber: "ROM-77BC",
      timeline: [
        { title: "Pre-Approval Requested", time: "09:00 AM", note: "Harold Brooks generated visitor pass key." },
        { title: "OTP Verified", time: "10:25 AM", note: "OTP verified at Main Gate A." },
        { title: "Checked-in", time: "10:30 AM", note: "Passed vehicle check. Entry allowed." }
      ],
      securityApprovalLog: ["Lobby Guard Marcus checked ID proof."]
    },
    {
      id: "VIS-1083",
      name: "FedEx Express (John)",
      hostName: "Sarah Connor",
      flatNumber: "805",
      buildingName: "Tower Alpha",
      purpose: "Delivery",
      entryTime: "11:20 AM",
      exitTime: "11:35 AM",
      status: "Approved",
      verificationStatus: "Verified (Manual)",
      vehicleNumber: "FED-400X",
      timeline: [
        { title: "Manual Checkin", time: "11:20 AM", note: "Host resident verbally confirmed delivery request." },
        { title: "Checked-out", time: "11:35 AM", note: "Delivery completed. Guard logged exit." }
      ],
      securityApprovalLog: ["Verbal confirmation call logged."]
    },
    {
      id: "VIS-1084",
      name: "Acme Plumbing (Dave)",
      hostName: "David Vance",
      flatNumber: "1204",
      buildingName: "Tower Alpha",
      purpose: "Maintenance",
      entryTime: "Pending",
      exitTime: "Pending",
      status: "Pending",
      verificationStatus: "Pending",
      vehicleNumber: "N/A",
      timeline: [
        { title: "Request Pending", time: "08:15 AM", note: "Awaiting resident confirmation verification." }
      ],
      securityApprovalLog: []
    },
    {
      id: "VIS-1080",
      name: "Arthur Dent",
      hostName: "Elena Rostova",
      flatNumber: "302",
      buildingName: "Tower Beta",
      purpose: "Other",
      entryTime: "02:00 PM",
      exitTime: "02:15 PM",
      status: "Rejected",
      verificationStatus: "Failed",
      vehicleNumber: "N/A",
      timeline: [
        { title: "Declined", time: "02:00 PM", note: "Resident Elena Rostova declined access request." }
      ],
      incidentNotes: "Visitor claimed to have lost his towel. Security guard escorted off premises.",
      securityApprovalLog: []
    }
  ]);

  // Form State
  const [newVisitor, setNewVisitor] = React.useState({
    name: "",
    hostName: "",
    flatNumber: "",
    buildingName: "Tower Alpha",
    purpose: "Guest" as any,
    vehicleNumber: "",
  });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedVisitor, setSelectedVisitor] = React.useState<VisitorRecord | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [filterBuilding, setFilterBuilding] = React.useState("All");
  const [filterType, setFilterType] = React.useState("All"); // Purpose
  const [filterSecurity, setFilterSecurity] = React.useState("All"); // Verification status

  const handlePreApprove = (e: React.FormEvent) => {
    e.preventDefault();
    const created: VisitorRecord = {
      id: `VIS-${1000 + visitors.length + 1}`,
      name: newVisitor.name,
      hostName: newVisitor.hostName,
      flatNumber: newVisitor.flatNumber,
      buildingName: newVisitor.buildingName,
      purpose: newVisitor.purpose,
      entryTime: "Pending",
      exitTime: "Pending",
      status: "Approved",
      verificationStatus: "Verified (OTP)",
      vehicleNumber: newVisitor.vehicleNumber || "N/A",
      timeline: [
        { title: "Pre-Approval Issued", time: new Date().toLocaleTimeString(), note: "Pre-approval OTP generated." }
      ],
      securityApprovalLog: ["Pre-approved by host resident."]
    };

    setVisitors((prev) => [created, ...prev]);
    setCreateOpen(false);
    toast.success(`Visitor Pre-Approved! Pass OTP sent to ${created.name}`);

    // Reset Form
    setNewVisitor({
      name: "",
      hostName: "",
      flatNumber: "",
      buildingName: "Tower Alpha",
      purpose: "Guest",
      vehicleNumber: "",
    });
  };

  const handleCheckin = (id: string) => {
    setVisitors((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          return {
            ...v,
            status: "Checked-in",
            entryTime: "Just now",
            timeline: [...v.timeline, { title: "Checked-in", time: "Just now", note: "Gate clearance approved by guard." }]
          };
        }
        return v;
      })
    );
    setSelectedVisitor((prev) => prev && prev.id === id ? { ...prev, status: "Checked-in", entryTime: "Just now" } : prev);
    toast.success(`Visitor checked-in successfully!`);
  };

  const handleCheckout = (id: string) => {
    setVisitors((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          return {
            ...v,
            status: "Approved",
            exitTime: "Just now",
            timeline: [...v.timeline, { title: "Checked-out", time: "Just now", note: "Guard logged exit check." }]
          };
        }
        return v;
      })
    );
    setSelectedVisitor((prev) => prev && prev.id === id ? { ...prev, status: "Approved", exitTime: "Just now" } : prev);
    toast.success(`Visitor logged exit check-out.`);
  };

  const handleAddSecurityLog = () => {
    toast.info("Add manual incident report check.");
  };

  const handleExport = () => {
    toast.success("Visitor access logs audit sheet exported.");
  };

  // Filter Table List
  const filteredVisitors = visitors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.hostName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.flatNumber.includes(searchQuery);

    const matchesStatus = filterStatus === "All" || v.status === filterStatus;
    const matchesBuilding = filterBuilding === "All" || v.buildingName === filterBuilding;
    const matchesType = filterType === "All" || v.purpose === filterType;

    let matchesSecurity = true;
    if (filterSecurity === "Verified") matchesSecurity = v.verificationStatus.includes("Verified");
    else if (filterSecurity === "Pending") matchesSecurity = v.verificationStatus === "Pending";

    return matchesSearch && matchesStatus && matchesBuilding && matchesType && matchesSecurity;
  });

  // Calculate Metrics
  const totalVisitorsToday = visitors.filter((v) => v.status === "Checked-in" || v.exitTime !== "Pending").length;
  const pendingApprovalsCount = visitors.filter((v) => v.status === "Pending").length;
  const activeAlertsCount = visitors.filter((v) => v.status === "Rejected").length;
  const deliveryEntriesCount = visitors.filter((v) => v.purpose === "Delivery").length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans selection:bg-zinc-200">
      <Toaster position="top-right" />

      {/* Sidebar Links */}
      <DashboardSidebar
        currentOrg={currentOrg}
        orgs={orgs}
        onOrgChange={(org) => setCurrentOrg(org)}
      />

      {/* Main Content Workspace */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <DashboardNavbar currentOrg={currentOrg} />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 -200/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Visitor & Security Management
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Control visitor access, track entry logs, manage security operations, and monitor gate activity across communities.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleAddSecurityLog}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <AlertCircle className="h-3.5 w-3.5 text-zinc-400" />
                <span>Add Security Log</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Visitor Report</span>
              </Button>

              {/* PRE-APPROVE DIALOG */}
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="xs"
                    className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Pre-Approve Visitor</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] -200 bg-white dark:bg-zinc-950 p-6 rounded-md">
                  <form onSubmit={handlePreApprove}>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Pre-Approve Visitor entry</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">Generate secure visitor pass OTP keys for resident guests.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3.5 py-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="v-name" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Name</Label>
                        <Input
                          id="v-name"
                          required
                          value={newVisitor.name}
                          onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
                          placeholder="e.g. Marcus Aurelius"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="v-host" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Host Name</Label>
                        <Input
                          id="v-host"
                          required
                          value={newVisitor.hostName}
                          onChange={(e) => setNewVisitor({ ...newVisitor, hostName: e.target.value })}
                          placeholder="e.g. Harold Brooks"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="v-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat Unit</Label>
                        <Input
                          id="v-flat"
                          required
                          value={newVisitor.flatNumber}
                          onChange={(e) => setNewVisitor({ ...newVisitor, flatNumber: e.target.value })}
                          placeholder="e.g. 1402"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="v-tower" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Building</Label>
                        <select
                          id="v-tower"
                          value={newVisitor.buildingName}
                          onChange={(e) => setNewVisitor({ ...newVisitor, buildingName: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Tower Alpha">Tower Alpha</option>
                          <option value="Tower Beta">Tower Beta</option>
                          <option value="Tower Gamma">Tower Gamma</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="v-purpose" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Purpose</Label>
                        <select
                          id="v-purpose"
                          value={newVisitor.purpose}
                          onChange={(e) => setNewVisitor({ ...newVisitor, purpose: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Guest">Guest</option>
                          <option value="Delivery">Delivery</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Emergency">Emergency</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="v-vehicle" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Vehicle No</Label>
                        <Input
                          id="v-vehicle"
                          value={newVisitor.vehicleNumber}
                          onChange={(e) => setNewVisitor({ ...newVisitor, vehicleNumber: e.target.value })}
                          placeholder="e.g. ROM-77BC"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                      <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Pre-Approve</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Today's Visitors</span>
                  <Users className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{totalVisitorsToday}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Pending Approvals</span>
                  <Fingerprint className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{pendingApprovalsCount}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-455 dark:text-zinc-500">Security Alerts</span>
                  <AlertCircle className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{activeAlertsCount}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-455 dark:text-zinc-500">Delivery Entries</span>
                  <FileText className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{deliveryEntriesCount}</span>
              </div>
            </CardContent>
            </Card>
          </div>

          {/* Table & Sidebar filters grid layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters */}
            <div className="w-full lg:w-56 shrink-0 space-y-4">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
                <CardHeader className="p-3.5 -100 flex flex-row items-center gap-1.5 space-y-0">
                  <Filter className="h-3.5 w-3.5 text-zinc-450" />
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Access Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 space-y-4">
                  
                  {/* Status Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Approval status</Label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All statuses</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Checked-in">Checked-in</option>
                    </select>
                  </div>

                  {/* Building Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Building Block</Label>
                    <select
                      value={filterBuilding}
                      onChange={(e) => setFilterBuilding(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All buildings</option>
                      <option value="Tower Alpha">Tower Alpha</option>
                      <option value="Tower Beta">Tower Beta</option>
                      <option value="Tower Gamma">Tower Gamma</option>
                    </select>
                  </div>

                  {/* Visitor Type (Purpose) Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Visitor type</Label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All types</option>
                      <option value="Guest">Guest</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Emergency">Emergency</option>
                    </select>
                  </div>

                  {/* Security Verification Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Security verification</Label>
                    <select
                      value={filterSecurity}
                      onChange={(e) => setFilterSecurity(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All verifications</option>
                      <option value="Verified">Verified credentials</option>
                      <option value="Pending">Pending verify check</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      setFilterStatus("All");
                      setFilterBuilding("All");
                      setFilterType("All");
                      setFilterSecurity("All");
                      setSearchQuery("");
                    }}
                    variant="outline"
                    className="w-full h-7 text-[10px] font-semibold-200 hover:bg-zinc-50 rounded-sm"
                  >
                    Clear filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Table Area */}
            <div className="flex-1 min-w-0">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
                <CardHeader className="p-4 -100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 space-y-0">
                  <div className="relative max-w-sm w-72">
                    <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      type="text"
                      placeholder="Search visitors by name, Flat, vehicle..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full rounded-sm-200 pl-8 text-xs outline-none bg-zinc-50/50 dark:bg-zinc-900 focus:bg-white focus:indigo-500 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Showing {filteredVisitors.length} of {visitors.length} entries
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredVisitors.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No visitor logs found</span>
                      <span className="text-[10px] mt-0.5">Try resetting filter metrics.</span>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 -200 dark:bg-zinc-950/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Visitor Name</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Host Resident</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Building/Flat</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Purpose of visit</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Entry time</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Exit time</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Approval Status</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Security Verification</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Vehicle Number</TableHead>
                          <TableHead className="w-9 h-9" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                        {filteredVisitors.map((v) => (
                          <TableRow
                            key={v.id}
                            onClick={() => setSelectedVisitor(v)}
                            className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/20 cursor-pointer transition-colors"
                          >
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {v.name}
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {v.hostName}
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 py-2.5">
                              {v.buildingName} - {v.flatNumber}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-center text-zinc-850 dark:text-zinc-250 py-2.5">
                              {v.purpose}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-center text-zinc-800 dark:text-zinc-200 py-2.5">
                              {v.entryTime}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-center text-zinc-800 dark:text-zinc-200 py-2.5">
                              {v.exitTime}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold  ${
                                v.status === "Approved"
                                  ? "bg-emerald-55 text-emerald-700-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : v.status === "Pending"
                                  ? "bg-amber-50 text-amber-700-200 dark:bg-amber-955/20 dark:text-amber-450"
                                  : v.status === "Rejected"
                                  ? "bg-rose-50 text-rose-700-250 dark:bg-rose-955/20 dark:text-rose-455"
                                  : "bg-blue-50 text-blue-700-200 dark:bg-blue-955/20 dark:text-blue-450"
                              }`}>
                                {v.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-xs font-medium text-center text-zinc-850 dark:text-zinc-250 py-2.5">
                              {v.verificationStatus}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-center text-zinc-800 dark:text-zinc-200 py-2.5">
                              {v.vehicleNumber}
                            </TableCell>
                            <TableCell className="py-2.5 text-zinc-400 text-right">
                              <ChevronRight className="h-4 w-4 shrink-0 inline-block" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>

          </div>

        </main>
      </div>

      {/* VISITOR DETAILS DRAWER */}
      <Sheet open={selectedVisitor !== null} onOpenChange={(open) => !open && setSelectedVisitor(null)}>
        <SheetContent className="w-full sm:max-w-md -200 bg-white dark:bg-zinc-950 p-0 text-zinc-900 dark:text-zinc-50 flex flex-col h-full shadow-lg">
          {selectedVisitor && (
            <div className="flex flex-col h-full overflow-hidden">
              <SheetHeader className="p-4 -100">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-indigo-650 dark:text-indigo-400 tracking-wider">
                  <Fingerprint className="h-3.5 w-3.5" /> Visitor access profile
                </div>
                <SheetTitle className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                  {selectedVisitor.name}
                </SheetTitle>
                <SheetDescription className="text-[10px] text-zinc-550 mt-0.5">
                  Host: {selectedVisitor.hostName} (Flat {selectedVisitor.flatNumber}) • Purpose: {selectedVisitor.purpose}
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body Viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                
                {/* Security incident panel */}
                {selectedVisitor.incidentNotes && (
                  <div className="rounded -200 bg-rose-50/50 p-3 text-xs text-rose-700 dark:bg-rose-955/20 flex gap-2">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-rose-600" />
                    <div>
                      <span className="font-bold block">Incident Log Report</span>
                      <span className="text-[10px] block mt-0.5 leading-snug">{selectedVisitor.incidentNotes}</span>
                    </div>
                  </div>
                )}

                {/* 1. Host & Visitor Details */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Access credentials</span>
                  <div className="rounded -150 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-zinc-400 block text-[9px]">VEHICLE REGISTRATION</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedVisitor.vehicleNumber}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[9px]">OTP VERIFICATION</span>
                      <span className="font-semibold">{selectedVisitor.verificationStatus}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Timeline history */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Check-in timeline checkpoints</span>
                  <div className="space-y-3 font-medium">
                    {selectedVisitor.timeline.map((item, idx) => (
                      <div key={idx} className="flex gap-2.5 text-xs -100 pl-3 ml-1.5">
                        <div>
                          <span className="font-bold text-zinc-900 dark:text-white block leading-tight">{item.title}</span>
                          <span className="text-[10px] text-zinc-550 block mt-0.5">{item.note}</span>
                          <span className="text-[9px] text-zinc-400 block mt-0.5">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Security Approval logs */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Security approval logs</span>
                  {selectedVisitor.securityApprovalLog.length === 0 ? (
                    <span className="text-[10px] text-zinc-450 block italic">No manual logs reported.</span>
                  ) : (
                    <div className="space-y-2">
                      {selectedVisitor.securityApprovalLog.map((log, idx) => (
                        <div key={idx} className="text-xs p-2 -150 rounded bg-zinc-50/50">
                          {log}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
              
              {/* Drawer Footer Panel */}
              <div className="p-4 -100 bg-zinc-55/10 dark:bg-zinc-950/20 flex gap-2">
                {selectedVisitor.status === "Approved" && (
                  <Button
                    onClick={() => handleCheckin(selectedVisitor.id)}
                    className="flex-1 h-8 rounded-sm text-xs bg-indigo-650 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
                  >
                    <Key className="h-3.5 w-3.5 mr-1 inline-block" /> Confirm Gate Check-in
                  </Button>
                )}
                {selectedVisitor.status === "Checked-in" && (
                  <Button
                    onClick={() => handleCheckout(selectedVisitor.id)}
                    className="flex-1 h-8 rounded-sm text-xs bg-indigo-655 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
                  >
                    Log Gate Check-out
                  </Button>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}
