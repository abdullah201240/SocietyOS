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
  Megaphone,
  AlertOctagon,
  Calendar,
  Send,
  Search,
  Filter,
  Plus,
  Trash,
  Clock,
  User,
  Users,
  Download,
  AlertCircle,
} from "lucide-react";
import { useAnnouncements, communicationsApi } from "@/lib/api";
import { validateData, announcementSchema } from "@/lib/validations";

export default function CommunicationPage() {
  const orgs = ["Grandview Towers", "Meadow View Complex", "Parkside Residences"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  const { announcements: announcementsFromApi, loading, error, refetch } = useAnnouncements();
  const [announcements, setAnnouncements] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (announcementsFromApi) setAnnouncements(announcementsFromApi);
  }, [announcementsFromApi]);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterType, setFilterType] = React.useState("All");
  const [filterAudience, setFilterAudience] = React.useState("All");

  // Create Broadcast Dialog State
  const [broadcastOpen, setBroadcastOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    title: "",
    content: "",
    type: "General" as "General" | "Emergency" | "Event",
    targetAudience: "All" as "All" | "Tenants" | "Owners"
  });

  // Handle Dispatch Broadcast
  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateData(announcementSchema, form);
    if (!validation.success) {
      toast.error(validation.error);
      return;
    }

    const payload = {
      ...form,
      author: "Administrator",
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const response = await communicationsApi.create(payload);
    if (response.success) {
      toast.success(`Notice: "${form.title}" broadcasted successfully!`);
      setBroadcastOpen(false);
      setForm({ title: "", content: "", type: "General", targetAudience: "All" });
      refetch();
    } else {
      toast.error(response.error || "Failed to dispatch broadcast");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (announcements.length === 0) {
      toast.error("No announcements to export.");
      return;
    }
    const headers = ["ID", "Title", "Content", "Type", "Target Audience", "Author", "Date"];
    const rows = announcements.map(a => [
      a.id,
      `"${a.title.replace(/"/g, '""')}"`,
      `"${a.content.replace(/"/g, '""')}"`,
      `"${a.type}"`,
      `"${a.targetAudience}"`,
      `"${a.author}"`,
      `"${a.date}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `announcements_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Broadcast log downloaded as CSV.");
  };

  // Filter logs
  const filteredAnnouncements = announcements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || a.type === filterType;
    const matchesAudience = filterAudience === "All" || a.targetAudience === filterAudience;
    return matchesSearch && matchesType && matchesAudience;
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
          
          {/* Page Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Communications & Announcements Board
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Dispatch building notices, emergency broadcasts, and scheduler events to the resident portal.
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
                <span>Export Notice Logs</span>
              </Button>

              <Button
                size="xs"
                onClick={() => setBroadcastOpen(true)}
                className="h-8 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-1"
              >
                <Megaphone className="h-3.5 w-3.5" />
                <span>New Announcement</span>
              </Button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded dark:bg-indigo-950/30">
                  <Megaphone className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-400 tracking-wider block">General Announcements</span>
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {announcements.filter(a => a.type === "General").length} active
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-250 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-rose-50 rounded dark:bg-rose-950/30">
                  <AlertOctagon className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-400 tracking-wider block">Emergency Broadcasts</span>
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {announcements.filter(a => a.type === "Emergency").length} active
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-250 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded dark:bg-amber-950/30">
                  <Calendar className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-400 tracking-wider block">Event Schedules</span>
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {announcements.filter(a => a.type === "Event").length} active
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
                placeholder="Search notice titles or contents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-sm pl-8.5 text-xs outline-none bg-white dark:bg-zinc-950 focus:border-indigo-500 border-zinc-200"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
              <div className="flex items-center gap-1.5">
                <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Notice Type</Label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="h-8 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-950 outline-none"
                >
                  <option value="All">All types</option>
                  <option value="General">General</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Event">Event</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Audience</Label>
                <select
                  value={filterAudience}
                  onChange={(e) => setFilterAudience(e.target.value)}
                  className="h-8 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-950 outline-none"
                >
                  <option value="All">All target audiences</option>
                  <option value="All">All Residents</option>
                  <option value="Tenants">Tenants Only</option>
                  <option value="Owners">Owners Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table list */}
          <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-indigo-650 mb-2" />
                  <span className="text-xs font-semibold">Loading notices...</span>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-rose-500">
                  <AlertCircle className="h-8 w-8 mb-2" />
                  <span className="text-xs font-semibold">{error}</span>
                  <Button size="xs" variant="outline" className="mt-3 text-[10px] h-7" onClick={refetch}>Retry</Button>
                </div>
              ) : filteredAnnouncements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                  <AlertCircle className="h-8 w-8 text-zinc-300 mb-2" />
                  <span className="text-xs font-semibold">No announcements found</span>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-zinc-50/50 dark:bg-zinc-950/20">
                    <TableRow>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Date</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Type</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Title</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Content / Details</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Target Audience</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Author</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-zinc-250 dark:divide-zinc-850">
                    {filteredAnnouncements.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="text-xs font-semibold py-3 select-none">
                          {new Date(a.date).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </TableCell>
                        <TableCell className="py-3">
                          <span className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[8.5px] font-bold ${
                            a.type === "Emergency"
                              ? "bg-rose-50 text-rose-700 dark:bg-rose-955/20 dark:text-rose-455"
                              : a.type === "Event"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-450"
                              : "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-450"
                          }`}>
                            {a.type}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs font-bold text-zinc-900 dark:text-white py-3 truncate max-w-[200px]" title={a.title}>
                          {a.title}
                        </TableCell>
                        <TableCell className="text-xs text-zinc-550 dark:text-zinc-400 py-3 max-w-sm truncate" title={a.content}>
                          {a.content}
                        </TableCell>
                        <TableCell className="text-center py-3">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-zinc-650 dark:text-zinc-350">
                            <Users className="h-3 w-3" />
                            {a.targetAudience}
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-xs text-zinc-500 py-3">{a.author}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

        </main>
      </div>

      {/* DISPATCH BROADCAST DIALOG */}
      <Dialog open={broadcastOpen} onOpenChange={setBroadcastOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white dark:bg-zinc-950 p-6 rounded-md">
          <form onSubmit={handleDispatch}>
            <DialogHeader>
              <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Broadcast Public Notice</DialogTitle>
              <DialogDescription className="text-xs text-zinc-500">Post dynamic alerts on notice boards or resident dashboards.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-3.5 py-4">
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="b-title" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Notice Title</Label>
                <Input
                  id="b-title"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Lift maintenance delay"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="b-type" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</Label>
                <select
                  id="b-type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                  className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                >
                  <option value="General">General Announcement</option>
                  <option value="Emergency">Emergency Broadcast</option>
                  <option value="Event">Scheduled Event</option>
                </select>
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="b-audience" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Audience</Label>
                <select
                  id="b-audience"
                  value={form.targetAudience}
                  onChange={(e) => setForm({ ...form, targetAudience: e.target.value as any })}
                  className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                >
                  <option value="All">All Residents</option>
                  <option value="Tenants">Tenants Only</option>
                  <option value="Owners">Owners Only</option>
                </select>
              </div>

              <div className="grid grid-cols-4 items-start gap-3">
                <Label htmlFor="b-content" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300 pt-2">Message</Label>
                <textarea
                  id="b-content"
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Notice message contents..."
                  rows={4}
                  className="col-span-3 text-xs p-2 rounded-sm border border-zinc-200 bg-white dark:bg-zinc-900 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button size="xs" variant="outline" type="button" onClick={() => setBroadcastOpen(false)} className="h-8.5 text-xs font-semibold rounded-sm">
                Cancel
              </Button>
              <Button size="xs" type="submit" className="h-8.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm gap-1">
                <Send className="h-3 w-3" />
                <span>Dispatch Broadcast</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
