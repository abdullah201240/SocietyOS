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
  CreditCard,
  AlertCircle,
  Clock,
  ChevronRight,
  Filter,
  Plus,
  Download,
  Search,
  HelpCircle,
  ShieldCheck,
  BellRing,
} from "lucide-react";

// Types
interface InvoiceRecord {
  id: string; // e.g. INV-9021
  society: string;
  buildingName: string;
  flatNumber: string;
  residentName: string;
  ownerName: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Overdue";
  dueDate: string;
  utilityCharges: number;
  maintenanceCharges: number;
  otherCharges: number;
  paymentMethod: string;
}

export default function GlobalBillingPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Initial Mock Global Billing Data
  const [invoices, setInvoices] = React.useState<InvoiceRecord[]>([
    {
      id: "INV-9021",
      society: "Grandview Towers",
      buildingName: "Tower Alpha",
      flatNumber: "1402",
      residentName: "Marcus Aurelius",
      ownerName: "Arthur Pendragon",
      amount: 1600,
      status: "Paid",
      dueDate: "2026-07-05",
      utilityCharges: 80,
      maintenanceCharges: 120,
      otherCharges: 1400, // Rent
      paymentMethod: "Bank Transfer"
    },
    {
      id: "INV-9022",
      society: "Grandview Towers",
      buildingName: "Tower Alpha",
      flatNumber: "805",
      residentName: "Sarah Connor",
      ownerName: "Arthur Pendragon",
      amount: 1375,
      status: "Paid",
      dueDate: "2026-07-05",
      utilityCharges: 75,
      maintenanceCharges: 100,
      otherCharges: 1200,
      paymentMethod: "Credit Card"
    },
    {
      id: "INV-9023",
      society: "Grandview Towers",
      buildingName: "Tower Alpha",
      flatNumber: "302",
      residentName: "Elena Rostova",
      ownerName: "Arthur Pendragon",
      amount: 1200,
      status: "Overdue",
      dueDate: "2026-06-20",
      utilityCharges: 100,
      maintenanceCharges: 100,
      otherCharges: 1000,
      paymentMethod: "None"
    },
    {
      id: "INV-9024",
      society: "Pine Crest Society",
      buildingName: "Oak Block",
      flatNumber: "501",
      residentName: "Arthur Dent",
      ownerName: "Uther Lightbringer",
      amount: 1100,
      status: "Unpaid",
      dueDate: "2026-07-05",
      utilityCharges: 60,
      maintenanceCharges: 90,
      otherCharges: 950,
      paymentMethod: "None"
    }
  ]);

  // Form State
  const [newInvoice, setNewInvoice] = React.useState({
    society: "Grandview Towers",
    buildingName: "Tower Alpha",
    flatNumber: "",
    residentName: "",
    ownerName: "",
    amount: 1000,
    dueDate: "2026-07-10",
    utilityCharges: 50,
    maintenanceCharges: 100,
  });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState<InvoiceRecord | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [filterSociety, setFilterSociety] = React.useState("All");
  const [filterBuilding, setFilterBuilding] = React.useState("All");

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const created: InvoiceRecord = {
      id: `INV-${9000 + invoices.length + 1}`,
      society: newInvoice.society,
      buildingName: newInvoice.buildingName,
      flatNumber: newInvoice.flatNumber,
      residentName: newInvoice.residentName,
      ownerName: newInvoice.ownerName,
      amount: Number(newInvoice.amount),
      status: "Unpaid",
      dueDate: newInvoice.dueDate,
      utilityCharges: Number(newInvoice.utilityCharges),
      maintenanceCharges: Number(newInvoice.maintenanceCharges),
      otherCharges: Number(newInvoice.amount) - Number(newInvoice.utilityCharges) - Number(newInvoice.maintenanceCharges),
      paymentMethod: "None"
    };

    setInvoices((prev) => [created, ...prev]);
    setCreateOpen(false);
    toast.success(`Invoice "${created.id}" generated successfully.`);

    // Reset Form
    setNewInvoice({
      society: "Grandview Towers",
      buildingName: "Tower Alpha",
      flatNumber: "",
      residentName: "",
      ownerName: "",
      amount: 1000,
      dueDate: "2026-07-10",
      utilityCharges: 50,
      maintenanceCharges: 100,
    });
  };

  const handleSendReminders = () => {
    toast.success("Outstanding balance payment email reminders sent.");
  };

  const handleExport = () => {
    toast.success("Billing registry exported as CSV.");
  };

  // Filter Table List
  const filteredInvoices = invoices.filter((i) => {
    const matchesSearch =
      i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.flatNumber.includes(searchQuery);

    const matchesStatus =
      filterStatus === "All"
        ? true
        : filterStatus === "Overdue"
        ? i.status === "Overdue"
        : i.status === filterStatus;

    const matchesSociety = filterSociety === "All" || i.society === filterSociety;
    const matchesBuilding = filterBuilding === "All" || i.buildingName === filterBuilding;

    return matchesSearch && matchesStatus && matchesSociety && matchesBuilding;
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
                Billing System
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Manage all billing across societies, buildings, flats, and residents.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleSendReminders}
                className="h-8 rounded-sm text-[11px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <BellRing className="h-3.5 w-3.5" />
                <span>Send Reminders</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-855 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Reports</span>
              </Button>

              {/* GENERATE INVOICE DIALOG */}
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="xs"
                    className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Generate Invoice</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-6 rounded-md">
                  <form onSubmit={handleGenerateInvoice}>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Generate Manual Invoice</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">Dispatch billing invoice statements manually across flats.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3.5 py-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="i-soc" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Society</Label>
                        <select
                          id="i-soc"
                          value={newInvoice.society}
                          onChange={(e) => setNewInvoice({ ...newInvoice, society: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Grandview Towers">Grandview Towers</option>
                          <option value="Pine Crest Society">Pine Crest Society</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="i-bld" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Building</Label>
                        <select
                          id="i-bld"
                          value={newInvoice.buildingName}
                          onChange={(e) => setNewInvoice({ ...newInvoice, buildingName: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Tower Alpha">Tower Alpha</option>
                          <option value="Tower Beta">Tower Beta</option>
                          <option value="Oak Block">Oak Block</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="i-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat</Label>
                        <Input
                          id="i-flat"
                          required
                          value={newInvoice.flatNumber}
                          onChange={(e) => setNewInvoice({ ...newInvoice, flatNumber: e.target.value })}
                          placeholder="e.g. 1402"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="i-resident" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Resident</Label>
                        <Input
                          id="i-resident"
                          required
                          value={newInvoice.residentName}
                          onChange={(e) => setNewInvoice({ ...newInvoice, residentName: e.target.value })}
                          placeholder="e.g. Marcus Aurelius"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="i-owner" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Owner</Label>
                        <Input
                          id="i-owner"
                          required
                          value={newInvoice.ownerName}
                          onChange={(e) => setNewInvoice({ ...newInvoice, ownerName: e.target.value })}
                          placeholder="e.g. Arthur Pendragon"
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="i-amount" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Total Dues ($)</Label>
                        <Input
                          id="i-amount"
                          type="number"
                          required
                          value={newInvoice.amount}
                          onChange={(e) => setNewInvoice({ ...newInvoice, amount: Number(e.target.value) })}
                          min={0}
                          className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                      <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Generate</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

            </div>
          </div>

          {/* Filtering Layout & Main Table */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters */}
            <div className="w-full lg:w-56 shrink-0 space-y-4">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900 flex flex-row items-center gap-1.5 space-y-0">
                  <Filter className="h-3.5 w-3.5 text-zinc-450" />
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Billing Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 space-y-4">
                  
                  {/* Status Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Billing Status</Label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All statuses</option>
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>

                  {/* Society Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Society Block</Label>
                    <select
                      value={filterSociety}
                      onChange={(e) => setFilterSociety(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All societies</option>
                      <option value="Grandview Towers">Grandview Towers</option>
                      <option value="Pine Crest Society">Pine Crest Society</option>
                    </select>
                  </div>

                  {/* Building Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Building</Label>
                    <select
                      value={filterBuilding}
                      onChange={(e) => setFilterBuilding(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All buildings</option>
                      <option value="Tower Alpha">Tower Alpha</option>
                      <option value="Tower Beta">Tower Beta</option>
                      <option value="Oak Block">Oak Block</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      setFilterStatus("All");
                      setFilterSociety("All");
                      setFilterBuilding("All");
                      setSearchQuery("");
                      toast.success("Filters reset.");
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
                      placeholder="Search invoices by ID, resident, owner..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full rounded-sm border-zinc-200 pl-8 text-xs outline-none bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900 focus:bg-white focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Showing {filteredInvoices.length} of {invoices.length} billing items
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredInvoices.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No invoices match selected criteria</span>
                      <span className="text-[10px] mt-0.5">Try resetting search metrics.</span>
                    </div>
                  ) : (
                    <div className="overflow-x-auto w-full">
                      <Table>
                        <TableHeader className="bg-zinc-50/50 border-b border-zinc-200 dark:bg-zinc-955/20 dark:border-zinc-850">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Invoice ID</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Society</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Building/Flat</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Resident</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Owner</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-right h-9">Amount</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center h-9">Status</TableHead>
                            <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center h-9">Due Date</TableHead>
                            <TableHead className="w-9 h-9" />
                          </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                          {filteredInvoices.map((inv) => (
                            <TableRow
                              key={inv.id}
                              onClick={() => setSelectedInvoice(inv)}
                              className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/20 cursor-pointer dark:border-zinc-850 transition-colors"
                            >
                              <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                                {inv.id}
                              </TableCell>
                              <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 py-2.5">
                                {inv.society}
                              </TableCell>
                              <TableCell className="text-xs font-medium py-2.5">
                                <span>{inv.flatNumber}</span>
                                <span className="text-[9.5px] text-zinc-400 block font-normal">{inv.buildingName}</span>
                              </TableCell>
                              <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                                {inv.residentName}
                              </TableCell>
                              <TableCell className="text-xs font-medium py-2.5 text-zinc-700 dark:text-zinc-300">
                                {inv.ownerName}
                              </TableCell>
                              <TableCell className="text-xs font-bold text-right text-zinc-900 dark:text-white py-2.5">
                                ৳{inv.amount.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-center py-2.5">
                                <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold border ${
                                  inv.status === "Paid"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                    : inv.status === "Unpaid"
                                    ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-955/20 dark:text-amber-450"
                                    : "bg-rose-50 text-rose-700 border-rose-250 dark:bg-rose-955/20 dark:text-rose-455"
                                }`}>
                                  {inv.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-xs font-medium text-center text-zinc-800 dark:text-zinc-200 py-2.5">
                                {inv.dueDate}
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

      {/* BILLING INVOICE DETAILS DRAWER */}
      <Sheet open={selectedInvoice !== null} onOpenChange={(open) => !open && setSelectedInvoice(null)}>
        <SheetContent className="w-full sm:max-w-md border-l border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-0 text-zinc-900 dark:text-zinc-50 flex flex-col h-full shadow-lg">
          {selectedInvoice && (
            <div className="flex flex-col h-full overflow-hidden">
              <SheetHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-indigo-650 dark:text-indigo-400 tracking-wider">
                  <CreditCard className="h-3.5 w-3.5" /> Billing Invoice Details
                </div>
                <SheetTitle className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                  {selectedInvoice.id}
                </SheetTitle>
                <SheetDescription className="text-[10px] text-zinc-550 mt-0.5">
                  Resident: {selectedInvoice.residentName} • Unit {selectedInvoice.flatNumber} ({selectedInvoice.buildingName})
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body Viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                
                {/* Dues Alert */}
                {selectedInvoice.status === "Overdue" && (
                  <div className="rounded border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-700 dark:border-rose-900/60 dark:bg-rose-955/20 flex gap-2">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-rose-600" />
                    <div>
                      <span className="font-bold block">Invoice Overdue Warning</span>
                      <span className="text-[10px] block mt-0.5 leading-snug">This invoice is overdue by several days. Automated late fee rules have been enforced on the balance ledger.</span>
                    </div>
                  </div>
                )}

                {/* 1. Ownership metadata */}
                <div className="space-y-2">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Property Ownership</span>
                  <div className="rounded border border-zinc-150 p-2.5 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-950/40 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-450">Landlord Owner Name:</span>
                      <span className="font-semibold">{selectedInvoice.ownerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Society Address Block:</span>
                      <span className="font-semibold">{selectedInvoice.society}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Payment Breakdown */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Billing Breakdown</span>
                  <div className="rounded border border-zinc-150 p-2.5 bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-950/40 text-xs space-y-2">
                    <div className="flex justify-between border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                      <span className="text-zinc-450">Maintenance Charges:</span>
                      <span className="font-semibold">৳{selectedInvoice.maintenanceCharges}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                      <span className="text-zinc-450">Utility Charges:</span>
                      <span className="font-semibold">৳{selectedInvoice.utilityCharges}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                      <span className="text-zinc-455">Other Surcharges (Rent):</span>
                      <span className="font-semibold">৳{selectedInvoice.otherCharges}</span>
                    </div>
                    <div className="flex justify-between pt-1 font-bold text-zinc-900 dark:text-white">
                      <span>Total Invoice Amount:</span>
                      <span>৳{selectedInvoice.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Transaction Details */}
                <div className="space-y-2">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Transaction Details</span>
                  <div className="text-xs space-y-1.5 text-zinc-650 dark:text-zinc-350">
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span className="font-semibold">{selectedInvoice.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Date Deadline:</span>
                      <span className="font-semibold">{selectedInvoice.dueDate}</span>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Drawer Footer */}
              <div className="p-4 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-55/10 dark:bg-zinc-950/20 flex gap-2">
                {selectedInvoice.status !== "Paid" && (
                  <Button
                    onClick={() => {
                      setInvoices((prev) =>
                        prev.map((i) => (i.id === selectedInvoice.id ? { ...i, status: "Paid", paymentMethod: "Manual Cash" } : i))
                      );
                      setSelectedInvoice(null);
                      toast.success(`Invoice marked as PAID.`);
                    }}
                    className="flex-1 h-8 rounded-sm text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
                  >
                    Confirm Manual Payment
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
