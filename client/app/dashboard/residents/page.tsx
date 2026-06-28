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
  ShieldAlert,
} from "lucide-react";

// Types
interface ResidentRecord {
  id: number;
  name: string;
  flatNumber: string;
  buildingName: string;
  residentType: "Owner" | "Tenant";
  phone: string;
  email: string;
  moveInDate: string;
  outstandingDues: number; // negative value represents outstanding dues
  operationalStatus: "Active" | "Pending Verification" | "Inactive";
  familyMembers: { name: string; relation: string; phone: string }[];
  emergencyContacts: { name: string; relation: string; phone: string }[];
  vehicles: { make: string; model: string; plate: string; slot: string }[];
  documents: { name: string; status: "Verified" | "Pending" | "Missing" }[];
  complaints: { title: string; date: string; status: string }[];
  payments: { item: string; amount: string; date: string; status: string }[];
  gatePasses: { visitorName: string; type: string; date: string }[];
  commsLog: { title: string; date: string; status: string }[];
}

export default function ResidentsPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Initial Mock Resident Data
  const [residents, setResidents] = React.useState<ResidentRecord[]>([
    {
      id: 1,
      name: "Harold Brooks",
      flatNumber: "1402",
      buildingName: "Tower Alpha",
      residentType: "Owner",
      phone: "+1 555-0102",
      email: "h.brooks@gmail.com",
      moveInDate: "2020-11-15",
      outstandingDues: -185.00,
      operationalStatus: "Active",
      familyMembers: [
        { name: "Linda Brooks", relation: "Spouse", phone: "+1 555-0182" },
        { name: "Tim Brooks", relation: "Son", phone: "N/A" }
      ],
      emergencyContacts: [
        { name: "Arthur Brooks", relation: "Brother", phone: "+1 555-0190" }
      ],
      vehicles: [
        { make: "Toyota", model: "RAV4 (Silver)", plate: "CA-9Y12", slot: "Slot L1-42" }
      ],
      documents: [
        { name: "Government ID", status: "Verified" },
        { name: "Ownership Certificate", status: "Verified" }
      ],
      complaints: [
        { title: "Intercom line dead", date: "2026-06-25", status: "Assigned" }
      ],
      payments: [
        { item: "June Maintenance dues", amount: "$185.00", date: "2026-06-26", status: "Pending" },
        { item: "May Maintenance dues", amount: "$185.00", date: "2026-05-26", status: "Paid" }
      ],
      gatePasses: [
        { visitorName: "Amazon Delivery", type: "Delivery", date: "Today, 11:20 AM" },
        { visitorName: "John Doe Senior", type: "Guest", date: "Yesterday, 3:00 PM" }
      ],
      commsLog: [
        { title: "Invoice notification raised", date: "2026-06-26", status: "Sent" }
      ]
    },
    {
      id: 2,
      name: "Sarah Connor",
      flatNumber: "805",
      buildingName: "Tower Alpha",
      residentType: "Tenant",
      phone: "+1 555-0212",
      email: "s.connor@cyberdyne.net",
      moveInDate: "2025-05-01",
      outstandingDues: -45.00,
      operationalStatus: "Active",
      familyMembers: [
        { name: "John Connor", relation: "Son", phone: "+1 555-0925" }
      ],
      emergencyContacts: [
        { name: "Dr. Silberman", relation: "Physician", phone: "+1 555-0900" }
      ],
      vehicles: [
        { make: "Harley Davidson", model: "Fat Boy (Black)", plate: "LA-4Z20", slot: "Slot L2-19" }
      ],
      documents: [
        { name: "Government ID", status: "Verified" },
        { name: "Lease Agreement", status: "Verified" }
      ],
      complaints: [
        { title: "Water pressure drop diagnostics", date: "2026-06-28", status: "In Progress" }
      ],
      payments: [
        { item: "Water surcharge (Q2)", amount: "$45.00", date: "2026-06-28", status: "Pending" },
        { item: "Clubhouse booking fee", amount: "$120.00", date: "2026-06-15", status: "Paid" }
      ],
      gatePasses: [
        { visitorName: "Sarah's Guest (Kyle)", type: "Guest", date: "Today, 10:30 AM" }
      ],
      commsLog: [
        { title: "Water warning alert received", date: "2026-06-28", status: "Delivered" }
      ]
    },
    {
      id: 3,
      name: "David Vance",
      flatNumber: "1204",
      buildingName: "Tower Alpha",
      residentType: "Owner",
      phone: "+1 555-0105",
      email: "david.vance@techcorp.com",
      moveInDate: "2023-08-10",
      outstandingDues: -250.00,
      operationalStatus: "Active",
      familyMembers: [],
      emergencyContacts: [
        { name: "Janet Vance", relation: "Mother", phone: "+1 555-0111" }
      ],
      vehicles: [
        { make: "Audi", model: "Q5 (White)", plate: "NY-2B88", slot: "Slot L2-05" }
      ],
      documents: [
        { name: "Government ID", status: "Verified" },
        { name: "Property Deed", status: "Verified" }
      ],
      complaints: [],
      payments: [
        { item: "Clubhouse deposit due", amount: "$250.00", date: "2026-06-24", status: "Pending" }
      ],
      gatePasses: [],
      commsLog: [
        { title: "Amenity billing dues warning", date: "2026-06-25", status: "Sent" }
      ]
    },
    {
      id: 4,
      name: "Mark Wahlberg",
      flatNumber: "604",
      buildingName: "Tower Beta",
      residentType: "Tenant",
      phone: "+1 555-0955",
      email: "marky.mark@wahlbergers.com",
      moveInDate: "2024-03-01",
      outstandingDues: 0.00,
      operationalStatus: "Active",
      familyMembers: [
        { name: "Rhea Wahlberg", relation: "Spouse", phone: "+1 555-0922" }
      ],
      emergencyContacts: [
        { name: "Donnie Wahlberg", relation: "Brother", phone: "+1 555-0921" }
      ],
      vehicles: [
        { make: "Ford", model: "F-150 (Blue)", plate: "MA-7X99", slot: "Slot L1-02" }
      ],
      documents: [
        { name: "Government ID", status: "Verified" },
        { name: "Lease Contract", status: "Verified" }
      ],
      complaints: [],
      payments: [
        { item: "June Lease Payment", amount: "$2,800.00", date: "2026-06-01", status: "Paid" }
      ],
      gatePasses: [
        { visitorName: "FedEx Cargo Delivery", type: "Delivery", date: "Today, 09:45 AM" }
      ],
      commsLog: []
    },
    {
      id: 5,
      name: "Arthur Pendragon",
      flatNumber: "301",
      buildingName: "Tower Gamma",
      residentType: "Owner",
      phone: "+1 555-0301",
      email: "a.pendragon@camelot.co",
      moveInDate: "2026-06-15",
      outstandingDues: 0.00,
      operationalStatus: "Pending Verification",
      familyMembers: [],
      emergencyContacts: [
        { name: "Merlin Ambrosius", relation: "Advisor", phone: "+1 555-0000" }
      ],
      vehicles: [],
      documents: [
        { name: "Government ID", status: "Verified" },
        { name: "Property Deed", status: "Pending" }
      ],
      complaints: [],
      payments: [],
      gatePasses: [],
      commsLog: [
        { title: "Verification documents requested", date: "2026-06-16", status: "Sent" }
      ]
    }
  ]);

  // Form State
  const [newResident, setNewResident] = React.useState({
    name: "",
    flatNumber: "",
    buildingName: "Tower Alpha",
    residentType: "Owner" as "Owner" | "Tenant",
    phone: "",
    email: "",
    outstandingDues: 0,
    operationalStatus: "Active" as "Active" | "Pending Verification" | "Inactive",
  });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedResident, setSelectedResident] = React.useState<ResidentRecord | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterType, setFilterType] = React.useState("All");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [filterDues, setFilterDues] = React.useState("All");
  const [filterComplaints, setFilterComplaints] = React.useState("All");
  const [filterBuilding, setFilterBuilding] = React.useState("All");

  const handleAddResident = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ResidentRecord = {
      id: residents.length + 1,
      name: newResident.name,
      flatNumber: newResident.flatNumber,
      buildingName: newResident.buildingName,
      residentType: newResident.residentType,
      phone: newResident.phone,
      email: newResident.email,
      moveInDate: new Date().toISOString().split("T")[0],
      outstandingDues: Number(newResident.outstandingDues),
      operationalStatus: newResident.operationalStatus,
      familyMembers: [],
      emergencyContacts: [],
      vehicles: [],
      documents: [{ name: "Government ID", status: "Pending" }],
      complaints: [],
      payments: [],
      gatePasses: [],
      commsLog: [{ title: "Welcome notification sent", date: "Just now", status: "Sent" }]
    };

    setResidents((prev) => [...prev, created]);
    setCreateOpen(false);
    toast.success(`Resident "${created.name}" onboarded successfully!`);

    // Reset Form
    setNewResident({
      name: "",
      flatNumber: "",
      buildingName: "Tower Alpha",
      residentType: "Owner",
      phone: "",
      email: "",
      outstandingDues: 0,
      operationalStatus: "Active",
    });
  };

  const handleImport = () => {
    toast.info("Select CSV files to import resident logs.");
  };

  const handleInvite = () => {
    toast.success("Resident mobile app registration link sent.");
  };

  const handleExport = () => {
    toast.success("Resident register list exported as CSV.");
  };

  // Filter Table List
  const filteredResidents = residents.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.flatNumber.includes(searchQuery);

    const matchesType = filterType === "All" || r.residentType === filterType;
    const matchesStatus = filterStatus === "All" || r.operationalStatus === filterStatus;
    const matchesBuilding = filterBuilding === "All" || r.buildingName === filterBuilding;

    let matchesDues = true;
    if (filterDues === "Unpaid") matchesDues = r.outstandingDues < 0;
    else if (filterDues === "Clear") matchesDues = r.outstandingDues >= 0;

    let matchesComplaints = true;
    if (filterComplaints === "Active") matchesComplaints = r.complaints.length > 0;
    else if (filterComplaints === "Clear") matchesComplaints = r.complaints.length === 0;

    return matchesSearch && matchesType && matchesStatus && matchesBuilding && matchesDues && matchesComplaints;
  });

  // Calculate Metrics
  const totalResidents = residents.length;
  const activeOccupancy = 91.2; // Simulated occupancy rate
  const ownerCount = residents.filter((r) => r.residentType === "Owner").length;
  const tenantCount = residents.filter((r) => r.residentType === "Tenant").length;
  const ratioOwnersPercent = Math.round((ownerCount / (ownerCount + tenantCount || 1)) * 100);
  const pendingVerifications = residents.filter((r) => r.operationalStatus === "Pending Verification").length;

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Resident Management
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Manage resident profiles, occupancy records, vehicles, operational activity, and communication across communities.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleImport}
                className="h-8 rounded-sm text-[11px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Import Resident Data</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleInvite}
                className="h-8 rounded-sm text-[11px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-855 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Users className="h-3.5 w-3.5" />
                <span>Invite Resident</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-855 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Generate Report</span>
              </Button>

              {/* ADD RESIDENT DIALOG */}
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="xs"
                    className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Resident</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-6 rounded-md">
                  <form onSubmit={handleAddResident}>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Add Resident Profile</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">Configure owner details, flat units, contact details, and verification status.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3.5 py-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="r-name" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Name</Label>
                        <Input
                          id="r-name"
                          required
                          value={newResident.name}
                          onChange={(e) => setNewResident({ ...newResident, name: e.target.value })}
                          placeholder="e.g. Harold Brooks"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="r-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat Number</Label>
                        <Input
                          id="r-flat"
                          required
                          value={newResident.flatNumber}
                          onChange={(e) => setNewResident({ ...newResident, flatNumber: e.target.value })}
                          placeholder="e.g. 1402"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="r-tower" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Building</Label>
                        <select
                          id="r-tower"
                          value={newResident.buildingName}
                          onChange={(e) => setNewResident({ ...newResident, buildingName: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Tower Alpha">Tower Alpha</option>
                          <option value="Tower Beta">Tower Beta</option>
                          <option value="Tower Gamma">Tower Gamma</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="r-type" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Type</Label>
                        <select
                          id="r-type"
                          value={newResident.residentType}
                          onChange={(e) => setNewResident({ ...newResident, residentType: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Owner">Owner Occupied</option>
                          <option value="Tenant">Tenant Occupied</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="r-phone" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Phone</Label>
                        <Input
                          id="r-phone"
                          required
                          value={newResident.phone}
                          onChange={(e) => setNewResident({ ...newResident, phone: e.target.value })}
                          placeholder="e.g. +1 555-0102"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="r-email" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email</Label>
                        <Input
                          id="r-email"
                          required
                          value={newResident.email}
                          onChange={(e) => setNewResident({ ...newResident, email: e.target.value })}
                          placeholder="e.g. resident@gmail.com"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="r-dues" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Dues ($)</Label>
                        <Input
                          id="r-dues"
                          type="number"
                          value={newResident.outstandingDues}
                          onChange={(e) => setNewResident({ ...newResident, outstandingDues: Number(e.target.value) })}
                          placeholder="e.g. -185.00"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="r-status" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Status</Label>
                        <select
                          id="r-status"
                          value={newResident.operationalStatus}
                          onChange={(e) => setNewResident({ ...newResident, operationalStatus: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Active">Active</option>
                          <option value="Pending Verification">Pending Verification</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                      <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Add Resident</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-zinc-500">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Total Residents</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-zinc-400 hover:text-zinc-650 outline-none">
                          <HelpCircle className="h-3 w-3" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-zinc-900 text-white border-zinc-800 rounded px-2 py-1 text-[10px]">
                        Total onboarded occupants.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Users className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{totalResidents}</span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-400">Onboarded database accounts</div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Active Occupancy</span>
                  <Building className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{activeOccupancy}%</span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-400">Total portfolio occupancy SLA</div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Owner vs Tenant Ratio</span>
                  <Users className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {ratioOwnersPercent}% <span className="text-xs font-semibold text-zinc-400">Owner</span>
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-400">{100 - ratioOwnersPercent}% tenant occupants</div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Pending Verifications</span>
                  <ShieldCheck className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{pendingVerifications}</span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-400">Onboarding validation checklists</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters & Grid Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters */}
            <div className="w-full lg:w-56 shrink-0 space-y-4">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900 flex flex-row items-center gap-1.5 space-y-0">
                  <Filter className="h-3.5 w-3.5 text-zinc-450" />
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Resident Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 space-y-4">
                  
                  {/* Owner/Tenant Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Onboard Type</Label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All statuses</option>
                      <option value="Owner">Owner Occupied</option>
                      <option value="Tenant">Tenant Occupied</option>
                    </select>
                  </div>

                  {/* Active/Inactive Status Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Verification status</Label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All statuses</option>
                      <option value="Active">Active</option>
                      <option value="Pending Verification">Pending Verification</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Building Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Building Block</Label>
                    <select
                      value={filterBuilding}
                      onChange={(e) => setFilterBuilding(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All building blocks</option>
                      <option value="Tower Alpha">Tower Alpha</option>
                      <option value="Tower Beta">Tower Beta</option>
                      <option value="Tower Gamma">Tower Gamma</option>
                    </select>
                  </div>

                  {/* Pending dues Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Outstanding balance</Label>
                    <select
                      value={filterDues}
                      onChange={(e) => setFilterDues(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All dues ledger</option>
                      <option value="Unpaid">Has pending payments</option>
                      <option value="Clear">Ledger balance clear</option>
                    </select>
                  </div>

                  {/* Complaint Activity Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Active Complaints</Label>
                    <select
                      value={filterComplaints}
                      onChange={(e) => setFilterComplaints(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All tickets status</option>
                      <option value="Active">Has unresolved tickets</option>
                      <option value="Clear">No active complaints</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      setFilterType("All");
                      setFilterStatus("All");
                      setFilterDues("All");
                      setFilterComplaints("All");
                      setFilterBuilding("All");
                      setSearchQuery("");
                    }}
                    variant="outline"
                    className="w-full h-7 text-[10px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 rounded-sm"
                  >
                    Clear filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Resident Table Card */}
            <div className="flex-1 min-w-0">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 space-y-0">
                  <div className="relative max-w-sm w-72">
                    <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      type="text"
                      placeholder="Search residents by name, flat..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full rounded-sm border-zinc-200 pl-8 text-xs outline-none bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900 focus:bg-white focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Showing {filteredResidents.length} of {totalResidents} resident records
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredResidents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No resident accounts matched</span>
                      <span className="text-[10px] mt-0.5">Try resetting filtering criteria.</span>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 border-b border-zinc-200 dark:bg-zinc-950/20 dark:border-zinc-850">
                        <TableRow className="hover:bg-transparent dark:border-zinc-850">
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Resident Name</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Flat Number</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Building</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Type</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Family Members</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Vehicles</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Active tickets</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-right h-9">Outstanding dues</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Status</TableHead>
                          <TableHead className="w-9 h-9" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                        {filteredResidents.map((r) => (
                          <TableRow
                            key={r.id}
                            onClick={() => setSelectedResident(r)}
                            className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/20 cursor-pointer dark:border-zinc-850 transition-colors"
                          >
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {r.name}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-200 py-2.5">
                              Flat {r.flatNumber}
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 py-2.5">
                              {r.buildingName}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold border ${
                                r.residentType === "Owner"
                                  ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900"
                                  : "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
                              }`}>
                                {r.residentType}
                              </span>
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-200 text-center py-2.5">
                              {r.familyMembers.length}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-200 text-center py-2.5">
                              {r.vehicles.length}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <Badge
                                variant="outline"
                                className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-sm border-zinc-200/60 ${
                                  r.complaints.length > 0
                                    ? "text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-455 dark:bg-rose-950/20 dark:border-rose-900"
                                    : "text-zinc-400 bg-zinc-50 dark:bg-zinc-900"
                                }`}
                              >
                                {r.complaints.length} tickets
                              </Badge>
                            </TableCell>
                            <TableCell className={`text-xs font-bold text-right py-2.5 ${
                              r.outstandingDues < 0 ? "text-rose-600" : "text-zinc-650"
                            }`}>
                              {r.outstandingDues < 0 ? `-$${Math.abs(r.outstandingDues)}` : "$0.00"}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold border ${
                                r.operationalStatus === "Active"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450 dark:border-emerald-900"
                                  : r.operationalStatus === "Pending Verification"
                                  ? "bg-amber-50 text-amber-700 border-amber-250 dark:bg-amber-950/20 dark:text-amber-450 dark:border-amber-900"
                                  : "bg-zinc-150 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                              }`}>
                                {r.operationalStatus}
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

      {/* RESIDENT DETAILS DRAWER (SHEET) */}
      <Sheet open={selectedResident !== null} onOpenChange={(open) => !open && setSelectedResident(null)}>
        <SheetContent className="w-full sm:max-w-md border-l border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-0 text-zinc-900 dark:text-zinc-50 flex flex-col h-full shadow-lg">
          {selectedResident && (
            <div className="flex flex-col h-full overflow-hidden">
              <SheetHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-indigo-650 dark:text-indigo-400 tracking-wider">
                  <Users className="h-3.5 w-3.5" /> Resident account profile
                </div>
                <SheetTitle className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                  {selectedResident.name}
                </SheetTitle>
                <SheetDescription className="text-[10px] text-zinc-550 mt-0.5">
                  Flat {selectedResident.flatNumber} • {selectedResident.buildingName} • Move-in: {selectedResident.moveInDate}
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body Viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                
                {/* 1. Account Details */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Contact details</span>
                  <div className="rounded border border-zinc-150 p-2.5 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-950/40 grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
                    <div>
                      <span className="text-zinc-400 block text-[9.5px]">PHONE</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">{selectedResident.phone}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[9.5px]">EMAIL ADDRESS</span>
                      <span className="font-semibold text-zinc-900 dark:text-white break-all">{selectedResident.email}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Registered Vehicles */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Registered Vehicles ({selectedResident.vehicles.length})</span>
                  {selectedResident.vehicles.length === 0 ? (
                    <span className="text-[10px] text-zinc-450 block italic">No vehicles registered.</span>
                  ) : (
                    <div className="space-y-2">
                      {selectedResident.vehicles.map((v, idx) => (
                        <div key={idx} className="flex items-center justify-between border border-zinc-150 rounded p-2.5 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20 text-xs">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-zinc-400" />
                            <div>
                              <span className="font-semibold block">{v.make} {v.model}</span>
                              <span className="text-[9.5px] text-zinc-450 block">{v.plate}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-[8.5px] px-1.5 py-0.5 rounded-sm border-zinc-200/60 font-semibold bg-zinc-50">
                            {v.slot}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Document Records */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-455 dark:text-zinc-500 tracking-wider block">Verification documents</span>
                  <div className="space-y-2">
                    {selectedResident.documents.map((d, idx) => (
                      <div key={idx} className="flex items-center justify-between border border-zinc-150 rounded p-2.5 dark:border-zinc-900 text-xs bg-zinc-50/50 dark:bg-zinc-950/20">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-250 flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-zinc-400" /> {d.name}
                        </span>
                        <Badge variant="outline" className={`text-[8.5px] px-1.5 py-0.5 rounded-sm font-semibold border ${
                          d.status === "Verified"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-450"
                            : "bg-amber-50 text-amber-700 border-amber-250 dark:bg-amber-950/20 dark:text-amber-450"
                        }`}>
                          {d.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Family Members & Emergency Contacts */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-2.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Family ({selectedResident.familyMembers.length})</span>
                    {selectedResident.familyMembers.length === 0 ? (
                      <span className="text-[10px] text-zinc-450 block italic">None registered.</span>
                    ) : (
                      <div className="space-y-1.5">
                        {selectedResident.familyMembers.map((m, idx) => (
                          <div key={idx} className="text-xs p-1.5 border border-zinc-150 rounded bg-zinc-50/30 dark:border-zinc-900">
                            <span className="font-semibold block">{m.name}</span>
                            <span className="text-[9px] text-zinc-450 block">{m.relation}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-455 dark:text-zinc-500 tracking-wider block">Emergency contacts</span>
                    {selectedResident.emergencyContacts.length === 0 ? (
                      <span className="text-[10px] text-zinc-450 block italic">None registered.</span>
                    ) : (
                      <div className="space-y-1.5">
                        {selectedResident.emergencyContacts.map((c, idx) => (
                          <div key={idx} className="text-xs p-1.5 border border-zinc-150 rounded bg-zinc-50/30 dark:border-zinc-900">
                            <span className="font-semibold block">{c.name}</span>
                            <span className="text-[9px] text-zinc-450 block">{c.relation} • {c.phone}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Recent Activity Timelines */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Gate visitor pass activity</span>
                  {selectedResident.gatePasses.length === 0 ? (
                    <span className="text-[10px] text-zinc-450 block italic">No recent passes.</span>
                  ) : (
                    <div className="space-y-2.5">
                      {selectedResident.gatePasses.map((g, idx) => (
                        <div key={idx} className="flex gap-2 text-xs border-b border-zinc-100 pb-2 dark:border-zinc-900 last:border-0 last:pb-0">
                          <Clock className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-zinc-800 dark:text-zinc-200 block leading-tight">{g.visitorName} ({g.type})</span>
                            <span className="text-[9.5px] text-zinc-400 block mt-0.5">{g.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
              
              {/* Drawer Footer Panel */}
              <div className="p-4 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-55/10 dark:bg-zinc-950/20 flex gap-2">
                {selectedResident.operationalStatus === "Pending Verification" ? (
                  <Button
                    onClick={() => {
                      setSelectedResident(null);
                      toast.success(`Resident documents verified. Status updated to Active.`);
                    }}
                    className="flex-1 h-8 rounded-sm text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                  >
                    Verify & Onboard
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setSelectedResident(null);
                        toast.info(`Sent account broadcast log to ${selectedResident.name}`);
                      }}
                      variant="outline"
                      className="flex-1 h-8 rounded-sm text-xs border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800"
                    >
                      Send Message
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedResident(null);
                        toast.success(`Dues invoice reminders dispatched to resident.`);
                      }}
                      className="flex-1 h-8 rounded-sm text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Remind Dues
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}
