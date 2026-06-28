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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Wrench,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Plus,
  Building,
  Users,
  Calendar,
  Activity,
} from "lucide-react";

// Types
interface MaintenanceTask {
  id: number;
  title: string;
  building: string;
  category: "Elevator" | "Plumbing" | "Electrical" | "HVAC" | "Structural" | "Landscaping";
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Completed" | "On Hold";
  assignedTo: string;
  reportedDate: string;
  dueDate: string;
  estimatedCost: string;
  description: string;
}

export default function MaintenancePage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTask, setSelectedTask] = React.useState<MaintenanceTask | null>(null);

  const maintenanceTasks: MaintenanceTask[] = [
    {
      id: 1,
      title: "Elevator B - Annual Safety Inspection",
      building: "Tower A",
      category: "Elevator",
      priority: "Critical",
      status: "In Progress",
      assignedTo: "Otis Maintenance Team",
      reportedDate: "2026-06-25",
      dueDate: "2026-06-30",
      estimatedCost: "$2,500",
      description: "Mandatory annual safety brake testing and certification for Elevator B.",
    },
    {
      id: 2,
      title: "Water Pump Replacement - Block C",
      building: "Block C",
      category: "Plumbing",
      priority: "High",
      status: "Open",
      assignedTo: "Plumbing Services Inc.",
      reportedDate: "2026-06-26",
      dueDate: "2026-07-05",
      estimatedCost: "$1,800",
      description: "Main water pump showing signs of failure, requires immediate replacement.",
    },
    {
      id: 3,
      title: "HVAC System Filter Replacement",
      building: "Common Area",
      category: "HVAC",
      priority: "Medium",
      status: "Open",
      assignedTo: "ClimateControl Ltd.",
      reportedDate: "2026-06-27",
      dueDate: "2026-07-10",
      estimatedCost: "$450",
      description: "Quarterly filter replacement for central HVAC system.",
    },
    {
      id: 4,
      title: "Parking Lot Pothole Repair",
      building: "Parking Level 1",
      category: "Structural",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "RoadFix Contractors",
      reportedDate: "2026-06-20",
      dueDate: "2026-07-01",
      estimatedCost: "$800",
      description: "Repair multiple potholes in parking level 1 near entrance.",
    },
    {
      id: 5,
      title: "Electrical Panel Upgrade - Tower D",
      building: "Tower D",
      category: "Electrical",
      priority: "High",
      status: "On Hold",
      assignedTo: "PowerTech Electricians",
      reportedDate: "2026-06-15",
      dueDate: "2026-07-15",
      estimatedCost: "$3,200",
      description: "Upgrade electrical panel to support increased load from new EV charging stations.",
    },
    {
      id: 6,
      title: "Garden Irrigation System Maintenance",
      building: "Grounds",
      category: "Landscaping",
      priority: "Low",
      status: "Completed",
      assignedTo: "GreenThumb Landscaping",
      reportedDate: "2026-06-18",
      dueDate: "2026-06-28",
      estimatedCost: "$320",
      description: "Seasonal maintenance of irrigation system and sprinkler heads.",
    },
  ];

  const stats = {
    total: maintenanceTasks.length,
    open: maintenanceTasks.filter(t => t.status === "Open").length,
    inProgress: maintenanceTasks.filter(t => t.status === "In Progress").length,
    completed: maintenanceTasks.filter(t => t.status === "Completed").length,
    critical: maintenanceTasks.filter(t => t.priority === "Critical").length,
  };

  const filteredTasks = maintenanceTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-500 text-white";
      case "High": return "bg-orange-500 text-white";
      case "Medium": return "bg-yellow-500 text-white";
      case "Low": return "bg-green-500 text-white";
      default: return "bg-zinc-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
      case "In Progress": return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300";
      case "Completed": return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";
      case "On Hold": return "bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300";
      default: return "bg-zinc-100 text-zinc-700";
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans">
      <Toaster position="top-right" />

      <DashboardSidebar
        currentOrg={currentOrg}
        orgs={orgs}
        onOrgChange={(org) => setCurrentOrg(org)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar currentOrg={currentOrg} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-lg font-bold tracking-tight">Maintenance Management</h1>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Track and manage all maintenance tasks across your properties
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <Card className="rounded-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">Total Tasks</p>
                    <p className="text-2xl font-bold mt-1">{stats.total}</p>
                  </div>
                  <Wrench className="h-8 w-8 text-zinc-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">Open</p>
                    <p className="text-2xl font-bold mt-1 text-blue-600">{stats.open}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">In Progress</p>
                    <p className="text-2xl font-bold mt-1 text-purple-600">{stats.inProgress}</p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">Completed</p>
                    <p className="text-2xl font-bold mt-1 text-green-600">{stats.completed}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-md col-span-2 lg:col-span-1">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">Critical</p>
                    <p className="text-2xl font-bold mt-1 text-red-600">{stats.critical}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="rounded-md">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    placeholder="Search tasks, buildings, or categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Tasks Table */}
          <Card className="rounded-md">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-semibold">All Maintenance Tasks</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Building</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Est. Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow
                      key={task.id}
                      className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      onClick={() => setSelectedTask(task)}
                    >
                      <TableCell className="font-medium text-sm">{task.title}</TableCell>
                      <TableCell className="text-xs">{task.building}</TableCell>
                      <TableCell className="text-xs">{task.category}</TableCell>
                      <TableCell>
                        <Badge className={`text-[10px] ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-[10px] ${getStatusColor(task.status)}`}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">{task.assignedTo}</TableCell>
                      <TableCell className="text-xs">{task.dueDate}</TableCell>
                      <TableCell className="text-xs font-semibold">{task.estimatedCost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Task Details Sheet */}
          <Sheet open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
            <SheetContent className="sm:max-w-lg">
              {selectedTask && (
                <>
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      {selectedTask.title}
                    </SheetTitle>
                    <SheetDescription>
                      Task #{selectedTask.id} • {selectedTask.category}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Description</Label>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {selectedTask.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-xs">Building</Label>
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="h-4 w-4 text-zinc-400" />
                          {selectedTask.building}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Assigned To</Label>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-zinc-400" />
                          {selectedTask.assignedTo}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-xs">Reported Date</Label>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-zinc-400" />
                          {selectedTask.reportedDate}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Due Date</Label>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-zinc-400" />
                          {selectedTask.dueDate}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Priority</Label>
                      <Badge className={getPriorityColor(selectedTask.priority)}>
                        {selectedTask.priority}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Status</Label>
                      <Badge className={getStatusColor(selectedTask.status)}>
                        {selectedTask.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Estimated Cost</Label>
                      <p className="text-lg font-bold">{selectedTask.estimatedCost}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Update Status</Button>
                      <Button variant="outline" className="flex-1">Edit Task</Button>
                    </div>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </main>
      </div>
    </div>
  );
}
