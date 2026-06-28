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
import { toast } from "sonner";
import { validateData, parkingSchema } from "@/lib/validations";
import {
  Car,
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
  DollarSign,
} from "lucide-react";
import { useParking, parkingApi } from "@/lib/api";
import type { ParkingSlot as ParkingSlotType } from "@/lib/api";

export default function ParkingPage() {
  const orgs = ["Grandview Towers", "Meadow View Complex", "Parkside Residences"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Fetch parking slots from API
  const { slots: slotsFromApi, loading, error, refetch } = useParking();
  const [slots, setSlots] = React.useState<ParkingSlotType[]>([]);

  // Sync API data with local state
  React.useEffect(() => {
    if (slotsFromApi) {
      setSlots(slotsFromApi);
    }
  }, [slotsFromApi]);

  // Form State
  const [newSlot, setNewSlot] = React.useState({
    slotNumber: "",
    buildingName: "Tower Alpha",
    flatNumber: "",
    residentName: "",
    vehicleType: "Sedan" as any,
    vehicleNumber: "",
    category: "Resident" as any,
    occupancyStatus: "Occupied" as any,
  });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedSlot, setSelectedSlot] = React.useState<ParkingSlotType | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterOccupancy, setFilterOccupancy] = React.useState("All");
  const [filterType, setFilterType] = React.useState("All");
  const [filterBuilding, setFilterBuilding] = React.useState("All");
  const [filterCategory, setFilterCategory] = React.useState("All");
  const [filterPayment, setFilterPayment] = React.useState("All");

  const handleAssignSlot = (e: React.FormEvent) => {
    e.preventDefault();

    const validationData = {
      slotNumber: newSlot.slotNumber,
      buildingName: newSlot.buildingName,
      flatNumber: newSlot.flatNumber || undefined,
      residentName: newSlot.residentName || undefined,
      vehicleType: newSlot.vehicleType,
      vehicleNumber: newSlot.vehicleNumber || undefined,
      category: newSlot.category,
      occupancyStatus: newSlot.occupancyStatus,
    };

    const validation = validateData(parkingSchema, validationData);
    if (!validation.success) {
      toast.error(validation.error);
      return;
    }

    const newSlotData: Omit<ParkingSlotType, 'id'> = {
      slotNumber: newSlot.slotNumber,
      buildingName: newSlot.buildingName,
      flatNumber: newSlot.flatNumber || "N/A",
      residentName: newSlot.residentName || "Unassigned",
      vehicleType: newSlot.vehicleType,
      vehicleNumber: newSlot.vehicleNumber || "N/A",
      category: newSlot.category,
      occupancyStatus: newSlot.occupancyStatus,
      paymentStatus: "Paid",
      parkingHistory: [],
      visitorActivity: [],
      securityLogs: [
        { time: new Date().toLocaleString(), event: "Parking space allocated", guard: "John Doe" }
      ]
    };

    const created: ParkingSlotType = {
      ...newSlotData,
      id: `Slot ${newSlot.slotNumber}`
    } as ParkingSlotType;

    setSlots((prev) => [created, ...prev]);
    setCreateOpen(false);
    toast.success(`Parking space ${created.slotNumber} allocated!`);

    // Reset Form
    setNewSlot({
      slotNumber: "",
      buildingName: "Tower Alpha",
      flatNumber: "",
      residentName: "",
      vehicleType: "Sedan",
      vehicleNumber: "",
      category: "Resident",
      occupancyStatus: "Occupied",
    });
  };

  const handleAddVisitor = () => {
    toast.success("Visitor parking slot pass generated.");
  };

  const handleExport = () => {
    toast.success("Parking audit log spreadsheet exported.");
  };

  // Filter Table List
  const filteredSlots = slots.filter((s) => {
    const matchesSearch =
      s.slotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesOccupancy = filterOccupancy === "All" || s.occupancyStatus === filterOccupancy;
    const matchesType = filterType === "All" || s.vehicleType === filterType;
    const matchesBuilding = filterBuilding === "All" || s.buildingName === filterBuilding;
    const matchesCategory = filterCategory === "All" || s.category === filterCategory;
    const matchesPayment = filterPayment === "All" || s.paymentStatus === filterPayment;

    return matchesSearch && matchesOccupancy && matchesType && matchesBuilding && matchesCategory && matchesPayment;
  });

  // Calculate Metrics
  const totalSlots = slots.length;
  const occupiedSlotsCount = slots.filter((s) => s.occupancyStatus === "Occupied").length;
  const visitorSlotsCount = slots.filter((s) => s.category === "Visitor" && s.occupancyStatus === "Occupied").length;
  const parkingRevenueVal = "$1,820";

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans selection:bg-zinc-200">
      

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
                Parking Management
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Manage parking allocations, vehicle registrations, visitor parking, and parking operations across communities.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleAddVisitor}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Visitor Parking</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Parking Report</span>
              </Button>

              {/* ASSIGN PARKING DIALOG */}
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="xs"
                    className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Assign Parking Slot</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] -200 bg-white dark:bg-zinc-950 p-6 rounded-md">
                  <form onSubmit={handleAssignSlot}>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Allocate Parking Slot</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">Configure vehicle registers, slot details, and resident bounds.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3.5 py-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="p-slot" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Slot Number</Label>
                        <Input
                          id="p-slot"
                          required
                          value={newSlot.slotNumber}
                          onChange={(e) => setNewSlot({ ...newSlot, slotNumber: e.target.value })}
                          placeholder="e.g. L1-42"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="p-tower" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Building</Label>
                        <select
                          id="p-tower"
                          value={newSlot.buildingName}
                          onChange={(e) => setNewSlot({ ...newSlot, buildingName: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Tower Alpha">Tower Alpha</option>
                          <option value="Tower Beta">Tower Beta</option>
                          <option value="Tower Gamma">Tower Gamma</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="p-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat Unit</Label>
                        <Input
                          id="p-flat"
                          value={newSlot.flatNumber}
                          onChange={(e) => setNewSlot({ ...newSlot, flatNumber: e.target.value })}
                          placeholder="e.g. 1402"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="p-resident" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Resident</Label>
                        <Input
                          id="p-resident"
                          value={newSlot.residentName}
                          onChange={(e) => setNewSlot({ ...newSlot, residentName: e.target.value })}
                          placeholder="e.g. Harold Brooks"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="p-vtype" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Vehicle Type</Label>
                        <select
                          id="p-vtype"
                          value={newSlot.vehicleType}
                          onChange={(e) => setNewSlot({ ...newSlot, vehicleType: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="SUV">SUV</option>
                          <option value="Sedan">Sedan</option>
                          <option value="Motorcycle">Motorcycle</option>
                          <option value="EV Hatchback">EV Hatchback</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="p-vnum" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Vehicle No</Label>
                        <Input
                          id="p-vnum"
                          value={newSlot.vehicleNumber}
                          onChange={(e) => setNewSlot({ ...newSlot, vehicleNumber: e.target.value })}
                          placeholder="e.g. CA-9Y12"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="p-cat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</Label>
                        <select
                          id="p-cat"
                          value={newSlot.category}
                          onChange={(e) => setNewSlot({ ...newSlot, category: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Resident">Resident Parking</option>
                          <option value="Visitor">Visitor Parking</option>
                          <option value="Reserved">Reserved Parking</option>
                          <option value="Staff">Staff Parking</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                      <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Assign Slot</Button>
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
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Total Parking Slots</span>
                  <Car className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{totalSlots}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Occupied Slots</span>
                  <Car className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{occupiedSlotsCount}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-455 dark:text-zinc-500">Visitor Usage</span>
                  <Car className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{visitorSlotsCount}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Parking Revenue</span>
                  <DollarSign className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{parkingRevenueVal}</span>
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
                    Parking Filters
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
                      <option value="All">All occupancy</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Available">Available</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Violation">Violation</option>
                    </select>
                  </div>

                  {/* Vehicle Type Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Vehicle Type</Label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All vehicle types</option>
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="EV Hatchback">EV Hatchback</option>
                      <option value="None">None</option>
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

                  {/* Parking category Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Parking category</Label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All categories</option>
                      <option value="Resident">Resident Parking</option>
                      <option value="Visitor">Visitor Parking</option>
                      <option value="Reserved">Reserved Parking</option>
                      <option value="Staff">Staff Parking</option>
                    </select>
                  </div>

                  {/* Payment status Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Payment status</Label>
                    <select
                      value={filterPayment}
                      onChange={(e) => setFilterPayment(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All balances</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      setFilterOccupancy("All");
                      setFilterType("All");
                      setFilterBuilding("All");
                      setFilterCategory("All");
                      setFilterPayment("All");
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
                      placeholder="Search slots by Slot, Resident, Vehicle..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full rounded-sm-200 pl-8 text-xs outline-none bg-zinc-50/50 dark:bg-zinc-900 focus:bg-white focus:indigo-500 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Showing {filteredSlots.length} of {slots.length} slots
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredSlots.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No parking records matched</span>
                      <span className="text-[10px] mt-0.5">Try resetting filter metrics.</span>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 -200 dark:bg-zinc-950/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Slot Number</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Building</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Flat</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Resident</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Vehicle Type</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Vehicle No</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Parking Category</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Occupancy Status</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Payment Status</TableHead>
                          <TableHead className="w-9 h-9" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                        {filteredSlots.map((s) => (
                          <TableRow
                            key={s.id}
                            onClick={() => setSelectedSlot(s)}
                            className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/20 cursor-pointer transition-colors"
                          >
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {s.slotNumber}
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 py-2.5">
                              {s.buildingName}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-200 py-2.5">
                              {s.flatNumber}
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {s.residentName}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-center text-zinc-800 dark:text-zinc-200 py-2.5">
                              {s.vehicleType}
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-center text-zinc-900 dark:text-white py-2.5">
                              {s.vehicleNumber}
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-center text-zinc-800 dark:text-zinc-250 py-2.5">
                              {s.category}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold  ${
                                s.occupancyStatus === "Occupied"
                                  ? "bg-emerald-50 text-emerald-700-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : s.occupancyStatus === "Available"
                                  ? "bg-blue-50 text-blue-700-200 dark:bg-blue-955/20 dark:text-blue-450"
                                  : s.occupancyStatus === "Reserved"
                                  ? "bg-amber-50 text-amber-700-250 dark:bg-amber-955/20 dark:text-amber-450"
                                  : "bg-rose-50 text-rose-700-250 dark:bg-rose-955/20 dark:text-rose-455"
                              }`}>
                                {s.occupancyStatus}
                              </span>
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold  ${
                                s.paymentStatus === "Paid"
                                  ? "bg-emerald-50 text-emerald-700-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : "bg-rose-50 text-rose-700-250 dark:bg-rose-955/20 dark:text-rose-455"
                              }`}>
                                {s.paymentStatus}
                              </span>
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

      {/* PARKING DETAILS DRAWER */}
      <Sheet open={selectedSlot !== null} onOpenChange={(open) => !open && setSelectedSlot(null)}>
        <SheetContent className="w-full sm:max-w-md -200 bg-white dark:bg-zinc-950 p-0 text-zinc-900 dark:text-zinc-50 flex flex-col h-full shadow-lg">
          {selectedSlot && (
            <div className="flex flex-col h-full overflow-hidden">
              <SheetHeader className="p-4 -100">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-indigo-650 dark:text-indigo-400 tracking-wider">
                  <Car className="h-3.5 w-3.5" /> Parking allocation log
                </div>
                <SheetTitle className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                  Slot Space {selectedSlot.slotNumber}
                </SheetTitle>
                <SheetDescription className="text-[10px] text-zinc-550 mt-0.5">
                  {selectedSlot.buildingName} • Category: {selectedSlot.category}
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body Viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                
                {/* Security Violations alert */}
                {selectedSlot.occupancyStatus === "Violation" && (
                  <div className="rounded -200 bg-rose-50/50 p-3 text-xs text-rose-700 dark:bg-rose-955/20 flex gap-2">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-rose-600" />
                    <div>
                      <span className="font-bold block">Parking Violation Alert</span>
                      <span className="text-[10px] block mt-0.5 leading-snug">Unauthorized vehicle license {selectedSlot.vehicleNumber} parked in resident slot.</span>
                    </div>
                  </div>
                )}

                {/* 1. Resident Info */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Resident Information</span>
                  <div className="rounded -150 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-zinc-400 block text-[9px]">NAME</span>
                      <span className="font-semibold">{selectedSlot.residentName}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[9px]">FLAT UNIT</span>
                      <span className="font-semibold">{selectedSlot.flatNumber}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Vehicle Registration details */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Vehicle registration details</span>
                  <div className="rounded -150 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-zinc-400 block text-[9px]">TYPE</span>
                      <span className="font-semibold">{selectedSlot.vehicleType}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[9px]">LICENSE PLATE</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedSlot.vehicleNumber}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Gate Activity history */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Parking check-in logs</span>
                  {selectedSlot.parkingHistory.length === 0 ? (
                    <span className="text-[10px] text-zinc-450 block italic">No history check-ins logged today.</span>
                  ) : (
                    <div className="space-y-2">
                      {selectedSlot.parkingHistory.map((item, idx) => (
                        <div key={idx} className="flex justify-between -100 pb-2 last:0 last:pb-0 text-xs">
                          <span>Plate: {item.vehicleNumber}</span>
                          <span className="font-semibold">Check-in: {item.checkIn}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Security Audit logs */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-455 dark:text-zinc-500 tracking-wider block">Security logs</span>
                  {selectedSlot.securityLogs.length === 0 ? (
                    <span className="text-[10px] text-zinc-450 block italic">No anomalies or event tags reported.</span>
                  ) : (
                    <div className="space-y-2">
                      {selectedSlot.securityLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2 text-xs -100 pb-2 last:0 last:pb-0">
                          <Clock className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-zinc-800 dark:text-zinc-200 block">{log.event}</span>
                            <span className="text-[9.5px] text-zinc-450 block mt-0.5">{log.time} • Operator: {log.guard}</span>
                          </div>
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
                    setSelectedSlot(null);
                    toast.info("Flagged security logs dispatch to gate operator.");
                  }}
                  variant="outline"
                  className="flex-1 h-8 rounded-sm text-xs-200 hover:bg-zinc-50"
                >
                  Report Violation
                </Button>
                {selectedSlot.occupancyStatus === "Violation" && (
                  <Button
                    onClick={() => {
                      setSelectedSlot(null);
                      toast.error("Towing request dispatched to central lot service.");
                    }}
                    className="flex-1 h-8 rounded-sm text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold"
                  >
                    Request Towing
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
