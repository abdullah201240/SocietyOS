"use client";

import * as React from "react";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  ChevronLeft,
  DollarSign,
  BellRing,
  Clock,
  Search,
  Filter,
  CheckCircle,
  FileText,
} from "lucide-react";

interface BillingTrackRecord {
  id: string; // e.g. INV-301
  resident: string;
  flat: string;
  building: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Overdue";
  dueDate: string;
  remindersCount: number;
  overdueDays: number;
}

export default function BillingPaymentTracking() {
  const orgs = ["Grandview Towers", "Meadow View Complex", "Parkside Residences"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Initial Mock Invoice tracking feed
  const [invoices, setInvoices] = React.useState<BillingTrackRecord[]>([
    { id: "INV-9021", resident: "Marcus Aurelius", flat: "Flat 1402", building: "Tower Alpha", amount: 1600, status: "Paid", dueDate: "2026-07-05", remindersCount: 0, overdueDays: 0 },
    { id: "INV-9022", resident: "Sarah Connor", flat: "Flat 805", building: "Tower Alpha", amount: 1375, status: "Paid", dueDate: "2026-07-05", remindersCount: 0, overdueDays: 0 },
    { id: "INV-9023", resident: "Elena Rostova", flat: "Flat 302", building: "Tower Alpha", amount: 1200, status: "Overdue", dueDate: "2026-06-20", remindersCount: 2, overdueDays: 8 },
    { id: "INV-9024", resident: "Arthur Dent", flat: "Flat 501", building: "Oak Block", amount: 1100, status: "Unpaid", dueDate: "2026-07-05", remindersCount: 1, overdueDays: 0 }
  ]);

  const [selectedInvoice, setSelectedInvoice] = React.useState<BillingTrackRecord | null>(invoices[2]); // Elena Rostova by default
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSendReminder = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, remindersCount: inv.remindersCount + 1 } : inv))
    );
    toast.success(`Reminder notification sent for invoice ${id}.`);
  };

  const handleAddLateFee = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, amount: inv.amount + 50 } : inv))
    );
    toast.info(`Late fee charge of $50 added to invoice ${id}.`);
  };

  const handleMarkPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "Paid", overdueDays: 0 } : inv))
    );
    toast.success(`Invoice ${id} marked as PAID.`);
  };

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
          <div className="flex items-center gap-3.5 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <Link href="/dashboard/workflow">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-550 hover:text-zinc-900 rounded-sm">
                <ChevronLeft className="h-4.5 w-4.5" />
              </Button>
            </Link>
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Billing to Payment Tracking
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Monitor invoices outstanding balances and dispatch SMS/Email reminders to residents.
              </p>
            </div>
          </div>

          {/* Grid Layout Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Area: Invoice Registry Table */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
                <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      placeholder="Search invoices..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full pl-8 text-xs rounded-sm"
                    />
                  </div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    Invoice Status Tracker
                  </span>
                </CardHeader>
                <div className="overflow-x-auto w-full">
                  <Table>
                    <TableHeader className="bg-zinc-50/50">
                      <TableRow>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Invoice ID</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Resident</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-right h-8">Amount</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-center h-8">Due Date</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-center h-8">Reminders</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-center h-8">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices
                        .filter((inv) => inv.resident.toLowerCase().includes(searchQuery.toLowerCase()) || inv.id.includes(searchQuery))
                        .map((inv) => (
                          <TableRow
                            key={inv.id}
                            onClick={() => setSelectedInvoice(inv)}
                            className={`cursor-pointer transition-colors ${
                              selectedInvoice?.id === inv.id
                                ? "bg-zinc-50 dark:bg-zinc-900 font-semibold"
                                : "hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10"
                            }`}
                          >
                            <TableCell className="text-xs font-semibold py-2.5">{inv.id}</TableCell>
                            <TableCell className="text-xs py-2.5">
                              <span>{inv.resident}</span>
                              <span className="text-[9.5px] text-zinc-400 block font-normal">{inv.building} • {inv.flat}</span>
                            </TableCell>
                            <TableCell className="text-xs text-right font-bold py-2.5">${inv.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-xs text-center py-2.5">{inv.dueDate}</TableCell>
                            <TableCell className="text-xs text-center py-2.5">
                              <Badge variant="outline" className="text-[9px] font-bold rounded-sm border-zinc-200">
                                {inv.remindersCount} Sent
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[8.5px] font-bold border ${
                                inv.status === "Paid"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-455"
                                  : inv.status === "Unpaid"
                                  ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-955/20 dark:text-amber-450"
                                  : "bg-rose-50 text-rose-700 border-rose-250 dark:bg-rose-955/20 dark:text-rose-455"
                              }`}>
                                {inv.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>

            {/* Right Panel: Selected Invoice Actions */}
            {selectedInvoice && (
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-4 flex flex-col justify-between h-fit">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 dark:border-zinc-900 flex items-center gap-1.5">
                    <FileText className="h-4 w-4" /> Action Panel ({selectedInvoice.id})
                  </h3>

                  <div className="space-y-3.5 text-xs text-zinc-650 dark:text-zinc-350">
                    <div className="flex justify-between">
                      <span>Resident Owner:</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">{selectedInvoice.resident}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Outstanding Dues Amount:</span>
                      <span className="font-bold text-rose-650">${selectedInvoice.amount.toLocaleString()}</span>
                    </div>

                    {selectedInvoice.status === "Overdue" && (
                      <div className="flex justify-between">
                        <span>Aging Delay:</span>
                        <Badge className="bg-rose-50 text-rose-700 border border-rose-100 dark:bg-rose-955/20 dark:text-rose-455 text-[9px] font-bold rounded-sm">
                          {selectedInvoice.overdueDays} Days Overdue
                        </Badge>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Reminders Sent:</span>
                      <span className="font-semibold">{selectedInvoice.remindersCount} notifications dispatch</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-900">
                  <Button
                    onClick={() => handleSendReminder(selectedInvoice.id)}
                    className="w-full h-8.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm font-semibold gap-1.5"
                  >
                    <BellRing className="h-3.5 w-3.5" /> Dispatch Alert Reminder
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => handleAddLateFee(selectedInvoice.id)}
                      variant="outline"
                      className="h-8 text-xs border-zinc-200 hover:bg-zinc-50 dark:border-zinc-805 rounded-sm"
                    >
                      + Late Fee
                    </Button>
                    <Button
                      onClick={() => handleMarkPaid(selectedInvoice.id)}
                      variant="outline"
                      className="h-8 text-xs border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 rounded-sm text-emerald-600 font-semibold"
                    >
                      Mark Paid
                    </Button>
                  </div>
                </div>
              </Card>
            )}

          </div>

        </main>
      </div>

    </div>
  );
}
