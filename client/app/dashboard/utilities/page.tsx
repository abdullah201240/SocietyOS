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
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Zap,
  Droplet,
  Flame,
  Activity,
  AlertCircle,
  Building,
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
} from "lucide-react";

// Types
interface UtilityMeter {
  id: string; // e.g. MET-ELE-1402
  utilityType: "Electricity" | "Water" | "Gas" | "Generator Backup" | "Shared Utilities";
  flatNumber: string;
  buildingName: string;
  meterId: string;
  currentReading: number;
  previousReading: number;
  usageAmount: string; // e.g. "420 kWh", "12k Liters"
  billingAmount: number;
  paymentStatus: "Paid" | "Pending" | "Overdue" | "Abnormal Usage";
  dueDate: string;
  residentName: string;
  meterHistory: { date: string; reading: number; usage: string }[];
  maintenanceRecords: { date: string; task: string; technician: string }[];
  infrastructureNotes: string;
  alerts: string[];
}

export default function UtilitiesPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Initial Mock Utility Meter Records
  const [meters, setMeters] = React.useState<UtilityMeter[]>([
    {
      id: "MET-ELE-1402",
      utilityType: "Electricity",
      flatNumber: "1402",
      buildingName: "Tower Alpha",
      meterId: "ELE-90142",
      currentReading: 12450,
      previousReading: 12030,
      usageAmount: "420 kWh",
      billingAmount: 84.00,
      paymentStatus: "Pending",
      dueDate: "2026-07-05",
      residentName: "Harold Brooks",
      meterHistory: [
        { date: "2026-05-31", reading: 12030, usage: "390 kWh" },
        { date: "2026-04-30", reading: 11640, usage: "410 kWh" }
      ],
      maintenanceRecords: [
        { date: "2026-02-15", task: "Smart meter telemetry calibration", technician: "Steve Rogers" }
      ],
      infrastructureNotes: "High-grade smart meter with automated cellular backup link.",
      alerts: []
    },
    {
      id: "MET-WAT-805",
      utilityType: "Water",
      flatNumber: "805",
      buildingName: "Tower Alpha",
      meterId: "WAT-31124",
      currentReading: 85200,
      previousReading: 73200,
      usageAmount: "12,000 Liters",
      billingAmount: 45.00,
      paymentStatus: "Abnormal Usage",
      dueDate: "2026-06-28",
      residentName: "Sarah Connor",
      meterHistory: [
        { date: "2026-05-31", reading: 73200, usage: "3,100 Liters" },
        { date: "2026-04-30", reading: 70100, usage: "2,900 Liters" }
      ],
      maintenanceRecords: [
        { date: "2026-06-28", task: "Riser valve hot-line check", technician: "Bruce Banner" }
      ],
      infrastructureNotes: "Ultrasonic water flow diagnostic meter sensor.",
      alerts: ["Spike warning: Water usage exceeds baseline average by 280%."]
    },
    {
      id: "MET-GAS-604",
      utilityType: "Gas",
      flatNumber: "604",
      buildingName: "Tower Beta",
      meterId: "GAS-88490",
      currentReading: 3240,
      previousReading: 3190,
      usageAmount: "50 m³",
      billingAmount: 38.00,
      paymentStatus: "Paid",
      dueDate: "2026-06-20",
      residentName: "Mark Wahlberg",
      meterHistory: [
        { date: "2026-05-31", reading: 3190, usage: "48 m³" }
      ],
      maintenanceRecords: [],
      infrastructureNotes: "Centralized piped LPG utility connection safety valve.",
      alerts: []
    },
    {
      id: "MET-GEN-1204",
      utilityType: "Generator Backup",
      flatNumber: "1204",
      buildingName: "Tower Alpha",
      meterId: "GEN-55102",
      currentReading: 1450,
      previousReading: 1432,
      usageAmount: "18 kWh",
      billingAmount: 18.00,
      paymentStatus: "Overdue",
      dueDate: "2026-06-24",
      residentName: "David Vance",
      meterHistory: [
        { date: "2026-05-31", reading: 1432, usage: "12 kWh" }
      ],
      maintenanceRecords: [],
      infrastructureNotes: "Generator automatic line transfer relay sensor.",
      alerts: []
    }
  ]);

  // Form State
  const [newMeter, setNewMeter] = React.useState({
    flatNumber: "",
    buildingName: "Tower Alpha",
    utilityType: "Electricity" as any,
    meterId: "",
    currentReading: 0,
    previousReading: 0,
    usageAmount: "",
    billingAmount: 0,
    dueDate: "",
  });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedMeter, setSelectedMeter] = React.useState<UtilityMeter | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterType, setFilterType] = React.useState("All");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [filterBuilding, setFilterBuilding] = React.useState("All");
  const [filterUsage, setFilterUsage] = React.useState("All");

  const handleAddMeter = (e: React.FormEvent) => {
    e.preventDefault();
    const created: UtilityMeter = {
      id: `MET-৳{newMeter.utilityType.substring(0,3).toUpperCase()}-৳{newMeter.flatNumber}`,
      utilityType: newMeter.utilityType,
      flatNumber: newMeter.flatNumber,
      buildingName: newMeter.buildingName,
      meterId: newMeter.meterId,
      currentReading: Number(newMeter.currentReading),
      previousReading: Number(newMeter.previousReading),
      usageAmount: newMeter.usageAmount || `৳{Number(newMeter.currentReading) - Number(newMeter.previousReading)} units`,
      billingAmount: Number(newMeter.billingAmount),
      paymentStatus: "Pending",
      dueDate: newMeter.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      residentName: "John Doe",
      meterHistory: [],
      maintenanceRecords: [],
      infrastructureNotes: "Operational utility telemetry channel configured.",
      alerts: []
    };

    setMeters((prev) => [created, ...prev]);
    setCreateOpen(false);
    toast.success(`Meter entry registered for Flat ৳{created.flatNumber}`);

    // Reset Form
    setNewMeter({
      flatNumber: "",
      buildingName: "Tower Alpha",
      utilityType: "Electricity",
      meterId: "",
      currentReading: 0,
      previousReading: 0,
      usageAmount: "",
      billingAmount: 0,
      dueDate: "",
    });
  };

  const handleBillRun = () => {
    toast.success("Utility automated ledger run completed.");
  };

  const handleConfigureRates = () => {
    toast.info("Open Utility Rates configurations dashboard panel.");
  };

  const handleExport = () => {
    toast.success("Meters consumption telemetry data exported.");
  };

  // Filter Table List
  const filteredMeters = meters.filter((m) => {
    const matchesSearch =
      m.flatNumber.includes(searchQuery) ||
      m.meterId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.residentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "All" || m.utilityType === filterType;
    const matchesStatus = filterStatus === "All" || m.paymentStatus === filterStatus;
    const matchesBuilding = filterBuilding === "All" || m.buildingName === filterBuilding;

    let matchesUsage = true;
    if (filterUsage === "High") matchesUsage = m.paymentStatus === "Abnormal Usage";

    return matchesSearch && matchesType && matchesStatus && matchesBuilding && matchesUsage;
  });

  // Calculate Metrics
  const totalConsumption = "13.6k Units";
  const outstandingDues = 123.00;
  const utilityRevenue = 612.00;
  const activeReadings = meters.length;

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
                Utility Management
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Monitor utility usage, meter readings, infrastructure costs, and resident utility billing operations.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleConfigureRates}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Activity className="h-3.5 w-3.5" />
                <span>Configure Utility Rates</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Usage Report</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleBillRun}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Generate Utility Bill</span>
              </Button>

              {/* ADD METER READING DIALOG */}
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="xs"
                    className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Meter Reading</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] -200 bg-white dark:bg-zinc-950 p-6 rounded-md">
                  <form onSubmit={handleAddMeter}>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Record Utility Meter Reading</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">Record a new consumption log block value for water, power, or gas loops.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3.5 py-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="u-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat Unit</Label>
                        <Input
                          id="u-flat"
                          required
                          value={newMeter.flatNumber}
                          onChange={(e) => setNewMeter({ ...newMeter, flatNumber: e.target.value })}
                          placeholder="e.g. 1402"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="u-tower" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Building</Label>
                        <select
                          id="u-tower"
                          value={newMeter.buildingName}
                          onChange={(e) => setNewMeter({ ...newMeter, buildingName: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Tower Alpha">Tower Alpha</option>
                          <option value="Tower Beta">Tower Beta</option>
                          <option value="Tower Gamma">Tower Gamma</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="u-type" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Utility Type</Label>
                        <select
                          id="u-type"
                          value={newMeter.utilityType}
                          onChange={(e) => setNewMeter({ ...newMeter, utilityType: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Electricity">Electricity</option>
                          <option value="Water">Water</option>
                          <option value="Gas">Gas</option>
                          <option value="Generator Backup">Generator Backup</option>
                          <option value="Shared Utilities">Shared Utilities</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="u-meter" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Meter ID</Label>
                        <Input
                          id="u-meter"
                          required
                          value={newMeter.meterId}
                          onChange={(e) => setNewMeter({ ...newMeter, meterId: e.target.value })}
                          placeholder="e.g. ELE-90142"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="u-current" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Current</Label>
                        <Input
                          id="u-current"
                          type="number"
                          required
                          value={newMeter.currentReading}
                          onChange={(e) => setNewMeter({ ...newMeter, currentReading: Number(e.target.value) })}
                          min={0}
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="u-previous" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Previous</Label>
                        <Input
                          id="u-previous"
                          type="number"
                          required
                          value={newMeter.previousReading}
                          onChange={(e) => setNewMeter({ ...newMeter, previousReading: Number(e.target.value) })}
                          min={0}
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="u-amount" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Billing Amount (৳)</Label>
                        <Input
                          id="u-amount"
                          type="number"
                          value={newMeter.billingAmount}
                          onChange={(e) => setNewMeter({ ...newMeter, billingAmount: Number(e.target.value) })}
                          min={0}
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                      <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Record Reading</Button>
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
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Total Consumption</span>
                  <Activity className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{totalConsumption}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Outstanding Dues</span>
                  <AlertCircle className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">৳{outstandingDues.toFixed(2)}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-455 dark:text-zinc-500">Monthly Revenue</span>
                  <ShieldCheck className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">৳{utilityRevenue.toFixed(2)}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Active Meters</span>
                  <Activity className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{activeReadings}</span>
              </div>
            </CardContent>
            </Card>
          </div>

          {/* Table & Sidebar filter grid */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters */}
            <div className="w-full lg:w-56 shrink-0 space-y-4">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
                <CardHeader className="p-3.5 -100 flex flex-row items-center gap-1.5 space-y-0">
                  <Filter className="h-3.5 w-3.5 text-zinc-455" />
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Infrastructure Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 space-y-4">
                  
                  {/* Utility Type Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Utility Type</Label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All utilities</option>
                      <option value="Electricity">Electricity</option>
                      <option value="Water">Water</option>
                      <option value="Gas">Gas</option>
                      <option value="Generator Backup">Generator Backup</option>
                      <option value="Shared Utilities">Shared Utilities</option>
                    </select>
                  </div>

                  {/* Payment status Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Payment status</Label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All statuses</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Overdue">Overdue</option>
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

                  {/* High Usage Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Usage Warning Level</Label>
                    <select
                      value={filterUsage}
                      onChange={(e) => setFilterUsage(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All ranges</option>
                      <option value="High">Abnormal Usage Spike Warnings</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      setFilterType("All");
                      setFilterStatus("All");
                      setFilterBuilding("All");
                      setFilterUsage("All");
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
                      placeholder="Search meters by Flat ID, Meter ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full rounded-sm-200 pl-8 text-xs outline-none bg-zinc-50/50 dark:bg-zinc-900 focus:bg-white focus:indigo-500 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Showing {filteredMeters.length} of {meters.length} meters
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredMeters.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No utility records matched</span>
                      <span className="text-[10px] mt-0.5">Try widening filter options.</span>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 -200 dark:bg-zinc-950/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Utility Type</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Building/Flat</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Meter ID</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-right h-9">Current reading</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-right h-9">Previous reading</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Usage amount</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-right h-9">Billing amount</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Payment Status</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Due date</TableHead>
                          <TableHead className="w-9 h-9" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                        {filteredMeters.map((m) => (
                          <TableRow
                            key={m.id}
                            onClick={() => setSelectedMeter(m)}
                            className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/20 cursor-pointer transition-colors"
                          >
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5 flex items-center gap-1.5">
                              {m.utilityType === "Electricity" ? (
                                <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                              ) : m.utilityType === "Water" ? (
                                <Droplet className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                              ) : (
                                <Flame className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                              )}
                              <span>{m.utilityType}</span>
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {m.buildingName} - {m.flatNumber}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-850 dark:text-zinc-250 py-2.5">
                              {m.meterId}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-200 text-right py-2.5">
                              {m.currentReading.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-200 text-right py-2.5">
                              {m.previousReading.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-center text-zinc-900 dark:text-white py-2.5">
                              {m.usageAmount}
                            </TableCell>
                            <TableCell className="text-xs font-bold text-right text-zinc-900 dark:text-white py-2.5">
                              ৳{m.billingAmount.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold  ৳{
                                m.paymentStatus === "Paid"
                                  ? "bg-emerald-50 text-emerald-700-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : m.paymentStatus === "Pending"
                                  ? "bg-amber-50 text-amber-700-200 dark:bg-amber-955/20 dark:text-amber-450"
                                  : m.paymentStatus === "Overdue"
                                  ? "bg-rose-50 text-rose-700-250 dark:bg-rose-955/20 dark:text-rose-455"
                                  : "bg-orange-50 text-orange-700-250 dark:bg-orange-955/20 dark:text-orange-455"
                              }`}>
                                {m.paymentStatus}
                              </span>
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 text-center py-2.5">
                              {m.dueDate}
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

      {/* UTILITY DETAILS DRAWER */}
      <Sheet open={selectedMeter !== null} onOpenChange={(open) => !open && setSelectedMeter(null)}>
        <SheetContent className="w-full sm:max-w-md -200 bg-white dark:bg-zinc-950 p-0 text-zinc-900 dark:text-zinc-50 flex flex-col h-full shadow-lg">
          {selectedMeter && (
            <div className="flex flex-col h-full overflow-hidden">
              <SheetHeader className="p-4 -100">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-indigo-650 dark:text-indigo-400 tracking-wider">
                  <Activity className="h-3.5 w-3.5" /> Meter telemetry diagnostic
                </div>
                <SheetTitle className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                  Meter {selectedMeter.meterId}
                </SheetTitle>
                <SheetDescription className="text-[10px] text-zinc-550 mt-0.5">
                  {selectedMeter.utilityType} • {selectedMeter.buildingName} - Flat {selectedMeter.flatNumber}
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body Viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                
                {/* Spikes / Warning panel */}
                {selectedMeter.alerts.length > 0 && (
                  <div className="rounded -200 bg-orange-50/50 p-3 text-xs text-orange-700 dark:bg-orange-955/20 flex gap-2">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-orange-600" />
                    <div>
                      <span className="font-bold block">Abnormal consumption detected</span>
                      <span className="text-[10px] block mt-0.5 leading-snug">{selectedMeter.alerts[0]}</span>
                  </div>
                )}

                {/* 1. Occupant Information */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Resident details</span>
                  <div className="rounded -150 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs">
                    <span className="text-zinc-400 block text-[9px]">RESIDENT NAME</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{selectedMeter.residentName}</span>
                </div>

                {/* 2. Billing breakdown */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Billing breakdown</span>
                  <div className="rounded -150 p-3 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs space-y-2">
                    <div className="flex justify-between items-center text-zinc-500">
                      <span>Usage ({selectedMeter.usageAmount})</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">৳{selectedMeter.billingAmount.toFixed(2)}</span>
                    <div className="flex justify-between items-center text-zinc-900 dark:text-white font-bold -100 pt-2">
                      <span>Total Utility Amount</span>
                      <span>৳{selectedMeter.billingAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* 3. Meter History */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Usage History Logs</span>
                  {selectedMeter.meterHistory.length === 0 ? (
                    <span className="text-[10px] text-zinc-450 block italic">No history records logged.</span>
                  ) : (
                    <div className="space-y-2">
                      {selectedMeter.meterHistory.map((item, idx) => (
                        <div key={idx} className="flex justify-between -100 pb-2 last:0 last:pb-0 text-xs text-zinc-550 dark:text-zinc-350">
                          <span>Reading date: {item.date}</span>
                          <span className="font-semibold">Reading: {item.reading.toLocaleString()} ({item.usage})</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Maintenance Records */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Maintenance & calibration records</span>
                  {selectedMeter.maintenanceRecords.length === 0 ? (
                    <span className="text-[10px] text-zinc-450 block italic">No maintenance calibration records logged.</span>
                  ) : (
                    <div className="space-y-2.5">
                      {selectedMeter.maintenanceRecords.map((item, idx) => (
                        <div key={idx} className="flex gap-2 text-xs -100 pb-2 last:0 last:pb-0">
                          <Clock className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-zinc-800 dark:text-zinc-200 font-semibold block">{item.task}</span>
                            <span className="text-[9.5px] text-zinc-450 block mt-0.5">Date: {item.date} • Tech: {item.technician}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. Infrastructure Notes */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-455 dark:text-zinc-500 tracking-wider block">Infrastructure notes</span>
                  <div className="rounded -150 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs text-zinc-650 dark:text-zinc-400">
                    {selectedMeter.infrastructureNotes}
                  </div>
                </div>

              </div>
              
              {/* Drawer Footer Panel */}
              <div className="p-4 -100 bg-zinc-55/10 dark:bg-zinc-950/20 flex gap-2">
                <Button
                  onClick={() => {
                    setSelectedMeter(null);
                    toast.success("Triggered diagnostic calibration test check.");
                  }}
                  variant="outline"
                  className="flex-1 h-8 rounded-sm text-xs-200 hover:bg-zinc-50"
                >
                  Calibrate Telemetry
                </Button>
                {selectedMeter.paymentStatus === "Abnormal Usage" && (
                  <Button
                    onClick={() => {
                      setSelectedMeter(null);
                      toast.warning("Valve shutoff signal issued to meter unit.");
                    }}
                    className="flex-1 h-8 rounded-sm text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold"
                  >
                    Shutoff Valve
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
