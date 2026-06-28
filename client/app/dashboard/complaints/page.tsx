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
  AlertCircle,
  Users,
  Wrench,
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
  MessageSquare,
  Send,
  AlertTriangle,
  Flame,
  FileText,
} from "lucide-react";

// Types
interface ComplaintTicket {
  id: string; // e.g. #T-1002
  residentName: string;
  flatNumber: string;
  buildingName: string;
  category: "Plumbing" | "Electrical" | "Elevator" | "Facilities" | "Safety" | "HVAC" | "Comms";
  priority: "Critical" | "High" | "Medium" | "Low";
  assignee: string;
  status: "Open" | "In Progress" | "Resolved" | "Escalated";
  createdDate: string;
  slaDeadline: string;
  description: string;
  images: string[];
  timeline: { title: string; desc: string; date: string }[];
  technicianNotes?: string;
  comments: { sender: string; role: string; message: string; time: string }[];
  residentFeedback?: string;
  residentRating?: number;
}

export default function ComplaintsPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Initial Mock Complaint Tickets
  const [tickets, setTickets] = React.useState<ComplaintTicket[]>([
    {
      id: "T-1024",
      residentName: "Harold Brooks",
      flatNumber: "1402",
      buildingName: "Tower Alpha",
      category: "Comms",
      priority: "Medium",
      assignee: "Steve Rogers",
      status: "Open",
      createdDate: "2026-06-25",
      slaDeadline: "2026-06-26 12:00 PM",
      description: "Intercom line dead since morning. No dial tone, cannot dial lobby or security gate.",
      images: ["Lobby Intercom Panel (Front View)"],
      timeline: [
        { title: "Ticket Created", desc: "Resident raised a ticket online.", date: "2026-06-25, 08:30 AM" },
        { title: "Dispatched Operator", desc: "Assigned technician Steve Rogers for diagnostic inspection.", date: "2026-06-25, 09:15 AM" }
      ],
      comments: [
        { sender: "Harold Brooks", role: "Resident", message: "Need this resolved quickly, delivery drivers cannot reach me.", time: "2026-06-25, 10:00 AM" }
      ]
    },
    {
      id: "T-1025",
      residentName: "Sarah Connor",
      flatNumber: "805",
      buildingName: "Tower Alpha",
      category: "Plumbing",
      priority: "High",
      assignee: "Bruce Banner",
      status: "In Progress",
      createdDate: "2026-06-28",
      slaDeadline: "2026-06-28 06:00 PM",
      description: "Low water pressure in the master bathroom shower. Cold tap pressure is normal, only hot water line seems throttled.",
      images: [],
      timeline: [
        { title: "Ticket Created", desc: "Resident raised a ticket via mobile app.", date: "2026-06-28, 08:00 AM" },
        { title: "Status Updated", desc: "Technician Bruce Banner marked task In Progress.", date: "2026-06-28, 09:30 AM" }
      ],
      technicianNotes: "Checking block main vertical riser. Suspect airlock in heat loop line.",
      comments: [
        { sender: "Bruce Banner", role: "Technician", message: "Working on pressure diagnostics in basement L1 now.", time: "2026-06-28, 09:40 AM" }
      ]
    },
    {
      id: "T-1026",
      residentName: "David Vance",
      flatNumber: "1204",
      buildingName: "Tower Alpha",
      category: "Elevator",
      priority: "Critical",
      assignee: "Robert Downey",
      status: "Escalated",
      createdDate: "2026-06-28",
      slaDeadline: "2026-06-28 11:30 AM",
      description: "Lobby double door stuck closed. Interlocking mechanism failed. High priority safety risk.",
      images: ["Safety Interlock Panel Stuck"],
      timeline: [
        { title: "Ticket Created", desc: "Emergency alarm raised by gate safety sensors.", date: "2026-06-28, 07:15 AM" },
        { title: "Escalated", desc: "Automatic escalation triggered due to critical fire safety locks.", date: "2026-06-28, 08:15 AM" }
      ],
      technicianNotes: "Requires override panel keys from central security office.",
      comments: [
        { sender: "System", role: "Dispatcher", message: "Alert: SLA deadline exceeded. Escalating to Estate Manager.", time: "2026-06-28, 11:30 AM" }
      ]
    },
    {
      id: "T-1020",
      residentName: "Mark Wahlberg",
      flatNumber: "604",
      buildingName: "Tower Beta",
      category: "Facilities",
      priority: "Low",
      assignee: "Natasha Romanoff",
      status: "Resolved",
      createdDate: "2026-06-24",
      slaDeadline: "2026-06-25 05:00 PM",
      description: "Balcony door slide alignment off track. Sliding handle keeps friction scrubbing the metal guide rail.",
      images: [],
      timeline: [
        { title: "Ticket Created", desc: "Resident raised a ticket.", date: "2026-06-24, 10:00 AM" },
        { title: "Completed", desc: "Realigned balancer guide wheels. Sliding is operational.", date: "2026-06-24, 02:30 PM" }
      ],
      technicianNotes: "Guide track cleared of sand debris. Balance screw tightened.",
      comments: [],
      residentFeedback: "Very fast fix. Doors are sliding perfectly fine now. Thank you!",
      residentRating: 5
    }
  ]);

  // Form State
  const [newTicket, setNewTicket] = React.useState({
    residentName: "",
    flatNumber: "",
    buildingName: "Tower Alpha",
    category: "Plumbing" as any,
    priority: "Medium" as any,
    description: "",
    assignee: "Unassigned",
  });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedTicket, setSelectedTicket] = React.useState<ComplaintTicket | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [filterPriority, setFilterPriority] = React.useState("All");
  const [filterBuilding, setFilterBuilding] = React.useState("All");
  const [filterCategory, setFilterCategory] = React.useState("All");
  const [filterTechnician, setFilterTechnician] = React.useState("All");
  const [filterSla, setFilterSla] = React.useState("All");

  // Dialog new comment state
  const [newComment, setNewComment] = React.useState("");

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ComplaintTicket = {
      id: `T-${1000 + tickets.length + 1}`,
      residentName: newTicket.residentName,
      flatNumber: newTicket.flatNumber,
      buildingName: newTicket.buildingName,
      category: newTicket.category,
      priority: newTicket.priority,
      assignee: newTicket.assignee,
      status: "Open",
      createdDate: new Date().toISOString().split("T")[0],
      slaDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0] + " 12:00 PM",
      description: newTicket.description,
      images: [],
      timeline: [
        { title: "Ticket Created", desc: "Manual operator intake dispatch.", date: new Date().toLocaleDateString() }
      ],
      comments: []
    };

    setTickets((prev) => [created, ...prev]);
    setCreateOpen(false);
    toast.success(`Ticket #${created.id} raised successfully in queue!`);

    // Reset Form
    setNewTicket({
      residentName: "",
      flatNumber: "",
      buildingName: "Tower Alpha",
      category: "Plumbing",
      priority: "Medium",
      description: "",
      assignee: "Unassigned",
    });
  };

  // Dispatch Action
  const handleResolveTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            status: "Resolved",
            timeline: [...t.timeline, { title: "Completed", desc: "Resolved by manager request.", date: "Just now" }]
          };
        }
        return t;
      })
    );
    setSelectedTicket((prev) => prev && prev.id === id ? { ...prev, status: "Resolved" } : prev);
    toast.success(`Ticket #${id} resolved successfully!`);
  };

  const handleEscalateTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            status: "Escalated",
            timeline: [...t.timeline, { title: "Escalated", desc: "Triggered priority supervisor dispatch.", date: "Just now" }]
          };
        }
        return t;
      })
    );
    setSelectedTicket((prev) => prev && prev.id === id ? { ...prev, status: "Escalated" } : prev);
    toast.error(`Ticket #${id} escalated!`);
  };

  const handleAddComment = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentItem = {
      sender: "John Doe",
      role: "Manager",
      message: newComment,
      time: "Just now"
    };

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return { ...t, comments: [...t.comments, commentItem] };
        }
        return t;
      })
    );

    setSelectedTicket((prev) => prev && prev.id === id ? { ...prev, comments: [...prev.comments, commentItem] } : prev);
    setNewComment("");
    toast.success("Comment added to logs.");
  };

  const handleExport = () => {
    toast.success("Operational complaint registers exported as CSV.");
  };

  const handleSlaReport = () => {
    toast.success("Weekly SLA compliance logs generated.");
  };

  // Filter Table List
  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "All" || t.status === filterStatus;
    const matchesPriority = filterPriority === "All" || t.priority === filterPriority;
    const matchesBuilding = filterBuilding === "All" || t.buildingName === filterBuilding;
    const matchesCategory = filterCategory === "All" || t.category === filterCategory;

    let matchesTechnician = true;
    if (filterTechnician === "Assigned") matchesTechnician = t.assignee !== "Unassigned";
    else if (filterTechnician === "Unassigned") matchesTechnician = t.assignee === "Unassigned";

    let matchesSla = true;
    if (filterSla === "AtRisk") matchesSla = t.status === "Escalated" || (t.status === "Open" && t.priority === "Critical");

    return matchesSearch && matchesStatus && matchesPriority && matchesBuilding && matchesCategory && matchesTechnician && matchesSla;
  });

  // Calculate stats
  const totalOpen = tickets.filter((t) => t.status !== "Resolved").length;
  const totalHigh = tickets.filter((t) => t.priority === "Critical" || t.priority === "High").length;
  const avgSlaHrs = 14;
  const slaCompliancePercent = 92.4;

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
                Complaint & Ticket Management
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Track resident complaints, maintenance issues, escalation workflows, and operational resolution activity.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleExport}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Export Complaints</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleSlaReport}
                className="h-8 rounded-sm text-[11px] font-semibold-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Generate SLA Report</span>
              </Button>

              {/* CREATE TICKET DIALOG */}
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="xs"
                    className="h-8 rounded-sm text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Create Ticket</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] -200 bg-white dark:bg-zinc-950 p-6 rounded-md">
                  <form onSubmit={handleCreateTicket}>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Raise Service Ticket</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">File a new resident complaint or utility equipment fault.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3.5 py-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="t-name" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Resident</Label>
                        <Input
                          id="t-name"
                          required
                          value={newTicket.residentName}
                          onChange={(e) => setNewTicket({ ...newTicket, residentName: e.target.value })}
                          placeholder="e.g. Harold Brooks"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="t-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat Unit</Label>
                        <Input
                          id="t-flat"
                          required
                          value={newTicket.flatNumber}
                          onChange={(e) => setNewTicket({ ...newTicket, flatNumber: e.target.value })}
                          placeholder="e.g. 1402"
                          className="col-span-3 h-8.5 text-xs rounded-sm-200"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="t-tower" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Building</Label>
                        <select
                          id="t-tower"
                          value={newTicket.buildingName}
                          onChange={(e) => setNewTicket({ ...newTicket, buildingName: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Tower Alpha">Tower Alpha</option>
                          <option value="Tower Beta">Tower Beta</option>
                          <option value="Tower Gamma">Tower Gamma</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="t-cat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</Label>
                        <select
                          id="t-cat"
                          value={newTicket.category}
                          onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Plumbing">Plumbing</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Elevator">Elevator</option>
                          <option value="Facilities">Facilities</option>
                          <option value="Safety">Safety</option>
                          <option value="HVAC">HVAC</option>
                          <option value="Comms">Comms</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="t-priority" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Priority</Label>
                        <select
                          id="t-priority"
                          value={newTicket.priority}
                          onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as any })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="t-assign" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Technician</Label>
                        <select
                          id="t-assign"
                          value={newTicket.assignee}
                          onChange={(e) => setNewTicket({ ...newTicket, assignee: e.target.value })}
                          className="col-span-3 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                        >
                          <option value="Unassigned">Unassigned</option>
                          <option value="Steve Rogers">Steve Rogers (Electrical)</option>
                          <option value="Bruce Banner">Bruce Banner (Plumbing)</option>
                          <option value="Robert Downey">Robert Downey (Elevator)</option>
                          <option value="Natasha Romanoff">Natasha Romanoff (Facilities)</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="t-desc" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Description</Label>
                        <textarea
                          id="t-desc"
                          required
                          value={newTicket.description}
                          onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                          placeholder="Describe the complaint issues in detail..."
                          className="col-span-3 text-xs rounded-sm -205 p-2 bg-white dark:bg-zinc-900 outline-none min-h-[60px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                      <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Dispatch Ticket</Button>
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
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Open Tickets</span>
                  <AlertCircle className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{totalOpen}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">High Priority</span>
                  <Flame className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{totalHigh}</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450 dark:text-zinc-500">Avg Resolution SLA</span>
                  <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{avgSlaHrs} Hrs</span>
              </div>
            </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
              <CardContent className="p-2.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-455 dark:text-zinc-500">SLA Compliance Rate</span>
                  <ShieldCheck className="h-4 w-4 text-zinc-400 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{slaCompliancePercent}%</span>
              </div>
            </CardContent>
            </Card>
          </div>

          {/* Table & Sidebar filters layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters panel */}
            <div className="w-full lg:w-56 shrink-0 space-y-4">
              <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:bg-zinc-950">
                <CardHeader className="p-3.5 -100 flex flex-row items-center gap-1.5 space-y-0">
                  <Filter className="h-3.5 w-3.5 text-zinc-450" />
                  <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Operational Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3.5 space-y-4">
                  
                  {/* Status Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Ticket Status</Label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All statuses</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Escalated">Escalated</option>
                    </select>
                  </div>

                  {/* Priority Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Priority Level</Label>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All levels</option>
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
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

                  {/* Category Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Category</Label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All categories</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Elevator">Elevator</option>
                      <option value="Facilities">Facilities</option>
                      <option value="Safety">Safety</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Comms">Comms</option>
                    </select>
                  </div>

                  {/* Technician Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">Technician dispatch</Label>
                    <select
                      value={filterTechnician}
                      onChange={(e) => setFilterTechnician(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All technicians</option>
                      <option value="Assigned">Assigned dispatch</option>
                      <option value="Unassigned">Waiting dispatch</option>
                    </select>
                  </div>

                  {/* SLA Risk Filter */}
                  <div className="space-y-1.5">
                    <Label className="text-[10.5px] font-semibold text-zinc-650 dark:text-zinc-300">SLA Violation Risk</Label>
                    <select
                      value={filterSla}
                      onChange={(e) => setFilterSla(e.target.value)}
                      className="w-full h-8 text-[11px] rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none"
                    >
                      <option value="All">All risks</option>
                      <option value="AtRisk">SLA Overdue / Critical Risk</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      setFilterStatus("All");
                      setFilterPriority("All");
                      setFilterBuilding("All");
                      setFilterCategory("All");
                      setFilterTechnician("All");
                      setFilterSla("All");
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
                      placeholder="Search tickets by ID, resident, issue details..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 w-full rounded-sm-200 pl-8 text-xs outline-none bg-zinc-50/50 dark:bg-zinc-900 focus:bg-white focus:indigo-500 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">
                    Showing {filteredTickets.length} of {tickets.length} tickets
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredTickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 select-none">
                      <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                      <span className="text-xs font-semibold">No operational tickets matched</span>
                      <span className="text-[10px] mt-0.5">Try clear filters list.</span>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 -200 dark:bg-zinc-950/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Ticket ID</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Resident</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Building</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Category</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Priority</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Assigned operator</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Status</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Created Date</TableHead>
                          <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-right h-9 font-semibold">SLA Deadline</TableHead>
                          <TableHead className="w-9 h-9" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-zinc-200 dark:divide-zinc-850">
                        {filteredTickets.map((t) => (
                          <TableRow
                            key={t.id}
                            onClick={() => setSelectedTicket(t)}
                            className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/20 cursor-pointer transition-colors"
                          >
                            <TableCell className="text-xs font-bold text-indigo-600 dark:text-indigo-400 py-2.5">
                              #{t.id}
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-zinc-900 dark:text-white py-2.5">
                              {t.residentName} <span className="text-[10px] font-normal text-zinc-400">({t.flatNumber})</span>
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 py-2.5">
                              {t.buildingName}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-zinc-800 dark:text-zinc-200 text-center py-2.5">
                              {t.category}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold  ${
                                t.priority === "Critical"
                                  ? "bg-rose-50 text-rose-700-250 dark:bg-rose-955/20 dark:text-rose-450"
                                  : t.priority === "High"
                                  ? "bg-amber-50 text-amber-700-250 dark:bg-amber-950/20 dark:text-amber-450"
                                  : t.priority === "Medium"
                                  ? "bg-indigo-50 text-indigo-700-200 dark:bg-indigo-950/20 dark:text-indigo-400"
                                  : "bg-zinc-100 text-zinc-600-200 dark:bg-zinc-800 dark:text-zinc-400"
                              }`}>
                                {t.priority}
                              </span>
                            </TableCell>
                            <TableCell className="text-xs font-medium text-center text-zinc-850 dark:text-zinc-250 py-2.5">
                              {t.assignee}
                            </TableCell>
                            <TableCell className="text-center py-2.5">
                              <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold  ${
                                t.status === "Open"
                                  ? "bg-amber-50 text-amber-700-200 dark:bg-amber-950/20 dark:text-amber-450"
                                  : t.status === "In Progress"
                                  ? "bg-blue-50 text-blue-700-200 dark:bg-blue-950/20 dark:text-blue-450"
                                  : t.status === "Resolved"
                                  ? "bg-emerald-50 text-emerald-700-250 dark:bg-emerald-950/20 dark:text-emerald-450"
                                  : "bg-rose-50 text-rose-700-250 dark:bg-rose-955/20 dark:text-rose-450"
                              }`}>
                                {t.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-[11px] text-zinc-550 dark:text-zinc-400 text-center py-2.5">
                              {t.createdDate}
                            </TableCell>
                            <TableCell className="text-[11px] font-semibold text-zinc-850 dark:text-zinc-250 text-right py-2.5">
                              {t.slaDeadline}
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

      {/* COMPLAINT DETAILS DRAWER (SHEET) */}
      <Sheet open={selectedTicket !== null} onOpenChange={(open) => !open && setSelectedTicket(null)}>
        <SheetContent className="w-full sm:max-w-md -200 bg-white dark:bg-zinc-950 p-0 text-zinc-900 dark:text-zinc-50 flex flex-col h-full shadow-lg">
          {selectedTicket && (
            <div className="flex flex-col h-full overflow-hidden">
              <SheetHeader className="p-4 -100">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-indigo-650 dark:text-indigo-400 tracking-wider">
                  <AlertCircle className="h-3.5 w-3.5" /> Complaint Dispatch details
                </div>
                <SheetTitle className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                  Ticket #{selectedTicket.id}
                </SheetTitle>
                <SheetDescription className="text-[10px] text-zinc-550 mt-0.5">
                  Resident: {selectedTicket.residentName} (Flat {selectedTicket.flatNumber}) • Category: {selectedTicket.category}
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body Viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
                
                {/* 1. Ticket status overview */}
                <div className="rounded -150 p-3 bg-zinc-50/50 dark:bg-zinc-950/40 grid grid-cols-2 gap-y-2 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[9px] font-bold">STATUS</span>
                    <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold mt-1  ${
                      selectedTicket.status === "Open"
                        ? "bg-amber-50 text-amber-700-200"
                        : selectedTicket.status === "In Progress"
                        ? "bg-blue-50 text-blue-700-200"
                        : selectedTicket.status === "Resolved"
                        ? "bg-emerald-50 text-emerald-700-255"
                        : "bg-rose-50 text-rose-700-255"
                    }`}>
                      {selectedTicket.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[9px] font-bold">PRIORITY</span>
                    <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold mt-1  ${
                      selectedTicket.priority === "Critical"
                        ? "bg-rose-50 text-rose-700-255"
                        : selectedTicket.priority === "High"
                        ? "bg-amber-50 text-amber-700-200"
                        : "bg-zinc-100 text-zinc-650-200"
                    }`}>
                      {selectedTicket.priority}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[9px] font-bold">ASSIGNEE</span>
                    <span className="font-semibold block mt-1">{selectedTicket.assignee}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[9px] font-bold">SLA DEADLINE</span>
                    <span className="font-semibold block mt-1">{selectedTicket.slaDeadline}</span>
                  </div>
                </div>

                {/* 2. Complaint Description */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Description Details</span>
                  <div className="rounded -150 p-3 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {selectedTicket.description}
                  </div>
                </div>

                {/* 3. Uploaded Images */}
                {selectedTicket.images.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Attachments</span>
                    <div className="rounded -150 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs text-zinc-450 italic flex items-center gap-1.5">
                      <FileText className="h-4 w-4" /> {selectedTicket.images[0]}
                    </div>
                  </div>
                )}

                {/* 4. Operational Timeline */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Escalation & Operational timeline</span>
                  <div className="space-y-3 font-medium">
                    {selectedTicket.timeline.map((item, idx) => (
                      <div key={idx} className="flex gap-2.5 text-xs -100 pl-3 ml-1.5">
                        <div>
                          <span className="font-bold text-zinc-900 dark:text-white block leading-tight">{item.title}</span>
                          <span className="text-[10px] text-zinc-550 block mt-0.5">{item.desc}</span>
                          <span className="text-[9px] text-zinc-400 block mt-0.5">{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Communication logs / Comments Thread */}
                <div className="space-y-2.5">
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 dark:text-zinc-500 tracking-wider block">Communication Logs ({selectedTicket.comments.length})</span>
                  <div className="space-y-2.5">
                    {selectedTicket.comments.map((comment, idx) => (
                      <div key={idx} className="p-2 rounded bg-zinc-50/50 dark:bg-zinc-900/20 -100 text-xs">
                        <div className="flex justify-between items-center text-[10px] text-zinc-400 mb-1 font-semibold">
                          <span>{comment.sender} ({comment.role})</span>
                          <span>{comment.time}</span>
                        </div>
                        <p className="text-zinc-700 dark:text-zinc-350">{comment.message}</p>
                      </div>
                    ))}
                    {/* Add comment form */}
                    <form onSubmit={(e) => handleAddComment(e, selectedTicket.id)} className="flex gap-1.5 mt-2">
                      <Input
                        required
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Log update or comment thread..."
                        className="h-8.5 rounded-sm-200 text-xs"
                      />
                      <Button type="submit" size="icon" className="h-8.5 w-8.5 shrink-0 bg-indigo-650 hover:bg-indigo-700 text-white rounded-sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>

                {/* 6. Resident feedback */}
                {selectedTicket.status === "Resolved" && selectedTicket.residentRating && (
                  <div className="space-y-2.5">
                    <span className="text-[9.5px] uppercase font-bold text-zinc-455 dark:text-zinc-500 tracking-wider block">Resident feedback</span>
                    <div className="rounded -150 p-3 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs space-y-1.5">
                      <span className="text-zinc-500">Rating:</span>
                        <span className="font-bold text-amber-600">{"★".repeat(selectedTicket.residentRating)}</span>
                      {selectedTicket.residentFeedback && (
                        <p className="italic text-zinc-650 dark:text-zinc-400">"{selectedTicket.residentFeedback}"</p>
                      )}
                    </div>
                  </div>
                )}

              </div>
              
              {/* Drawer Footer Panel */}
              <div className="p-4 -100 bg-zinc-55/10 dark:bg-zinc-950/20 flex gap-2">
                {selectedTicket.status !== "Resolved" ? (
                  <>
                    <Button
                      onClick={() => handleEscalateTicket(selectedTicket.id)}
                      variant="outline"
                      className="flex-1 h-8 rounded-sm text-xs-200 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-955/20 cursor-pointer"
                    >
                      <AlertTriangle className="h-3.5 w-3.5 mr-1 inline-block" /> Escalate
                    </Button>
                    <Button
                      onClick={() => handleResolveTicket(selectedTicket.id)}
                      className="flex-1 h-8 rounded-sm text-xs bg-indigo-650 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 mr-1 inline-block" /> Resolve Ticket
                    </Button>
                  </>
                ) : (
                  <span className="text-[10px] text-zinc-400 w-full text-center py-2 italic font-semibold">
                    This ticket has been marked resolved. File audits complete.
                  </span>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}
