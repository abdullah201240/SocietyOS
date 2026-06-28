"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Building2,
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Shield,
  Zap,
  Star,
  Users,
  ChevronRight,
} from "lucide-react";

export default function BookDemoPage() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    size: "50-200",
    interest: "All Operations",
    date: "",
    timeSlot: "10:00 AM - 10:30 AM",
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.property || !form.date) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success("Demo booking scheduled successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans relative flex flex-col justify-between selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <Toaster position="top-right" />
      
      {/* Background grid line patterns */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] opacity-50" />

      {/* Modern Header bar */}
      <header className="h-14 border-b border-zinc-200/60 bg-white/80 backdrop-blur-md dark:border-zinc-900 dark:bg-black/80 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-zinc-900 dark:text-white">
            <div className="flex h-8 w-8 items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-sm">
              <Building2 className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm font-bold">BuildingOS</span>
          </Link>

          <Link href="/">
            <Button variant="ghost" size="xs" className="h-8 gap-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Column Grid Section */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left panel: Bullet checkpoints (7 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-[10px] uppercase font-bold text-zinc-500 bg-white dark:bg-zinc-950">
                1-on-1 Personalized Session
              </Badge>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                Experience BuildingOS <br />
                <span className="text-zinc-500 dark:text-zinc-400">In Real-Time</span>
              </h1>
              <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed max-w-lg">
                See how residential estates, complexes, and property managers automate workflows, recover leakage from utility bills, and enhance resident relationships from a single system.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded bg-indigo-50 p-1 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white">Custom Property Walkthrough</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">We configure the demo dashboard live with building structures matching your property.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 rounded bg-indigo-50 p-1 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white">Workflow & SLA Audits</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Learn how complaints auto-dispatch tickets and generate maintenance ledgers in seconds.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 rounded bg-indigo-50 p-1 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 shrink-0">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white">Access Control Configurations</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Preview gate delivery tracking, security checkpoint logs, and dynamic OTP configurations.</p>
                </div>
              </div>
            </div>

            {/* Review quote */}
            <div className="bg-white dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-850 rounded-md space-y-2 mt-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-indigo-600 text-indigo-600 dark:fill-indigo-400 dark:text-indigo-400" />
                ))}
              </div>
              <p className="text-xs italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                "We migrated 4 towers and 320 units to BuildingOS. Turnaround times for billing dispatch fell to 10 minutes, and maintenance complaint resolving speed increased by 64%."
              </p>
              <div className="flex justify-between items-center text-[10px] text-zinc-450 mt-2 font-semibold">
                <span>Marcus Aurelius</span>
                <span>Director of Operations, Grandview Towers</span>
              </div>
            </div>
          </div>

          {/* Right panel: Booking Form card (5 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-850 dark:bg-zinc-950 relative overflow-hidden min-h-[480px] flex flex-col justify-between">
              
              {loading && (
                <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/80 z-20 flex flex-col items-center justify-center space-y-2">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Scheduling demo...</span>
                </div>
              )}

              {success ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 animate-in fade-in zoom-in-95 duration-300">
                  <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 flex items-center justify-center border border-emerald-200 dark:border-emerald-900/60 shadow-sm">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Demo Confirmed!</h2>
                    <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed max-w-sm">
                      An onboarding specialist will send a Google Meet calendar invite to <strong className="text-zinc-900 dark:text-white">{form.email}</strong> shortly.
                    </p>
                  </div>

                  <div className="w-full max-w-xs rounded border border-zinc-150 dark:border-zinc-900 p-3 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-2.5 text-xs text-left">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Meeting Details</span>
                    <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                      <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      <span>{form.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                      <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      <span>{form.timeSlot}</span>
                    </div>
                  </div>

                  <div className="w-full max-w-xs pt-4 flex flex-col gap-2">
                    <Button onClick={() => setSuccess(false)} variant="outline" className="w-full h-8.5 text-xs rounded-sm">
                      Book Another Date
                    </Button>
                    <Link href="/">
                      <Button className="w-full h-8.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm">
                        Return to Homepage
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Request Demo Invitation</h2>
                    <p className="text-[10.5px] text-zinc-450 dark:text-zinc-400">Fill in details to secure your live dashboard walkthrough.</p>
                  </div>

                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="demo-name" className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Full Name *</Label>
                        <Input
                          id="demo-name"
                          placeholder="e.g. Stephen Strange"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="h-8 text-xs rounded-sm"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="demo-email" className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Work Email *</Label>
                        <Input
                          id="demo-email"
                          type="email"
                          placeholder="e.g. s.strange@portal.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="h-8 text-xs rounded-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="demo-phone" className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Phone Number *</Label>
                        <Input
                          id="demo-phone"
                          type="tel"
                          placeholder="e.g. +1 (555) 123-4567"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="h-8 text-xs rounded-sm"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="demo-property" className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Property / Company *</Label>
                        <Input
                          id="demo-property"
                          placeholder="e.g. Grandview Towers Ltd"
                          value={form.property}
                          onChange={(e) => setForm({ ...form, property: e.target.value })}
                          className="h-8 text-xs rounded-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="demo-size" className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Portfolio Size (Units)</Label>
                        <select
                          id="demo-size"
                          value={form.size}
                          onChange={(e) => setForm({ ...form, size: e.target.value })}
                          className="w-full h-8 text-xs rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                        >
                          <option value="under-50">&lt; 50 flats/units</option>
                          <option value="50-200">50 - 200 flats/units</option>
                          <option value="200-500">200 - 500 flats/units</option>
                          <option value="over-500">500+ flats/units</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="demo-interest" className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Primary Core Interest</Label>
                        <select
                          id="demo-interest"
                          value={form.interest}
                          onChange={(e) => setForm({ ...form, interest: e.target.value })}
                          className="w-full h-8 text-xs rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                        >
                          <option value="All Operations">Full Platform Suite</option>
                          <option value="Billing & Invoicing">Utility Billing & Payments</option>
                          <option value="Workflow & SLA">Maintenance dispatches</option>
                          <option value="Gate security">Gate & visitor tracking</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="demo-date" className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Preferred Date *</Label>
                        <Input
                          id="demo-date"
                          type="date"
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          className="h-8 text-xs rounded-sm"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="demo-time" className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Preferred Time Slot</Label>
                        <select
                          id="demo-time"
                          value={form.timeSlot}
                          onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                          className="w-full h-8 text-xs rounded-sm border border-zinc-205 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                        >
                          <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                          <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
                          <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                          <option value="04:30 PM - 05:00 PM">04:30 PM - 05:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-9.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 rounded-md mt-2 shadow-sm"
                  >
                    Confirm Booking Schedule
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-6 border-t border-zinc-200/60 dark:border-zinc-900 text-center text-[10.5px] text-zinc-400 dark:text-zinc-650 bg-white/40 dark:bg-black/20">
        <span>© 2026 BuildingOS Inc. All rights reserved. • Enterprise Security Assured</span>
      </footer>
    </div>
  );
}
