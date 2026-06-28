"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { validateData, contactSchema } from "@/lib/validations";
import { Mail, Phone, MapPin, Send, HelpCircle } from "lucide-react";

export function ContactSection() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: "Sales Inquiry",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateData(contactSchema, form);
    if (!validation.success) {
      toast.error(validation.error);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Thank you! Your message has been sent to our sales team.");
      setForm({ name: "", email: "", subject: "Sales Inquiry", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/20 dark:bg-black/30 relative">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 rounded-full px-3 py-1 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-950">
            Contact Us
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Get in Touch with Our Team
          </h2>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
            Have questions about pricing, integrations, or deployment schedules? Drop us a line and our complex integration team will respond within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Info cards (Left) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-850 dark:bg-zinc-950 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Office Headquarters</h3>
              
              <div className="space-y-3.5 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white block">BuildingOS Inc.</span>
                    <span>102 Ocean Drive, Sector 4, Metropolis</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>+1 (555) 019-2834 (Sales Hotline)</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>integrations@buildingos.com</span>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-850 dark:bg-zinc-950 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-zinc-400" /> Looking for Support?
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                If you are an active tenant or building administrator looking for software manuals or configuration support, please visit our documentation center or submit a ticket from the dashboard.
              </p>
            </div>
          </div>

          {/* Contact form (Right) */}
          <div className="lg:col-span-7">
            <div className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Full Name *</Label>
                    <Input
                      id="contact-name"
                      placeholder="e.g. Marcus Aurelius"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-8.5 text-xs rounded-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Business Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. marcus@firm.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="h-8.5 text-xs rounded-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-subject" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Inquiry Subject</Label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full h-8.5 text-xs rounded-sm border border-zinc-205 bg-white px-2.5 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                  >
                    <option value="Sales Inquiry">Sales & Pricing Inquiry</option>
                    <option value="Technical Integration">Technical Integration</option>
                    <option value="Onboarding Demo">Onboarding Demo Request</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-message" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Message *</Label>
                  <Textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Tell us about your properties (e.g. number of building blocks, total flats, current operational bottlenecks)..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="text-xs rounded-sm resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-9 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 rounded-md"
                >
                  <Send className="h-3.5 w-3.5" />
                  {loading ? "Sending Message..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
