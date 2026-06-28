"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Settings,
  Building,
  Lock,
  CreditCard,
  Bell,
  Zap,
  Fingerprint,
  Activity,
  Plus,
} from "lucide-react";

export default function SettingsPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Form states
  const [societyName, setSocietyName] = React.useState("Grandview Towers");
  const [societyAddress, setSocietyAddress] = React.useState("102 Ocean Drive, Sector 4, Metropolis");
  const [timezone, setTimezone] = React.useState("GMT-05:00 Eastern Time");

  const [lateFeeAmount, setLateFeeAmount] = React.useState(15.00);
  const [billingCycle, setBillingCycle] = React.useState("Monthly");

  const [smsAlerts, setSmsAlerts] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);

  const [electricityRate, setElectricityRate] = React.useState(0.20);
  const [waterRate, setWaterRate] = React.useState(0.029);

  const [otpVerify, setOtpVerify] = React.useState(true);

  const handleSaveSettings = (category: string) => {
    toast.success(`${category} configurations updated successfully!`);
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 -200/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                System Settings
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Configure platform behavior, billing rules, permissions, notifications, and operational controls.
              </p>
            </div>
          </div>

          {/* Settings Tabs Panel */}
          <Tabs defaultValue="org" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1 -200 bg-transparent justify-start p-0 mb-4 rounded-none">
              <TabsTrigger value="org" className="h-9 text-xs rounded-none  data-[state=active]:indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">
                <Building className="h-3.5 w-3.5 mr-1.5" /> Organization
              </TabsTrigger>
              <TabsTrigger value="roles" className="h-9 text-xs rounded-none  data-[state=active]:indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">
                <Lock className="h-3.5 w-3.5 mr-1.5" /> Roles & Permissions
              </TabsTrigger>
              <TabsTrigger value="billing" className="h-9 text-xs rounded-none  data-[state=active]:indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">
                <CreditCard className="h-3.5 w-3.5 mr-1.5" /> Billing Config
              </TabsTrigger>
              <TabsTrigger value="notifications" className="h-9 text-xs rounded-none  data-[state=active]:indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">
                <Bell className="h-3.5 w-3.5 mr-1.5" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="utilities" className="h-9 text-xs rounded-none  data-[state=active]:indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">
                <Zap className="h-3.5 w-3.5 mr-1.5" /> Utilities
              </TabsTrigger>
              <TabsTrigger value="security" className="h-9 text-xs rounded-none  data-[state=active]:indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">
                <Fingerprint className="h-3.5 w-3.5 mr-1.5" /> Security Rules
              </TabsTrigger>
              <TabsTrigger value="integrations" className="h-9 text-xs rounded-none  data-[state=active]:indigo-600 data-[state=active]:bg-transparent px-3 font-semibold">
                <Activity className="h-3.5 w-3.5 mr-1.5" /> Integrations
              </TabsTrigger>
            </TabsList>

            {/* 1. Organization Settings */}
            <TabsContent value="org" className="space-y-4">
              <Card className="200 bg-white dark:bg-zinc-950 max-w-2xl rounded-md shadow-sm">
                <CardHeader className="p-4 -100">
                  <CardTitle className="text-sm font-bold">Community Profile</CardTitle>
                  <CardDescription className="text-xs">Configure central residential complex metadata credentials.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Community Name</Label>
                    <Input value={societyName} onChange={(e) => setSocietyName(e.target.value)} className="col-span-2 h-8.5 text-xs rounded-sm-200" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Address Location</Label>
                    <Input value={societyAddress} onChange={(e) => setSocietyAddress(e.target.value)} className="col-span-2 h-8.5 text-xs rounded-sm-200" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Timezone</Label>
                    <Input value={timezone} onChange={(e) => setTimezone(e.target.value)} className="col-span-2 h-8.5 text-xs rounded-sm-200" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => handleSaveSettings("Organization")} className="h-8.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm">
                      Save Profiles Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 2. Role & Permissions */}
            <TabsContent value="roles" className="space-y-4">
              <Card className="200 bg-white dark:bg-zinc-950 max-w-2xl rounded-md shadow-sm">
                <CardHeader className="p-4 -100">
                  <CardTitle className="text-sm font-bold">RBAC Access Matrix Control</CardTitle>
                  <CardDescription className="text-xs">Configure roles privileges mappings.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3.5 text-xs">
                  <div className="flex justify-between items-center -100 pb-2.5">
                    <div>
                      <span className="font-semibold block text-zinc-800 dark:text-zinc-200">Administrator Role</span>
                      <span className="text-[10px] text-zinc-450 block">Inherits complete read, write, billing overrides privileges.</span>
                    </div>
                    <Badge className="bg-indigo-50 text-indigo-700-200 dark:bg-indigo-950/20 dark:text-indigo-400">All Privileges</Badge>
                  </div>
                  <div className="flex justify-between items-center -100 pb-2.5">
                    <div>
                      <span className="font-semibold block text-zinc-800 dark:text-zinc-200">Security Gate Officer</span>
                      <span className="text-[10px] text-zinc-450 block">Access limited to visitor passes verification & gate timeline logs.</span>
                    </div>
                    <Badge variant="outline" className="text-[9px]-200">Gate Scope Only</Badge>
                  </div>
                  <div className="flex justify-between items-center -100 pb-2.5">
                    <div>
                      <span className="font-semibold block text-zinc-800 dark:text-zinc-200">Facilities Maintenance Staff</span>
                      <span className="text-[10px] text-zinc-450 block">Privileges to close assigned service complaint tickets.</span>
                    </div>
                    <Badge variant="outline" className="text-[9px]-200">Wrench Scope</Badge>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => handleSaveSettings("Permissions Matrix")} className="h-8.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm">
                      Apply Privileges Rules
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 3. Billing Configuration */}
            <TabsContent value="billing" className="space-y-4">
              <Card className="200 bg-white dark:bg-zinc-950 max-w-2xl rounded-md shadow-sm">
                <CardHeader className="p-4 -100">
                  <CardTitle className="text-sm font-bold">Billing & Financial Rules</CardTitle>
                  <CardDescription className="text-xs">Configure late fee caps, billing periods, and surcharge items.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Late Payment Fee ($)</Label>
                    <Input type="number" value={lateFeeAmount} onChange={(e) => setLateFeeAmount(Number(e.target.value))} className="col-span-2 h-8.5 text-xs rounded-sm-200" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Billing Run Cycle</Label>
                    <select value={billingCycle} onChange={(e) => setBillingCycle(e.target.value)} className="col-span-2 h-8.5 text-xs rounded-sm -205 bg-white px-2 dark:bg-zinc-900 outline-none">
                      <option value="Weekly">Weekly Cycle Run</option>
                      <option value="Monthly">Monthly Cycle Run</option>
                      <option value="Quarterly">Quarterly Cycle Run</option>
                    </select>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => handleSaveSettings("Billing Rules")} className="h-8.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm">
                      Update Billing Rules
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 4. Notification Settings */}
            <TabsContent value="notifications" className="space-y-4">
              <Card className="200 bg-white dark:bg-zinc-950 max-w-2xl rounded-md shadow-sm">
                <CardHeader className="p-4 -100">
                  <CardTitle className="text-sm font-bold">Platform Notification Alerts</CardTitle>
                  <CardDescription className="text-xs">Configure alerts escalation parameters & channels.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4 text-xs">
                  <div className="flex justify-between items-center -100 pb-2.5">
                    <div>
                      <span className="font-semibold block text-zinc-850 dark:text-zinc-200">SMS Gate Alerts</span>
                      <span className="text-[10px] text-zinc-450 block">Send OTP text checks directly to host mobiles on gate pre-approvals.</span>
                    </div>
                    <input type="checkbox" checked={smsAlerts} onChange={(e) => setSmsAlerts(e.target.checked)} className="h-4 w-4 rounded-200 text-indigo-600 outline-none" />
                  </div>
                  <div className="flex justify-between items-center -100 pb-2.5">
                    <div>
                      <span className="font-semibold block text-zinc-850 dark:text-zinc-200">Email Invoices Alerts</span>
                      <span className="text-[10px] text-zinc-450 block">Auto-dispatch PDF statements billing run alerts to verified resident emails.</span>
                    </div>
                    <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} className="h-4 w-4 rounded-200 text-indigo-600 outline-none" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => handleSaveSettings("Notification Alerts")} className="h-8.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm">
                      Save Notification Rules
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 5. Utility Settings */}
            <TabsContent value="utilities" className="space-y-4">
              <Card className="200 bg-white dark:bg-zinc-950 max-w-2xl rounded-md shadow-sm">
                <CardHeader className="p-4 -100">
                  <CardTitle className="text-sm font-bold">Utility Consumption Indices</CardTitle>
                  <CardDescription className="text-xs">Configure rates calculated per utility unit flow.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Electricity Rate ($/kWh)</Label>
                    <Input type="number" step="0.01" value={electricityRate} onChange={(e) => setElectricityRate(Number(e.target.value))} className="col-span-2 h-8.5 text-xs rounded-sm-200" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Water Consumption Rate ($/L)</Label>
                    <Input type="number" step="0.001" value={waterRate} onChange={(e) => setWaterRate(Number(e.target.value))} className="col-span-2 h-8.5 text-xs rounded-sm-200" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => handleSaveSettings("Utility Indices")} className="h-8.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm">
                      Update Utility Indexes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 6. Security Settings */}
            <TabsContent value="security" className="space-y-4">
              <Card className="200 bg-white dark:bg-zinc-950 max-w-2xl rounded-md shadow-sm">
                <CardHeader className="p-4 -100">
                  <CardTitle className="text-sm font-bold">Access & Security Policies</CardTitle>
                  <CardDescription className="text-xs">Configure gate entry restrictions & visitor verification OTP rules.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4 text-xs">
                  <div className="flex justify-between items-center -100 pb-2.5">
                    <div>
                      <span className="font-semibold block text-zinc-850 dark:text-zinc-200">Force Gate Pass OTP checks</span>
                      <span className="text-[10px] text-zinc-450 block">Requires guards to input visitor passcode for confirmation check.</span>
                    </div>
                    <input type="checkbox" checked={otpVerify} onChange={(e) => setOtpVerify(e.target.checked)} className="h-4 w-4 rounded-200 text-indigo-600 outline-none" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => handleSaveSettings("Security Policies")} className="h-8.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm">
                      Save Security Rules
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 7. Integration Settings */}
            <TabsContent value="integrations" className="space-y-4">
              <Card className="200 bg-white dark:bg-zinc-950 max-w-2xl rounded-md shadow-sm">
                <CardHeader className="p-4 -100">
                  <CardTitle className="text-sm font-bold">External API Mappings</CardTitle>
                  <CardDescription className="text-xs">Map payment gateways & webhooks configurations keys.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Stripe Secret Key</Label>
                    <Input type="password" value="••••••••••••••••••••••••" readOnly className="col-span-2 h-8.5 text-xs rounded-sm-200 bg-zinc-50" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Gate Cameras Webhook API</Label>
                    <Input value="https://api.societyos.com/v1/gate-stream" readOnly className="col-span-2 h-8.5 text-xs rounded-sm-200 bg-zinc-50" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => handleSaveSettings("Integrations Key Links")} className="h-8.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm">
                      Update Webhooks Links
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </main>
      </div>

    </div>
  );
}
