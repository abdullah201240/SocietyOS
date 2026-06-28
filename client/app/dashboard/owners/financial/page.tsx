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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  DollarSign,
  TrendingUp,
  Download,
  AlertCircle,
  FileText,
  CreditCard,
  Building,
} from "lucide-react";

export default function OwnerFinancialDashboard() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Mock Income Breakdown
  const incomeBreakdown = [
    { society: "Grandview Towers", building: "Tower Alpha", flat: "Flat 1402", tenant: "Marcus Aurelius", rent: 1400, charges: 120, utility: 80, total: 1600 },
    { society: "Grandview Towers", building: "Tower Alpha", flat: "Flat 805", tenant: "Sarah Connor", rent: 1200, charges: 100, utility: 75, total: 1375 },
    { society: "Pine Crest Society", building: "Oak Block", flat: "Flat 501", tenant: "Arthur Dent", rent: 950, charges: 90, utility: 60, total: 1100 }
  ];

  // Mock Payment History
  const paymentHistory = [
    { id: "TXN-80921", date: "June 27, 2026", amount: 1600, method: "Bank Transfer", status: "Success" },
    { id: "TXN-80922", date: "June 25, 2026", amount: 1375, method: "Credit Card", status: "Success" },
    { id: "TXN-80918", date: "June 20, 2026", amount: 250, method: "Mobile Banking", status: "Refunded" }
  ];

  // Mock Outstanding Dues
  const outstandingDues = [
    { flat: "Flat 302", building: "Tower Alpha", tenant: "Elena Rostova", amount: 1200, overdueDays: 18 },
    { flat: "Flat 102", building: "Tower Alpha", tenant: "Uther Lightbringer", amount: 850, overdueDays: 5 }
  ];

  const handleExport = () => {
    toast.success("Financial statement reports downloaded.");
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Owner Financial Overview
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Monitor monthly cashflow, collections rates, utility billings, and outstanding portfolio receivables.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:border-zinc-850 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Financial Report</span>
              </Button>
            </div>
          </div>

          {/* Top KPIs Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-3">
              <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                <span>Monthly Cashflow</span>
                <DollarSign className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight">৳29,200</div>
              <span className="text-[9px] text-zinc-400 block mt-1">Rent + service charges ledger</span>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-3">
              <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                <span>Outstanding Dues</span>
                <AlertCircle className="h-4 w-4 text-rose-500" />
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight text-rose-600 dark:text-rose-455">৳2,050</div>
              <span className="text-[9px] text-rose-600 block mt-1">2 Overdue accounts</span>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-3">
              <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                <span>Collected Payments</span>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-450">৳27,150</div>
              <span className="text-[9px] text-emerald-650 block mt-1">93% Portfolio collection rate</span>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-3">
              <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                <span>Occupancy-based Yield</span>
                <Building className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight">88.5%</div>
              <span className="text-[9px] text-zinc-400 block mt-1">Yield calculated per square foot</span>
            </Card>
          </div>

          {/* Grid Layout Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Section 1: Income Breakdown Table */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
              <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900">
                <CardTitle className="text-xs font-bold uppercase tracking-wider">Monthly Income Breakdown</CardTitle>
                <CardDescription className="text-[10px]">Income details compiled per unit.</CardDescription>
              </CardHeader>
              <div className="overflow-x-auto w-full">
                <Table>
                  <TableHeader className="bg-zinc-50/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Flat Unit</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Tenant</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-right h-8">Rent</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-right h-8">Surcharges</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-right h-8">Utilities</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-right h-8">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomeBreakdown.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs font-semibold py-2">
                          <span className="block">{item.flat}</span>
                          <span className="text-[9px] text-zinc-400 font-normal">{item.building}</span>
                        </TableCell>
                        <TableCell className="text-xs py-2">{item.tenant}</TableCell>
                        <TableCell className="text-xs text-right py-2">৳{item.rent}</TableCell>
                        <TableCell className="text-xs text-right py-2">৳{item.charges}</TableCell>
                        <TableCell className="text-xs text-right py-2">৳{item.utility}</TableCell>
                        <TableCell className="text-xs text-right font-bold text-zinc-900 dark:text-white py-2">৳{item.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Section 2: Payment History Feed */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
              <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900">
                <CardTitle className="text-xs font-bold uppercase tracking-wider">Recent Collections Feed</CardTitle>
                <CardDescription className="text-[10px]">Real-time transactional audit log.</CardDescription>
              </CardHeader>
              <Table>
                <TableHeader className="bg-zinc-50/50">
                  <TableRow>
                    <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Transaction ID</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Date</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-right h-8">Amount</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-center h-8">Method</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-center h-8">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="text-xs font-semibold py-2">{txn.id}</TableCell>
                      <TableCell className="text-[11px] text-zinc-550 py-2">{txn.date}</TableCell>
                      <TableCell className="text-xs text-right font-bold py-2">৳{txn.amount}</TableCell>
                      <TableCell className="text-xs text-center py-2">{txn.method}</TableCell>
                      <TableCell className="text-center py-2">
                        <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[8.5px] font-bold border ${
                          txn.status === "Success"
                            ? "bg-emerald-55 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                            : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-955/20 dark:text-amber-450"
                        }`}>
                          {txn.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Section 3: Outstanding Dues */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
              <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900">
                <CardTitle className="text-xs font-bold uppercase tracking-wider">Outstanding Portfolio Receivables</CardTitle>
                <CardDescription className="text-[10px]">Unpaid tenant accounts aging metrics.</CardDescription>
              </CardHeader>
              <Table>
                <TableHeader className="bg-zinc-50/50">
                  <TableRow>
                    <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Flat Unit</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Tenant</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-right h-8">Due Amount</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-center h-8">Overdue Days</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outstandingDues.map((due, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-xs font-semibold py-2">
                        <span>{due.flat}</span>
                        <span className="text-[9.5px] text-zinc-400 block font-normal">{due.building}</span>
                      </TableCell>
                      <TableCell className="text-xs py-2">{due.tenant}</TableCell>
                      <TableCell className="text-xs text-right font-bold text-rose-650 py-2">৳{due.amount}</TableCell>
                      <TableCell className="text-center py-2">
                        <Badge className="bg-rose-50 text-rose-700 border-rose-250 dark:bg-rose-955/20 dark:text-rose-455 text-[9px] font-bold rounded-sm">
                          {due.overdueDays} Days
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Section 4: Revenue Analytics */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-2 mb-3.5 dark:border-zinc-900">Revenue Metrics</h3>
                <div className="space-y-3.5 text-xs text-zinc-650 dark:text-zinc-350">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>Overdue aging average ratio</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">7.1% (Low Risk)</span>
                    </div>
                    <Progress value={7.1} className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>Rent Collection Efficiency</span>
                      <span className="font-bold text-emerald-600">93% Collected</span>
                    </div>
                    <Progress value={93} className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-zinc-400 mt-4 border-t border-zinc-100 pt-2 dark:border-zinc-900">
                Real-time yield calculation index updated on transactional logs.
              </div>
            </Card>

          </div>

        </main>
      </div>

    </div>
  );
}
