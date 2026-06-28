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
  CalendarDays,
  Clock,
  User,
  Users,
  Search,
  Filter,
  Plus,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  Building,
} from "lucide-react";
import { useFacilityBookings, bookingsApi } from "@/lib/api";
import { validateData, facilityBookingSchema } from "@/lib/validations";

export default function BookingsPage() {
  const orgs = ["Grandview Towers", "Meadow View Complex", "Parkside Residences"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  const { bookings: bookingsFromApi, loading, error, refetch } = useFacilityBookings();
  const [bookings, setBookings] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (bookingsFromApi) setBookings(bookingsFromApi);
  }, [bookingsFromApi]);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterFacility, setFilterFacility] = React.useState("All");
  const [filterStatus, setFilterStatus] = React.useState("All");

  // Create Reservation Dialog State
  const [bookingOpen, setBookingOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    flatNumber: "",
    residentName: "",
    facilityName: "Community Hall" as "Community Hall" | "Rooftop Pool" | "Tennis Court" | "Mini Gym",
    bookingDate: "",
    timeSlot: ""
  });

  // Handle Reservation
  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateData(facilityBookingSchema, form);
    if (!validation.success) {
      toast.error(validation.error);
      return;
    }

    const payload = {
      ...form,
      buildingName: currentOrg,
      status: "Pending" as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const response = await bookingsApi.create(payload);
    if (response.success) {
      toast.success(`Booking reserved for ${form.facilityName}!`);
      setBookingOpen(false);
      setForm({ flatNumber: "", residentName: "", facilityName: "Community Hall", bookingDate: "", timeSlot: "" });
      refetch();
    } else {
      toast.error(response.error || "Failed to make reservation");
    }
  };

  // Toggle status
  const handleStatusChange = async (id: string, nextStatus: "Confirmed" | "Cancelled") => {
    const response = await bookingsApi.updateStatus(id, nextStatus);
    if (response.success) {
      toast.success(`Booking status updated to ${nextStatus}`);
      refetch();
    } else {
      toast.error(response.error || "Failed to update booking status");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (bookings.length === 0) {
      toast.error("No bookings to export.");
      return;
    }
    const headers = ["ID", "Flat Unit", "Building", "Resident", "Facility", "Date", "Time Slot", "Status"];
    const rows = bookings.map(b => [
      b.id,
      `"${b.flatNumber}"`,
      `"${b.buildingName}"`,
      `"${b.residentName.replace(/"/g, '""')}"`,
      `"${b.facilityName}"`,
      `"${b.bookingDate}"`,
      `"${b.timeSlot}"`,
      `"${b.status}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `facility_bookings_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Reservations log exported successfully.");
  };

  // Filter listings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.residentName.toLowerCase().includes(searchQuery.toLowerCase()) || b.flatNumber.includes(searchQuery);
    const matchesFacility = filterFacility === "All" || b.facilityName === filterFacility;
    const matchesStatus = filterStatus === "All" || b.status === filterStatus;
    const matchesBuilding = b.buildingName === currentOrg;
    return matchesSearch && matchesFacility && matchesStatus && matchesBuilding;
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
                Amenities & Facility Bookings
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Manage reservations and schedule timeslots for community halls, rooftop pools, and private fitness hubs.
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
                <span>Export Bookings</span>
              </Button>

              <Button
                size="xs"
                onClick={() => setBookingOpen(true)}
                className="h-8 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-1 cursor-pointer"
              >
                <CalendarDays className="h-3.5 w-3.5" />
                <span>Schedule Reservation</span>
              </Button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded dark:bg-emerald-950/30">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 tracking-wider block">Confirmed Reservations</span>
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {bookings.filter(b => b.status === "Confirmed").length} slots
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded dark:bg-amber-955/20">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 tracking-wider block">Pending Requests</span>
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {bookings.filter(b => b.status === "Pending").length} waiting
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded dark:bg-indigo-950/30">
                  <CalendarDays className="h-5 w-5 text-indigo-650" />
                </div>
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-455 tracking-wider block">Total Bookings</span>
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {bookings.length} schedules
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
                placeholder="Search by Flat unit or Resident..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-sm pl-8.5 text-xs outline-none bg-white dark:bg-zinc-950 focus:border-indigo-500 border-zinc-200"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
              <div className="flex items-center gap-1.5">
                <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Facility</Label>
                <select
                  value={filterFacility}
                  onChange={(e) => setFilterFacility(e.target.value)}
                  className="h-8 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-955 outline-none"
                >
                  <option value="All">All facilities</option>
                  <option value="Community Hall">Community Hall</option>
                  <option value="Rooftop Pool">Rooftop Pool</option>
                  <option value="Tennis Court">Tennis Court</option>
                  <option value="Mini Gym">Mini Gym</option>
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
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending Approval</option>
                  <option value="Cancelled">Cancelled</option>
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
                  <span className="text-xs font-semibold">Loading reservations...</span>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-rose-500">
                  <AlertCircle className="h-8 w-8 mb-2" />
                  <span className="text-xs font-semibold">{error}</span>
                  <Button size="xs" variant="outline" className="mt-3 text-[10px] h-7" onClick={refetch}>Retry</Button>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                  <CalendarDays className="h-8 w-8 text-zinc-300 mb-2" />
                  <span className="text-xs font-semibold">No reservations found</span>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-zinc-50/50 dark:bg-zinc-950/20">
                    <TableRow>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Booking ID</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Resident Unit</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Facility</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Date</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Time Slot</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Status</TableHead>
                      <TableHead className="w-40 h-9" />
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-zinc-250 dark:divide-zinc-850">
                    {filteredBookings.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="text-xs font-semibold py-2.5">{b.id}</TableCell>
                        <TableCell className="py-2.5">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-zinc-850 dark:text-zinc-200">Flat {b.flatNumber}</span>
                            <span className="text-[9.5px] text-zinc-500">{b.residentName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-semibold py-2.5">{b.facilityName}</TableCell>
                        <TableCell className="text-center text-xs text-zinc-550 dark:text-zinc-400 py-2.5">
                          {new Date(b.bookingDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                        </TableCell>
                        <TableCell className="text-center text-xs text-zinc-550 dark:text-zinc-400 py-2.5">{b.timeSlot}</TableCell>
                        <TableCell className="text-center py-2.5">
                          <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[8.5px] font-bold ${
                            b.status === "Confirmed"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450"
                              : b.status === "Pending"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-955/20 dark:text-amber-450"
                              : "bg-rose-50 text-rose-700 dark:bg-rose-955/20 dark:text-rose-455"
                          }`}>
                            {b.status}
                          </span>
                        </TableCell>
                        <TableCell className="py-2.5 text-right pr-4 gap-1.5 flex justify-end">
                          {b.status === "Pending" && (
                            <>
                              <Button
                                size="xs"
                                onClick={() => handleStatusChange(b.id, "Confirmed")}
                                className="h-6.5 px-2 text-[9px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-sm shadow-sm"
                              >
                                Approve
                              </Button>
                              <Button
                                size="xs"
                                variant="outline"
                                onClick={() => handleStatusChange(b.id, "Cancelled")}
                                className="h-6.5 px-2 text-[9px] hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 rounded-sm text-rose-600 shadow-sm"
                              >
                                Decline
                              </Button>
                            </>
                          )}
                          {b.status === "Confirmed" && (
                            <Button
                              size="xs"
                              variant="outline"
                              onClick={() => handleStatusChange(b.id, "Cancelled")}
                              className="h-6.5 px-2 text-[9px] hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 rounded-sm text-zinc-500 shadow-sm"
                            >
                              Cancel
                            </Button>
                          )}
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

      {/* SCHEDULE RESERVATION DIALOG */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white dark:bg-zinc-950 p-6 rounded-md">
          <form onSubmit={handleReserve}>
            <DialogHeader>
              <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Reserve Facility Slot</DialogTitle>
              <DialogDescription className="text-xs text-zinc-500">Choose timeslot and input target flat to reserve building facilities.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-3.5 py-4">
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="s-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat Unit</Label>
                <Input
                  id="s-flat"
                  required
                  value={form.flatNumber}
                  onChange={(e) => setForm({ ...form, flatNumber: e.target.value })}
                  placeholder="e.g. 101"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="s-name" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Resident</Label>
                <Input
                  id="s-name"
                  required
                  value={form.residentName}
                  onChange={(e) => setForm({ ...form, residentName: e.target.value })}
                  placeholder="Resident name"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="s-facility" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Facility</Label>
                <select
                  id="s-facility"
                  value={form.facilityName}
                  onChange={(e) => setForm({ ...form, facilityName: e.target.value as any })}
                  className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                >
                  <option value="Community Hall">Community Hall</option>
                  <option value="Rooftop Pool">Rooftop Pool</option>
                  <option value="Tennis Court">Tennis Court</option>
                  <option value="Mini Gym">Mini Gym</option>
                </select>
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="s-date" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Date</Label>
                <Input
                  id="s-date"
                  type="date"
                  required
                  value={form.bookingDate}
                  onChange={(e) => setForm({ ...form, bookingDate: e.target.value })}
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="s-slot" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Time Slot</Label>
                <Input
                  id="s-slot"
                  required
                  value={form.timeSlot}
                  onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                  placeholder="e.g. 10:00 AM - 12:00 PM"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button size="xs" variant="outline" type="button" onClick={() => setBookingOpen(false)} className="h-8.5 text-xs font-semibold rounded-sm">
                Cancel
              </Button>
              <Button size="xs" type="submit" className="h-8.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm gap-1 cursor-pointer">
                <span>Book Slot</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
