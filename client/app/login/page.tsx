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
  Mail,
  Lock,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful! Welcome back.");
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    }, 1200);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-zinc-50 text-zinc-900 dark:bg-[#030303] dark:text-zinc-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-white font-sans transition-colors duration-200">
      <Toaster position="top-right" />
      
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f2_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f2_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f0f11_1px,transparent_1px),linear-gradient(to_bottom,#0f0f11_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Ambient glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[140px]" />
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

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-6">
          
          {/* Main Card */}
          <div className="bg-white border border-zinc-200 dark:bg-[#09090b]/80 dark:border-zinc-800/80 rounded-lg p-7 shadow-xl dark:shadow-2xl relative overflow-hidden focus-within:border-indigo-500/30 transition-all">
            {/* Glowing border accent */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            {/* Header */}
            <div className="text-center space-y-2 mb-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800/80 mb-1">
                <Building2 className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Welcome Back</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Log in to manage your building complex ledgers.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="l-email" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-550" />
                  <Input
                    id="l-email"
                    type="email"
                    placeholder="you@portfolio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-8.5 pl-9 text-xs rounded bg-white border-zinc-250 text-zinc-950 dark:bg-zinc-950/60 dark:border-zinc-850 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 focus-visible:ring-offset-0"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="l-pass" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Password</Label>
                  <Link href="#forgot" className="text-[10.5px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-550" />
                  <Input
                    id="l-pass"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-8.5 pl-9 pr-9 text-xs rounded bg-white border-zinc-250 text-zinc-950 dark:bg-zinc-950/60 dark:border-zinc-850 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 focus-visible:ring-offset-0"
                    required
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

              {/* Remember check */}
              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="l-rem"
                  checked={rememberMe}
                  onCheckedChange={(c) => setRememberMe(!!c)}
                  className="rounded border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-indigo-600 focus:ring-indigo-500/30 h-3.5 w-3.5"
                />
                <Label htmlFor="l-rem" className="text-[11px] text-zinc-550 dark:text-zinc-400 cursor-pointer select-none">Keep me signed in on this device</Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-9 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded gap-1.5 shadow-sm shadow-indigo-600/10 mt-2"
              >
                {loading ? "Authenticating..." : "Sign In to Dashboard"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </form>

            {/* Alternative SignUp */}
            <div className="text-center text-xs pt-4 mt-5 border-t border-zinc-100 dark:border-zinc-900">
              <span className="text-zinc-500">Don't have an account yet? </span>
              <Link href="/signup" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-750 dark:hover:text-indigo-300 hover:underline">
                Sign up here (Open Access)
              </Link>
            </div>

          </div>

          {/* Bottom security */}
          <p className="text-center text-[10.5px] text-zinc-450 dark:text-zinc-600">
            Protected by SSL Enterprise Security • Authorized credentials access only
          </p>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-4 text-center border-t border-zinc-200 bg-white dark:border-zinc-950 text-[10px] text-zinc-500 dark:text-zinc-650 dark:bg-black/40">
        <span>© 2026 BuildingOS Inc. • Privacy Policy • Terms & Conditions</span>
      </footer>
    </div>
  );
}
