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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Box,
  Wrench,
  ShieldCheck,
  Flame,
  Search,
  Filter,
  Plus,
  AlertCircle,
  Download,
  Calendar,
} from "lucide-react";
import { useInventoryAssets, inventoryApi } from "@/lib/api";
import { validateData, inventoryAssetSchema } from "@/lib/validations";

export default function InventoryPage() {
  const orgs = ["Grandview Towers", "Meadow View Complex", "Parkside Residences"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  const { assets: assetsFromApi, loading, error, refetch } = useInventoryAssets();
  const [assets, setAssets] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (assetsFromApi) setAssets(assetsFromApi);
  }, [assetsFromApi]);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("All");
  const [filterStatus, setFilterStatus] = React.useState("All");

  // Add Asset Dialog State
  const [addAssetOpen, setAddAssetOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    category: "Equipment" as "Equipment" | "Supplies" | "Utility",
    status: "Operational" as "Operational" | "Maintenance Required" | "Decommissioned",
    stockCount: "",
    lastServiced: "",
    warrantyExpires: ""
  });

  // Handle Add Asset Submission
  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      stockCount: Number(form.stockCount),
      lastServiced: form.lastServiced || undefined,
      warrantyExpires: form.warrantyExpires || undefined
    };

    const validation = validateData(inventoryAssetSchema, payload);
    if (!validation.success) {
      toast.error(validation.error);
      return;
    }

    const response = await inventoryApi.create({
      ...payload,
      buildingName: currentOrg,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    if (response.success) {
      toast.success(`Asset "${form.name}" registered successfully!`);
      setAddAssetOpen(false);
      setForm({ name: "", category: "Equipment", status: "Operational", stockCount: "", lastServiced: "", warrantyExpires: "" });
      refetch();
    } else {
      toast.error(response.error || "Failed to register asset");
    }
  };

  // Toggle status
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus: "Operational" | "Maintenance Required" | "Decommissioned" = 
      currentStatus === "Operational" ? "Maintenance Required" : 
      currentStatus === "Maintenance Required" ? "Decommissioned" : "Operational";

    const response = await inventoryApi.updateStatus(id, nextStatus);
    if (response.success) {
      toast.success(`Asset status updated to ${nextStatus}`);
      refetch();
    } else {
      toast.error(response.error || "Failed to update asset status");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (assets.length === 0) {
      toast.error("No assets to export.");
      return;
    }
    const headers = ["ID", "Asset Name", "Building", "Category", "Stock Count", "Status", "Last Serviced", "Warranty Expiry"];
    const rows = assets.map(a => [
      a.id,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.buildingName}"`,
      `"${a.category}"`,
      a.stockCount,
      `"${a.status}"`,
      `"${a.lastServiced || ""}"`,
      `"${a.warrantyExpires || ""}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `inventory_audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Inventory register downloaded as CSV.");
  };

  // Filter lists
  const filteredAssets = assets.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || a.category === filterCategory;
    const matchesStatus = filterStatus === "All" || a.status === filterStatus;
    const matchesBuilding = a.buildingName === currentOrg;
    return matchesSearch && matchesCategory && matchesStatus && matchesBuilding;
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans selection:bg-zinc-200">
      
      <DashboardSidebar
        currentOrg={currentOrg}
        orgs={orgs}
        onOrgChange={(org) => setCurrentOrg(org)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar currentOrg={currentOrg} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Asset & Maintenance Inventory
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Track structural elevator diagnostics, water main systems, fire protection units, and spare parts supply levels.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleExportCSV}
                className="h-8 text-[11px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Audit Logs</span>
              </Button>

              <Button
                size="xs"
                onClick={() => setAddAssetOpen(true)}
                className="h-8 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-1 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Register Asset</span>
              </Button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded dark:bg-indigo-950/30">
                  <Box className="h-5 w-5 text-indigo-650" />
                </div>
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 tracking-wider block">Total Tracked Assets</span>
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {assets.length} items registered
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded dark:bg-emerald-950/30">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-455 tracking-wider block">Operational Ratio</span>
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {assets.length > 0 ? Math.round((assets.filter(a => a.status === "Operational").length / assets.length) * 100) : 100}% stable
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-rose-50 rounded dark:bg-rose-955/20">
                  <Wrench className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-455 tracking-wider block">Maintenance Required</span>
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {assets.filter(a => a.status === "Maintenance Required").length} alerts
                  </span>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Filtering bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-450" />
              <Input
                type="text"
                placeholder="Search asset names..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-sm pl-8.5 text-xs outline-none bg-white dark:bg-zinc-950 focus:border-indigo-500 border-zinc-200"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
              <div className="flex items-center gap-1.5">
                <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Category</Label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="h-8 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-950 outline-none"
                >
                  <option value="All">All categories</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Supplies">Supplies</option>
                  <option value="Utility">Utility</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Status</Label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="h-8 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-955 outline-none"
                >
                  <option value="All">All statuses</option>
                  <option value="Operational">Operational</option>
                  <option value="Maintenance Required">Maintenance Required</option>
                  <option value="Decommissioned">Decommissioned</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table registry */}
          <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-indigo-650 mb-2" />
                  <span className="text-xs font-semibold">Loading assets ledger...</span>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-rose-500">
                  <AlertCircle className="h-8 w-8 mb-2" />
                  <span className="text-xs font-semibold">{error}</span>
                  <Button size="xs" variant="outline" className="mt-3 text-[10px] h-7" onClick={refetch}>Retry</Button>
                </div>
              ) : filteredAssets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                  <Box className="h-8 w-8 text-zinc-300 mb-2" />
                  <span className="text-xs font-semibold">No assets found</span>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-zinc-50/50 dark:bg-zinc-950/20">
                    <TableRow>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Asset Name</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Category</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Stock / Units</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Last Serviced</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Warranty Expiry</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Status</TableHead>
                      <TableHead className="w-24 h-9" />
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-zinc-250 dark:divide-zinc-850">
                    {filteredAssets.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="py-2.5">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-zinc-900 dark:text-white">{a.name}</span>
                            <span className="text-[9px] text-zinc-400 font-mono">{a.id}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-semibold py-2.5">{a.category}</TableCell>
                        <TableCell className="text-center text-xs font-bold text-zinc-800 dark:text-zinc-200 py-2.5">
                          {a.stockCount} units
                        </TableCell>
                        <TableCell className="text-center text-xs text-zinc-550 dark:text-zinc-400 py-2.5">
                          {a.lastServiced ? new Date(a.lastServiced).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—"}
                        </TableCell>
                        <TableCell className="text-center text-xs text-zinc-550 dark:text-zinc-400 py-2.5">
                          {a.warrantyExpires ? (
                            <span className={new Date(a.warrantyExpires).getTime() < Date.now() ? "text-rose-500 font-semibold" : "text-zinc-550 dark:text-zinc-450"}>
                              {new Date(a.warrantyExpires).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                          ) : "—"}
                        </TableCell>
                        <TableCell className="text-center py-2.5">
                          <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[8.5px] font-bold cursor-pointer select-none ${
                            a.status === "Operational"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450"
                              : a.status === "Maintenance Required"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-450"
                              : "bg-rose-50 text-rose-700 dark:bg-rose-955/20 dark:text-rose-455"
                          }`}
                          onClick={() => handleToggleStatus(a.id, a.status)}
                          title="Click to toggle status"
                          >
                            {a.status}
                          </span>
                        </TableCell>
                        <TableCell className="py-2.5 text-right pr-4">
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={() => {
                              toast.info(`Booking preventative service call for: "${a.name}"`);
                            }}
                            className="h-7 text-[10px] font-semibold hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-955/20"
                          >
                            Request Maintenance
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

        </main>
      </div>

      {/* REGISTER NEW ASSET DIALOG */}
      <Dialog open={addAssetOpen} onOpenChange={setAddAssetOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white dark:bg-zinc-950 p-6 rounded-md">
          <form onSubmit={handleAddAsset}>
            <DialogHeader>
              <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Register Building Asset</DialogTitle>
              <DialogDescription className="text-xs text-zinc-500">Configure equipment models, supply metrics, or utility hardware assets.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-3.5 py-4">
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="a-name" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Name</Label>
                <Input
                  id="a-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Lobby Fire Alarm System"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="a-category" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</Label>
                <select
                  id="a-category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                >
                  <option value="Equipment">Equipment / Infrastructure</option>
                  <option value="Supplies">Supplies / Parts Inventory</option>
                  <option value="Utility">Utility Service System</option>
                </select>
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="a-stock" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Stock Count</Label>
                <Input
                  id="a-stock"
                  type="number"
                  required
                  value={form.stockCount}
                  onChange={(e) => setForm({ ...form, stockCount: e.target.value })}
                  placeholder="e.g. 1"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="a-serviced" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Last Serviced</Label>
                <Input
                  id="a-serviced"
                  type="date"
                  value={form.lastServiced}
                  onChange={(e) => setForm({ ...form, lastServiced: e.target.value })}
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="a-warranty" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Warranty Exp.</Label>
                <Input
                  id="a-warranty"
                  type="date"
                  value={form.warrantyExpires}
                  onChange={(e) => setForm({ ...form, warrantyExpires: e.target.value })}
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button size="xs" variant="outline" type="button" onClick={() => setAddAssetOpen(false)} className="h-8.5 text-xs font-semibold rounded-sm">
                Cancel
              </Button>
              <Button size="xs" type="submit" className="h-8.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm gap-1 cursor-pointer">
                <Plus className="h-3.5 w-3.5" />
                <span>Register</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
