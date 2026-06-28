"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Sparkles,
  Mail,
  Lock,
  User,
  Phone,
  Building,
  Home,
  Users,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  
  // Form states
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<"building_owner" | "flat_owner" | "tenant">("building_owner");
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }
    if (!agreeTerms) {
      toast.error("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Account created successfully! Logging you in...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-zinc-950 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <Toaster position="top-right" />
      
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)]" />

      <div className="relative min-h-screen flex">
        {/* Left column: Branding (Desktop only) */}
        <div className="hidden lg:flex lg:w-[45%] relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-12 flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          {/* Logo */}
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">BuildingOS</span>
                <div className="text-[10px] text-indigo-200 font-medium -mt-0.5">Open & Free Access Platform</div>
              </div>
            </Link>
          </div>

          {/* Core highlights */}
          <div className="relative z-10 space-y-6 max-w-md">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm text-white/90">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Open Registration: Instant Setup</span>
              </div>
              
              <h1 className="text-3xl font-extrabold text-white leading-tight">
                No Blockers. Open Signup.
                <br />
                <span className="text-indigo-200">Start Managing Today</span>
              </h1>
              
              <p className="text-sm text-indigo-100/80 leading-relaxed">
                Whether you own a building portfolio, a single flat, or you are a tenant renting, BuildingOS is completely open. Sign up now to access complaints tracking, utility statements, and workflows.
              </p>
            </div>

            <div className="space-y-3.5 text-xs text-indigo-100/90 pt-4 border-t border-indigo-500/50">
              <div className="flex items-center gap-3">
                <Building className="h-4.5 w-4.5 text-indigo-200" />
                <span><strong>Building Owners</strong>: Manage full blocks, allocate parking, set rates.</span>
              </div>
              <div className="flex items-center gap-3">
                <Home className="h-4.5 w-4.5 text-indigo-200" />
                <span><strong>Flat Owners</strong>: Link units, audit tenant billing, track values.</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4.5 w-4.5 text-indigo-200" />
                <span><strong>Varatia (Tenants)</strong>: Pay utilities, file complaints, register guests.</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-xs text-indigo-250/70">
            <span>© 2026 BuildingOS • Open Platform Portal</span>
          </div>
        </div>

        {/* Right column: Signup Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md space-y-6">
            
            {/* Mobile Header Logo */}
            <div className="lg:hidden flex justify-center mb-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">BuildingOS</span>
              </Link>
            </div>

            <div className="relative bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-850 shadow-sm p-6 space-y-5">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Create your account</h2>
                <p className="text-xs text-zinc-550 dark:text-zinc-400">Join instantly with zero operational blockers.</p>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                
                {/* 1. Account type selector (Role) */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Choose Profile *</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "building_owner", label: "Building Owner", icon: Building },
                      { id: "flat_owner", label: "Flat Owner", icon: Home },
                      { id: "tenant", label: "Varatia (Tenant)", icon: Users },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const isSel = role === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setRole(opt.id as any)}
                          className={`flex flex-col items-center justify-center p-2.5 rounded border text-center transition-all cursor-pointer ${
                            isSel
                              ? "border-indigo-600 bg-indigo-50/40 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/20 dark:text-indigo-400"
                              : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-500"
                          }`}
                        >
                          <Icon className="h-4 w-4 mb-1 shrink-0" />
                          <span className="text-[9px] font-bold tracking-tight">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <Label htmlFor="s-name" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-450" />
                    <Input
                      id="s-name"
                      placeholder="e.g. Stephen Strange"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-8.5 pl-9 text-xs rounded-sm"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="s-email" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Business Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-455" />
                    <Input
                      id="s-email"
                      type="email"
                      placeholder="e.g. stephen@complex.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-8.5 pl-9 text-xs rounded-sm"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <Label htmlFor="s-phone" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-455" />
                    <Input
                      id="s-phone"
                      placeholder="e.g. +880 1712 345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-8.5 pl-9 text-xs rounded-sm"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <Label htmlFor="s-pass" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-450" />
                    <Input
                      id="s-pass"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-8.5 pl-9 pr-9 text-xs rounded-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650"
                    >
                      {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="flex items-start gap-2 pt-1.5">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                    className="rounded border-zinc-200 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                  />
                  <Label htmlFor="terms" className="text-[10px] text-zinc-550 dark:text-zinc-400 cursor-pointer leading-snug">
                    I agree to the <Link href="#terms" className="text-indigo-650 hover:underline">Terms of Service</Link> and <Link href="#privacy" className="text-indigo-650 hover:underline">Privacy Policy</Link> for open platform operations.
                  </Label>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-9 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-md shadow-sm gap-1.5 mt-2"
                >
                  {loading ? "Creating Account..." : "Register & Start Free"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </form>

              {/* Login option */}
              <div className="text-center text-xs pt-2 border-t border-zinc-100 dark:border-zinc-900">
                <span className="text-zinc-500 dark:text-zinc-400">Already have an account? </span>
                <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                  Sign in here
                </Link>
              </div>
            </div>

            {/* Support info */}
            <p className="text-center text-[10.5px] text-zinc-400">
              Need configuration help? <Link href="/#contact" className="text-zinc-600 font-semibold hover:underline">Contact integrations desk</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
