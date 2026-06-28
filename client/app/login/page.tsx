"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Sparkles,
  Mail,
  Lock,
  CheckCircle,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Submit", { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-zinc-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)]" />

      <div className="relative min-h-screen flex">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-[45%] relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-12 flex-col justify-between">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          {/* Logo */}
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm  group-hover:bg-white/20 transition-all">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">SocietyOS</span>
                <div className="text-[10px] text-indigo-200 font-medium -mt-0.5">Community Platform</div>
              </div>
            </Link>
          </div>

          {/* Main content */}
          <div className="relative z-10 space-y-8 max-w-md">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm  px-4 py-1.5 text-sm text-white/90">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Trusted by 500+ Communities</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white leading-tight">
                Manage Your Community
                <br />
                <span className="text-indigo-200">Like Never Before</span>
              </h1>
              
              <p className="text-base text-indigo-100/80 leading-relaxed">
                The modern operating system for residential communities. Streamline operations, enhance security, and improve resident satisfaction.
              </p>
            </div>

            {/* Feature cards */}
            <div className="space-y-3">
              {[
                { icon: Shield, text: "Enterprise-grade security" },
                { icon: CheckCircle, text: "99.9% uptime guaranteed" },
                { icon: Sparkles, text: "AI-powered insights" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 ">
                  <feature.icon className="h-5 w-5 text-indigo-200" />
                  <span className="text-sm text-white font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10 flex items-center gap-6 text-xs text-indigo-200/60">
            <span>© 2026 SocietyOS</span>
            <span>•</span>
            <Link href="#privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="#terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">SocietyOS</span>
              </Link>
            </div>

            {/* Login card */}
            <div className="relative">
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10" />
              
              <div className="relative bg-white dark:bg-zinc-900 rounded-2xl -200 shadow-xl p-8 space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    Welcome back
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Enter your credentials to access your dashboard
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  {/* Email field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Email address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 pl-10 rounded-lg-200 focus:indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:bg-zinc-800/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Password
                      </Label>
                      <Link
                        href="#forgot"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 pl-10 pr-10 rounded-lg-200 focus:indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:bg-zinc-800/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(!!checked)}
                      className="rounded-300 text-indigo-600 focus:ring-indigo-500 data-[state=checked]:bg-indigo-600 data-[state=checked]:indigo-600"
                    />
                    <Label htmlFor="remember" className="text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer">
                      Keep me signed in for 30 days
                    </Label>
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full h-11 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all gap-2"
                  >
                    Sign in to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full -200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white dark:bg-zinc-900 px-3 text-zinc-500">or continue with</span>
                  </div>
                </div>

                {/* Social login */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-10 rounded-lg-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="h-10 rounded-lg-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.614-.254.817-1.182 2.361-2.025 4.126-2.025 1.765 0 3.309.843 4.126 2.026 1.606-.068 2.614.254 2.614.254.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </Button>
                </div>

                {/* Sign up link */}
                <div className="text-center text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Don't have an account? </span>
                  <Link href="#signup" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                    Request a demo
                  </Link>
                </div>
              </div>
            </div>

            {/* Help text */}
            <div className="mt-6 text-center">
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Need help?{" "}
                <Link href="#support" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium transition-colors">
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
