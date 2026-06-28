"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { validateData, profileSchema } from "@/lib/validations";
import { useUserProfile, userProfileApi } from "@/lib/api";
import type { UserProfile } from "@/lib/api";
import {
  User,
  Building,
  Home,
  ShieldCheck,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  FileText,
  RefreshCw,
  FolderOpen,
  Calendar,
  Lock,
} from "lucide-react";

export default function ProfilePage() {
  const orgs = ["Tower A - Grandview", "Tower B - Grandview", "Tower C - Grandview"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);
  
  // Fetch user profile from API
  const { profile, loading, error, refetch } = useUserProfile();
  const [isSyncing, setIsSyncing] = React.useState(false);

  const handleRoleChange = async (newRole: UserProfile["role"]) => {
    if (!profile) return;
    setIsSyncing(true);
    try {
      const response = await userProfileApi.update({ role: newRole });
      if (response.success) {
        refetch();
        localStorage.setItem("buildingos-user-role", newRole);
        toast.success(`Switched profile view to ${newRole.replace("_", " ").toUpperCase()}`);
      } else {
        toast.error(response.error || "Failed to update role");
      }
    } catch (error) {
      toast.error("Failed to update role");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    const formData = new FormData(e.target as HTMLFormElement);
    const updates = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
    };

    const validation = validateData(profileSchema, updates);
    if (!validation.success) {
      toast.error(validation.error);
      return;
    }

    setIsSyncing(true);
    try {
      const response = await userProfileApi.update(updates);
      if (response.success) {
        toast.success("Profile records updated and synced with cloud identity ledger.");
        refetch();
      } else {
        toast.error(response.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="text-center space-y-2">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
          <p className="text-sm text-zinc-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-sm text-red-600">{error || "Failed to load profile"}</p>
          <Button onClick={refetch} variant="outline">Retry</Button>
        </div>
      </div>
    );
  }

  const role = profile.role;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans selection:bg-zinc-200">
      <Toaster position="top-right" />

      {/* Sidebar Links */}
      <DashboardSidebar
        currentOrg={currentOrg}
        orgs={orgs}
        onOrgChange={(org) => setCurrentOrg(org)}
      />

      {/* Main Panel */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <DashboardNavbar currentOrg={currentOrg} />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Stakeholder Profile
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Manage your credentials, verify stakeholder logs, and inspect linked documents.
              </p>
            </div>

            {/* Role dropdown for profile demonstration */}
            <div className="flex items-center gap-2">
              <select
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as any)}
                className="h-8.5 text-[11px] font-bold rounded-sm border border-zinc-200 bg-white px-2.5 dark:border-zinc-850 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 outline-none shadow-sm"
              >
                <option value="building_owner">Profile: Building Owner</option>
                <option value="flat_owner">Profile: Flat Owner</option>
                <option value="tenant">Profile: Varatia (Tenant)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left side: Avatar and Card info */}
            <div className="lg:col-span-4 space-y-5">
              <Card className="rounded-md border border-zinc-200 bg-white p-5 text-center shadow-sm dark:border-zinc-855 dark:bg-zinc-950">
                <CardContent className="p-0 space-y-4">
                  
                  {/* Avatar */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xl shadow-md shadow-indigo-500/20">
                        {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <span className="absolute bottom-0 right-0 rounded-full bg-emerald-500 p-1 text-white border-2 border-white dark:border-zinc-950">
                        <ShieldCheck className="h-3 w-3" />
                      </span>
                    </div>
                  </div>

                  {/* Identification */}
                  <div className="space-y-1">
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                      {profile.name}
                    </h2>
                    <p className="text-[10px] text-zinc-400 font-semibold tracking-wider uppercase">
                      {role.replace("_", " ")}
                    </p>
                    <div className="pt-1">
                      <Badge variant="outline" className="text-[9px] font-bold rounded-sm border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
                        ID: {profile.id.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {/* Metadata list */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 text-xs text-left space-y-2.5">
                    <div className="flex items-center gap-2.5 text-zinc-650 dark:text-zinc-350">
                      <Mail className="h-4 w-4 shrink-0 text-zinc-400" />
                      <span className="truncate">
                        {profile.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-zinc-650 dark:text-zinc-350">
                      <Phone className="h-4 w-4 shrink-0 text-zinc-400" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-zinc-650 dark:text-zinc-350">
                      <MapPin className="h-4 w-4 shrink-0 text-zinc-400" />
                      <span className="truncate">
                        {profile.address}
                      </span>
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Stakeholder Info Summary widget */}
              <Card className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-850 dark:bg-zinc-950 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Credentials Status</h3>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Identity Audit:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">Verified</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Tax TIN:</span>
                    <span className="font-semibold text-zinc-850 dark:text-zinc-300">Registered</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Account Tier:</span>
                    <Badge variant="outline" className="text-[8px] font-bold uppercase rounded bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400">
                      {role === "building_owner" ? "Enterprise" : "Standard"}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right side: Detailed forms customized for stakeholder */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSaveProfile} className="space-y-5">
                
                {/* 1. Core Profile Details Form Card */}
                <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                  <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider">Account Credentials Settings</CardTitle>
                    <CardDescription className="text-[10px]">Update public and private identity metrics registered to your profile.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="prof-name" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Display Name</Label>
                        <Input
                          id="prof-name"
                          name="name"
                          defaultValue={profile.name}
                          className="h-8.5 text-xs rounded-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="prof-phone" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Contact Number</Label>
                        <Input
                          id="prof-phone"
                          name="phone"
                          defaultValue={profile.phone}
                          className="h-8.5 text-xs rounded-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="prof-email" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email Address (Non-editable)</Label>
                        <Input
                          id="prof-email"
                          disabled
                          defaultValue={profile.email}
                          className="h-8.5 text-xs rounded-sm bg-zinc-50 dark:bg-zinc-900 cursor-not-allowed opacity-75"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="prof-role" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">System Permission Group</Label>
                        <Input
                          id="prof-role"
                          disabled
                          value={role.toUpperCase().replace("_", " ")}
                          className="h-8.5 text-xs rounded-sm bg-zinc-50 dark:bg-zinc-900 cursor-not-allowed opacity-75 font-semibold text-indigo-650"
                        />
                      </div>
                    </div>

                  </CardContent>
                </Card>

                {/* 2. STAKEHOLDER-SPECIFIC PROFILE VIEW BLOCKS */}
                
                {/* A. BUILDING OWNER EXTRA SETTINGS */}
                {role === "building_owner" && (
                  <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 animate-in fade-in duration-200">
                    <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900">
                      <CardTitle className="text-xs font-bold uppercase tracking-wider">Business Verification & Assets</CardTitle>
                      <CardDescription className="text-[10px]">Trade licensing and corporation credentials for full building ownership.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor="bo-license" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Trade License Verification Number</Label>
                          <Input id="bo-license" defaultValue="TR-990-2025-ABCD" className="h-8.5 text-xs rounded-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="bo-vat" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">VAT Identification Registry (BIN)</Label>
                          <Input id="bo-vat" defaultValue="BIN-102938475" className="h-8.5 text-xs rounded-sm" />
                        </div>
                      </div>

                      <div className="p-3 border border-zinc-150 rounded bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-955/20 text-xs space-y-2">
                        <span className="font-bold text-zinc-850 dark:text-zinc-200 flex items-center gap-1.5"><Building className="h-4 w-4 text-indigo-500" /> Managed Portfolios ({orgs.length})</span>
                        <p className="text-zinc-550 dark:text-zinc-400">Your profile manages corporate ledgers for: <strong>{orgs.join(", ")}</strong>. Contact BuildingOS billing desks to update portfolio blocks.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* B. FLAT OWNER EXTRA SETTINGS */}
                {role === "flat_owner" && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    {/* Settlement bank accounts */}
                    <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                      <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider">Rent Settlement Accounts</CardTitle>
                        <CardDescription className="text-[10px]">Register your bank account details to receive tenant utility payments and rentals.</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="fo-bank" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Settlement Bank Name</Label>
                            <Input id="fo-bank" defaultValue="Standard Chartered Bank" className="h-8.5 text-xs rounded-sm" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="fo-acc" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Account Number</Label>
                            <Input id="fo-acc" defaultValue="12-34567-89" className="h-8.5 text-xs rounded-sm" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="fo-branch" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Routing Number / Branch ID</Label>
                            <Input id="fo-branch" defaultValue="Branch routing: 0252617" className="h-8.5 text-xs rounded-sm" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="fo-tin" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Tax Identification Number (TIN)</Label>
                            <Input id="fo-tin" defaultValue="TIN-893049103" className="h-8.5 text-xs rounded-sm" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Assets list */}
                    <Card className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-850 dark:bg-zinc-950 space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Assets Registered (4 Units)</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {[
                          { unit: "Flat 1402 (Alpha)", rent: "৳22,000", status: "Occupied by Dave Miller" },
                          { unit: "Flat 805 (Alpha)", rent: "৳20,000", status: "Occupied by Sarah Connor" },
                          { unit: "Flat 201 (Beta)", rent: "৳25,000", status: "Occupied by Peter Parker" },
                          { unit: "Flat 302 (Oak)", rent: "৳18,000", status: "Occupied by Diana Prince" },
                        ].map((asset, i) => (
                          <div key={i} className="p-2 border border-zinc-150 rounded bg-zinc-50/50 dark:border-zinc-900 dark:bg-zinc-955/20 flex flex-col justify-between">
                            <span className="font-semibold text-zinc-850 dark:text-zinc-200">{asset.unit}</span>
                            <span className="text-[10px] text-zinc-500 mt-1">{asset.status} • {asset.rent}/mo</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                )}

                {/* C. TENANT EXTRA SETTINGS */}
                {role === "tenant" && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    {/* Verification Clearance Status */}
                    <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
                      <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-900">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider">Tenant Clearance & Documents</CardTitle>
                        <CardDescription className="text-[10px]">Verification logs required for community residential clearance approval.</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4 text-xs">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-2.5 rounded border border-emerald-200 bg-emerald-50/30 dark:border-emerald-950/40 dark:bg-emerald-955/10 flex flex-col items-center text-center space-y-1">
                            <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
                            <span className="font-bold text-[10px] text-emerald-800 dark:text-emerald-450">National NID File</span>
                            <span className="text-[9px] text-emerald-650">Verified & Approved</span>
                          </div>
                          
                          <div className="p-2.5 rounded border border-emerald-200 bg-emerald-50/30 dark:border-emerald-950/40 dark:bg-emerald-955/10 flex flex-col items-center text-center space-y-1">
                            <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
                            <span className="font-bold text-[10px] text-emerald-800 dark:text-emerald-450">Police Verification Form</span>
                            <span className="text-[9px] text-emerald-650">Cleared (Dhaka DMP)</span>
                          </div>

                          <div className="p-2.5 rounded border border-zinc-200 bg-zinc-50 dark:border-zinc-850 dark:bg-zinc-900/60 flex flex-col items-center text-center space-y-1">
                            <FileText className="h-4.5 w-4.5 text-zinc-500" />
                            <span className="font-bold text-[10px] text-zinc-800 dark:text-zinc-300">Lease Agreement</span>
                            <span className="text-[9px] text-zinc-500">Linked PDF (1.2 MB)</span>
                          </div>
                        </div>

                      </CardContent>
                    </Card>

                    {/* Rent contract landlord summary */}
                    <Card className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-850 dark:bg-zinc-950 space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Active Lease Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                            <Building className="h-4 w-4 text-zinc-400" />
                            <span><strong>Rented Flat</strong>: Unit 1402, Tower A</span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                            <Calendar className="h-4 w-4 text-zinc-400" />
                            <span><strong>Lease Period</strong>: Jun 2025 - Dec 2026</span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                            <User className="h-4 w-4 text-zinc-400" />
                            <span><strong>Landlord Name</strong>: Stephen Strange</span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                            <Mail className="h-4 w-4 text-zinc-400" />
                            <span><strong>Landlord Contact</strong>: stephen@strangeholdings.com</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Save button footer */}
                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={isSyncing}
                    className="h-9 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-sm gap-1.5 shadow-sm"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                    {isSyncing ? "Saving Changes..." : "Save Profile Settings"}
                  </Button>
                </div>

              </form>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
