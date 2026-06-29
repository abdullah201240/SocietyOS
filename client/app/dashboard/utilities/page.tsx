"use client";

import * as React from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Zap,
  Droplet,
  Flame,
  Gauge,
  AlertCircle,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  History,
  Activity,
  Download,
  Calendar,
} from "lucide-react";
import { useUtilityMeters, useUtilityBills, useGeneratorLogs, utilitiesApi } from "@/lib/api";
import { validateData, utilityMeterSchema, meterReadingSchema, generatorLogSchema } from "@/lib/validations";
import { UtilityDialogs } from "./utility-dialogs";

export default function UtilitiesPage() {
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    return new Intl.DateTimeFormat('en-US', { year: "numeric", month: "short", day: "numeric" }).format(new Date(dateString));
  };
  const formatNumber = (val: number) => val.toLocaleString();

  const orgs = ["Grandview Towers", "Meadow View Complex", "Parkside Residences"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Hook data states
  const { meters: metersFromApi, loading: loadingMeters, error: errorMeters, refetch: refetchMeters } = useUtilityMeters();
  const { bills: billsFromApi, loading: loadingBills, error: errorBills, refetch: refetchBills } = useUtilityBills();
  const { logs: logsFromApi, loading: loadingLogs, error: errorLogs, refetch: refetchLogs } = useGeneratorLogs();

  // Local synced states
  const [meters, setMeters] = React.useState<any[]>([]);
  const [bills, setBills] = React.useState<any[]>([]);
  const [genLogs, setGenLogs] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (metersFromApi) setMeters(metersFromApi);
  }, [metersFromApi]);

  React.useEffect(() => {
    if (billsFromApi) setBills(billsFromApi);
  }, [billsFromApi]);

  React.useEffect(() => {
    if (logsFromApi) setGenLogs(logsFromApi);
  }, [logsFromApi]);

  // UI state variables
  const [activeTab, setActiveTab] = React.useState<"meters" | "billing" | "generator" | "analytics">("meters");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterType, setFilterType] = React.useState("All");
  const [filterStatus, setFilterStatus] = React.useState("All");

  // Record reading dialog state
  const [readingOpen, setReadingOpen] = React.useState(false);
  const [selectedMeter, setSelectedMeter] = React.useState<any>(null);
  const [newReading, setNewReading] = React.useState("");

  // Add meter dialog state
  const [addMeterOpen, setAddMeterOpen] = React.useState(false);
  const [meterForm, setMeterForm] = React.useState({
    flatNumber: "",
    type: "Electricity" as "Electricity" | "Water" | "Gas",
    meterNumber: "",
    lastReading: ""
  });

  // Generator fuel log dialog state
  const [logOpen, setLogOpen] = React.useState(false);
  const [generatorForm, setGeneratorForm] = React.useState({
    fuelAdded: "",
    fuelLevel: "",
    runHours: "",
    status: "Operational" as any,
    notes: ""
  });

  // Calculate stats summary metrics
  const totalElecUsage = bills.filter(b => b.type === "Electricity").reduce((acc, curr) => acc + curr.usage, 0);
  const totalWaterUsage = bills.filter(b => b.type === "Water").reduce((acc, curr) => acc + curr.usage, 0);
  const totalGasUsage = bills.filter(b => b.type === "Gas").reduce((acc, curr) => acc + curr.usage, 0);
  const currentFuelLevel = genLogs.length > 0 ? genLogs[0].fuelLevel : 85; // Latest log fuel level

  // Handle Recording New Reading
  const handleRecordReading = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeter) return;

    const validation = validateData(meterReadingSchema, { currentReading: newReading });
    if (!validation.success) {
      toast.error(validation.error);
      return;
    }

    const readingVal = Number(newReading);
    if (readingVal <= selectedMeter.currentReading) {
      toast.error(`New reading (${readingVal}) must be greater than previous reading (${selectedMeter.currentReading}).`);
      return;
    }

    const response = await utilitiesApi.recordReading(selectedMeter.id, readingVal);
    if (response.success) {
      toast.success(`Recorded reading ${readingVal} for meter ${selectedMeter.meterNumber}`);
      setReadingOpen(false);
      setNewReading("");
      refetchMeters();
      refetchBills(); // reading updates also generates statistics/bills
    } else {
      toast.error(response.error || "Failed to save reading");
    }
  };

  // Handle Onboarding New Meter
  const handleAddMeter = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      buildingName: currentOrg,
      flatNumber: meterForm.flatNumber,
      type: meterForm.type,
      meterNumber: meterForm.meterNumber,
      lastReading: Number(meterForm.lastReading)
    };

    const validation = validateData(utilityMeterSchema, payload);
    if (!validation.success) {
      toast.error(validation.error);
      return;
    }

    const response = await utilitiesApi.createMeter({
      ...payload,
      currentReading: payload.lastReading, // start current reading at initial reading
      lastReadingDate: new Date().toISOString(),
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    if (response.success) {
      toast.success(`Registered meter ${payload.meterNumber} successfully!`);
      setAddMeterOpen(false);
      setMeterForm({ flatNumber: "", type: "Electricity", meterNumber: "", lastReading: "" });
      refetchMeters();
    } else {
      toast.error(response.error || "Failed to register meter");
    }
  };

  // Handle Adding Generator Event
  const handleAddGenLog = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      fuelAdded: Number(generatorForm.fuelAdded),
      fuelLevel: Number(generatorForm.fuelLevel),
      runHours: Number(generatorForm.runHours),
      status: generatorForm.status,
      notes: generatorForm.notes
    };

    const validation = validateData(generatorLogSchema, payload);
    if (!validation.success) {
      toast.error(validation.error);
      return;
    }

    const response = await utilitiesApi.createGeneratorLog({
      ...payload,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    if (response.success) {
      toast.success("Generator operational state logged successfully!");
      setLogOpen(false);
      setGeneratorForm({ fuelAdded: "", fuelLevel: "", runHours: "", status: "Operational", notes: "" });
      refetchLogs();
    } else {
      toast.error(response.error || "Failed to log event");
    }
  };

  // Handle Bill Generation Cycle
  const handleGenerateBills = async () => {
    const currentPeriod = "June 2026";
    toast.loading(`Generating billing allocations for cycle: ${currentPeriod}...`);
    
    setTimeout(async () => {
      toast.dismiss();
      const response = await utilitiesApi.generateBills(currentPeriod);
      if (response.success) {
        if (response.data.length === 0) {
          toast.info(`Billing cycle "${currentPeriod}" is already generated & allocated.`);
        } else {
          toast.success(`Success! Generated ${response.data.length} utility bills for this cycle.`);
          refetchBills();
        }
      } else {
        toast.error("Billing allocation failure.");
      }
    }, 1000);
  };

  // Handle CSV Export
  const handleExportCSV = () => {
    if (meters.length === 0) {
      toast.error("No utility meter data available to export.");
      return;
    }
    const headers = ["ID", "Flat Number", "Building", "Utility Type", "Meter Number", "Last Reading", "Current Reading", "Updated Date", "Status"];
    const rows = meters.map(m => [
      m.id,
      `"${m.flatNumber}"`,
      `"${m.buildingName}"`,
      `"${m.type}"`,
      `"${m.meterNumber}"`,
      m.lastReading,
      m.currentReading,
      `"${m.lastReadingDate}"`,
      `"${m.status}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `meters_audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Utility registry exported as CSV successfully!");
  };

  // Filters logic
  const filteredMeters = meters.filter(m => {
    const matchesSearch = m.flatNumber.includes(searchQuery) || m.meterNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || m.type === filterType;
    const matchesStatus = filterStatus === "All" || m.status === filterStatus;
    const matchesBuilding = m.buildingName === currentOrg;
    return matchesSearch && matchesType && matchesStatus && matchesBuilding;
  });

  const filteredBills = bills.filter(b => {
    const matchesSearch = b.flatNumber.includes(searchQuery) || b.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBuilding = b.buildingName === currentOrg;
    return matchesSearch && matchesBuilding;
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans selection:bg-zinc-200">
      
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
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Utilities & Infrastructure Management
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Monitor building-wide resource consumption, track sub-meter readings, and automate billing cycles.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleExportCSV}
                className="h-8 rounded-sm text-[11px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Registry</span>
              </Button>

              <Button
                size="xs"
                onClick={() => setAddMeterOpen(true)}
                className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Register Meter</span>
              </Button>
            </div>
          </div>

          {/* Stats summary panel */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Electricity summary card */}
            {/* Electricity summary card */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-3.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[9.5px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Power Consumed (May)</span>
                  <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">{formatNumber(totalElecUsage)}</span>
                  <span className="text-[9.5px] font-semibold text-zinc-400">kWh</span>
                </div>
                <div className="mt-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                  <span>Rate: {formatCurrency(0.20)} / kWh</span>
                </div>
              </CardContent>
            </Card>

            {/* Water summary card */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-3.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[9.5px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Water Consumption</span>
                  <Droplet className="h-4 w-4 text-blue-500 shrink-0" />
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">{formatNumber(totalWaterUsage)}</span>
                  <span className="text-[9.5px] font-semibold text-zinc-400">Liters</span>
                </div>
                <div className="mt-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                  <span>Rate: {formatCurrency(0.029)} / Liters</span>
                </div>
              </CardContent>
            </Card>

            {/* Gas summary card */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-3.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[9.5px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Gas Usage</span>
                  <Flame className="h-4 w-4 text-rose-500 shrink-0" />
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">{formatNumber(totalGasUsage)}</span>
                  <span className="text-[9.5px] font-semibold text-zinc-400">M³</span>
                </div>
                <div className="mt-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                  <span>Rate: {formatCurrency(1.00)} / M³</span>
                </div>
              </CardContent>
            </Card>

            {/* Generator Diesel Level card */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-3.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[9.5px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Backup Generator Fuel</span>
                  <Gauge className="h-4 w-4 text-indigo-500 shrink-0" />
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">{currentFuelLevel}%</span>
                  <span className="text-[9.5px] font-semibold text-zinc-400">Diesel Tank</span>
                </div>
                <div className="mt-1 text-[9px] font-semibold text-zinc-500 flex items-center gap-0.5">
                  <span className={currentFuelLevel < 25 ? "text-rose-500" : "text-emerald-500"}>
                    {currentFuelLevel < 25 ? "Warning: Critical Low" : "Status: Optimal"}
                  </span>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Module view selector tabs */}
          <div className="flex items-center gap-1 bg-zinc-200/50 p-0.5 rounded-sm self-start w-fit dark:bg-zinc-950/40">
            <button
              onClick={() => setActiveTab("meters")}
              className={`px-3 py-1 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                activeTab === "meters" ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Meters Registry
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`px-3 py-1 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                activeTab === "billing" ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Bill Allocations
            </button>
            <button
              onClick={() => setActiveTab("generator")}
              className={`px-3 py-1 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                activeTab === "generator" ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Backup Generator
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-3 py-1 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                activeTab === "analytics" ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Consumption Trends
            </button>
          </div>

          {/* Meter Registry Panel */}
          {activeTab === "meters" && (
            <div className="space-y-4">
              
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72 shrink-0">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-450" />
                  <Input
                    type="text"
                    placeholder="Search meters by Flat or Serial..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 w-full rounded-sm pl-8.5 text-xs outline-none bg-white dark:bg-zinc-950 focus:border-indigo-500 transition-colors border-zinc-200"
                  />
                </div>
                
                <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
                  <div className="flex items-center gap-1.5">
                    <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Type</Label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="h-8 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-950 outline-none"
                    >
                      <option value="All">All Types</option>
                      <option value="Electricity">Electricity</option>
                      <option value="Water">Water</option>
                      <option value="Gas">Gas</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Status</Label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="h-8 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-950 outline-none"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table Data Card */}
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                <CardContent className="p-0">
                  {loadingMeters ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-indigo-650 mb-2" />
                      <span className="text-xs font-semibold animate-pulse">Loading submeters...</span>
                    </div>
                  ) : errorMeters ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-rose-500">
                      <AlertCircle className="h-8 w-8 mb-2" />
                      <span className="text-xs font-semibold">Failed to fetch sub-meter data</span>
                      <span className="text-[10px] mt-0.5 text-zinc-500">{errorMeters}</span>
                      <Button size="xs" variant="outline" className="mt-3 text-[10px] h-7" onClick={refetchMeters}>
                        Retry Sync
                      </Button>
                    </div>
                  ) : filteredMeters.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No utility meters found</span>
                      <span className="text-[10px] mt-0.5">Try resetting filter options.</span>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 dark:bg-zinc-950/20">
                        <TableRow>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Meter Serial</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Flat Unit</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Utility Type</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-right h-9">Last Reading</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-right h-9">Current Reading</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Last Recorded</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Status</TableHead>
                          <TableHead className="w-24 h-9" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-250 dark:divide-zinc-850">
                        {filteredMeters.map((m) => (
                          <TableRow key={m.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                            <TableCell className="text-xs font-semibold py-2.5">{m.meterNumber}</TableCell>
                            <TableCell className="text-xs font-bold text-zinc-800 dark:text-zinc-200 py-2.5">Flat {m.flatNumber}</TableCell>
                            <TableCell className="py-2.5">
                              <span className="inline-flex items-center gap-1 text-xs font-semibold">
                                {m.type === "Electricity" && <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                                {m.type === "Water" && <Droplet className="h-3.5 w-3.5 text-blue-500 shrink-0" />}
                                {m.type === "Gas" && <Flame className="h-3.5 w-3.5 text-rose-500 shrink-0" />}
                                {m.type}
                              </span>
                            </TableCe                            <TableCell className="text-xs text-right font-medium text-zinc-500 py-2.5">{formatNumber(m.lastReading)}</TableCell>
                            <TableCell className="text-xs text-right font-bold text-indigo-650 dark:text-indigo-400 py-2.5">{formatNumber(m.currentReading)}</TableCell>
                            <TableCell className="text-[10px] text-center text-zinc-450 dark:text-zinc-500 py-2.5">
                              {formatDate(m.lastReadingDate)}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[8.5px] font-bold ${
                                m.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : m.status === "Suspended"
                                  ? "bg-rose-50 text-rose-700 dark:bg-rose-955/20 dark:text-rose-450"
                                  : "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-450"
                              }`}>
                                {m.status}
                              </span>
                            </TableCell>
                            <TableCell className="py-2.5 text-right pr-4">
                              <Button
                                size="xs"
                                variant="outline"
                                onClick={() => {
                                  setSelectedMeter(m);
                                  setNewReading(String(m.currentReading));
                                  setReadingOpen(true);
                                }}
                                className="h-7 text-[10px] font-semibold hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950/20"
                              >
                                Record Reading
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Billing Allocations Panel */}
          {activeTab === "billing" && (
            <div className="space-y-4">
              
              {/* Trigger Generation Cycle bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/30 rounded-md">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300">Generate Utility Invoices</h4>
                  <p className="text-[10px] text-indigo-755 dark:text-indigo-400">
                    Bulk-allocate utility bills based on current sub-meter readings for the **June 2026** cycle.
                  </p>
                </div>
                
                <Button
                  size="sm"
                  onClick={handleGenerateBills}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs h-8 px-3 rounded shadow-sm gap-1 select-none"
                >
                  <Activity className="h-3.5 w-3.5" />
                  <span>Run Generation Cycle</span>
                </Button>
              </div>

              {/* Invoices List Table */}
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                <CardHeader className="p-4 flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-900">
                  <div className="space-y-0.5">
                    <CardTitle className="text-sm font-semibold">Active Invoiced Ledger</CardTitle>
                    <CardDescription className="text-[10px]">Unpaid and paid invoices distributed to flat owners.</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-[9px] border-zinc-200 font-semibold bg-zinc-50/50">
                    {filteredBills.length} invoices
                  </Badge>
                </CardHeader>
                <CardContent className="p-0">
                  {loadingBills ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-indigo-650 mb-2" />
                      <span className="text-xs font-semibold animate-pulse">Loading billing ledger...</span>
                    </div>
                  ) : errorBills ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-rose-500">
                      <AlertCircle className="h-8 w-8 mb-2" />
                      <span className="text-xs font-semibold">Failed to load invoices</span>
                      <Button size="xs" variant="outline" className="mt-3 text-[10px] h-7" onClick={refetchBills}>
                        Retry Sync
                      </Button>
                    </div>
                  ) : filteredBills.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No invoices generated</span>
                      <span className="text-[10px] mt-0.5">Click "Run Generation Cycle" to generate bills.</span>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 dark:bg-zinc-950/20">
                        <TableRow>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 h-9">Invoice ID</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 h-9">Flat Unit</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 h-9">Type</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center h-9">Usage</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-right h-9">Amount</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center h-9">Billing Period</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center h-9">Due Date</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center h-9">Status</TableHead>
                          <TableHead className="w-16 h-9" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-250 dark:divide-zinc-850">
                        {filteredBills.map((b) => (
                          <TableRow key={b.id}>
                            <TableCell className="text-xs font-semibold py-2.5">{b.id}</TableCell>
                            <TableCell className="text-xs font-bold text-zinc-800 dark:text-zinc-200 py-2.5">Flat {b.flatNumber}</TableCell>
                            <TableCell className="py-2.5">
                              <span className="inline-flex items-center gap-1 text-xs font-semibold">
                                {b.type === "Electricity" && <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                                {b.type === "Water" && <Droplet className="h-3.5 w-3.5 text-blue-500 shrink-0" />}
                                {b.type === "Gas" && <Flame className="h-3.5 w-3.5 text-rose-500 shrink-0" />}
                                {b.type}
                              </span>
                            </TableCell>
                            <TableCell className="text-xs text-center font-medium text-zinc-600 dark:text-zinc-350 py-2.5">
                              {formatNumber(b.usage)} {b.type === "Electricity" ? "kWh" : b.type === "Water" ? "Liters" : "M³"}
                            </TableCell>
                            <TableCell className="text-xs text-right font-bold py-2.5">{formatCurrency(b.amount)}</TableCell>
                            <TableCell className="text-xs text-center text-zinc-500 py-2.5">{b.billingPeriod}</TableCell>
                            <TableCell className="text-[10px] text-center text-zinc-450 dark:text-zinc-500 py-2.5">
                              {formatDate(b.dueDate)}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[8.5px] font-bold ${
                                b.status === "Paid"
                                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : b.status === "Overdue"
                                  ? "bg-rose-50 text-rose-700 dark:bg-rose-955/20 dark:text-rose-450"
                                  : "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-450"
                              }`}>
                                {b.status}
                              </span>
                            </TableCell>
                            <TableCell className="py-2.5 text-center">
                              {b.status !== "Paid" && (
                                <Button
                                  size="xs"
                                  onClick={async () => {
                                    await utilitiesApi.updateBillStatus(b.id, "Paid");
                                    toast.success(`Marked bill "${b.id}" as Paid!`);
                                    refetchBills();
                                  }}
                                  className="h-6 px-2 text-[9px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-sm shadow-sm"
                                >
                                  Collect
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Backup Generator Panel */}
          {activeTab === "generator" && (
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold">Generator Fuel & Run logs</h3>
                  <p className="text-[10px] text-zinc-400">Regular maintenance tests, downtime events, and fuel refills log history.</p>
                </div>
                
                <Button
                  size="xs"
                  onClick={() => setLogOpen(true)}
                  className="bg-indigo-650 hover:bg-indigo-755 text-white font-semibold text-xs h-8 shadow-sm gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Log Operations</span>
                </Button>
              </div>

              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                <CardContent className="p-0">
                  {loadingLogs ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-indigo-650 mb-2" />
                      <span className="text-xs font-semibold animate-pulse">Loading generator logs...</span>
                    </div>
                  ) : errorLogs ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-rose-500">
                      <AlertCircle className="h-8 w-8 mb-2" />
                      <span className="text-xs font-semibold">Failed to fetch logs</span>
                      <Button size="xs" variant="outline" className="mt-3 text-[10px] h-7" onClick={refetchLogs}>
                        Retry Sync
                      </Button>
                    </div>
                  ) : genLogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <History className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No operational logs found</span>
                      <span className="text-[10px] mt-0.5">Click "Log Operations" to record event.</span>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 dark:bg-zinc-950/20">
                        <TableRow>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 h-9">Date</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 h-9">Run Hours</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center h-9">Fuel Added</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center h-9">Remaining Tank Level</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center h-9">Status</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 h-9">Operational Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-250 dark:divide-zinc-850">
                        {genLogs.map((l) => (
                          <TableRow key={l.id}>
                            <TableCell className="text-xs font-semibold py-2.5">
                              {formatDate(l.date)}
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 py-2.5">
                              {l.runHours} hrs
                            </TableCell>
                            <TableCell className="text-xs font-bold text-center text-zinc-800 dark:text-zinc-200 py-2.5">
                              {l.fuelAdded > 0 ? `+${formatNumber(l.fuelAdded)} L` : "—"}
                            </TableCell>
                            <TableCell className="text-xs text-center font-bold text-indigo-650 dark:text-indigo-400 py-2.5">
                              {l.fuelLevel}%
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[8.5px] font-bold ${
                                l.status === "Operational"
                                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : l.status === "Refueling"
                                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-450"
                                  : "bg-rose-50 text-rose-700 dark:bg-rose-955/20 dark:text-rose-455"
                              }`}>
                                {l.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-xs text-zinc-550 dark:text-zinc-400 py-2.5 max-w-xs truncate" title={l.notes}>
                              {l.notes || "—"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Consumption Trends / Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-4">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold">Utility Consumption Monitoring</h3>
                <p className="text-[10px] text-zinc-400">Auditing active utility grids and consumption trends across current active cycles.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Visual Chart - Electricity SVG Bar Chart */}
                <Card className="lg:col-span-2 rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                  <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900 flex flex-row items-center justify-between">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-amber-500" /> Power Consumption History
                    </CardTitle>
                    <Badge variant="outline" className="text-[9.5px] border-zinc-200">
                      kWh
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-5 flex flex-col justify-between h-64">
                    <div className="flex-1 flex items-end gap-5 h-40 pb-2 border-b border-zinc-200 dark:border-zinc-900 select-none">
                      {/* Bar 1 */}
                      <div className="flex-1 flex flex-col items-center gap-1.5 group">
                        <div className="w-full bg-zinc-200 dark:bg-zinc-850 rounded-t-sm h-28 relative flex items-end">
                          <div className="w-full bg-amber-500 hover:bg-amber-600 rounded-t-sm h-[75%] transition-all" />
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9.5px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">180 kWh</span>
                        </div>
                        <span className="text-[9.5px] font-bold text-zinc-450">Jan</span>
                      </div>
                      {/* Bar 2 */}
                      <div className="flex-1 flex flex-col items-center gap-1.5 group">
                        <div className="w-full bg-zinc-200 dark:bg-zinc-850 rounded-t-sm h-28 relative flex items-end">
                          <div className="w-full bg-amber-500 hover:bg-amber-600 rounded-t-sm h-[82%] transition-all" />
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9.5px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">198 kWh</span>
                        </div>
                        <span className="text-[9.5px] font-bold text-zinc-450">Feb</span>
                      </div>
                      {/* Bar 3 */}
                      <div className="flex-1 flex flex-col items-center gap-1.5 group">
                        <div className="w-full bg-zinc-200 dark:bg-zinc-850 rounded-t-sm h-28 relative flex items-end">
                          <div className="w-full bg-amber-500 hover:bg-amber-600 rounded-t-sm h-[65%] transition-all" />
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9.5px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">150 kWh</span>
                        </div>
                        <span className="text-[9.5px] font-bold text-zinc-450">Mar</span>
                      </div>
                      {/* Bar 4 */}
                      <div className="flex-1 flex flex-col items-center gap-1.5 group">
                        <div className="w-full bg-zinc-200 dark:bg-zinc-850 rounded-t-sm h-28 relative flex items-end">
                          <div className="w-full bg-amber-500 hover:bg-amber-600 rounded-t-sm h-[90%] transition-all" />
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9.5px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">225 kWh</span>
                        </div>
                        <span className="text-[9.5px] font-bold text-zinc-455">Apr</span>
                      </div>
                      {/* Bar 5 */}
                      <div className="flex-1 flex flex-col items-center gap-1.5 group">
                        <div className="w-full bg-zinc-200 dark:bg-zinc-850 rounded-t-sm h-28 relative flex items-end">
                          <div className="w-full bg-amber-500 hover:bg-amber-600 rounded-t-sm h-[72%] transition-all" />
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9.5px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">{formatNumber(totalElecUsage)} kWh</span>
                        </div>
                        <span className="text-[9.5px] font-bold text-zinc-900 dark:text-zinc-100">May</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">Data compiled across active sub-meter invoice aggregates.</span>
                  </CardContent>
                </Card>

                {/* Building Performance metrics card */}
                <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                  <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Gauge className="h-4 w-4 text-indigo-650" /> Utility Efficiency
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-zinc-700 dark:text-zinc-350">
                        <span>Electricity Loss Factor</span>
                        <span>1.2%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900">
                        <div className="h-full rounded-full bg-amber-500 w-[12%]" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-zinc-700 dark:text-zinc-350">
                        <span>Water Leakage Factor</span>
                        <span>0.8%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900">
                        <div className="h-full rounded-full bg-blue-500 w-[8%]" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-zinc-700 dark:text-zinc-350">
                        <span>Generator System Health</span>
                        <span>Excellent</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900">
                        <div className="h-full rounded-full bg-indigo-500 w-[96%]" />
                      </div>
                    </div>

                    <div className="text-[10px] text-zinc-500 pt-1 leading-normal border-t border-zinc-100 dark:border-zinc-900">
                      Loss and leakage values are calculated as the variance between primary utility main meter intake and total sub-meter consumption outputs.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

        </main>
      </div>

      <UtilityDialogs
        readingOpen={readingOpen}
        setReadingOpen={setReadingOpen}
        addMeterOpen={addMeterOpen}
        setAddMeterOpen={setAddMeterOpen}
        logOpen={logOpen}
        setLogOpen={setLogOpen}
        selectedMeter={selectedMeter}
        newReading={newReading}
        setNewReading={setNewReading}
        handleRecordReading={handleRecordReading}
        meterForm={meterForm}
        setMeterForm={setMeterForm}
        handleAddMeter={handleAddMeter}
        generatorForm={generatorForm}
        setGeneratorForm={setGeneratorForm}
      />
    </div>
  );
}

