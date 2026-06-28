"use client";

import * as React from "react";
import Link from "next/link";
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
  Contact,
  AlertCircle,
  ChevronRight,
  Filter,
  Plus,
  Upload,
  Download,
  Search,
  Building,
  DollarSign,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

// Types
interface OwnerRecord {
  id: string; // e.g. OWN-1002
  name: string;
  phone: string;
  email: string;
  societiesOwned: number;
  buildingsOwned: number;
  flatsOwned: number;
  activeTenants: number;
  monthlyIncome: number;
  status: "Active" | "Inactive";
  societiesList: string[];
  buildingsList: string[];
  flatsList: string[];
  occupancyOverview: string;
}

export default function OwnersPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Initial Mock Owners Records
  const [owners, setOwners] = React.useState<OwnerRecord[]>([
    {
      id: "OWN-201",
      name: "Arthur Pendragon",
      phone: "+1 555-0143",
      email: "arthur.p@camelot.com",
      societiesOwned: 2,
      buildingsOwned: 3,
      flatsOwned: 12,
      activeTenants: 10,
      monthlyIncome: 14200,
      status: "Active",
      societiesList: ["Grandview Towers", "Pine Crest Society"],
      buildingsList: ["Tower Alpha", "Tower Beta", "Oak Block"],
      flatsList: ["Flat 1402", "Flat 1204", "Flat 302", "Flat 805"],
      occupancyOverview: "83% Occupied (10 / 12 Units)"
    },
    {
      id: "OWN-202",
      name: "Guinevere Slytherin",
      phone: "+1 555-0988",
      email: "guinevere@hogwarts.edu",
      societiesOwned: 1,
      buildingsOwned: 1,
      flatsOwned: 4,
      activeTenants: 3,
      monthlyIncome: 5800,
      status: "Active",
      societiesList: ["Grandview Towers"],
      buildingsList: ["Tower Alpha"],
      flatsList: ["Flat 101", "Flat 102", "Flat 201", "Flat 202"],
      occupancyOverview: "75% Occupied (3 / 4 Units)"
    },
    {
      id: "OWN-203",
      name: "Uther Lightbringer",
      phone: "+1 555-0239",
      email: "uther@light.org",
      societiesOwned: 1,
      buildingsOwned: 2,
      flatsOwned: 8,
      activeTenants: 4,
      monthlyIncome: 9200,
      status: "Inactive",
      societiesList: ["Pine Crest Society"],
      buildingsList: ["North Tower", "South Tower"],
      flatsList: ["Flat 501", "Flat 502", "Flat 601", "Flat 602"],
      occupancyOverview: "50% Occupied (4 / 8 Units)"
    }
  ]);

  // Form State
  const [newOwner, setNewOwner] = React.useState({
    name: "",
    phone: "",
    email: "",
    societiesOwned: 1,
    buildingsOwned: 1,
    flatsOwned: 2,
    monthlyIncome: 2500,
  });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedOwner, setSelectedOwner] = React.useState<OwnerRecord | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [filterProperties, setFilterProperties] = React.useState("All");
  const [filterIncome, setFilterIncome] = React.useState("All");

  const handleAddOwner = (e: React.FormEvent) => {
    e.preventDefault();
    const created: OwnerRecord = {
      id: `OWN-${200 + owners.length + 1}`,
      name: newOwner.name,
      phone: newOwner.phone,
      email: newOwner.email,
      societiesOwned: Number(newOwner.societiesOwned),
      buildingsOwned: Number(newOwner.buildingsOwned),
      flatsOwned: Number(newOwner.flatsOwned),
      activeTenants: 0,
      monthlyIncome: Number(newOwner.monthlyIncome),
      status: "Active",
      societiesList: ["Grandview Towers"],
      buildingsList: ["Tower Alpha"],
      flatsList: ["Flat 901", "Flat 902"],
      occupancyOverview: "0% Occupied (0 / 2 Units)"
    };

    setOwners((prev) => [...prev, created]);
    setCreateOpen(false);
    toast.success(`Property Owner "${created.name}" onboarded successfully!`);

    // Reset Form
    setNewOwner({
      name: "",
      phone: "",
      email: "",
      societiesOwned: 1,
      buildingsOwned: 1,
      flatsOwned: 2,
      monthlyIncome: 2500,
    });
  };

  const handleImport = () => {
    toast.info("Select CSV owner register profiles to import.");
  };

  const handleExport = () => {
    toast.success("Owner operational dataset exported.");
  };

  // Filter Table List
  const filteredOwners = owners.filter((o) => {
    const matchesSearch =
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.includes(searchQuery);

    const matchesStatus = filterStatus === "All" || o.status === filterStatus;

    let matchesProps = true;
    if (filterProperties === "High") matchesProps = o.flatsOwned >= 10;
    else if (filterProperties === "Mid") matchesProps = o.flatsOwned >= 4 && o.flatsOwned < 10;
    else if (filterProperties === "Low") matchesProps = o.flatsOwned < 4;

    let matchesIncome = true;
    if (filterIncome === "High") matchesIncome = o.monthlyIncome >= 10000;
    else if (filterIncome === "Low") matchesIncome = o.monthlyIncome < 10000;

    return matchesSearch && matchesStatus && matchesProps && matchesIncome;
  });

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Property Owners
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Manage property owners who own one or multiple buildings and flats across societies.
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
                <span>Import Owners</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-855 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5 mr-1" /> Export Registry
              </Button>
              <Link href="/dashboard/owners/linking">
                <Button
                  variant="outline"
                  size="xs"
                  className="h-8 rounded-sm text-[11px] font-semibold border-indigo-200 hover:bg-indigo-50/50 text-indigo-700 dark:border-indigo-900 dark:hover:bg-indigo-950/20"
                >
                  Link Property
                </Button>
              </Link>

              {/* ADD OWNER DIALOG */}
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="xs"
                    className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Owner</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-6 rounded-md">
                  <form onSubmit={handleAddOwner}>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Add Property Owner</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">Register new owner credentials and billing portfolio defaults.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3.5 py-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="o-name" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Name</Label>
                        <Input
                          id="o-name"
                          required
                          value={newOwner.name}
                          onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })}
                          placeholder="e.g. Arthur Pendragon"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="o-phone" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Phone</Label>
                        <Input
                          id="o-phone"
                          required
                          value={newOwner.phone}
                          onChange={(e) => setNewOwner({ ...newOwner, phone: e.target.value })}
                          placeholder="e.g. +1 555-0143"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="o-email" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email</Label>
                        <Input
                          id="o-email"
                          required
                          type="email"
                          value={newOwner.email}
                          onChange={(e) => setNewOwner({ ...newOwner, email: e.target.value })}
                          placeholder="e.g. arthur@camelot.com"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="o-flats" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flats Count</Label>
                        <Input
                          id="o-flats"
                          type="number"
                          required
                          value={newOwner.flatsOwned}
                          onChange={(e) => setNewOwner({ ...newOwner, flatsOwned: Number(e.target.value) })}
                          min={1}
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="o-income" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Monthly Dues ($)</Label>
                        <Input
                          id="o-income"
                          type="number"
                          required
                          value={newOwner.monthlyIncome}
                          onChange={(e) => setNewOwner({ ...newOwner, monthlyIncome: Number(e.target.value) })}
                          min={0}
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                      <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Add Owner</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

            </div>
          </div>

          {/* Filtering and Table Grid layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters */}
            <div className="w-full lg:w-56 shrink-0 space-y-4">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900 flex flex-row items-center gap-1.5 space-y-0">
                  <Filter className="h-3.5 w-3.5 text-zinc-450" />
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Owner Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 space-y-4">
                  
                  {/* Status Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Owner Status</Label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All statuses</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Properties Count Range */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Properties Owned</Label>
                    <select
                      value={filterProperties}
                      onChange={(e) => setFilterProperties(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All counts</option>
                      <option value="High">Large portfolio (&gt;= 10 Flats)</option>
                      <option value="Mid">Medium portfolio (4-9 Flats)</option>
                      <option value="Low">Small portfolio (&lt; 4 Flats)</option>
                    </select>
                  </div>

                  {/* Income Range */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Income range</Label>
                    <select
                      value={filterIncome}
                      onChange={(e) => setFilterIncome(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All incomes</option>
                      <option value="High">&gt;= $10,000 / mo</option>
                      <option value="Low">&lt; $10,000 / mo</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      setFilterStatus("All");
                      setFilterProperties("All");
                      setFilterIncome("All");
                      setSearchQuery("");
                      toast.success("Filters reset to default.");
                    }}
                    variant="outline"
                    className="w-full h-7 text-[10px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 rounded-sm"
                  >
                    Clear filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Table Area */}
            <div className="flex-1 min-w-0">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 space-y-0">
                  <div className="relative max-w-sm w-72">
                    <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      type="text"
                      placeholder="Search owners by name, phone, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full rounded-sm border-zinc-200 pl-8 text-xs outline-none bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900 focus:bg-white focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Showing {filteredOwners.length} of {owners.length} owners
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredOwners.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No owners match filter criteria</span>
                      <span className="text-[10px] mt-0.5">Try resetting search metrics.</span>
                    </div>
                  ) : (
                    <div className="overflow-x-auto w-full">
                      <Table>
                        <TableHeader className="bg-zinc-50/50 border-b border-zinc-200 dark:bg-zinc-955/20 dark:border-zinc-850">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Owner Name</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Contact Info</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Societies Owned</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Buildings Owned</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Flats Owned</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Active Tenants</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-right h-9">Monthly Income</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Status</TableHead>
                            <TableHead className="w-9 h-9" />
                          </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                          {filteredOwners.map((o) => (
                            <TableRow
                              key={o.id}
                              onClick={() => setSelectedOwner(o)}
                              className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/20 cursor-pointer dark:border-zinc-850 transition-colors"
                            >
                              <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                                {o.name}
                              </TableCell>
                              <TableCell className="py-2.5">
                                <span className="text-xs font-medium text-zinc-950 dark:text-zinc-100 block">{o.phone}</span>
                                <span className="text-[10px] text-zinc-400 block">{o.email}</span>
                              </TableCell>
                              <TableCell className="text-xs font-semibold text-center text-zinc-800 dark:text-zinc-250 py-2.5">
                                {o.societiesOwned}
                              </TableCell>
                              <TableCell className="text-xs font-semibold text-center text-zinc-800 dark:text-zinc-250 py-2.5">
                                {o.buildingsOwned}
                              </TableCell>
                              <TableCell className="text-xs font-bold text-center text-zinc-900 dark:text-white py-2.5">
                                {o.flatsOwned}
                              </TableCell>
                              <TableCell className="text-xs font-semibold text-center text-zinc-800 dark:text-zinc-250 py-2.5">
                                {o.activeTenants}
                              </TableCell>
                              <TableCell className="text-xs font-bold text-right text-zinc-900 dark:text-white py-2.5">
                                ${o.monthlyIncome.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-center py-2.5">
                                <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold border ${
                                  o.status === "Active"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                    : "bg-zinc-100 text-zinc-650 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                                }`}>
                                  {o.status}
                                </span>
                              </TableCell>
                              <TableCell className="py-2.5 text-zinc-400 text-right">
                                <ChevronRight className="h-4 w-4 shrink-0 inline-block" />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

          </div>

        </main>
      </div>

      {/* OWNER DETAILS DRAWER */}
      <Sheet open={selectedOwner !== null} onOpenChange={(open) => !open && setSelectedOwner(null)}>
        <SheetContent className="w-full sm:max-w-md border-l border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-0 text-zinc-900 dark:text-zinc-50 flex flex-col h-full shadow-lg">
          {selectedOwner && (
            <div className="flex flex-col h-full overflow-hidden">
              <SheetHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-indigo-655 dark:text-indigo-400 tracking-wider">
                  <Contact className="h-3.5 w-3.5" /> Property Owner Profile
                </div>
                <div className="flex items-center justify-between mt-1">
                  <SheetTitle className="text-sm font-bold text-zinc-900 dark:text-white">
                    {selectedOwner.name}
                  </SheetTitle>
                  <Link href={`/dashboard/owners/detail?id=${selectedOwner.id}`} onClick={() => setSelectedOwner(null)}>
                    <Button size="xs" variant="outline" className="h-7 text-[10px] rounded-sm gap-1 border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800">
                      <span>Full Detail Page</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
                <SheetDescription className="text-[10px] text-zinc-550 mt-0.5">
                  ID: {selectedOwner.id} • {selectedOwner.phone} • {selectedOwner.email}
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body Viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                
                {/* 1. Owned Societies list */}
                <div className="space-y-2">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Linked Societies</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedOwner.societiesList.map((soc, idx) => (
                      <Badge key={idx} variant="outline" className="text-[9.5px] px-2 py-0.5 rounded-sm border-zinc-200/80 bg-zinc-50/50">
                        {soc}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 2. Owned Buildings list */}
                <div className="space-y-2">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-455 dark:text-zinc-500 tracking-wider block">Linked Buildings</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedOwner.buildingsList.map((b, idx) => (
                      <Badge key={idx} variant="outline" className="text-[9.5px] px-2 py-0.5 rounded-sm border-zinc-200/80 bg-zinc-50/50">
                        <Building className="h-2.5 w-2.5 mr-1 inline-block" /> {b}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 3. Owned Flats list */}
                <div className="space-y-2">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Owned Flats Portfolio</span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-zinc-700 dark:text-zinc-350">
                    {selectedOwner.flatsList.map((flat, idx) => (
                      <div key={idx} className="p-1.5 rounded border border-zinc-150 bg-zinc-50/40 dark:border-zinc-900">
                        {flat}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Financial & Occupancy Summary */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Portfolio Performance</span>
                  <div className="rounded border border-zinc-150 p-2.5 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-950/40 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">MONTHLY DUES CASHFLOW:</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">${selectedOwner.monthlyIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">ACTIVE LEASE TENANTS:</span>
                      <span className="font-semibold">{selectedOwner.activeTenants} Tenants</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">PORTFOLIO OCCUPANCY:</span>
                      <span className="font-semibold">{selectedOwner.occupancyOverview}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}
