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
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Building2,
  Users,
  Activity,
  MapPin,
  AlertCircle,
  DollarSign,
  Plus,
  Download,
  Upload,
  Search,
  Building,
  ChevronRight,
  Filter,
  User,
  Clock,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

// Types
interface Society {
  id: number;
  name: string;
  location: string;
  city: string;
  buildings: number;
  residents: number;
  occupancy: number; // percentage
  complaints: number;
  collections: string; // amount
  collectionProgress: number; // percentage
  status: "Active" | "Under Maintenance" | "Onboarding";
  founded: string;
  email: string;
  managers: { name: string; role: string; phone: string; email: string }[];
  activity: { id: number; action: string; time: string }[];
  towers: { name: string; occupied: number; total: number }[];
}

export default function SocietiesPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Mock initial society records
  const [societies, setSocieties] = React.useState<Society[]>([
    {
      id: 1,
      name: "Grandview Towers",
      location: "Biscayne Blvd, Miami",
      city: "Miami",
      buildings: 3,
      residents: 1248,
      occupancy: 91.2,
      complaints: 12,
      collections: "$142,500",
      collectionProgress: 96.3,
      status: "Active",
      founded: "2019-04-12",
      email: "management@grandviewtowers.com",
      managers: [
        { name: "John Doe", role: "Primary Estate Admin", phone: "+1 555-0102", email: "john.doe@societyos.com" },
        { name: "Sarah Jenkins", role: "Security & Operations", phone: "+1 555-0145", email: "sarah.j@societyos.com" }
      ],
      activity: [
        { id: 1, action: "Elevator B brake tests certified & logged", time: "1h ago" },
        { id: 2, action: "Unit 1402 completed June Maintenance fee transaction", time: "2h ago" },
        { id: 3, action: "Water treating dosing schedule configured", time: "1d ago" }
      ],
      towers: [
        { name: "Tower Alpha", occupied: 118, total: 125 },
        { name: "Tower Beta", occupied: 112, total: 125 },
        { name: "Tower Gamma", occupied: 82, total: 93 }
      ]
    },
    {
      id: 2,
      name: "Pine Crest Society",
      location: "Oak Lane, Seattle",
      city: "Seattle",
      buildings: 2,
      residents: 582,
      occupancy: 91.0,
      complaints: 5,
      collections: "$94,200",
      collectionProgress: 96.1,
      status: "Active",
      founded: "2018-08-20",
      email: "admin@pinecrestsociety.org",
      managers: [
        { name: "Marcus Stone", role: "Facilities Manager", phone: "+1 555-0210", email: "marcus.stone@societyos.com" }
      ],
      activity: [
        { id: 1, action: "Announced pool closure for chemical cleaning", time: "3h ago" },
        { id: 2, action: "New resident contract signed for Unit 302", time: "1d ago" }
      ],
      towers: [
        { name: "Block East", occupied: 92, total: 100 },
        { name: "Block West", occupied: 90, total: 100 }
      ]
    },
    {
      id: 3,
      name: "Meadow View Estate",
      location: "Green Ridge, Denver",
      city: "Denver",
      buildings: 4,
      residents: 890,
      occupancy: 84.5,
      complaints: 18,
      collections: "$112,000",
      collectionProgress: 88.0,
      status: "Under Maintenance",
      founded: "2021-11-05",
      email: "contact@meadowviewdenver.com",
      managers: [
        { name: "Elena Rostova", role: "Resident Care Lead", phone: "+1 555-0352", email: "elena.r@meadowview.com" }
      ],
      activity: [
        { id: 1, action: "Boiler system warning triggered for Block C", time: "30m ago" },
        { id: 2, action: "Parking space audit logs uploaded", time: "2d ago" }
      ],
      towers: [
        { name: "Meadow Tower 1", occupied: 45, total: 50 },
        { name: "Meadow Tower 2", occupied: 48, total: 50 },
        { name: "Meadow Tower 3", occupied: 40, total: 50 },
        { name: "Meadow Villa Blocks", occupied: 36, total: 50 }
      ]
    },
    {
      id: 4,
      name: "Silver Maple Heights",
      location: "Maple Ave, Boston",
      city: "Boston",
      buildings: 1,
      residents: 120,
      occupancy: 78.0,
      complaints: 2,
      collections: "$22,000",
      collectionProgress: 98.2,
      status: "Onboarding",
      founded: "2026-02-15",
      email: "boston@silvermapleheights.com",
      managers: [
        { name: "Thomas Brady", role: "Transition Onboarding Lead", phone: "+1 555-0812", email: "t.brady@societyos.com" }
      ],
      activity: [
        { id: 1, action: "Registered 15 new flats on system database", time: "1d ago" },
        { id: 2, action: "Gate scanner testing initialized", time: "3d ago" }
      ],
      towers: [
        { name: "Main Building", occupied: 39, total: 50 }
      ]
    }
  ]);

  // Form State for creating a new society
  const [newSociety, setNewSociety] = React.useState({
    name: "",
    location: "",
    city: "Miami",
    buildings: 1,
    residents: 10,
    occupancy: 100,
    collections: "$0",
    status: "Onboarding" as "Active" | "Under Maintenance" | "Onboarding",
  });

  const [createOpen, setCreateOpen] = React.useState(false);

  // Detail Drawer State
  const [selectedSociety, setSelectedSociety] = React.useState<Society | null>(null);

  // Filtering and Search State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [filterCity, setFilterCity] = React.useState("All");
  const [filterOccupancy, setFilterOccupancy] = React.useState("All");
  const [filterComplaints, setFilterComplaints] = React.useState("All");

  // Handler for adding a new society record
  const handleCreateSociety = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Society = {
      id: societies.length + 1,
      name: newSociety.name,
      location: newSociety.location,
      city: newSociety.city,
      buildings: Number(newSociety.buildings),
      residents: Number(newSociety.residents),
      occupancy: Number(newSociety.occupancy),
      complaints: 0,
      collections: newSociety.collections,
      collectionProgress: 100,
      status: newSociety.status,
      founded: new Date().toISOString().split("T")[0],
      email: `admin@${newSociety.name.toLowerCase().replace(/\s+/g, "")}.com`,
      managers: [
        { name: "John Doe", role: "Primary Estate Admin", phone: "+1 555-0102", email: "john.doe@societyos.com" }
      ],
      activity: [
        { id: 1, action: "Society created & initialized on SocietyOS Console", time: "Just now" }
      ],
      towers: Array.from({ length: Number(newSociety.buildings) }).map((_, i) => ({
        name: `Block ${String.fromCharCode(65 + i)}`,
        occupied: Math.round(Number(newSociety.residents) / Number(newSociety.buildings)),
        total: Math.round(Number(newSociety.residents) / Number(newSociety.buildings)) + 5,
      }))
    };

    setSocieties((prev) => [...prev, created]);
    setCreateOpen(false);
    toast.success(`Society "${created.name}" onboarded successfully!`);

    // Reset Form
    setNewSociety({
      name: "",
      location: "",
      city: "Miami",
      buildings: 1,
      residents: 10,
      occupancy: 100,
      collections: "$0",
      status: "Onboarding",
    });
  };

  // Import Data / Export Report Simulators
  const handleImport = () => {
    toast.info("Select CSV files to import society profiles.");
  };

  const handleExport = () => {
    toast.success("Society operational report downloaded as CSV.");
  };

  // Filtering Logic
  const filteredSocieties = societies.filter((s) => {
    // 1. Search Query
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Status
    const matchesStatus = filterStatus === "All" || s.status === filterStatus;

    // 3. City
    const matchesCity = filterCity === "All" || s.city === filterCity;

    // 4. Occupancy
    let matchesOccupancy = true;
    if (filterOccupancy === "High") matchesOccupancy = s.occupancy >= 90;
    else if (filterOccupancy === "Mid") matchesOccupancy = s.occupancy >= 80 && s.occupancy < 90;
    else if (filterOccupancy === "Low") matchesOccupancy = s.occupancy < 80;

    // 5. Complaints
    let matchesComplaints = true;
    if (filterComplaints === "High") matchesComplaints = s.complaints >= 10;
    else if (filterComplaints === "Normal") matchesComplaints = s.complaints < 10;

    return matchesSearch && matchesStatus && matchesCity && matchesOccupancy && matchesComplaints;
  });

  // Aggregated Stats
  const totalSocieties = societies.length;
  const totalResidents = societies.reduce((acc, curr) => acc + curr.residents, 0);
  const activeOperations = societies.filter((s) => s.status === "Active").length;
  const avgEfficiency = 94.2; // Simulated operational score

  // List of Cities for filter
  const cities = Array.from(new Set(societies.map((s) => s.city)));

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Society Management
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Manage residential communities, operational settings, and organizational structures.
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
                <span>Import Data</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-855 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Report</span>
              </Button>

              {/* CREATE SOCIETY DIALOG */}
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="xs"
                    className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Create Society</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-6 rounded-md">
                  <form onSubmit={handleCreateSociety}>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Onboard Residential Society</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">Configure layout buildings, flats, and status for the new community.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3.5 py-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-name" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Name</Label>
                        <Input
                          id="s-name"
                          required
                          value={newSociety.name}
                          onChange={(e) => setNewSociety({ ...newSociety, name: e.target.value })}
                          placeholder="e.g. Pine Crest Society"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-location" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Location</Label>
                        <Input
                          id="s-location"
                          required
                          value={newSociety.location}
                          onChange={(e) => setNewSociety({ ...newSociety, location: e.target.value })}
                          placeholder="e.g. Oak Lane, Seattle"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-city" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">City</Label>
                        <select
                          id="s-city"
                          value={newSociety.city}
                          onChange={(e) => setNewSociety({ ...newSociety, city: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Miami">Miami</option>
                          <option value="Seattle">Seattle</option>
                          <option value="Denver">Denver</option>
                          <option value="Boston">Boston</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-buildings" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Buildings</Label>
                        <Input
                          id="s-buildings"
                          type="number"
                          required
                          value={newSociety.buildings}
                          onChange={(e) => setNewSociety({ ...newSociety, buildings: Number(e.target.value) })}
                          min={1}
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-residents" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Residents</Label>
                        <Input
                          id="s-residents"
                          type="number"
                          required
                          value={newSociety.residents}
                          onChange={(e) => setNewSociety({ ...newSociety, residents: Number(e.target.value) })}
                          min={1}
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-collections" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Collections</Label>
                        <Input
                          id="s-collections"
                          required
                          value={newSociety.collections}
                          onChange={(e) => setNewSociety({ ...newSociety, collections: e.target.value })}
                          placeholder="e.g. $94,200"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-status" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Status</Label>
                        <select
                          id="s-status"
                          value={newSociety.status}
                          onChange={(e) => setNewSociety({ ...newSociety, status: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Active">Active</option>
                          <option value="Under Maintenance">Under Maintenance</option>
                          <option value="Onboarding">Onboarding</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                      <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Onboard Society</Button>
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
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Total Societies</span>
                  <Building2 className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{totalSocieties}</span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-400">Manageable platforms</div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Total Residents</span>
                  <Users className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{totalResidents.toLocaleString()}</span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-400">Total onboarded accounts</div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Active Operations</span>
                  <Activity className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{activeOperations}</span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-400">Currently serving units</div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">SLA Efficiency Score</span>
                  <ShieldCheck className="h-4 w-4 text-zinc-400 shrink-0" aria-hidden="true" />
                </div>
                <div className="mt-2.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{avgEfficiency}%</span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-400">Target metrics threshold</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Filter & Table Grid */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters */}
            <div className="w-full lg:w-56 shrink-0 space-y-4">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900 flex flex-row items-center gap-1.5 space-y-0">
                  <Filter className="h-3.5 w-3.5 text-zinc-450" />
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Sidebar Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 space-y-4">
                  {/* Status Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Status</Label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All statuses</option>
                      <option value="Active">Active</option>
                      <option value="Under Maintenance">Under Maintenance</option>
                      <option value="Onboarding">Onboarding</option>
                    </select>
                  </div>

                  {/* City Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">City</Label>
                    <select
                      value={filterCity}
                      onChange={(e) => setFilterCity(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All cities</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Occupancy Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Occupancy status</Label>
                    <select
                      value={filterOccupancy}
                      onChange={(e) => setFilterOccupancy(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All rates</option>
                      <option value="High">&ge; 90% Occupancy</option>
                      <option value="Mid">80% - 90% Occupancy</option>
                      <option value="Low">&lt; 80% Occupancy</option>
                    </select>
                  </div>

                  {/* Complaints level Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Complaint Level</Label>
                    <select
                      value={filterComplaints}
                      onChange={(e) => setFilterComplaints(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All levels</option>
                      <option value="High">&ge; 10 Active tickets</option>
                      <option value="Normal">&lt; 10 Active tickets</option>
                    </select>
                  </div>

                  {/* Reset Filters button */}
                  <Button
                    onClick={() => {
                      setFilterStatus("All");
                      setFilterCity("All");
                      setFilterOccupancy("All");
                      setFilterComplaints("All");
                      setSearchQuery("");
                    }}
                    variant="outline"
                    className="w-full h-7 text-[10px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 rounded-sm"
                  >
                    Clear all filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Society Table Card */}
            <div className="flex-1 min-w-0">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 space-y-0">
                  <div className="relative max-w-sm w-72">
                    <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      type="text"
                      placeholder="Search societies by name, location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full rounded-sm border-zinc-200 pl-8 text-xs outline-none bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900 focus:bg-white focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Showing {filteredSocieties.length} of {totalSocieties} societies
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredSocieties.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No societies match current query</span>
                      <span className="text-[10px] mt-0.5">Try resetting the sidebar filters.</span>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 border-b border-zinc-200 dark:bg-zinc-950/20 dark:border-zinc-850">
                        <TableRow className="hover:bg-transparent dark:border-zinc-850">
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Society Name</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Location</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Buildings</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Residents</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Occupancy</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Complaints</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-right h-9">Collections</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Status</TableHead>
                          <TableHead className="w-9 h-9" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                        {filteredSocieties.map((s) => (
                          <TableRow
                            key={s.id}
                            onClick={() => setSelectedSociety(s)}
                            className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/20 cursor-pointer dark:border-zinc-850 transition-colors"
                          >
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {s.name}
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 py-2.5">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-zinc-400 shrink-0" />
                                <span>{s.location}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-200 text-center py-2.5">
                              {s.buildings}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-200 text-center py-2.5">
                              {s.residents.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-xs font-bold text-zinc-900 dark:text-white text-center py-2.5">
                              {s.occupancy}%
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <Badge
                                variant="outline"
                                className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-sm border-zinc-200/60 ${
                                  s.complaints >= 10
                                    ? "text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/20"
                                    : s.complaints > 0
                                    ? "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20"
                                    : "text-zinc-400 bg-zinc-50 dark:bg-zinc-900"
                                }`}
                              >
                                {s.complaints} Active
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs font-bold text-zinc-900 dark:text-white text-right py-2.5">
                              {s.collections}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold border ${
                                s.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450 dark:border-emerald-900"
                                  : s.status === "Under Maintenance"
                                  ? "bg-amber-50 text-amber-700 border-amber-250 dark:bg-amber-950/20 dark:text-amber-450 dark:border-amber-900"
                                  : "bg-zinc-100 text-zinc-650 border-zinc-200 dark:bg-zinc-850 dark:text-zinc-400 dark:border-zinc-700"
                              }`}>
                                {s.status}
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

      {/* SOCIETY DETAILS DRAWER (SHEET) */}
      <Sheet open={selectedSociety !== null} onOpenChange={(open) => !open && setSelectedSociety(null)}>
        <SheetContent className="w-full sm:max-w-md border-l border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-0 text-zinc-900 dark:text-zinc-50 flex flex-col h-full shadow-lg">
          {selectedSociety && (
            <div className="flex flex-col h-full overflow-hidden">
              <SheetHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                  <Building2 className="h-3 w-3" /> Society profile
                </div>
                <SheetTitle className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                  {selectedSociety.name}
                </SheetTitle>
                <SheetDescription className="text-[10px] text-zinc-550 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-zinc-400 shrink-0" />
                  <span>{selectedSociety.location}</span>
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body Viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                
                {/* Section 1: Profile Details */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Information Profile</span>
                  <div className="rounded border border-zinc-150 p-2.5 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-950/40 grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
                    <div>
                      <span className="text-zinc-400 block text-[9.5px]">CONTACT EMAIL</span>
                      <span className="font-medium text-zinc-900 dark:text-white break-all">{selectedSociety.email}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[9.5px]">FOUNDED DATE</span>
                      <span className="font-medium text-zinc-900 dark:text-white">{selectedSociety.founded}</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: Operational Metrics */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-455 dark:text-zinc-500 tracking-wider block">Operational compliance</span>
                  <div className="space-y-3.5 rounded border border-zinc-150 p-3 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-950/40">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10.5px] text-zinc-600 dark:text-zinc-400">
                        <span className="font-semibold">Collections compliance</span>
                        <span className="font-bold text-zinc-850 dark:text-zinc-350">{selectedSociety.collectionProgress}%</span>
                      </div>
                      <Progress value={selectedSociety.collectionProgress} className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10.5px] text-zinc-650 dark:text-zinc-400">
                        <span className="font-semibold">Average SLA resolution rate</span>
                        <span className="font-bold text-zinc-850 dark:text-zinc-350">14 hrs (Avg)</span>
                      </div>
                      <Progress value={92} className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Section 3: Assigned Managers */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Estate managers ({selectedSociety.managers.length})</span>
                  <div className="space-y-2">
                    {selectedSociety.managers.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 border border-zinc-150 rounded p-2.5 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
                        <div className="h-7 w-7 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-450 flex items-center justify-center font-bold text-[10px]">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-zinc-900 dark:text-white block">{m.name}</span>
                          <span className="text-[9.5px] text-zinc-450 block">{m.role} • {m.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Building Overview */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Building breakdown ({selectedSociety.towers.length})</span>
                  <div className="space-y-2">
                    {selectedSociety.towers.map((t, idx) => {
                      const occupancyPercent = Math.round((t.occupied / t.total) * 100);
                      return (
                        <div key={idx} className="border border-zinc-150 rounded p-2.5 dark:border-zinc-900 space-y-2 bg-zinc-50/50 dark:bg-zinc-950/20">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
                              <Building className="h-3.5 w-3.5 text-zinc-400" /> {t.name}
                            </span>
                            <span className="text-zinc-500 font-medium">Occupied: {t.occupied} / {t.total} ({occupancyPercent}%)</span>
                          </div>
                          <Progress value={occupancyPercent} className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 5: Recent Activity */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Operational audit feed</span>
                  <div className="space-y-2">
                    {selectedSociety.activity.map((a) => (
                      <div key={a.id} className="flex gap-2 text-xs border-b border-zinc-100 pb-2 dark:border-zinc-900 last:border-0 last:pb-0">
                        <Clock className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-zinc-700 dark:text-zinc-300 block leading-tight">{a.action}</span>
                          <span className="text-[9.5px] text-zinc-400 block mt-0.5">{a.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              
              {/* Drawer Footer Panel */}
              <div className="p-4 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-55/10 dark:bg-zinc-950/20 flex gap-2">
                <Button
                  onClick={() => {
                    setSelectedSociety(null);
                    toast.info(`Configured manager permissions for ${selectedSociety.name}`);
                  }}
                  variant="outline"
                  className="flex-1 h-8 rounded-sm text-xs border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  Edit Permissions
                </Button>
                <Button
                  onClick={() => {
                    setSelectedSociety(null);
                    toast.success(`Active operations dashboard loaded for ${selectedSociety.name}`);
                  }}
                  className="flex-1 h-8 rounded-sm text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Manage Society
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}
