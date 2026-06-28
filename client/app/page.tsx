import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/nav-bar";
import { DashboardMockup } from "@/components/dashboard-mockup";
import { ProblemSection } from "@/components/problem-section";
import { DashboardPreviewSection } from "@/components/dashboard-preview-section";
import { FeaturesSection } from "@/components/features-section";
import { WorkflowSection } from "@/components/workflow-section";
import { AnalyticsSection } from "@/components/analytics-section";
import { MobileExperienceSection } from "@/components/mobile-experience-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white dark:bg-black font-sans selection:bg-zinc-100 dark:selection:bg-zinc-800">
      {/* Background patterns inspired by Vercel & Linear */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] opacity-60" />
      
      {/* Top Navbar */}
      <NavBar />

      {/* Hero Section Container */}
      <main className="flex-1 flex items-center justify-center py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
            
            {/* Left Side: Headline, Subtitle, CTA buttons, Features List */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left animate-in fade-in duration-700">
              
              {/* Modern subtle badge */}
              <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                Operating System for Gated Communities
              </div>

              {/* Headline */}
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                Run Your Entire Society <br />
                <span className="text-zinc-500 dark:text-zinc-400">From One Platform</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
                Manage buildings, residents, complaints, billing, parking, maintenance, and security operations in one modern platform. Built for residential towers, apartment societies, and estate managers.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Button size="lg" className="h-10 px-5 gap-1.5" asChild>
                  <Link href="#book-demo">
                    Book Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-10 px-5" asChild>
                  <Link href="#start-trial">Start Free Trial</Link>
                </Button>
              </div>

              {/* Highlights Checklist */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4 pt-6">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <CheckCircle2 className="h-4 w-4 text-zinc-800 dark:text-zinc-200 shrink-0" />
                  99.9% Operational Uptime
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <ShieldCheck className="h-4 w-4 text-zinc-800 dark:text-zinc-200 shrink-0" />
                  Enterprise-grade Security
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <Activity className="h-4 w-4 text-zinc-800 dark:text-zinc-200 shrink-0" />
                  Real-time Notifications
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <Users className="h-4 w-4 text-zinc-800 dark:text-zinc-200 shrink-0" />
                  10-min Resident Setup
                </div>
              </div>
            </div>

            {/* Right Side: Interactive Dashboard Preview Mockup */}
            <div className="lg:col-span-7 w-full flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
              <div className="w-full max-w-2xl relative">
                <DashboardMockup />
              </div>
            </div>

          </div>
        </div>
      </main>
      
      {/* Operational Challenges Section */}
      <ProblemSection />

      {/* Centralized Console Preview Section */}
      <DashboardPreviewSection />

      {/* Core Features Section */}
      <FeaturesSection />

      {/* Operational Workflow Section */}
      <WorkflowSection />

      {/* Analytics & B2B Reporting Section */}
      <AnalyticsSection />

      {/* Mobile Resident Experience Section */}
      <MobileExperienceSection />

      {/* Testimonials & Trust Metrics Section */}
      <TestimonialsSection />

      {/* SocietyOS Pricing Section */}
      <PricingSection />

      {/* Frequently Asked Questions Accordion Section */}
      <FAQSection />

      {/* Final Conversion CTA Section */}
      <CTASection />

      {/* Enterprise Multi-Column Footer Section */}
      <Footer />
    </div>
  );
}
