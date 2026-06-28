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
  Wrench,
  DollarSign,
  FileText,
  ShieldCheck,
  Percent,
} from "lucide-react";

interface RepairRecord {
  id: string; // e.g. REP-492
  flat: string;
  building: string;
  technician: string;
  category: string;
  laborHours: number;
  partsUsed: string[];
}

export default function MaintenanceBillingConversion() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Mock completed maintenance logs
  const [repairs, setRepairs] = React.useState<RepairRecord[]>([
    { id: "REP-492", flat: "Flat 1402", building: "Tower Alpha", technician: "Dave Miller", category: "Plumbing", laborHours: 3.5, partsUsed: ["PVC pipe seals", "Teflon thread joint tape"] },
    { id: "REP-493", flat: "Flat 805", building: "Tower Alpha", technician: "John Doe", category: "Electrical", laborHours: 2, partsUsed: ["10A copper circuit fuse", "wire wire conduits"] },
    { id: "REP-494", flat: "Flat 302", building: "Tower Alpha", technician: "Dave Miller", category: "HVAC Maintenance", laborHours: 4, partsUsed: ["air compressor filters", "1.5 ton blower belt"] }
  ]);

  const [selectedRepair, setSelectedRepair] = React.useState<RepairRecord>(repairs[0]);

  // Billing Cost Configuration state
  const [costs, setCosts] = React.useState({
    laborRate: 40,
    partsCost: 35,
    overheadMarkup: 15,
    taxRate: 8
  });

  // Calculate fields
  const laborDues = selectedRepair.laborHours * costs.laborRate;
  const subtotal = laborDues + costs.partsCost + costs.overheadMarkup;
  const taxAmount = (subtotal * costs.taxRate) / 100;
  const totalInvoiceVal = subtotal + taxAmount;

  const handleApproveAndInvoice = () => {
    toast.success(`Invoice generated successfully for ${selectedRepair.flat} (${selectedRepair.building}) totalling $${totalInvoiceVal.toFixed(2)}.`);
    // Remove the conversion item from list
    setRepairs((prev) => prev.filter((r) => r.id !== selectedRepair.id));
    if (repairs.length > 1) {
      setSelectedRepair(repairs.filter((r) => r.id !== selectedRepair.id)[0]);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans selection:bg-zinc-200 font-sans">
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
                Maintenance to Billing Conversion
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Audit labor costs and spare parts billing details to generate resident ledger invoices.
              </p>
            </div>
          </div>

          {/* Grid Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left/Middle Columns: Maintenance Logs & Cost Configuration */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Completed Repairs Registry */}
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
                <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider">Completed Maintenance Logs</CardTitle>
                  <CardDescription className="text-[10px]">Select a finished work record to process for ledger conversion.</CardDescription>
                </CardHeader>
                <div className="overflow-x-auto w-full">
                  <Table>
                    <TableHeader className="bg-zinc-50/50">
                      <TableRow>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Work Record ID</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Flat Unit</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Technician</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Category</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-center h-8">Labor Hours</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {repairs.map((rep) => (
                        <TableRow
                          key={rep.id}
                          onClick={() => setSelectedRepair(rep)}
                          className={`cursor-pointer transition-colors ${
                            selectedRepair.id === rep.id
                              ? "bg-zinc-50 dark:bg-zinc-900 font-semibold"
                              : "hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10"
                          }`}
                        >
                          <TableCell className="text-xs font-semibold py-2">{rep.id}</TableCell>
                          <TableCell className="text-xs py-2">
                            <span>{rep.flat}</span>
                            <span className="text-[9.5px] text-zinc-400 block font-normal">{rep.building}</span>
                          </TableCell>
                          <TableCell className="text-xs py-2">{rep.technician}</TableCell>
                          <TableCell className="text-xs py-2">
                            <Badge variant="outline" className="text-[9px] font-bold uppercase rounded-sm border-zinc-200">
                              {rep.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-center py-2">{rep.laborHours} Hours</TableCell>
                        </TableRow>
                      ))}
                      {repairs.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-xs text-zinc-400 py-6">
                            All completed repair tasks have been billed.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Billing Parameter Inputs */}
              {repairs.length > 0 && (
                <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-4 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-450 border-b border-zinc-100 pb-2 dark:border-zinc-900">
                    Billing Cost Configuration Parameters
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-labor" className="font-semibold text-zinc-650 dark:text-zinc-350">Labor Hourly Rate ($)</Label>
                      <Input
                        id="c-labor"
                        type="number"
                        value={costs.laborRate}
                        onChange={(e) => setCosts({ ...costs, laborRate: Number(e.target.value) })}
                        min={0}
                        className="h-8 rounded-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-parts" className="font-semibold text-zinc-650 dark:text-zinc-350">Spare Parts Dues ($)</Label>
                      <Input
                        id="c-parts"
                        type="number"
                        value={costs.partsCost}
                        onChange={(e) => setCosts({ ...costs, partsCost: Number(e.target.value) })}
                        min={0}
                        className="h-8 rounded-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-markup" className="font-semibold text-zinc-650 dark:text-zinc-350">Overhead Markup ($)</Label>
                      <Input
                        id="c-markup"
                        type="number"
                        value={costs.overheadMarkup}
                        onChange={(e) => setCosts({ ...costs, overheadMarkup: Number(e.target.value) })}
                        min={0}
                        className="h-8 rounded-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-tax" className="font-semibold text-zinc-650 dark:text-zinc-350">Service Tax Rate (%)</Label>
                      <Input
                        id="c-tax"
                        type="number"
                        value={costs.taxRate}
                        onChange={(e) => setCosts({ ...costs, taxRate: Number(e.target.value) })}
                        min={0}
                        className="h-8 rounded-sm"
                      />
                    </div>
                  </div>
                </Card>
              )}

            </div>

            {/* Right Column: Invoice Preview Summary */}
            {repairs.length > 0 && (
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 dark:border-zinc-900 flex items-center gap-1">
                    <FileText className="h-4 w-4 text-indigo-600" /> Invoice Dispatch Preview
                  </h3>
                  
                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                      <span className="text-zinc-400">Target Flat:</span>
                      <span className="font-bold">{selectedRepair.flat} ({selectedRepair.building})</span>
                    </div>

                    <div className="flex justify-between border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                      <span className="text-zinc-400">Labor Charge details:</span>
                      <span className="font-semibold">${laborDues.toFixed(2)} ({selectedRepair.laborHours}h @ ${costs.laborRate}/h)</span>
                    </div>

                    <div className="flex justify-between border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                      <span className="text-zinc-400">Spare Parts Dues:</span>
                      <span className="font-semibold">${costs.partsCost.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                      <span className="text-zinc-400">Overhead Markup:</span>
                      <span className="font-semibold">${costs.overheadMarkup.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between border-b border-zinc-100 pb-1.5 dark:border-zinc-900">
                      <span className="text-zinc-400">Tax Levy ({costs.taxRate}%):</span>
                      <span className="font-semibold">${taxAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between pt-1 text-sm font-bold text-zinc-900 dark:text-white">
                      <span>Total Invoice Amount:</span>
                      <span>${totalInvoiceVal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-4 mt-6 dark:border-zinc-900">
                  <Button
                    onClick={handleApproveAndInvoice}
                    className="w-full h-9 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm font-semibold gap-1.5"
                  >
                    <ShieldCheck className="h-4 w-4" /> Verify & Dispatch Invoice
                  </Button>
                  <span className="text-[9px] text-zinc-400 block text-center mt-2">
                    Verification records payment collection parameters to the resident ledger logs.
                  </span>
                </div>
              </Card>
            )}

          </div>

        </main>
      </div>

    </div>
  );
}
