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
  Wallet,
  CreditCard,
  AlertCircle,
  RefreshCw,
  TrendingUp,
  History,
  CheckCircle2,
} from "lucide-react";

export default function PaymentCenterPage() {
  const orgs = ["Grandview Towers", "Meadow View Complex", "Parkside Residences"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Recent Payments Feed state
  const [payments, setPayments] = React.useState([
    { id: "PAY-301", type: "Resident Rent", flat: "Flat 1402", description: "Arthur Pendragon rent ledger", amount: 1400, date: "Today, 11:20 AM", status: "Completed" },
    { id: "PAY-302", type: "Tenant Utility", flat: "Flat 805", description: "Sarah Connor utility invoice", amount: 175, date: "Today, 10:45 AM", status: "Completed" },
    { id: "PAY-303", type: "Amenities Fee", flat: "Flat 201", description: "Guinevere Slytherin clubhouse booking", amount: 250, date: "Yesterday, 3:30 PM", status: "Completed" }
  ]);

  // Failed Payments state
  const [failedPayments, setFailedPayments] = React.useState([
    { id: "PAY-F91", resident: "Elena Rostova", flat: "Flat 302", amount: 1200, error: "Insufficient Funds (ACH code: R01)" },
    { id: "PAY-F92", resident: "Arthur Dent", flat: "Flat 501", amount: 1100, error: "Card Expired (stripe code: expired_card)" }
  ]);

  // Refunds state
  const [refunds, setRefunds] = React.useState([
    { id: "REF-401", flat: "Flat 1204", amount: 150, date: "June 24, 2026", reason: "Duplicate parking fee deposit", status: "Processed" },
    { id: "REF-402", flat: "Flat 301", amount: 80, date: "June 20, 2026", reason: "Utility meter correction", status: "Initiated" }
  ]);

  const handleRetryPayment = (id: string, amount: number) => {
    toast.loading("Retrying payment collection...");
    setTimeout(() => {
      setFailedPayments((prev) => prev.filter((p) => p.id !== id));
      setPayments((prev) => [
        {
          id,
          type: "Retried Payment",
          flat: "Flat Unit",
          description: "Successful collection retry",
          amount,
          date: "Just now",
          status: "Completed"
        },
        ...prev
      ]);
      toast.dismiss();
      toast.success(`Payment collection for ${amount} completed successfully!`);
    }, 800);
  };

  const handleProcessRefund = (id: string) => {
    setRefunds((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Processed" } : r))
    );
    toast.success(`Refund ${id} processed.`);
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
                Payment Center
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Track all incoming payments, failed transactions, refunds, and payment methods metrics.
              </p>
            </div>
          </div>

          {/* Grid Layout Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1 & 2 */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Section 1: Recent Payments Feed */}
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
                <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-indigo-650" /> Recent Receipts Ledger
                    </CardTitle>
                    <CardDescription className="text-[10px]">Real-time payments received.</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-[9px] border-zinc-200 bg-zinc-50/50">
                    Active
                  </Badge>
                </CardHeader>
                <div className="overflow-x-auto w-full">
                  <Table>
                    <TableHeader className="bg-zinc-50/50">
                      <TableRow>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Payment ID</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Flat/Unit</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Category</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-right h-8">Amount</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-center h-8">Timestamp</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-center h-8">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((pay) => (
                        <TableRow key={pay.id}>
                          <TableCell className="text-xs font-semibold py-2">{pay.id}</TableCell>
                          <TableCell className="text-xs py-2">{pay.flat}</TableCell>
                          <TableCell className="text-xs py-2">
                            <span className="block font-semibold text-zinc-800 dark:text-zinc-200">{pay.type}</span>
                            <span className="text-[9.5px] text-zinc-450 block font-normal">{pay.description}</span>
                          </TableCell>
                          <TableCell className="text-xs text-right font-bold py-2">${pay.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-[11px] text-zinc-500 text-center py-2">{pay.date}</TableCell>
                          <TableCell className="text-center py-2">
                            <span className="inline-flex items-center rounded-sm px-1.5 py-0.5 text-[8.5px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-450">
                              {pay.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Section 3: Failed Payments */}
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
                <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 text-rose-500" /> Failed Transactions logs
                  </CardTitle>
                  <CardDescription className="text-[10px]">Failed auto-collections and merchant retries.</CardDescription>
                </CardHeader>
                <Table>
                  <TableHeader className="bg-zinc-50/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Resident</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Flat</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-right h-8">Amount</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Failure Reason</TableHead>
                      <TableHead className="w-16 h-8" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {failedPayments.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="text-xs font-semibold py-2">{p.resident}</TableCell>
                        <TableCell className="text-xs py-2">{p.flat}</TableCell>
                        <TableCell className="text-xs text-right font-bold text-rose-600 py-2">${p.amount}</TableCell>
                        <TableCell className="text-[10.5px] text-zinc-500 py-2">{p.error}</TableCell>
                        <TableCell className="py-2 text-right">
                          <Button
                            onClick={() => handleRetryPayment(p.id, p.amount)}
                            size="xs"
                            variant="outline"
                            className="h-6.5 text-[9.5px] font-semibold border-zinc-200 hover:bg-zinc-50 rounded-sm gap-1"
                          >
                            <RefreshCw className="h-2.5 w-2.5" /> Retry
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

            </div>

            {/* Column 3 */}
            <div className="space-y-6">
              
              {/* Section 2: Payment Methods Utilizations */}
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-2 mb-3.5 dark:border-zinc-900 flex items-center gap-1">
                  <CreditCard className="h-4 w-4 text-zinc-400" /> Payment Methods Mappings
                </h3>
                <div className="space-y-3.5 text-xs text-zinc-600 dark:text-zinc-350">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>Bank Transfer / ACH</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">68% ($19,800)</span>
                    </div>
                    <Progress value={68} className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>Mobile Banking / Cards</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">24% ($7,000)</span>
                    </div>
                    <Progress value={24} className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>Cash / Manual Checks</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">8% ($2,400)</span>
                    </div>
                    <Progress value={8} className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                  </div>
                </div>
              </Card>

              {/* Section 4: Refunds tracking */}
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
                <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <History className="h-4 w-4 text-zinc-400" /> Refund Workflows
                  </CardTitle>
                  <CardDescription className="text-[10px]">Track processed and pending refunds.</CardDescription>
                </CardHeader>
                <Table>
                  <TableHeader className="bg-zinc-50/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 h-8">Flat Unit</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-right h-8">Refund</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-zinc-500 text-center h-8">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {refunds.map((ref) => (
                      <TableRow key={ref.id}>
                        <TableCell className="text-xs font-semibold py-2">
                          <span>{ref.flat}</span>
                          <span className="text-[9.5px] text-zinc-450 block font-normal">{ref.reason}</span>
                        </TableCell>
                        <TableCell className="text-xs text-right font-bold py-2">${ref.amount}</TableCell>
                        <TableCell className="text-center py-2">
                          {ref.status === "Initiated" ? (
                            <Button
                              onClick={() => handleProcessRefund(ref.id)}
                              size="xs"
                              variant="outline"
                              className="h-6 text-[8.5px] font-semibold border-zinc-200 hover:bg-zinc-100 text-zinc-650 rounded-sm"
                            >
                              Approve Refund
                            </Button>
                          ) : (
                            <span className="inline-flex items-center rounded-sm px-1.5 py-0.5 text-[8.5px] font-bold border bg-zinc-50 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400">
                              Processed
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

            </div>

          </div>

        </main>
      </div>

    </div>
  );
}
