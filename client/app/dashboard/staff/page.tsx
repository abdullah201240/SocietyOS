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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  UserCheck,
  Users,
  AlertCircle,
  ChevronRight,
  Filter,
  Plus,
  Upload,
  Download,
  Search,
  User,
  Clock,
  HelpCircle,
  ShieldCheck,
  Lock,
} from "lucide-react";

// Types
interface StaffRecord {
  id: string; // e.g. STF-102
  name: string;
  role: "admin" | "manager" | "security" | "maintenance" | "accountant" | "viewer";
  department: string;
  assignedBuilding: string;
  shiftTiming: string;
  activeTasks: number;
  performanceStatus: "Optimal" | "Degraded" | "Warning";
  accessLevel: "Root Level" | "Lobby Access" | "Financial Read" | "Maintenance Log" | "Read Only";
  status: "Active" | "Inactive" | "On Shift" | "Overloaded";
  phone: string;
  email: string;
  taskHistory: { taskName: string; status: "Completed" | "Pending"; date: string }[];
  activityLogs: { action: string; timestamp: string }[];
  permissions: string[];
}

export default function StaffPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Initial Mock Staff Records
  const [staffList, setStaffList] = React.useState<StaffRecord[]>([
    {
      id: "STF-102",
      name: "Marcus Stone",
      role: "manager",
      department: "Property Operations",
      assignedBuilding: "Tower Alpha",
      shiftTiming: "09:00 AM - 05:00 PM",
      activeTasks: 3,
      performanceStatus: "Optimal",
      accessLevel: "Root Level",
      status: "On Shift",
      phone: "+1 555-0810",
      email: "m.stone@societyos.com",
      taskHistory: [
        { taskName: "Onboarded Grandview Towers Block East structure", status: "Completed", date: "2026-06-27" }
      ],
      activityLogs: [
        { action: "Updated building metadata settings", timestamp: "Today, 10:00 AM" }
      ],
      permissions: ["Write: Societies", "Write: Buildings", "Assign Staff Roles", "Invoice Audit Logs"]
    },
    {
      id: "STF-105",
      name: "Bruce Banner",
      role: "maintenance",
      department: "Facilities & Plumbing",
      assignedBuilding: "Tower Alpha",
      shiftTiming: "08:00 AM - 04:00 PM",
      activeTasks: 5,
      performanceStatus: "Warning",
      accessLevel: "Maintenance Log",
      status: "Overloaded",
      phone: "+1 555-0112",
      email: "b.banner@societyos.com",
      taskHistory: [
        { taskName: "Basement riser water pressure diagnostics", status: "Pending", date: "2026-06-28" }
      ],
      activityLogs: [
        { action: "Marked plumbing ticket #T-1025 in progress", timestamp: "Today, 09:30 AM" }
      ],
      permissions: ["Write: Maintenance tickets", "Update meter readings"]
    },
    {
      id: "STF-106",
      name: "Steve Rogers",
      role: "security",
      department: "Gate Security & Patrol",
      assignedBuilding: "Main Gate A",
      shiftTiming: "12:00 PM - 08:00 PM",
      activeTasks: 1,
      performanceStatus: "Optimal",
      accessLevel: "Lobby Access",
      status: "Active",
      phone: "+1 555-0199",
      email: "s.rogers@societyos.com",
      taskHistory: [],
      activityLogs: [
        { action: "Verified OTP entry for guest Marcus Aurelius", timestamp: "Today, 10:25 AM" }
      ],
      permissions: ["Verify visitor OTP passes", "Log entry/exit checkouts"]
    }
  ]);

  // Form State
  const [newStaff, setNewStaff] = React.useState({
    name: "",
    role: "maintenance" as any,
    department: "",
    assignedBuilding: "Tower Alpha",
    shiftTiming: "09:00 AM - 05:00 PM",
    phone: "",
    email: "",
    accessLevel: "Maintenance Log" as any,
  });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = React.useState<StaffRecord | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterRole, setFilterRole] = React.useState("All");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [filterBuilding, setFilterBuilding] = React.useState("All");
  const [filterDepartment, setFilterDepartment] = React.useState("All");

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const created: StaffRecord = {
      id: `STF-${100 + staffList.length + 1}`,
      name: newStaff.name,
      role: newStaff.role,
      department: newStaff.department,
      assignedBuilding: newStaff.assignedBuilding,
      shiftTiming: newStaff.shiftTiming,
      activeTasks: 0,
      performanceStatus: "Optimal",
      accessLevel: newStaff.accessLevel,
      status: "Active",
      phone: newStaff.phone,
      email: newStaff.email,
      taskHistory: [],
      activityLogs: [
        { action: "Staff member account onboarded", timestamp: new Date().toLocaleString() }
      ],
      permissions: []
    };

    setStaffList((prev) => [...prev, created]);
    setCreateOpen(false);
    toast.success(`Staff member "${created.name}" onboarded successfully!`);

    // Reset Form
    setNewStaff({
      name: "",
      role: "maintenance",
      department: "",
      assignedBuilding: "Tower Alpha",
      shiftTiming: "09:00 AM - 05:00 PM",
      phone: "",
      email: "",
      accessLevel: "Maintenance Log",
    });
  };

  const handleExport = () => {
    toast.success("Staff profile registry sheet exported.");
  };

  // Filter Table List
  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filterRole === "All" || s.role === filterRole;
    const matchesStatus = filterStatus === "All" || s.status === filterStatus;
    const matchesBuilding = filterBuilding === "All" || s.assignedBuilding === filterBuilding;
    const matchesDept = filterDepartment === "All" || s.department.toLowerCase().includes(filterDepartment.toLowerCase());

    return matchesSearch && matchesRole && matchesStatus && matchesBuilding && matchesDept;
  });

  // Calculate Metrics
  const totalStaff = staffList.length;
  const activeShiftsCount = staffList.filter((s) => s.status === "On Shift" || s.status === "Overloaded").length;
  const pendingAssignmentsCount = staffList.filter((s) => s.activeTasks === 0).length;

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 -200/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Staff & Roles Management
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Manage internal staff, roles, permissions, shifts, and operational responsibilities across communities.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Staff Report</span>
              </Button>

              {/* ADD STAFF MEMBER DIALOG */}
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="xs"
                    className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Staff Member</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] -200 bg-white dark:bg-zinc-950 p-6 rounded-md">
                  <form onSubmit={handleAddStaff}>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Onboard Staff Member</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">Configure role assignment, shift schedules, and operational access level permissions.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3.5 py-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-name" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Name</Label>
                        <Input
                          id="s-name"
                          required
                          value={newStaff.name}
                          onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                          placeholder="e.g. Bruce Banner"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-role" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Role</Label>
                        <select
                          id="s-role"
                          value={newStaff.role}
                          onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="manager">Manager</option>
                          <option value="security">Security</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="accountant">Accountant</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-dept" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Department</Label>
                        <Input
                          id="s-dept"
                          required
                          value={newStaff.department}
                          onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                          placeholder="e.g. Facilities & Plumbing"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-tower" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Building</Label>
                        <select
                          id="s-tower"
                          value={newStaff.assignedBuilding}
                          onChange={(e) => setNewStaff({ ...newStaff, assignedBuilding: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Tower Alpha">Tower Alpha</option>
                          <option value="Tower Beta">Tower Beta</option>
                          <option value="Tower Gamma">Tower Gamma</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-shift" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Shift Timing</Label>
                        <Input
                          id="s-shift"
                          required
                          value={newStaff.shiftTiming}
                          onChange={(e) => setNewStaff({ ...newStaff, shiftTiming: e.target.value })}
                          placeholder="e.g. 08:00 AM - 04:00 PM"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-phone" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Phone</Label>
                        <Input
                          id="s-phone"
                          required
                          value={newStaff.phone}
                          onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                          placeholder="e.g. +1 555-0112"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-email" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email</Label>
                        <Input
                          id="s-email"
                          required
                          value={newStaff.email}
                          onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                          placeholder="e.g. staff@societyos.com"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="s-access" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Access Level</Label>
                        <select
                          id="s-access"
                          value={newStaff.accessLevel}
                          onChange={(e) => setNewStaff({ ...newStaff, accessLevel: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Maintenance Log">Maintenance Log</option>
                          <option value="Lobby Access">Lobby Access</option>
                          <option value="Financial Read">Financial Read</option>
                          <option value="Root Level">Root Level</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                      <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Add Staff</Button>
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
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Total Staff</span>
                  <UserCheck className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{totalStaff}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-455 dark:text-zinc-500">Active Shifts</span>
                  <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{activeShiftsCount}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Role Distribution</span>
                  <Users className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">6 Roles</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Pending Assignments</span>
                  <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{pendingAssignmentsCount}</span>
              </div>
            </CardContent>
            </Card>
          </div>

          {/* Filters & Data Table layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters */}
            <div className="w-full lg:w-56 shrink-0 space-y-4">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
                <CardHeader className="p-3.5 -100 flex flex-row items-center gap-1.5 space-y-0">
                  <Filter className="h-3.5 w-3.5 text-zinc-450" />
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Staff Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 space-y-4">
                  
                  {/* Role Type Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Role Type</Label>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All roles</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="security">Security</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="accountant">Accountant</option>
                    </select>
                  </div>

                  {/* Active/Inactive Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Shift status</Label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All personnel</option>
                      <option value="Active">Active</option>
                      <option value="On Shift">On Shift</option>
                      <option value="Overloaded">Overloaded</option>
                    </select>
                  </div>

                  {/* Building Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Building Assignment</Label>
                    <select
                      value={filterBuilding}
                      onChange={(e) => setFilterBuilding(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All assignments</option>
                      <option value="Tower Alpha">Tower Alpha</option>
                      <option value="Tower Beta">Tower Beta</option>
                      <option value="Main Gate A">Main Gate A</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      setFilterRole("All");
                      setFilterStatus("All");
                      setFilterBuilding("All");
                      setFilterDepartment("All");
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
                      placeholder="Search staff by name, department..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full rounded-sm-200 pl-8 text-xs outline-none bg-zinc-50/50 dark:bg-zinc-900 focus:bg-white focus:indigo-500 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Showing {filteredStaff.length} of {staffList.length} staff records
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredStaff.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No staff records found</span>
                      <span className="text-[10px] mt-0.5">Try resetting filter metrics.</span>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 -200 dark:bg-zinc-950/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Staff Name</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Role</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Department</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Assigned Building</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Shift timing</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Active tasks</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Performance status</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Access level</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Status</TableHead>
                          <TableHead className="w-9 h-9" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                        {filteredStaff.map((s) => (
                          <TableRow
                            key={s.id}
                            onClick={() => setSelectedStaff(s)}
                            className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/20 cursor-pointer transition-colors"
                          >
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {s.name}
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-850 dark:text-zinc-200 py-2.5 capitalize">
                              {s.role}
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 py-2.5">
                              {s.department}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-200 py-2.5">
                              {s.assignedBuilding}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-center text-zinc-800 dark:text-zinc-200 py-2.5">
                              {s.shiftTiming}
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-center text-zinc-900 dark:text-white py-2.5">
                              {s.activeTasks}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold  ${
                                s.performanceStatus === "Optimal"
                                  ? "bg-emerald-50 text-emerald-700-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : "bg-amber-50 text-amber-700-200 dark:bg-amber-955/20 dark:text-amber-450"
                              }`}>
                                {s.performanceStatus}
                              </span>
                            </TableCell>
                            <TableCell className="text-xs font-medium text-center text-zinc-850 dark:text-zinc-250 py-2.5">
                              {s.accessLevel}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold  ${
                                s.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : s.status === "On Shift"
                                  ? "bg-blue-50 text-blue-700-200 dark:bg-blue-955/20 dark:text-blue-450"
                                  : s.status === "Overloaded"
                                  ? "bg-amber-50 text-amber-700-200 dark:bg-amber-955/20 dark:text-amber-450"
                                  : "bg-zinc-100 text-zinc-650-200 dark:bg-zinc-800 dark:text-zinc-400"
                              }`}>
                                {s.status}
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

      {/* STAFF DETAILS DRAWER */}
      <Sheet open={selectedStaff !== null} onOpenChange={(open) => !open && setSelectedStaff(null)}>
        <SheetContent className="w-full sm:max-w-md -200 bg-white dark:bg-zinc-950 p-0 text-zinc-900 dark:text-zinc-50 flex flex-col h-full shadow-lg">
          {selectedStaff && (
            <div className="flex flex-col h-full overflow-hidden">
              <SheetHeader className="p-4 -100">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-indigo-650 dark:text-indigo-400 tracking-wider">
                  <UserCheck className="h-3.5 w-3.5" /> Staff profile diagnostic
                </div>
                <SheetTitle className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                  {selectedStaff.name}
                </SheetTitle>
                <SheetDescription className="text-[10px] text-zinc-550 mt-0.5">
                  ID: {selectedStaff.id} • Role: {selectedStaff.role} ({selectedStaff.department})
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body Viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                
                {/* Overloaded Alert */}
                {selectedStaff.status === "Overloaded" && (
                  <div className="rounded -200 bg-amber-50/50 p-3 text-xs text-amber-700 dark:bg-amber-955/20 flex gap-2">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-amber-600" />
                    <div>
                      <span className="font-bold block">Workload Warning Spike</span>
                      <span className="text-[10px] block mt-0.5 leading-snug">Personnel is currently assigned {selectedStaff.activeTasks} open ticket tasks. Recommend redistributing new maintenance intakes.</span>
                  </div>
                )}

                {/* 1. Account Details */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Contact credentials</span>
                  <div className="rounded -150 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-zinc-400 block text-[9px]">PHONE</span>
                      <span className="font-semibold">{selectedStaff.phone}</span>
                    <div>
                      <span className="text-zinc-400 block text-[9px]">EMAIL</span>
                      <span className="font-semibold break-all">{selectedStaff.email}</span>
                  </div>
                </div>

                {/* 2. Permission Levels RBAC details */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">RBAC Role Permissions</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStaff.permissions.map((perm, idx) => (
                      <Badge key={idx} variant="outline" className="text-[9px] px-1.5 py-0.5 rounded-sm-200/60 font-semibold bg-zinc-50/50">
                        <Lock className="h-2.5 w-2.5 mr-1 inline-block" /> {perm}
                      </Badge>
                    ))}
                    {selectedStaff.permissions.length === 0 && (
                      <span className="text-[10px] text-zinc-450 italic">No explicit privileges mapped. Inherits {selectedStaff.role} defaults.</span>
                    )}
                  </div>
                </div>

                {/* 3. Task History */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-455 dark:text-zinc-500 tracking-wider block">Task history logs</span>
                  {selectedStaff.taskHistory.length === 0 ? (
                    <span className="text-[10px] text-zinc-450 block italic">No history records logged.</span>
                  ) : (
                    <div className="space-y-2">
                      {selectedStaff.taskHistory.map((item, idx) => (
                        <div key={idx} className="flex justify-between -100 pb-2 last:0 last:pb-0 text-xs">
                          <span>{item.taskName}</span>
                          <span className="font-semibold">{item.status} ({item.date})</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Activity Logs */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Audit activity logs</span>
                  {selectedStaff.activityLogs.map((log, idx) => (
                    <div key={idx} className="flex justify-between text-xs -100 pb-2 last:0 last:pb-0 text-zinc-550 dark:text-zinc-450">
                      <span>{log.action}</span>
                      <span>{log.timestamp}</span>
                  ))}
                </div>

              </div>
              
              {/* Drawer Footer Panel */}
              <div className="p-4 -100 bg-zinc-55/10 dark:bg-zinc-950/20 flex gap-2">
                <Button
                  onClick={() => {
                    setSelectedStaff(null);
                    toast.success("Shift schedule status updated to Out of Shift.");
                  }}
                  variant="outline"
                  className="flex-1 h-8 rounded-sm text-xs-200 hover:bg-zinc-50"
                >
                  Clock Out Shift
                </Button>
                <Button
                  onClick={() => {
                    setSelectedStaff(null);
                    toast.success("System privileges rules updated.");
                  }}
                  className="flex-1 h-8 rounded-sm text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
                >
                  Assign Permissions
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}
