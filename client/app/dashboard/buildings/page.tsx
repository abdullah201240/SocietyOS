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
import { toast } from "sonner";
import { validateData, buildingSchema } from "@/lib/validations";
import {
  Building,
  Building2,
  Users,
  Wrench,
  Zap,
  Car,
  AlertCircle,
  ChevronRight,
  Filter,
  Plus,
  Upload,
  Download,
  Search,
  MapPin,
  User,
  Clock,
  Activity,
  Droplet,
  Bolt,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { useBuildings, buildingsApi } from "@/lib/api";
import type { Building as BuildingType } from "@/lib/api";

export default function BuildingsPage() {
  const orgs = ["Grandview Towers", "Meadow View Complex", "Parkside Residences"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Fetch buildings from API
  const { buildings: buildingsFromApi, loading, error, refetch } = useBuildings();
  const [buildings, setBuildings] = React.useState<BuildingType[]>([]);

  // Sync API data with local state
  React.useEffect(() => {
    if (buildingsFromApi) {
      setBuildings(buildingsFromApi);
    }
  }, [buildingsFromApi]);

  // Form Dialog State
  const [newBuilding, setNewBuilding] = React.useState({
    name: "",
    buildingGroup: "Grandview Towers",
    type: "Residential" as "Residential" | "Commercial" | "Amenity",
    floors: 10,
    totalFlats: 80,
    occupiedFlats: 70,
    maintenanceStatus: "Stable" as "Stable" | "Pending Service" | "Critical Warning",
    parkingUtilization: 80,
    operationalStatus: "Online" as "Online" | "Degraded" | "Offline",
  });

  const [createOpen, setCreateOpen] = React.useState(false);

  // Detail Sheet State
  const [selectedBuilding, setSelectedBuilding] = React.useState<BuildingType | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterOccupancy, setFilterOccupancy] = React.useState("All");
  const [filterMaintenance, setFilterMaintenance] = React.useState("All");
  const [filterType, setFilterType] = React.useState("All");
  const [filterAlerts, setFilterAlerts] = React.useState("All");

  // Onboard new building handler
  const handleAddBuilding = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationData = {
      name: newBuilding.name,
      buildingGroup: newBuilding.buildingGroup,
      type: newBuilding.type,
      floors: Number(newBuilding.floors),
      totalFlats: Number(newBuilding.totalFlats),
      occupiedFlats: Number(newBuilding.occupiedFlats),
      maintenanceStatus: newBuilding.maintenanceStatus,
      parkingUtilization: Number(newBuilding.parkingUtilization),
      operationalStatus: newBuilding.operationalStatus,
    };

    const validation = validateData(buildingSchema, validationData);
    if (!validation.success) {
      toast.error(validation.error);
      return;
    }

    const newBuildingData: Omit<BuildingType, 'id'> = {
      name: newBuilding.name,
      buildingGroup: newBuilding.buildingGroup,
      type: newBuilding.type,
      floors: Number(newBuilding.floors),
      totalFlats: Number(newBuilding.totalFlats),
      occupiedFlats: Number(newBuilding.occupiedFlats),
      maintenanceStatus: newBuilding.maintenanceStatus,
      parkingUtilization: Number(newBuilding.parkingUtilization),
      activeComplaints: 0,
      operationalStatus: newBuilding.operationalStatus,
      waterConsumption: "0.5k Liters",
      electricityConsumption: "120 kWh",
      managers: ["John Doe"],
      assignedStaff: [
        { name: "Steve Rogers", role: "Electrical Specialist", contact: "+1 555-0199" }
      ],
      activity: [
        { id: 1, log: "Building onboarded & initialized on BuildingOS", time: "Just now" }
      ],
      towersBreakdown: [
        { floor: 1, occupied: Math.round(Number(newBuilding.occupiedFlats) / Number(newBuilding.floors)), total: Math.round(Number(newBuilding.totalFlats) / Number(newBuilding.floors)) }
      ]
    };

    const response = await buildingsApi.create(newBuildingData);
    if (response.success) {
      setBuildings((prev) => [...prev, response.data]);
      setCreateOpen(false);
      toast.success(`Building "${response.data.name}" registered successfully!`);
      refetch();
    } else {
      toast.error(response.error || "Failed to add building");
    }

    // Reset Form
    setNewBuilding({
      name: "",
      buildingGroup: "Grandview Towers",
      type: "Residential",
      floors: 10,
      totalFlats: 80,
      occupiedFlats: 70,
      maintenanceStatus: "Stable",
      parkingUtilization: 80,
      operationalStatus: "Online",
    });
  };

  const handleImport = () => {
    toast.info("Select CSV files to import building structures.");
  };

  const handleExport = () => {
    if (buildings.length === 0) {
      toast.error("No buildings to export.");
      return;
    }
    const headers = ["ID", "Name", "Group", "Type", "Floors", "Total Flats", "Occupied", "Maintenance", "Parking Util %", "Status"];
    const rows = buildings.map(b => [
      b.id,
      `"${b.name.replace(/"/g, '""')}"`,
      `"${b.buildingGroup.replace(/"/g, '""')}"`,
      `"${b.type}"`,
      b.floors,
      b.totalFlats,
      b.occupiedFlats,
      `"${b.maintenanceStatus}"`,
      b.parkingUtilization,
      `"${b.operationalStatus}"`
    ]);
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `buildings_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Building infrastructure report downloaded successfully!");
  };

  // Filter Table Records
  const filteredBuildings = buildings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.buildingGroup.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesOccupancy = true;
    const rate = (b.occupiedFlats / b.totalFlats) * 100;
    if (filterOccupancy === "High") matchesOccupancy = rate >= 90;
    else if (filterOccupancy === "Mid") matchesOccupancy = rate >= 80 && rate < 90;
    else if (filterOccupancy === "Low") matchesOccupancy = rate < 80;

    const matchesMaintenance = filterMaintenance === "All" || b.maintenanceStatus === filterMaintenance;
    const matchesType = filterType === "All" || b.type === filterType;

    let matchesAlerts = true;
    if (filterAlerts === "Active") matchesAlerts = b.maintenanceStatus !== "Stable" || b.operationalStatus !== "Online";
    else if (filterAlerts === "Clear") matchesAlerts = b.maintenanceStatus === "Stable" && b.operationalStatus === "Online";

    return matchesSearch && matchesOccupancy && matchesMaintenance && matchesType && matchesAlerts;
  });

  // Calculate Metrics
  const totalBuildings = buildings.length;
  const occupiedFlatsSum = buildings.reduce((acc, curr) => acc + curr.occupiedFlats, 0);
  const totalFlatsSum = buildings.reduce((acc, curr) => acc + curr.totalFlats, 0);
  const averageOccupancy = ((occupiedFlatsSum / totalFlatsSum) * 100).toFixed(1);
  const activeMaintenanceIssues = buildings.filter((b) => b.maintenanceStatus !== "Stable").length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans selection:bg-zinc-200">
      

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 -200/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Building Management
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Manage operational infrastructure, occupancy, maintenance, and residential activity across buildings.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleImport}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Import Building Data</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Generate Report</span>
              </Button>

              {/* ADD BUILDING DIALOG */}
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="xs"
                    className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Building</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] -200 bg-white dark:bg-zinc-950 p-6 rounded-md">
                  <form onSubmit={handleAddBuilding}>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Add Infrastructure Building</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">Configure tower structure, type, and operational status.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3.5 py-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="b-name" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Name</Label>
                        <Input
                          id="b-name"
                          required
                          value={newBuilding.name}
                          onChange={(e) => setNewBuilding({ ...newBuilding, name: e.target.value })}
                          placeholder="e.g. Tower Delta"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="b-group" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Building Group</Label>
                        <select
                          id="b-group"
                          value={newBuilding.buildingGroup}
                          onChange={(e) => setNewBuilding({ ...newBuilding, buildingGroup: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          {orgs.map((org) => (
                            <option key={org} value={org}>{org}</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="b-type" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Type</Label>
                        <select
                          id="b-type"
                          value={newBuilding.type}
                          onChange={(e) => setNewBuilding({ ...newBuilding, type: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Residential">Residential Tower</option>
                          <option value="Commercial">Commercial Wing</option>
                          <option value="Amenity">Amenity Clubhouse</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="b-floors" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Floors</Label>
                        <Input
                          id="b-floors"
                          type="number"
                          required
                          value={newBuilding.floors}
                          onChange={(e) => setNewBuilding({ ...newBuilding, floors: Number(e.target.value) })}
                          min={1}
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="b-total" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flats</Label>
                        <Input
                          id="b-total"
                          type="number"
                          required
                          value={newBuilding.totalFlats}
                          onChange={(e) => setNewBuilding({ ...newBuilding, totalFlats: Number(e.target.value) })}
                          min={1}
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="b-occupied" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Occupied</Label>
                        <Input
                          id="b-occupied"
                          type="number"
                          required
                          value={newBuilding.occupiedFlats}
                          onChange={(e) => setNewBuilding({ ...newBuilding, occupiedFlats: Number(e.target.value) })}
                          min={0}
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="b-maint" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Maintenance</Label>
                        <select
                          id="b-maint"
                          value={newBuilding.maintenanceStatus}
                          onChange={(e) => setNewBuilding({ ...newBuilding, maintenanceStatus: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Stable">Stable</option>
                          <option value="Pending Service">Pending Service</option>
                          <option value="Critical Warning">Critical Warning</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="b-ops" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Operations</Label>
                        <select
                          id="b-ops"
                          value={newBuilding.operationalStatus}
                          onChange={(e) => setNewBuilding({ ...newBuilding, operationalStatus: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Online">Online</option>
                          <option value="Degraded">Degraded</option>
                          <option value="Offline">Offline</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                      <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Add Building</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Total Buildings</span>
                  <Building className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{totalBuildings}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Occupancy Rate</span>
                  <Users className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{averageOccupancy}%</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Active Issues</span>
                  <Wrench className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{activeMaintenanceIssues}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Utility Summary</span>
                  <Zap className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">92.4%</span>
              </div>
            </CardContent>
            </Card>
          </div>

          {/* Filters & Data Grid Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters panel */}
            <div className="w-full lg:w-56 shrink-0 space-y-4">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
                <CardHeader className="p-3.5 -100 flex flex-row items-center gap-1.5 space-y-0">
                  <Filter className="h-3.5 w-3.5 text-zinc-450" />
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Infrastructure Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 space-y-4">
                  
                  {/* Occupancy Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Occupancy status</Label>
                    <select
                      value={filterOccupancy}
                      onChange={(e) => setFilterOccupancy(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All occupancy rates</option>
                      <option value="High">&ge; 90% Occupied</option>
                      <option value="Mid">80% - 90% Occupied</option>
                      <option value="Low">&lt; 80% Occupied</option>
                    </select>
                  </div>

                  {/* Maintenance Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Maintenance Status</Label>
                    <select
                      value={filterMaintenance}
                      onChange={(e) => setFilterMaintenance(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All statuses</option>
                      <option value="Stable">Stable</option>
                      <option value="Pending Service">Pending Service</option>
                      <option value="Critical Warning">Critical Warning</option>
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Building Type</Label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All building types</option>
                      <option value="Residential">Residential Tower</option>
                      <option value="Commercial">Commercial Wing</option>
                      <option value="Amenity">Amenity Clubhouse</option>
                    </select>
                  </div>

                  {/* Alerts Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Operational Alerts</Label>
                    <select
                      value={filterAlerts}
                      onChange={(e) => setFilterAlerts(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All alerts statuses</option>
                      <option value="Active">Active issues present</option>
                      <option value="Clear">Infrastructure stable</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      setFilterOccupancy("All");
                      setFilterMaintenance("All");
                      setFilterType("All");
                      setFilterAlerts("All");
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
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
                <CardHeader className="p-4 -100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 space-y-0">
                  <div className="relative max-w-sm w-72">
                    <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      type="text"
                      placeholder="Search buildings by name, building group..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full rounded-sm-200 pl-8 text-xs outline-none bg-zinc-50/50 dark:bg-zinc-900 focus:bg-white focus:indigo-500 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Showing {filteredBuildings.length} of {totalBuildings} building blocks
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-indigo-600 dark:border-zinc-800 dark:border-t-indigo-400 mb-2" />
                      <span className="text-xs font-semibold animate-pulse">Loading building structures...</span>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-rose-500 select-none">
                      <AlertCircle className="h-8 w-8 mb-2" />
                      <span className="text-xs font-semibold">Failed to load building data</span>
                      <span className="text-[10px] text-zinc-500 mt-0.5">{error}</span>
                      <Button size="xs" variant="outline" className="mt-3 text-[10px] h-7 cursor-pointer" onClick={() => refetch()}>
                        Retry Sync
                      </Button>
                    </div>
                  ) : filteredBuildings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No building structures found</span>
                      <span className="text-[10px] mt-0.5">Try widening filter options.</span>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 -200 dark:bg-zinc-950/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Building Name</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Building Group</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Floors</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Total Flats</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Occupied</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Maintenance</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Parking</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Active tickets</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Ops Status</TableHead>
                          <TableHead className="w-9 h-9" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                        {filteredBuildings.map((b) => (
                          <TableRow
                            key={b.id}
                            onClick={() => setSelectedBuilding(b)}
                            className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/20 cursor-pointer transition-colors"
                          >
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {b.name}
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 py-2.5">
                              {b.buildingGroup}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-250 text-center py-2.5">
                              {b.floors}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-250 text-center py-2.5">
                              {b.totalFlats}
                            </TableCell>
                            <TableCell className="text-xs font-bold text-zinc-900 dark:text-white text-center py-2.5">
                              {b.occupiedFlats} ({Math.round((b.occupiedFlats / b.totalFlats) * 100)}%)
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold  ${
                                b.maintenanceStatus === "Stable"
                                  ? "bg-emerald-50 text-emerald-700-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : b.maintenanceStatus === "Pending Service"
                                  ? "bg-amber-50 text-amber-700-250 dark:bg-amber-950/20 dark:text-amber-450"
                                  : "bg-rose-50 text-rose-700-250 dark:bg-rose-955/20 dark:text-rose-450"
                              }`}>
                                {b.maintenanceStatus}
                              </span>
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-center text-zinc-800 dark:text-zinc-200 py-2.5">
                              {b.parkingUtilization}%
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <Badge
                                variant="outline"
                                className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-sm-200/60 ${
                                  b.activeComplaints > 0
                                    ? "text-indigo-700 bg-indigo-50-200 dark:text-indigo-400 dark:bg-indigo-950/20"
                                    : "text-zinc-400 bg-zinc-50 dark:bg-zinc-900"
                                }`}
                              >
                                {b.activeComplaints} tickets
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                                b.operationalStatus === "Online"
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : b.operationalStatus === "Degraded"
                                  ? "text-amber-550 dark:text-amber-400"
                                  : "text-rose-600 dark:text-rose-400"
                              }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${
                                  b.operationalStatus === "Online"
                                    ? "bg-emerald-500"
                                    : b.operationalStatus === "Degraded"
                                    ? "bg-amber-500 animate-pulse"
                                    : "bg-rose-500 animate-pulse"
                                }`} />
                                {b.operationalStatus}
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

      {/* BUILDING DETAILS DRAWER (SHEET) */}
      <Sheet open={selectedBuilding !== null} onOpenChange={(open) => !open && setSelectedBuilding(null)}>
        <SheetContent className="w-full sm:max-w-md -200 bg-white dark:bg-zinc-950 p-0 text-zinc-900 dark:text-zinc-50 flex flex-col h-full shadow-lg">
          {selectedBuilding && (
            <div className="flex flex-col h-full overflow-hidden">
              <SheetHeader className="p-4 -100">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                  <Building2 className="h-3 w-3" /> Building layout Profile
                </div>
                <SheetTitle className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                  {selectedBuilding.name}
                </SheetTitle>
                <SheetDescription className="text-[10px] text-zinc-550 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-zinc-400 shrink-0" />
                  <span>{selectedBuilding.buildingGroup} • {selectedBuilding.type} Wing</span>
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body Viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                
                {/* 1. Occupancy Analytics floors breakdown */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Occupancy analytics</span>
                  <div className="space-y-3.5 rounded -150 p-3 bg-zinc-50/50 dark:bg-zinc-950/40">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Occupancy rate</span>
                      <span className="font-bold text-zinc-900 dark:text-white">
                        {Math.round((selectedBuilding.occupiedFlats / selectedBuilding.totalFlats) * 100)}%
                      </span>
                    </div>
                    <Progress value={Math.round((selectedBuilding.occupiedFlats / selectedBuilding.totalFlats) * 100)} className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] -100 pt-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-450">TOTAL FLATS</span>
                        <span className="font-semibold">{selectedBuilding.totalFlats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-450">OCCUPIED</span>
                        <span className="font-semibold">{selectedBuilding.occupiedFlats}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Utility overview consumption */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Utility overview counters</span>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="rounded -150 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 flex items-center gap-2">
                      <div className="rounded p-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400">
                        <Droplet className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-400 block uppercase font-bold tracking-wider">Water / Day</span>
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{selectedBuilding.waterConsumption}</span>
                      </div>
                    </div>
                    <div className="rounded -150 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 flex items-center gap-2">
                      <div className="rounded p-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400">
                        <Bolt className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-400 block uppercase font-bold tracking-wider">Power / Day</span>
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{selectedBuilding.electricityConsumption}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Parking Allocation */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Parking Allocation status</span>
                  <div className="space-y-3 rounded -150 p-3 bg-zinc-50/50 dark:bg-zinc-950/40">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-zinc-500">
                        <span>Parking utilization rate</span>
                        <span className="font-bold text-zinc-900 dark:text-white">{selectedBuilding.parkingUtilization}%</span>
                      </div>
                      <Progress value={selectedBuilding.parkingUtilization} className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* 4. Assigned Staff */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Assigned Staff ({selectedBuilding.assignedStaff.length})</span>
                  <div className="space-y-2">
                    {selectedBuilding.assignedStaff.map((staff: { name: string; role: string; contact: string }, idx: number) => (
                      <div key={idx} className="flex items-center gap-2.5 -150 rounded p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
                        <div className="h-7 w-7 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-650 dark:text-zinc-450 flex items-center justify-center font-bold text-[10px]">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-zinc-900 dark:text-white block">{staff.name}</span>
                          <span className="text-[9.5px] text-zinc-450 block">{staff.role} • {staff.contact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Recent Activity */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Recent operational activity</span>
                  <div className="space-y-2">
                    {selectedBuilding.activity.map((a: { id: number; log: string; time: string }) => (
                      <div key={a.id} className="flex gap-2 text-xs -100 pb-2 last:0 last:pb-0">
                        <Clock className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-zinc-700 dark:text-zinc-300 block leading-tight">{a.log}</span>
                          <span className="text-[9.5px] text-zinc-400 block mt-0.5">{a.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              
              {/* Drawer Footer Panel */}
              <div className="p-4 -100 bg-zinc-55/10 dark:bg-zinc-950/20 flex gap-2">
                <Button
                  onClick={() => {
                    setSelectedBuilding(null);
                    toast.info(`Configured emergency drills schedule for ${selectedBuilding.name}`);
                  }}
                  variant="outline"
                  className="flex-1 h-8 rounded-sm text-xs-200 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  Configure Alerts
                </Button>
                <Button
                  onClick={() => {
                    setSelectedBuilding(null);
                    toast.success(`Operational dashboard loaded for ${selectedBuilding.name}`);
                  }}
                  className="flex-1 h-8 rounded-sm text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Dispatch Staff
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}
