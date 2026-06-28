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
  Home,
  Users,
  Wrench,
  Zap,
  Car,
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
  Phone,
} from "lucide-react";
import { useFlats, flatsApi } from "@/lib/api";
import type { Flat as FlatType } from "@/lib/api";

export default function FlatsPage() {
  const orgs = ["Grandview Towers", "Meadow View Complex", "Parkside Residences"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Fetch flats from API
  const { flats: flatsFromApi, loading, error, refetch } = useFlats();
  const [flats, setFlats] = React.useState<FlatType[]>([]);

  // Sync API data with local state
  React.useEffect(() => {
    if (flatsFromApi) {
      setFlats(flatsFromApi);
    }
  }, [flatsFromApi]);

  // Form State
  const [newFlat, setNewFlat] = React.useState({
    flatNumber: "",
    floor: "1st Floor",
    buildingName: "Tower Alpha",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    tenantStatus: "Self-Occupied" as "Self-Occupied" | "Tenant-Occupied" | "Vacant",
    parkingAssignment: "None",
    utilityBalance: 0,
  });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedFlat, setSelectedFlat] = React.useState<FlatType | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterOccupancy, setFilterOccupancy] = React.useState("All");
  const [filterType, setFilterType] = React.useState("All"); // Owner vs Tenant
  const [filterDues, setFilterDues] = React.useState("All");
  const [filterComplaints, setFilterComplaints] = React.useState("All");

  // Onboard new flat
  const handleAddFlat = async (e: React.FormEvent) => {
    e.preventDefault();
    const newFlatData: Omit<FlatType, 'id'> = {
      flatNumber: newFlat.flatNumber,
      floor: newFlat.floor,
      buildingName: newFlat.buildingName,
      ownerName: newFlat.ownerName,
      ownerPhone: newFlat.ownerPhone,
      ownerEmail: newFlat.ownerEmail,
      tenantStatus: newFlat.tenantStatus,
      occupancyStatus: newFlat.tenantStatus === "Vacant" ? "Vacant" : "Occupied",
      utilityBalance: Number(newFlat.utilityBalance),
      parkingAssignment: newFlat.parkingAssignment,
      activeComplaints: 0,
      familyMembers: [],
      emergencyContacts: [],
      maintenanceHistory: []
    };

    const response = await flatsApi.create(newFlatData);
    if (response.success) {
      setFlats((prev) => [...prev, response.data]);
      setCreateOpen(false);
      toast.success(`Flat Unit "${response.data.flatNumber}" onboarded successfully!`);
      refetch();
    } else {
      toast.error(response.error || "Failed to add flat");
    }

    // Reset Form
    setNewFlat({
      flatNumber: "",
      floor: "1st Floor",
      buildingName: "Tower Alpha",
      ownerName: "",
      ownerPhone: "",
      ownerEmail: "",
      tenantStatus: "Self-Occupied",
      parkingAssignment: "None",
      utilityBalance: 0,
    });
  };

  const handleImport = () => {
    toast.info("Select CSV files to import resident registers.");
  };

  const handleExport = () => {
    toast.success("Flat occupancy audit sheet downloaded as CSV.");
  };

  // Filter Table List
  const filteredFlats = flats.filter((f) => {
    const matchesSearch =
      f.flatNumber.includes(searchQuery) ||
      f.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.tenantName && f.tenantName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesOccupancy = filterOccupancy === "All" || f.occupancyStatus === filterOccupancy;

    let matchesType = true;
    if (filterType === "Owner") matchesType = f.tenantStatus === "Self-Occupied";
    else if (filterType === "Tenant") matchesType = f.tenantStatus === "Tenant-Occupied";

    let matchesDues = true;
    if (filterDues === "Unpaid") matchesDues = f.utilityBalance < 0;
    else if (filterDues === "Clear") matchesDues = f.utilityBalance >= 0;

    let matchesComplaints = true;
    if (filterComplaints === "Active") matchesComplaints = f.activeComplaints > 0;
    else if (filterComplaints === "Clear") matchesComplaints = f.activeComplaints === 0;

    return matchesSearch && matchesOccupancy && matchesType && matchesDues && matchesComplaints;
  });

  // Calculate Metrics
  const totalFlats = flats.length;
  const occupiedUnits = flats.filter((f) => f.occupancyStatus === "Occupied").length;
  const vacantUnits = totalFlats - occupiedUnits;
  const activeResidents = flats.reduce((acc, curr) => {
    let residentsCount = 0;
    if (curr.occupancyStatus === "Occupied") {
      residentsCount += 1; // Owner or Primary Tenant
      residentsCount += curr.familyMembers.length; // Family members
    }
    return acc + residentsCount;
  }, 0);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans selection:bg-zinc-200">
      <Toaster position="top-right" />

      {/* Left Sidebar Menu */}
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
                Floor & Flat Management
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Manage occupancy, ownership, tenant records, utilities, and residential operations across apartment units.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleImport}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Import Resident Data</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Generate Occupancy Report</span>
              </Button>

              {/* ADD FLAT DIALOG */}
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="xs"
                    className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Flat</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] -200 bg-white dark:bg-zinc-950 p-6 rounded-md">
                  <form onSubmit={handleAddFlat}>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Add Apartment Flat Unit</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">Configure owner details, tower floor, and occupancy status.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3.5 py-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="f-num" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat Number</Label>
                        <Input
                          id="f-num"
                          required
                          value={newFlat.flatNumber}
                          onChange={(e) => setNewFlat({ ...newFlat, flatNumber: e.target.value })}
                          placeholder="e.g. 1402"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="f-floor" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Floor</Label>
                        <select
                          id="f-floor"
                          value={newFlat.floor}
                          onChange={(e) => setNewFlat({ ...newFlat, floor: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="1st Floor">1st Floor</option>
                          <option value="2nd Floor">2nd Floor</option>
                          <option value="3rd Floor">3rd Floor</option>
                          <option value="6th Floor">6th Floor</option>
                          <option value="8th Floor">8th Floor</option>
                          <option value="12th Floor">12th Floor</option>
                          <option value="14th Floor">14th Floor</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="f-tower" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Building</Label>
                        <select
                          id="f-tower"
                          value={newFlat.buildingName}
                          onChange={(e) => setNewFlat({ ...newFlat, buildingName: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Tower Alpha">Tower Alpha</option>
                          <option value="Tower Beta">Tower Beta</option>
                          <option value="Tower Gamma">Tower Gamma</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="f-owner" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Owner Name</Label>
                        <Input
                          id="f-owner"
                          required
                          value={newFlat.ownerName}
                          onChange={(e) => setNewFlat({ ...newFlat, ownerName: e.target.value })}
                          placeholder="e.g. Harold Brooks"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="f-phone" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Owner Phone</Label>
                        <Input
                          id="f-phone"
                          required
                          value={newFlat.ownerPhone}
                          onChange={(e) => setNewFlat({ ...newFlat, ownerPhone: e.target.value })}
                          placeholder="e.g. +1 555-0102"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="f-email" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Owner Email</Label>
                        <Input
                          id="f-email"
                          required
                          value={newFlat.ownerEmail}
                          onChange={(e) => setNewFlat({ ...newFlat, ownerEmail: e.target.value })}
                          placeholder="e.g. owner@gmail.com"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="f-status" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Tenant Status</Label>
                        <select
                          id="f-status"
                          value={newFlat.tenantStatus}
                          onChange={(e) => setNewFlat({ ...newFlat, tenantStatus: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Self-Occupied">Self-Occupied</option>
                          <option value="Tenant-Occupied">Tenant-Occupied</option>
                          <option value="Vacant">Vacant</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="f-parking" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Parking Slot</Label>
                        <Input
                          id="f-parking"
                          value={newFlat.parkingAssignment}
                          onChange={(e) => setNewFlat({ ...newFlat, parkingAssignment: e.target.value })}
                          placeholder="e.g. Slot L1-42"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="f-due" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Utility Balance ($)</Label>
                        <Input
                          id="f-due"
                          type="number"
                          value={newFlat.utilityBalance}
                          onChange={(e) => setNewFlat({ ...newFlat, utilityBalance: Number(e.target.value) })}
                          placeholder="e.g. -185.00"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                      <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Onboard Flat</Button>
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
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Total Flats</span>
                  <Home className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{totalFlats}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Occupied Units</span>
                  <Users className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{occupiedUnits}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Vacant Units</span>
                  <Home className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{vacantUnits}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Active Residents</span>
                  <ShieldCheck className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{activeResidents}</span>
              </div>
            </CardContent>
            </Card>
          </div>

          {/* Filters & Table grid layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters */}
            <div className="w-full lg:w-56 shrink-0 space-y-4">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
                <CardHeader className="p-3.5 -100 flex flex-row items-center gap-1.5 space-y-0">
                  <Filter className="h-3.5 w-3.5 text-zinc-450" />
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Flat Unit Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 space-y-4">
                  
                  {/* Occupancy Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Occupancy status</Label>
                    <select
                      value={filterOccupancy}
                      onChange={(e) => setFilterOccupancy(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All statuses</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Vacant">Vacant</option>
                    </select>
                  </div>

                  {/* Owner/Tenant Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Onboarding Type</Label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All types</option>
                      <option value="Owner">Owner Occupied</option>
                      <option value="Tenant">Tenant Occupied</option>
                    </select>
                  </div>

                  {/* Pending dues Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Ledger Balance</Label>
                    <select
                      value={filterDues}
                      onChange={(e) => setFilterDues(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All accounts</option>
                      <option value="Unpaid">Has outstanding dues</option>
                      <option value="Clear">Account balance clear</option>
                    </select>
                  </div>

                  {/* Complaint Activity Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Complaint Activity</Label>
                    <select
                      value={filterComplaints}
                      onChange={(e) => setFilterComplaints(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All records</option>
                      <option value="Active">Has active tickets</option>
                      <option value="Clear">No active complaints</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      setFilterOccupancy("All");
                      setFilterType("All");
                      setFilterDues("All");
                      setFilterComplaints("All");
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
                      placeholder="Search flats by number, resident..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full rounded-sm-200 pl-8 text-xs outline-none bg-zinc-50/50 dark:bg-zinc-900 focus:bg-white focus:indigo-500 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Showing {filteredFlats.length} of {totalFlats} flats
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredFlats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No flat units found</span>
                      <span className="text-[10px] mt-0.5">Try adjusting query keywords.</span>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 -200 dark:bg-zinc-950/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Flat Number</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Floor</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Building</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Owner Name</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Tenant status</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Occupancy</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-right h-9">Ledger Balance</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Parking slot</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Active tickets</TableHead>
                          <TableHead className="w-9 h-9" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                        {filteredFlats.map((f) => (
                          <TableRow
                            key={f.id}
                            onClick={() => setSelectedFlat(f)}
                            className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/20 cursor-pointer transition-colors"
                          >
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              Flat {f.flatNumber}
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 py-2.5">
                              {f.floor}
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 py-2.5">
                              {f.buildingName}
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {f.ownerName}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold  ${
                                f.tenantStatus === "Self-Occupied"
                                  ? "bg-indigo-50 text-indigo-700-200 dark:bg-indigo-950/20 dark:text-indigo-400"
                                  : f.tenantStatus === "Tenant-Occupied"
                                  ? "bg-zinc-100 text-zinc-700-200 dark:bg-zinc-800 dark:text-zinc-300"
                                  : "bg-rose-50 text-rose-700-200 dark:bg-rose-950/20 dark:text-rose-400"
                              }`}>
                                {f.tenantStatus}
                              </span>
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold ${
                                f.occupancyStatus === "Occupied"
                                  ? "bg-emerald-50 text-emerald-700 -250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : "bg-zinc-100 text-zinc-400 -200 dark:bg-zinc-900 dark:text-zinc-500"
                              }`}>
                                {f.occupancyStatus}
                              </span>
                            </TableCell>
                            <TableCell className={`text-xs font-bold text-right py-2.5 ${
                              f.utilityBalance < 0 ? "text-rose-600" : f.utilityBalance > 0 ? "text-emerald-600" : "text-zinc-600"
                            }`}>
                              {f.utilityBalance < 0 ? `-$${Math.abs(f.utilityBalance)}` : f.utilityBalance > 0 ? `+$${f.utilityBalance}` : "$0.00"}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-center text-zinc-850 dark:text-zinc-250 py-2.5">
                              {f.parkingAssignment}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <Badge
                                variant="outline"
                                className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-sm-200/60 ${
                                  f.activeComplaints > 0
                                    ? "text-rose-700 bg-rose-50 dark:text-rose-455 dark:bg-rose-950/20"
                                    : "text-zinc-400 bg-zinc-50 dark:bg-zinc-900"
                                }`}
                              >
                                {f.activeComplaints} tickets
                              </Badge>
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

      {/* FLAT DETAILS DRAWER (SHEET) */}
      <Sheet open={selectedFlat !== null} onOpenChange={(open) => !open && setSelectedFlat(null)}>
        <SheetContent className="w-full sm:max-w-md -200 bg-white dark:bg-zinc-950 p-0 text-zinc-900 dark:text-zinc-50 flex flex-col h-full shadow-lg">
          {selectedFlat && (
            <div className="flex flex-col h-full overflow-hidden">
              <SheetHeader className="p-4 -100">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                  <Home className="h-3 w-3" /> Flat profile details
                </div>
                <SheetTitle className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                  Flat Unit {selectedFlat.flatNumber}
                </SheetTitle>
                <SheetDescription className="text-[10px] text-zinc-550 mt-0.5">
                  {selectedFlat.buildingName} • {selectedFlat.floor}
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body Viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                
                {/* 1. Ownership & Occupant details */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Resident profiles</span>
                  <div className="space-y-2">
                    {/* Owner profile card */}
                    <div className="rounded -150 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-1">
                      <span className="text-[9px] text-zinc-400 block uppercase font-bold tracking-wider">Flat Owner</span>
                      <span className="text-xs font-semibold text-zinc-900 dark:text-white block">{selectedFlat.ownerName}</span>
                      <span className="text-[10px] text-zinc-500 block flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {selectedFlat.ownerPhone} • {selectedFlat.ownerEmail}
                      </span>
                    </div>

                    {/* Tenant profile card (if present) */}
                    {selectedFlat.tenantStatus === "Tenant-Occupied" && (
                      <div className="rounded -150 p-2.5 bg-indigo-50/20 dark:bg-indigo-950/10 space-y-1">
                        <span className="text-[9px] text-indigo-600 dark:text-indigo-400 block uppercase font-bold tracking-wider">Primary Tenant</span>
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white block">{selectedFlat.tenantName}</span>
                        <span className="text-[10px] text-zinc-500 block flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {selectedFlat.tenantPhone} • {selectedFlat.tenantEmail}
                        </span>
                        <div className="mt-1.5 flex justify-between text-[9.5px] text-zinc-500 -100 pt-1.5">
                          <span>Rent: {selectedFlat.rentAmount}</span>
                          <span>Lease ends: {selectedFlat.leaseExpires}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Utility Billing Ledger */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Utility Billing ledger</span>
                  <div className="rounded -150 p-3 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Current Balance:</span>
                      <span className={`font-bold ${
                        selectedFlat.utilityBalance < 0 ? "text-rose-600" : selectedFlat.utilityBalance > 0 ? "text-emerald-600" : "text-zinc-600"
                      }`}>
                        {selectedFlat.utilityBalance < 0 ? `-$${Math.abs(selectedFlat.utilityBalance)}` : selectedFlat.utilityBalance > 0 ? `+$${selectedFlat.utilityBalance}` : "$0.00"}
                      </span>
                    </div>
                    {selectedFlat.utilityBalance < 0 && (
                      <div className="mt-1.5 text-[9px] text-rose-600 font-semibold bg-rose-50 dark:bg-rose-950/20 px-2 py-1 rounded -100">
                        Notice: Outstanding dues in maintenance bills. Payment invoice due.
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Family Members */}
                {selectedFlat.occupancyStatus === "Occupied" && (
                  <div className="space-y-2.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Family members ({selectedFlat.familyMembers.length})</span>
                    {selectedFlat.familyMembers.length === 0 ? (
                      <span className="text-[10px] text-zinc-450 block italic">No family members registered.</span>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {selectedFlat.familyMembers.map((m: { name: string; relation: string; age: number }, idx: number) => (
                          <div key={idx} className="rounded -150 p-2 bg-zinc-50/50 dark:bg-zinc-950/40">
                            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">{m.name}</span>
                            <span className="text-[9.5px] text-zinc-450 block mt-0.5">{m.relation} • {m.age} yrs</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Emergency Contacts */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-455 dark:text-zinc-500 tracking-wider block">Emergency contacts</span>
                  {selectedFlat.emergencyContacts.length === 0 ? (
                    <span className="text-[10px] text-zinc-450 block italic">No emergency contacts registered.</span>
                  ) : (
                    <div className="space-y-2">
                      {selectedFlat.emergencyContacts.map((c: { name: string; relation: string; phone: string }, idx: number) => (
                        <div key={idx} className="flex items-center gap-2.5 -150 rounded p-2.5">
                          <div className="h-6.5 w-6.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-650 dark:text-zinc-450 flex items-center justify-center font-bold text-[10px]">
                            <User className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-zinc-900 dark:text-white block">{c.name}</span>
                            <span className="text-[9.5px] text-zinc-455 block">{c.relation} • {c.phone}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. Maintenance History */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Maintenance ticket history</span>
                  {selectedFlat.maintenanceHistory.length === 0 ? (
                    <span className="text-[10px] text-zinc-455 block italic">No past tickets reported from this unit.</span>
                  ) : (
                    <div className="space-y-2.5">
                      {selectedFlat.maintenanceHistory.map((m: { id: number; ticket: string; date: string; status: string }) => (
                        <div key={m.id} className="flex gap-2 text-xs -100 pb-2.5 last:0 last:pb-0">
                          <Clock className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <span className="text-zinc-800 dark:text-zinc-200 font-semibold block leading-tight truncate">{m.ticket}</span>
                            <span className="text-[9.5px] text-zinc-455 block mt-0.5">{m.date}</span>
                          </div>
                          <Badge variant="outline" className={`text-[8.5px] px-1.5 py-0.5 rounded-sm font-semibold  shrink-0 ${
                            m.status === "Resolved"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                              : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-955/20 dark:text-amber-450"
                          }`}>
                            {m.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
              
              {/* Drawer Footer Panel */}
              <div className="p-4 -100 bg-zinc-55/10 dark:bg-zinc-950/20 flex gap-2">
                <Button
                  onClick={() => {
                    setSelectedFlat(null);
                    toast.info(`Generated utility statement bill for Flat ${selectedFlat.flatNumber}`);
                  }}
                  variant="outline"
                  className="flex-1 h-8 rounded-sm text-xs-200 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <FileText className="h-3.5 w-3.5 mr-1" /> Statement
                </Button>
                <Button
                  onClick={() => {
                    setSelectedFlat(null);
                    toast.success(`Active payment reminder dispatched to resident.`);
                  }}
                  className="flex-1 h-8 rounded-sm text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Remind Dues
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}
