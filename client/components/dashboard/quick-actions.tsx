"use client";

import * as React from "react";
import { AlertCircle, UserPlus, Receipt, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function QuickActions() {
  const [openDialog, setOpenDialog] = React.useState<"complaint" | "resident" | "invoice" | "notice" | null>(null);

  const handleSubmit = (e: React.FormEvent, action: string) => {
    e.preventDefault();
    toast.success(`Action successfully executed: ${action}`);
    setOpenDialog(null);
  };

  return (
    <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
      <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900">
        <CardTitle className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
          Quick Dispatch Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 grid grid-cols-2 gap-2">
        {/* 1. CREATE COMPLAINT */}
        <Dialog open={openDialog === "complaint"} onOpenChange={(open) => setOpenDialog(open ? "complaint" : null)}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-14 flex flex-col items-center justify-center gap-1 rounded-sm border-zinc-200 hover:bg-zinc-50 hover:text-indigo-600 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer"
            >
              <AlertCircle className="h-4.5 w-4.5 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <span className="text-[10px] font-bold">Raise Ticket</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-6 rounded-md">
            <form onSubmit={(e) => handleSubmit(e, "Created Complaint")}>
              <DialogHeader>
                <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Raise Operational Ticket</DialogTitle>
                <DialogDescription className="text-xs text-zinc-500">File a new maintenance issue or resident complaint in the queue.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3.5 py-4">
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="c-title" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Title</Label>
                  <Input id="c-title" required placeholder="e.g. Water pump making loud noise" className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200" />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="c-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Unit / Area</Label>
                  <Input id="c-flat" required placeholder="e.g. Tower A Lift Lobby" className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200" />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="c-desc" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Description</Label>
                  <Textarea id="c-desc" required placeholder="Describe the issue details here..." className="col-span-3 text-xs rounded-sm border-zinc-200 min-h-[60px]" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" size="sm" onClick={() => setOpenDialog(null)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Submit Ticket</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* 2. ADD RESIDENT */}
        <Dialog open={openDialog === "resident"} onOpenChange={(open) => setOpenDialog(open ? "resident" : null)}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-14 flex flex-col items-center justify-center gap-1 rounded-sm border-zinc-200 hover:bg-zinc-50 hover:text-indigo-600 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer"
            >
              <UserPlus className="h-4.5 w-4.5 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <span className="text-[10px] font-bold">Add Resident</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-6 rounded-md">
            <form onSubmit={(e) => handleSubmit(e, "Registered Resident")}>
              <DialogHeader>
                <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Onboard New Resident</DialogTitle>
                <DialogDescription className="text-xs text-zinc-500">Register a new owner or tenant inside a building flat unit.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3.5 py-4">
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="r-name" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Full Name</Label>
                  <Input id="r-name" required placeholder="e.g. David Miller" className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200" />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="r-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat Unit</Label>
                  <Input id="r-flat" required placeholder="e.g. Tower B - Flat 1204" className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200" />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="r-phone" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Phone</Label>
                  <Input id="r-phone" type="tel" required placeholder="e.g. +1 555-0199" className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" size="sm" onClick={() => setOpenDialog(null)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Add Resident</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* 3. GENERATE INVOICE */}
        <Dialog open={openDialog === "invoice"} onOpenChange={(open) => setOpenDialog(open ? "invoice" : null)}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-14 flex flex-col items-center justify-center gap-1 rounded-sm border-zinc-200 hover:bg-zinc-50 hover:text-indigo-600 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer"
            >
              <Receipt className="h-4.5 w-4.5 shrink-0 text-indigo-650 dark:text-indigo-400" />
              <span className="text-[10px] font-bold">Bill Dues</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-6 rounded-md">
            <form onSubmit={(e) => handleSubmit(e, "Generated Invoice")}>
              <DialogHeader>
                <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Generate Unit Invoice</DialogTitle>
                <DialogDescription className="text-xs text-zinc-500">Bill specific flat units for maintenance, amenities, or utility surcharges.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3.5 py-4">
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="i-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat Unit</Label>
                  <Input id="i-flat" required placeholder="e.g. Flat 1402" className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200" />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="i-amount" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Amount ($)</Label>
                  <Input id="i-amount" type="number" required placeholder="e.g. 185.00" className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200" />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="i-desc" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Details</Label>
                  <Input id="i-desc" required placeholder="e.g. July Maintenance Fee" className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" size="sm" onClick={() => setOpenDialog(null)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Issue Invoice</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* 4. ANNOUNCE NOTICE */}
        <Dialog open={openDialog === "notice"} onOpenChange={(open) => setOpenDialog(open ? "notice" : null)}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-14 flex flex-col items-center justify-center gap-1 rounded-sm border-zinc-200 hover:bg-zinc-50 hover:text-indigo-600 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 cursor-pointer"
            >
              <Megaphone className="h-4.5 w-4.5 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <span className="text-[10px] font-bold">Send Notice</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-950 p-6 rounded-md">
            <form onSubmit={(e) => handleSubmit(e, "Published Notice")}>
              <DialogHeader>
                <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Broadcast Public Notice</DialogTitle>
                <DialogDescription className="text-xs text-zinc-500">Publish a system announcement to all resident mobile apps.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3.5 py-4">
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="n-title" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Headline</Label>
                  <Input id="n-title" required placeholder="e.g. Preventive pesticide spraying on Sunday" className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200" />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="n-desc" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Message</Label>
                  <Textarea id="n-desc" required placeholder="Type announcement details here..." className="col-span-3 text-xs rounded-sm border-zinc-200 min-h-[80px]" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" size="sm" onClick={() => setOpenDialog(null)} className="h-8.5 text-xs rounded-sm">Cancel</Button>
                <Button type="submit" size="sm" className="h-8.5 text-xs rounded-sm bg-indigo-600 text-white hover:bg-indigo-700">Announce Now</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
