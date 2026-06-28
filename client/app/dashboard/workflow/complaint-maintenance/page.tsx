"use client";

import * as React from "react";
import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  ChevronLeft,
  Wrench,
  UserCheck,
  Calendar,
  AlertCircle,
  Clock,
  Plus,
  Play,
  CheckCircle,
} from "lucide-react";

export default function ComplaintMaintenanceLinkage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Initial Mock Complaint state
  const [complaint, setComplaint] = React.useState({
    id: "COM-302",
    complainant: "Elena Rostova",
    flat: "Flat 302",
    building: "Tower Alpha",
    category: "Plumbing",
    summary: "Major water leak in bathroom pipes leading to mold.",
    registered: "Yesterday, 02:30 PM",
    status: "Assigned"
  });

  // Mock Technicians
  const technicians = [
    { id: "T-01", name: "Dave Miller", specialty: "Plumbing", activeTasks: 2, status: "Available" },
    { id: "T-02", name: "Sarah Connor", specialty: "Electrical", activeTasks: 4, status: "Busy" },
    { id: "T-03", name: "John Doe", specialty: "General Maintenance", activeTasks: 1, status: "Available" }
  ];

  const [selectedTech, setSelectedTech] = React.useState(technicians[0]);
  const [scheduleDate, setScheduleDate] = React.useState("2026-06-29");

  // Maintenance Checklist
  const [checklist, setChecklist] = React.useState([
    { id: 1, text: "Inspect bathroom leakage point", checked: true },
    { id: 2, text: "Procure replacement PVC seals", checked: false },
    { id: 3, text: "Replace faulty valve joint", checked: false },
    { id: 4, text: "Test line pressure", checked: false }
  ]);

  const toggleCheck = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAssign = () => {
    setComplaint((prev) => ({ ...prev, status: "Scheduled" }));
    toast.success(`Assigned technician "${selectedTech.name}" for ${scheduleDate}.`);
  };

  const handleComplete = () => {
    setComplaint((prev) => ({ ...prev, status: "Completed" }));
    toast.success("Maintenance repair marked as COMPLETED.");
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
                Complaint to Maintenance Linkage
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Onboard and schedule maintenance repair actions based on registered resident complaints.
              </p>
            </div>
          </div>

          {/* Three Panel Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Panel 1: Complaint Details */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 border-b border-zinc-100 pb-2 dark:border-zinc-900">
                <AlertCircle className="h-4 w-4" /> 1. Complaint Details
              </h3>
              
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-zinc-450 block uppercase text-[9px] font-bold">Ticket ID / Category:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-zinc-900 dark:text-white">{complaint.id}</span>
                    <Badge variant="outline" className="text-[9px] py-0.5 px-1.5 border-indigo-200 bg-indigo-50/20 text-indigo-700 font-bold uppercase rounded-sm">
                      {complaint.category}
                    </Badge>
                  </div>
                </div>

                <div>
                  <span className="text-zinc-450 block uppercase text-[9px] font-bold">Resident Context:</span>
                  <span className="font-semibold block text-zinc-850 dark:text-zinc-200 mt-0.5">
                    {complaint.complainant} • {complaint.building} ({complaint.flat})
                  </span>
                </div>

                <div>
                  <span className="text-zinc-455 block uppercase text-[9px] font-bold">Issue Summary Description:</span>
                  <p className="text-zinc-650 dark:text-zinc-350 mt-1 leading-snug bg-zinc-50/50 dark:bg-zinc-900/40 p-2 rounded border border-zinc-150 dark:border-zinc-900 font-medium">
                    {complaint.summary}
                  </p>
                </div>

                <div className="flex justify-between border-t border-zinc-100 pt-2 dark:border-zinc-900 text-[10.5px]">
                  <span className="text-zinc-400">Registered:</span>
                  <span className="font-medium">{complaint.registered}</span>
                </div>

                <div className="flex justify-between text-[10.5px]">
                  <span className="text-zinc-400">Current Status:</span>
                  <span className="font-bold text-indigo-650 dark:text-indigo-400 capitalize">{complaint.status}</span>
                </div>
              </div>
            </Card>

            {/* Panel 2: Assignment Flow */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 border-b border-zinc-100 pb-2 dark:border-zinc-900">
                <UserCheck className="h-4 w-4" /> 2. Assignment Flow
              </h3>
              
              <div className="space-y-4">
                
                {/* Technician Registry list */}
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase font-bold text-zinc-450">Select Technician</Label>
                  <div className="space-y-1.5">
                    {technicians.map((tech) => (
                      <div
                        key={tech.id}
                        onClick={() => setSelectedTech(tech)}
                        className={`p-2 rounded border cursor-pointer flex justify-between items-center transition-colors text-xs ${
                          selectedTech.id === tech.id
                            ? "bg-zinc-100 border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 font-semibold"
                            : "border-zinc-150 hover:bg-zinc-50/50 dark:border-zinc-900 text-zinc-650"
                        }`}
                      >
                        <div>
                          <span className="block font-semibold">{tech.name}</span>
                          <span className="text-[9.5px] text-zinc-400 font-normal">{tech.specialty} • {tech.activeTasks} active tasks</span>
                        </div>
                        <Badge variant="outline" className={`text-[8.5px] font-bold rounded-sm border ${
                          tech.status === "Available"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-450"
                            : "bg-zinc-100 text-zinc-600 border-zinc-200"
                        }`}>
                          {tech.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendar Date Picker Picker */}
                <div className="space-y-1.5">
                  <Label htmlFor="sched-date" className="text-[10px] uppercase font-bold text-zinc-450">Schedule Repair Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      id="sched-date"
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="h-8.5 text-xs pl-8 rounded-sm"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleAssign}
                  className="w-full h-8.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm font-semibold gap-1"
                >
                  <UserCheck className="h-3.5 w-3.5" /> Assign & Schedule Technician
                </Button>

              </div>
            </Card>

            {/* Panel 3: Maintenance Status */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 p-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 border-b border-zinc-100 pb-2 dark:border-zinc-900">
                <Wrench className="h-4 w-4" /> 3. Maintenance Status
              </h3>
              
              <div className="space-y-4">
                
                {/* Progression Checklist */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-zinc-450 block">Repair Progression Tracker</span>
                  <div className="space-y-2 text-xs">
                    {checklist.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className="flex items-center gap-2.5 cursor-pointer select-none text-zinc-700 dark:text-zinc-300"
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => {}}
                          className="rounded border-zinc-200 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                        />
                        <span className={item.checked ? "line-through text-zinc-400" : ""}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Material Requisition Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="m-req" className="text-[10px] uppercase font-bold text-zinc-450 block">Material Requisitions</Label>
                  <textarea
                    id="m-req"
                    rows={2}
                    placeholder="e.g. 2x PVC O-rings, 1x silicon sealant adhesive..."
                    className="w-full text-xs p-2 rounded border border-zinc-200 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 bg-zinc-50/20"
                  />
                </div>

                <Button
                  onClick={handleComplete}
                  disabled={complaint.status === "Completed"}
                  className="w-full h-8.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm font-semibold gap-1"
                >
                  <CheckCircle className="h-3.5 w-3.5" /> Mark Repair as Completed
                </Button>

              </div>
            </Card>

          </div>

        </main>
      </div>

    </div>
  );
}
