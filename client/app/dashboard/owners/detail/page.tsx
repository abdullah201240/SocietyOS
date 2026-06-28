"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Contact,
  Building,
  DollarSign,
  ChevronLeft,
  ArrowUpRight,
  User,
  Layout,
  Layers,
  FileText,
} from "lucide-react";

export default function OwnerDetailPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Mock data for Arthur Pendragon (default owner details)
  const owner = {
    id: "OWN-201",
    name: "Arthur Pendragon",
    phone: "+1 555-0143",
    email: "arthur.p@camelot.com",
    status: "Active",
    kpis: {
      totalSocieties: 2,
      totalBuildings: 3,
      totalFlats: 12,
      monthlyIncome: 14200,
    },
    societiesList: [
      { name: "Grandview Towers", location: "Miami, FL", propertiesCount: 8, status: "Active" },
      { name: "Pine Crest Society", location: "Boston, MA", propertiesCount: 4, status: "Active" }
    ],
    buildingsList: [
      { name: "Tower Alpha", society: "Grandview Towers", flatsCount: 6, occupancy: "83%" },
      { name: "Tower Beta", society: "Grandview Towers", flatsCount: 2, occupancy: "100%" },
      { name: "Oak Block", society: "Pine Crest Society", flatsCount: 4, occupancy: "75%" }
    ],
    flatsList: [
      { number: "Flat 1402", building: "Tower Alpha", society: "Grandview Towers", tenant: "Marcus Aurelius", rent: 1400, charges: 120, status: "Paid" },
      { number: "Flat 1204", building: "Tower Alpha", society: "Grandview Towers", tenant: "Vacant", rent: 1350, charges: 120, status: "N/A" },
      { number: "Flat 302", building: "Tower Alpha", society: "Grandview Towers", tenant: "Elena Rostova", rent: 1100, charges: 100, status: "Overdue" },
      { number: "Flat 805", building: "Tower Alpha", society: "Grandview Towers", tenant: "Sarah Connor", rent: 1200, charges: 100, status: "Paid" }
    ],
    billingHistory: [
      { id: "INV-9021", month: "June 2026", rent: 5800, serviceCharges: 440, dues: 0, status: "Paid" },
      { id: "INV-8902", month: "May 2026", rent: 5800, serviceCharges: 440, dues: 0, status: "Paid" },
      { id: "INV-8750", month: "April 2026", rent: 5600, serviceCharges: 440, dues: 1200, status: "Pending" }
    ],
    tenantsList: [
      { flat: "Flat 1402", name: "Marcus Aurelius", phone: "+1 555-0819", leaseStart: "Jan 2026", leaseEnd: "Dec 2026" },
      { flat: "Flat 302", name: "Elena Rostova", phone: "+1 555-0912", leaseStart: "Feb 2026", leaseEnd: "Jan 2027" },
      { flat: "Flat 805", name: "Sarah Connor", phone: "+1 555-0103", leaseStart: "May 2025", leaseEnd: "May 2027" }
    ]
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
            <Link href="/dashboard/owners">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 rounded-sm">
                <ChevronLeft className="h-4.5 w-4.5" />
              </Button>
            </Link>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                  {owner.name}
                </h1>
                <span className="inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450">
                  {owner.status}
                </span>
              </div>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Contact: {owner.phone} • {owner.email} • ID: {owner.id}
              </p>
            </div>
          </div>

          {/* KPI Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-3">
              <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                <span>Societies Linked</span>
                <Layout className="h-3.5 w-3.5" />
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight">{owner.kpis.totalSocieties}</div>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-3">
              <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                <span>Buildings Linked</span>
                <Building className="h-3.5 w-3.5" />
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight">{owner.kpis.totalBuildings}</div>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-3">
              <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                <span>Flats Owned</span>
                <Layers className="h-3.5 w-3.5" />
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight">{owner.kpis.totalFlats}</div>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-3">
              <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                <span>Monthly Income</span>
                <DollarSign className="h-3.5 w-3.5 text-indigo-600" />
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                ${owner.kpis.monthlyIncome.toLocaleString()}
              </div>
            </Card>
          </div>

          {/* Operational Details Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1 border-b border-zinc-200 dark:border-zinc-850 bg-transparent justify-start p-0 mb-4 rounded-none">
              <TabsTrigger value="overview" className="h-9 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">Overview</TabsTrigger>
              <TabsTrigger value="societies" className="h-9 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">Societies</TabsTrigger>
              <TabsTrigger value="buildings" className="h-9 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">Buildings</TabsTrigger>
              <TabsTrigger value="flats" className="h-9 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">Flats</TabsTrigger>
              <TabsTrigger value="billing" className="h-9 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">Income & Billing</TabsTrigger>
              <TabsTrigger value="tenants" className="h-9 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">Tenants</TabsTrigger>
            </TabsList>

            {/* TAB 1: OVERVIEW */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-4 rounded-md">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Ownership Summary</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-550">Active Lease Agreements:</span>
                      <span className="font-semibold">{owner.tenantsList.length} Active leases</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-550">Portfolio Occupancy:</span>
                      <span className="font-semibold text-emerald-600">83% Occupancy (10 / 12 Units)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-550">Management Contract Type:</span>
                      <span className="font-semibold">Direct Owner Leasing</span>
                    </div>
                  </div>
                </Card>

                <Card className="border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-4 rounded-md">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Financial Snapshot</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-550">Expected Monthly Rent:</span>
                      <span className="font-semibold">$12,800.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-550">Service Charges Allocation:</span>
                      <span className="font-semibold">$1,400.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-550">Outstanding Receivables:</span>
                      <span className="font-bold text-rose-600">$1,200.00</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* TAB 2: SOCIETIES */}
            <TabsContent value="societies">
              <Card className="border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 rounded-md">
                <Table>
                  <TableHeader className="bg-zinc-50/50">
                    <TableRow>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500">Society Name</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500">Location</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center">Properties Count</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {owner.societiesList.map((soc, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs font-semibold">{soc.name}</TableCell>
                        <TableCell className="text-xs text-zinc-550">{soc.location}</TableCell>
                        <TableCell className="text-xs text-center">{soc.propertiesCount} Units</TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-450">
                            {soc.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* TAB 3: BUILDINGS */}
            <TabsContent value="buildings">
              <Card className="border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 rounded-md">
                <Table>
                  <TableHeader className="bg-zinc-50/50">
                    <TableRow>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500">Building Tower</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500">Society</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center">Flats Linked</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center">Occupancy Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {owner.buildingsList.map((b, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs font-semibold">{b.name}</TableCell>
                        <TableCell className="text-xs text-zinc-550">{b.society}</TableCell>
                        <TableCell className="text-xs text-center">{b.flatsCount} Units</TableCell>
                        <TableCell className="text-xs text-center font-bold text-emerald-600">{b.occupancy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* TAB 4: FLATS */}
            <TabsContent value="flats">
              <Card className="border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 rounded-md">
                <Table>
                  <TableHeader className="bg-zinc-50/50">
                    <TableRow>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500">Flat Unit</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500">Building</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500">Tenant Name</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-right">Rent Cashflow</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-right">Service Charges</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center">Ledger Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {owner.flatsList.map((f, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs font-semibold">{f.number}</TableCell>
                        <TableCell className="text-xs text-zinc-550">{f.building}</TableCell>
                        <TableCell className="text-xs font-medium">{f.tenant}</TableCell>
                        <TableCell className="text-xs text-right font-semibold">${f.rent}</TableCell>
                        <TableCell className="text-xs text-right font-medium">${f.charges}</TableCell>
                        <TableCell className="text-center">
                          <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold border ${
                            f.status === "Paid"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-455"
                              : f.status === "Overdue"
                              ? "bg-rose-50 text-rose-700 border-rose-250 dark:bg-rose-955/20 dark:text-rose-455"
                              : "bg-zinc-100 text-zinc-650 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                          }`}>
                            {f.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* TAB 5: INCOME & BILLING */}
            <TabsContent value="billing">
              <Card className="border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 rounded-md">
                <Table>
                  <TableHeader className="bg-zinc-50/50">
                    <TableRow>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500">Invoice ID</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500">Billing Month</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-right">Rent Collected</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-right">Service Charges</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-right">Outstanding Dues</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {owner.billingHistory.map((b, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs font-semibold">{b.id}</TableCell>
                        <TableCell className="text-xs font-medium">{b.month}</TableCell>
                        <TableCell className="text-xs text-right font-bold">${b.rent}</TableCell>
                        <TableCell className="text-xs text-right">${b.serviceCharges}</TableCell>
                        <TableCell className="text-xs text-right font-bold text-rose-600">${b.dues}</TableCell>
                        <TableCell className="text-center">
                          <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold border ${
                            b.status === "Paid"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                              : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-955/20 dark:text-amber-450"
                          }`}>
                            {b.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* TAB 6: TENANTS */}
            <TabsContent value="tenants">
              <Card className="border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 rounded-md">
                <Table>
                  <TableHeader className="bg-zinc-50/50">
                    <TableRow>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500">Flat Unit</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500">Tenant Name</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500">Phone</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center">Lease Commencement</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 text-center">Lease Expiration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {owner.tenantsList.map((t, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs font-semibold">{t.flat}</TableCell>
                        <TableCell className="text-xs font-semibold">{t.name}</TableCell>
                        <TableCell className="text-xs text-zinc-550">{t.phone}</TableCell>
                        <TableCell className="text-xs text-center font-medium">{t.leaseStart}</TableCell>
                        <TableCell className="text-xs text-center font-medium">{t.leaseEnd}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>

        </main>
      </div>

    </div>
  );
}
