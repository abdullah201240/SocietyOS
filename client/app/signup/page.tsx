"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { validateData, signupSchema } from "@/lib/validations";
import {
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Mail,
  Phone,
  Lock,
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
    
    const validation = validateData(signupSchema, {
      name,
      email,
      phone,
      password,
      role,
      agreeTerms,
    });

    if (!validation.success) {
      toast.error(validation.error);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Registration successful! Syncing workspace profile...");
      localStorage.setItem("buildingos-user-role", role);
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-zinc-50 text-zinc-900 dark:bg-[#030303] dark:text-zinc-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-white font-sans transition-colors duration-200">
      
      
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f2_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f2_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f0f11_1px,transparent_1px),linear-gradient(to_bottom,#0f0f11_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Ambient radial glows */}
        <div className="absolute top-[-25%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[65%] h-[65%] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[150px]" />
      </div>

      {/* Modern top bar */}
      <header className="h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-zinc-200 bg-white/80 dark:border-zinc-900 dark:bg-[#030303]/40 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-indigo-600 text-white font-bold text-xs select-none shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            B
          </div>
          <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
            BuildingOS
          </span>
        </Link>

        <Link href="/">
          <Button variant="ghost" size="xs" className="h-8 text-xs text-zinc-650 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900">
            Home
          </Button>
        </Link>
      </header>

      {/* Main Content Form Container */}
      <main id="main-content" className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10 animate-in fade-in duration-300">
        <div className="max-w-md w-full space-y-6">
          
          {/* Main Registration Card */}
          <div className="bg-white border border-zinc-200 dark:bg-[#09090b]/80 dark:border-zinc-800/80 rounded-lg p-7 shadow-xl dark:shadow-2xl relative overflow-hidden focus-within:border-indigo-500/30 transition-all">
            {/* Glowing border accent line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            {/* Header */}
            <div className="text-center space-y-1.5 mb-5">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800/80 mb-1">
                <Building2 className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Create Account</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Select your profile role to instantly join the platform.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              
              {/* Profile Role Selector */}
              <div className="space-y-2">
                <Label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">Select Operational Role *</Label>
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
                        className={`flex flex-col items-center justify-center p-2 rounded border text-center transition-all cursor-pointer outline-none ${
                          isSel
                            ? "border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                            : "border-zinc-250 hover:bg-zinc-50 text-zinc-500 hover:text-zinc-850 dark:border-zinc-800 dark:hover:bg-zinc-900/60 dark:text-zinc-550 dark:hover:text-zinc-300"
                        }`}
                      >
                        <Icon className="h-4 w-4 mb-1 shrink-0" />
                        <span className="text-[9px] font-semibold tracking-tight">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-name" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-550" />
                  <Input
                    id="reg-name"
                    placeholder="e.g. Dave Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-8.5 pl-9 text-xs rounded bg-white border-zinc-250 text-zinc-950 dark:bg-zinc-950/60 dark:border-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 focus-visible:ring-offset-0"
                    required
                    aria-required="true"
                    aria-label="Full name"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-email" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-550" />
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="you@portfolio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-8.5 pl-9 text-xs rounded bg-white border-zinc-250 text-zinc-950 dark:bg-zinc-950/60 dark:border-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 focus-visible:ring-offset-0"
                    required
                    aria-required="true"
                    aria-label="Email address"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-phone" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-550" />
                  <Input
                    id="reg-phone"
                    placeholder="e.g. +880 1712 345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-8.5 pl-9 text-xs rounded bg-white border-zinc-250 text-zinc-950 dark:bg-zinc-950/60 dark:border-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 focus-visible:ring-offset-0"
                    required
                    aria-required="true"
                    aria-label="Phone number"
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="reg-pass" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-550" />
                  <Input
                    id="reg-pass"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-8.5 pl-9 pr-9 text-xs rounded bg-white border-zinc-250 text-zinc-950 dark:bg-zinc-950/60 dark:border-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 focus-visible:ring-offset-0"
                    required
                    aria-required="true"
                    aria-label="Password (minimum 8 characters)"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-450 hover:text-zinc-650 dark:text-zinc-500 dark:hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Checkbox agreement */}
              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="reg-agree"
                  checked={agreeTerms}
                  onCheckedChange={(c) => setAgreeTerms(!!c)}
                  className="rounded border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-indigo-600 focus:ring-indigo-500/30 h-3.5 w-3.5"
                />
                <Label htmlFor="reg-agree" className="text-[10px] text-zinc-550 dark:text-zinc-400 cursor-pointer select-none leading-snug">
                  I agree to the <Link href="#terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</Link> and <Link href="#privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</Link>.
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-9 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded gap-1.5 shadow-sm shadow-indigo-600/10 mt-2"
              >
                {loading ? "Registering profile..." : "Register & Start Free"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-150 dark:border-zinc-900" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                <span className="bg-white dark:bg-[#09090b] px-2 text-zinc-400 dark:text-zinc-500">or continue with</span>
              </div>
            </div>

            {/* Google OAuth Option */}
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                toast.success("Redirecting to Google Account Setup Workspace...");
                localStorage.setItem("buildingos-user-role", role);
                setTimeout(() => router.push("/dashboard"), 1000);
              }}
              className="w-full h-9 text-xs rounded border border-zinc-250 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/60 dark:hover:text-white font-medium flex justify-center items-center gap-2"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.74 14.97.64 12 .64 7.7.64 3.99 3.11 2.18 6.71l3.66 2.84C6.71 6.95 9.14 5.04 12 5.04z"/>
                <path fill="#4285F4" d="M22.56 11.91c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#FBBC05" d="M5.84 13.75c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V6.71H2.18C1.43 8.19 1 9.86 1 11.66s.43 3.47 1.18 4.95l2.85-2.22.81-.64z"/>
                <path fill="#34A853" d="M12 22.64c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84c1.81 3.6 5.52 6.06 9.82 6.06z"/>
              </svg>
              Sign Up with Google
            </Button>

            {/* Alternates */}
            <div className="text-center text-xs pt-4 mt-5 border-t border-zinc-100 dark:border-zinc-900">
              <span className="text-zinc-500">Already registered? </span>
              <Link href="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-750 dark:hover:text-indigo-300 hover:underline">
                Sign in here
              </Link>
            </div>

          </div>

          {/* Bottom security */}
          <p className="text-center text-[10.5px] text-zinc-450 dark:text-zinc-650">
            Open platform registration • Instant tenant & manager onboarding setup
          </p>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center border-t border-zinc-200 bg-white dark:border-zinc-950 text-[10px] text-zinc-500 dark:text-zinc-650 dark:bg-black/40">
        <span>© 2026 BuildingOS Inc. • Privacy Policy • Terms & Conditions</span>
      </footer>
    </div>
  );
}
