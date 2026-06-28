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
  CreditCard,
  DollarSign,
  AlertCircle,
  Clock,
  ChevronRight,
  Filter,
  Plus,
  Upload,
  Download,
  Search,
  User,
  HelpCircle,
  ShieldCheck,
  FileText,
  Send,
  History,
  FileSpreadsheet,
} from "lucide-react";

// Types
interface InvoiceRecord {
  id: string; // e.g. INV-2026-102
  residentName: string;
  flatNumber: string;
  buildingName: string;
  category: "Maintenance" | "Utilities" | "Amenities" | "Parking" | "Surcharges";
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue" | "Processing";
  method: "Bank Transfer" | "Credit Card" | "Cash/Check" | "ACH Auto-debit" | "None";
  outstandingBalance: number;
  breakdown: { item: string; charge: number }[];
  utilityBreakdown?: { type: "Water" | "Electricity" | "Gas"; usage: string; rate: string };
  lateFee: number;
  timeline: { step: string; timestamp: string; note: string }[];
  commsLog: { action: string; time: string; medium: string }[];
}

export default function BillingPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Initial Mock Financial Data
  const [invoices, setInvoices] = React.useState<InvoiceRecord[]>([
    {
      id: "INV-2026-402",
      residentName: "Harold Brooks",
      flatNumber: "1402",
      buildingName: "Tower Alpha",
      category: "Maintenance",
      amount: 185.00,
      dueDate: "2026-07-05",
      status: "Pending",
      method: "None",
      outstandingBalance: 185.00,
      breakdown: [
        { item: "General Maintenance SLA Contribution", charge: 140.00 },
        { item: "Security & Guard Service Levy", charge: 30.00 },
        { item: "Elevator Upkeep Surcharge", charge: 15.00 }
      ],
      lateFee: 0.00,
      timeline: [
        { step: "Invoice Created", timestamp: "2026-06-25, 09:00 AM", note: "Billing run cycle #26 generated." },
        { step: "Invoice Dispatched", timestamp: "2026-06-25, 09:15 AM", note: "Sent via email & resident portal notification." }
      ],
      commsLog: [
        { action: "E-invoice Sent", time: "2026-06-25, 09:15 AM", medium: "Email" }
      ]
    },
    {
      id: "INV-2026-403",
      residentName: "Sarah Connor",
      flatNumber: "805",
      buildingName: "Tower Alpha",
      category: "Utilities",
      amount: 45.00,
      dueDate: "2026-06-28",
      status: "Overdue",
      method: "None",
      outstandingBalance: 60.00, // Includes late fees
      breakdown: [
        { item: "Water consumption (1.2k Liters)", charge: 35.00 },
        { item: "Sewage pipeline maintenance charge", charge: 10.00 }
      ],
      utilityBreakdown: { type: "Water", usage: "1.2k Liters", rate: "$0.029 / Liter" },
      lateFee: 15.00,
      timeline: [
        { step: "Invoice Created", timestamp: "2026-06-10, 08:00 AM", note: "Utility meter counter automated billing." },
        { step: "SLA Deadline Passed", timestamp: "2026-06-28, 12:00 AM", note: "System marked invoice overdue. Late fee applied." }
      ],
      commsLog: [
        { action: "Utility Statement Sent", time: "2026-06-10, 08:30 AM", medium: "SMS Notification" },
        { action: "Late Fee Alert Triggered", time: "2026-06-28, 09:00 AM", medium: "Email Alert" }
      ]
    },
    {
      id: "INV-2026-400",
      residentName: "David Vance",
      flatNumber: "1204",
      buildingName: "Tower Alpha",
      category: "Amenities",
      amount: 250.00,
      dueDate: "2026-06-24",
      status: "Processing",
      method: "Bank Transfer",
      outstandingBalance: 250.00,
      breakdown: [
        { item: "Clubhouse booking reservation fee", charge: 200.00 },
        { item: "Private lounge cleaning surcharge", charge: 50.00 }
      ],
      lateFee: 0.00,
      timeline: [
        { step: "Invoice Created", timestamp: "2026-06-20, 10:00 AM", note: "Amenity request deposit statement." },
        { step: "Resident Paid", timestamp: "2026-06-24, 02:30 PM", note: "Resident uploaded payment transfer receipt." },
        { step: "ACH Processing", timestamp: "2026-06-24, 03:00 PM", note: "Awaiting bank clearance confirmation check." }
      ],
      commsLog: [
        { action: "Transaction Receipt Uploaded", time: "2026-06-24, 02:30 PM", medium: "Portal File" }
      ]
    },
    {
      id: "INV-2026-398",
      residentName: "Mark Wahlberg",
      flatNumber: "604",
      buildingName: "Tower Beta",
      category: "Parking",
      amount: 120.00,
      dueDate: "2026-06-20",
      status: "Paid",
      method: "ACH Auto-debit",
      outstandingBalance: 0.00,
      breakdown: [
        { item: "Basement Level 1 Designated Parking space", charge: 100.00 },
        { item: "EV Charger port connection flat fee", charge: 20.00 }
      ],
      lateFee: 0.00,
      timeline: [
        { step: "Invoice Created", timestamp: "2026-06-05, 09:00 AM", note: "Monthly recurring license." },
        { step: "ACH Cleared", timestamp: "2026-06-06, 02:00 AM", note: "Direct bank debit cleared successfully." }
      ],
      commsLog: [
        { action: "Paid Receipt Issued", time: "2026-06-06, 08:00 AM", medium: "Email Receipt" }
      ]
    }
  ]);

  // Form States
  const [newInvoice, setNewInvoice] = React.useState({
    residentName: "",
    flatNumber: "",
    buildingName: "Tower Alpha",
    category: "Maintenance" as any,
    amount: 100,
    dueDate: "",
  });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState<InvoiceRecord | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [filterCategory, setFilterCategory] = React.useState("All");
  const [filterBuilding, setFilterBuilding] = React.useState("All");
  const [filterMethod, setFilterMethod] = React.useState("All");
  const [filterUtility, setFilterUtility] = React.useState("All");

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const created: InvoiceRecord = {
      id: `INV-2026-${100 + invoices.length + 1}`,
      residentName: newInvoice.residentName,
      flatNumber: newInvoice.flatNumber,
      buildingName: newInvoice.buildingName,
      category: newInvoice.category,
      amount: Number(newInvoice.amount),
      dueDate: newInvoice.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "Pending",
      method: "None",
      outstandingBalance: Number(newInvoice.amount),
      breakdown: [
        { item: `${newInvoice.category} Assessment Charge`, charge: Number(newInvoice.amount) }
      ],
      lateFee: 0.00,
      timeline: [
        { step: "Invoice Created", timestamp: new Date().toLocaleString(), note: "Manual operator invoice intake." }
      ],
      commsLog: [
        { action: "Manual Invoice Sent", time: new Date().toLocaleString(), medium: "Email" }
      ]
    };

    setInvoices((prev) => [created, ...prev]);
    setCreateOpen(false);
    toast.success(`Invoice #${created.id} generated for Resident!`);

    // Reset Form
    setNewInvoice({
      residentName: "",
      flatNumber: "",
      buildingName: "Tower Alpha",
      category: "Maintenance",
      amount: 100,
      dueDate: "",
    });
  };

  // Dispatch Actions
  const handleRecordPayment = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          return {
            ...inv,
            status: "Paid",
            outstandingBalance: 0.00,
            method: "Bank Transfer",
            timeline: [...inv.timeline, { step: "Manual Payment Logged", timestamp: "Just now", note: "Manager recorded check/cash deposit." }]
          };
        }
        return inv;
      })
    );
    setSelectedInvoice((prev) => prev && prev.id === id ? { ...prev, status: "Paid", outstandingBalance: 0.00, method: "Bank Transfer" } : prev);
    toast.success(`Payment recorded for Invoice #${id}!`);
  };

  const handleSendReminder = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          return {
            ...inv,
            commsLog: [...inv.commsLog, { action: "Payment Reminder Sent", time: "Just now", medium: "Email & SMS" }]
          };
        }
        return inv;
      })
    );
    setSelectedInvoice((prev) => prev && prev.id === id ? { ...prev, commsLog: [...prev.commsLog, { action: "Payment Reminder Sent", time: "Just now", medium: "Email & SMS" }] } : prev);
    toast.success(`Outstanding balance payment reminder sent!`);
  };

  const handleExport = () => {
    toast.success("Accounts receivable statement sheets exported.");
  };

  // Filter Table List
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.flatNumber.includes(searchQuery);

    const matchesStatus = filterStatus === "All" || inv.status === filterStatus;
    const matchesCategory = filterCategory === "All" || inv.category === filterCategory;
    const matchesBuilding = filterBuilding === "All" || inv.buildingName === filterBuilding;
    const matchesMethod = filterMethod === "All" || inv.method === filterMethod;

    let matchesUtility = true;
    if (filterUtility !== "All") {
      matchesUtility = inv.category === "Utilities" && inv.utilityBreakdown?.type === filterUtility;
    }

    return matchesSearch && matchesStatus && matchesCategory && matchesBuilding && matchesMethod && matchesUtility;
  });

  // Calculate Metrics
  const collectionsSum = invoices.filter((i) => i.status === "Paid").reduce((acc, curr) => acc + curr.amount, 0);
  const outstandingSum = invoices.reduce((acc, curr) => acc + curr.outstandingBalance, 0);
  const collectionRate = 96.3;
  const pendingInvoicesCount = invoices.filter((i) => i.status === "Pending").length;

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
                Billing & Financial Operations
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Manage invoices, utility charges, rent collection, service fees, and community financial operations.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Export Financial Report</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={() => handleSendReminder("INV-2026-403")}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Payment Reminder</span>
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
                <DialogContent className="sm:max-w-[450px] -200 bg-white dark:bg-zinc-950 p-6 rounded-md">
                  <form onSubmit={handleGenerateInvoice}>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Generate Ledger Invoice</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">Bill a resident account for maintenance contribution or utility metrics dues.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3.5 py-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="i-name" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Resident</Label>
                        <Input
                          id="i-name"
                          required
                          value={newInvoice.residentName}
                          onChange={(e) => setNewInvoice({ ...newInvoice, residentName: e.target.value })}
                          placeholder="e.g. Harold Brooks"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="i-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat Unit</Label>
                        <Input
                          id="i-flat"
                          required
                          value={newInvoice.flatNumber}
                          onChange={(e) => setNewInvoice({ ...newInvoice, flatNumber: e.target.value })}
                          placeholder="e.g. 1402"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="i-tower" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Building</Label>
                        <select
                          id="i-tower"
                          value={newInvoice.buildingName}
                          onChange={(e) => setNewInvoice({ ...newInvoice, buildingName: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Tower Alpha">Tower Alpha</option>
                          <option value="Tower Beta">Tower Beta</option>
                          <option value="Tower Gamma">Tower Gamma</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="i-cat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</Label>
                        <select
                          id="i-cat"
                          value={newInvoice.category}
                          onChange={(e) => setNewInvoice({ ...newInvoice, category: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Maintenance">Maintenance</option>
                          <option value="Utilities">Utilities</option>
                          <option value="Amenities">Amenities</option>
                          <option value="Parking">Parking</option>
                          <option value="Surcharges">Surcharges</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="i-amount" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Amount ($)</Label>
                        <Input
                          id="i-amount"
                          type="number"
                          required
                          value={newInvoice.amount}
                          onChange={(e) => setNewInvoice({ ...newInvoice, amount: Number(e.target.value) })}
                          min={1}
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="i-due" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Due Date</Label>
                        <Input
                          id="i-due"
                          type="date"
                          value={newInvoice.dueDate}
                          onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                      <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Generate Invoice</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-zinc-500">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Monthly Collections</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-zinc-400 hover:text-zinc-650 outline-none">
                          <HelpCircle className="h-3 w-3" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-zinc-900 text-white-800 rounded px-2 py-1 text-[10px]">
                        Total collections in active billing run cycle.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <DollarSign className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">${collectionsSum.toLocaleString()}</span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-400">Total credited bank clearings</div>
              </CardContent>
            </Card>

            <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Outstanding Dues</span>
                  <AlertCircle className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">${outstandingSum.toLocaleString()}</span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-400">Total outstanding accounts receivable</div>
              </CardContent>
            </Card>

            <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-455 dark:text-zinc-500">Collection Rate</span>
                  <ShieldCheck className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{collectionRate}%</span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-400">Target collection parameters met</div>
              </CardContent>
            </Card>

            <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Pending Invoices</span>
                  <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-2.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{pendingInvoicesCount}</span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-400">Invoices awaiting clearing action</div>
              </CardContent>
            </Card>
          </div>

          {/* Table & Sidebar filters grid layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters */}
            <div className="w-full lg:w-56 shrink-0 space-y-4">
              <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
                <CardHeader className="p-3.5 -100 flex flex-row items-center gap-1.5 space-y-0">
                  <Filter className="h-3.5 w-3.5 text-zinc-450" />
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Financial Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 space-y-4">
                  
                  {/* Status Filter */}
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
                      <option value="Processing">Processing</option>
                    </select>
                  </div>

                  {/* Billing category Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Billing category</Label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All categories</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Amenities">Amenities</option>
                      <option value="Parking">Parking</option>
                      <option value="Surcharges">Surcharges</option>
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

                  {/* Payment method Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Payment method</Label>
                    <select
                      value={filterMethod}
                      onChange={(e) => setFilterMethod(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All methods</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Cash/Check">Cash/Check</option>
                      <option value="ACH Auto-debit">ACH Auto-debit</option>
                    </select>
                  </div>

                  {/* Utility type Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Utility Type</Label>
                    <select
                      value={filterUtility}
                      onChange={(e) => setFilterUtility(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All utility types</option>
                      <option value="Water">Water</option>
                      <option value="Electricity">Electricity</option>
                      <option value="Gas">Gas</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      setFilterStatus("All");
                      setFilterCategory("All");
                      setFilterBuilding("All");
                      setFilterMethod("All");
                      setFilterUtility("All");
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
              <Card className="rounded-md -200 bg-white shadow-sm dark:bg-zinc-950">
                <CardHeader className="p-4 -100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 space-y-0">
                  <div className="relative max-w-sm w-72">
                    <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      type="text"
                      placeholder="Search invoices by ID, resident, flat..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full rounded-sm-200 pl-8 text-xs outline-none bg-zinc-50/50 dark:bg-zinc-900 focus:bg-white focus:indigo-500 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Showing {filteredInvoices.length} of {invoices.length} transactions
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredInvoices.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No invoice records found</span>
                      <span className="text-[10px] mt-0.5">Try clearing filters list.</span>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 -200 dark:bg-zinc-950/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Invoice ID</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Resident</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Building/Flat</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Billing category</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-right h-9">Invoice amount</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Due date</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Payment Status</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Payment method</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-right h-9">Outstanding balance</TableHead>
                          <TableHead className="w-9 h-9" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                        {filteredInvoices.map((inv) => (
                          <TableRow
                            key={inv.id}
                            onClick={() => setSelectedInvoice(inv)}
                            className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/20 cursor-pointer transition-colors"
                          >
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {inv.id}
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {inv.residentName}
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 py-2.5">
                              {inv.buildingName} - {inv.flatNumber}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-200 text-center py-2.5">
                              {inv.category}
                            </TableCell>
                            <TableCell className="text-xs font-bold text-right text-zinc-900 dark:text-white py-2.5">
                              ${inv.amount.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 text-center py-2.5">
                              {inv.dueDate}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold  ${
                                inv.status === "Paid"
                                  ? "bg-emerald-50 text-emerald-700-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : inv.status === "Pending"
                                  ? "bg-amber-50 text-amber-700-250 dark:bg-amber-955/20 dark:text-amber-450"
                                  : inv.status === "Processing"
                                  ? "bg-blue-50 text-blue-700-200 dark:bg-blue-955/20 dark:text-blue-450"
                                  : "bg-rose-50 text-rose-700-250 dark:bg-rose-955/20 dark:text-rose-450"
                              }`}>
                                {inv.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-xs font-medium text-center text-zinc-850 dark:text-zinc-250 py-2.5">
                              {inv.method}
                            </TableCell>
                            <TableCell className={`text-xs font-bold text-right py-2.5 ${
                              inv.outstandingBalance > 0 ? "text-rose-600" : "text-zinc-650"
                            }`}>
                              ${inv.outstandingBalance.toFixed(2)}
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

      {/* BILLING DETAILS DRAWER (SHEET) */}
      <Sheet open={selectedInvoice !== null} onOpenChange={(open) => !open && setSelectedInvoice(null)}>
        <SheetContent className="w-full sm:max-w-md -200 bg-white dark:bg-zinc-950 p-0 text-zinc-900 dark:text-zinc-50 flex flex-col h-full shadow-lg">
          {selectedInvoice && (
            <div className="flex flex-col h-full overflow-hidden">
              <SheetHeader className="p-4 -100">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-indigo-650 dark:text-indigo-400 tracking-wider">
                  <CreditCard className="h-3.5 w-3.5" /> Billing invoice ledger
                </div>
                <SheetTitle className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                  Invoice {selectedInvoice.id}
                </SheetTitle>
                <SheetDescription className="text-[10px] text-zinc-550 mt-0.5">
                  Resident: {selectedInvoice.residentName} (Flat {selectedInvoice.flatNumber}) • Category: {selectedInvoice.category}
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body Viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                
                {/* 1. Transaction Overview card */}
                <div className="rounded -150 p-3 bg-zinc-50/50 dark:bg-zinc-950/40 grid grid-cols-2 gap-y-2 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[9px] font-bold">STATUS</span>
                    <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold mt-1  ${
                      selectedInvoice.status === "Paid"
                        ? "bg-emerald-50 text-emerald-700-250"
                        : selectedInvoice.status === "Pending"
                        ? "bg-amber-50 text-amber-700-200"
                        : selectedInvoice.status === "Processing"
                        ? "bg-blue-50 text-blue-700-200"
                        : "bg-rose-50 text-rose-700-250"
                    }`}>
                      {selectedInvoice.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[9px] font-bold">INVOICE AMOUNT</span>
                    <span className="font-bold text-zinc-900 dark:text-white block mt-1">
                      ${selectedInvoice.amount.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[9px] font-bold">DUE DATE</span>
                    <span className="font-semibold block mt-1">{selectedInvoice.dueDate}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[9px] font-bold">OUTSTANDING</span>
                    <span className={`font-bold block mt-1 ${
                      selectedInvoice.outstandingBalance > 0 ? "text-rose-600" : "text-zinc-650"
                    }`}>
                      ${selectedInvoice.outstandingBalance.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* 2. Billing Breakdown */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Billing Breakdown</span>
                  <div className="rounded -150 p-3 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs space-y-2">
                    {selectedInvoice.breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-zinc-800 dark:text-zinc-300">
                        <span>{item.item}</span>
                        <span className="font-semibold">${item.charge.toFixed(2)}</span>
                      </div>
                    ))}
                    {selectedInvoice.lateFee > 0 && (
                      <div className="flex justify-between items-center text-rose-600 font-semibold -100 pt-2">
                        <span>Late Fees Assessment</span>
                        <span>+${selectedInvoice.lateFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-zinc-900 dark:text-white font-bold -100 pt-2">
                      <span>Total Invoice Due</span>
                      <span>${(selectedInvoice.amount + selectedInvoice.lateFee).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Utility Charges details (if category === Utilities) */}
                {selectedInvoice.category === "Utilities" && selectedInvoice.utilityBreakdown && (
                  <div className="space-y-2.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Utility usage metrics</span>
                    <div className="rounded -150 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs grid grid-cols-3 gap-2">
                      <div>
                        <span className="text-zinc-450 block text-[9px] font-bold">TYPE</span>
                        <span className="font-semibold">{selectedInvoice.utilityBreakdown.type}</span>
                      </div>
                      <div>
                        <span className="text-zinc-450 block text-[9px] font-bold">USAGE</span>
                        <span className="font-semibold">{selectedInvoice.utilityBreakdown.usage}</span>
                      </div>
                      <div>
                        <span className="text-zinc-450 block text-[9px] font-bold">RATE</span>
                        <span className="font-semibold">{selectedInvoice.utilityBreakdown.rate}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Invoice Timeline */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Invoice timeline logs</span>
                  <div className="space-y-3 font-medium">
                    {selectedInvoice.timeline.map((item, idx) => (
                      <div key={idx} className="flex gap-2.5 text-xs -100 pl-3 ml-1.5">
                        <div>
                          <span className="font-bold text-zinc-900 dark:text-white block leading-tight">{item.step}</span>
                          <span className="text-[10px] text-zinc-550 block mt-0.5">{item.note}</span>
                          <span className="text-[9px] text-zinc-400 block mt-0.5">{item.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Communication logs */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Notification dispatch history</span>
                  <div className="space-y-2 font-medium">
                    {selectedInvoice.commsLog.map((log, idx) => (
                      <div key={idx} className="flex items-center justify-between -150 rounded p-2.5 bg-zinc-50/50 dark:bg-zinc-950/20 text-xs">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-250">{log.action} ({log.medium})</span>
                        <span className="text-[9.5px] text-zinc-400">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              
              {/* Drawer Footer Panel */}
              <div className="p-4 -100 bg-zinc-55/10 dark:bg-zinc-950/20 flex gap-2">
                <Button
                  onClick={() => {
                    setSelectedInvoice(null);
                    toast.success(`Invoice receipt downloaded as PDF.`);
                  }}
                  variant="outline"
                  className="flex-1 h-8 rounded-sm text-xs-200 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <FileText className="h-3.5 w-3.5 mr-1 inline-block" /> Download PDF
                </Button>
                {selectedInvoice.status !== "Paid" && (
                  <Button
                    onClick={() => handleRecordPayment(selectedInvoice.id)}
                    className="flex-1 h-8 rounded-sm text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
                  >
                    Record Payment
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
