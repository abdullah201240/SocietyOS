"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Building,
  Home,
  Users,
  AlertCircle,
  Wrench,
  CreditCard,
  Zap,
  Car,
  Fingerprint,
  UserCheck,
  BarChart3,
  Settings,
  ChevronsUpDown,
  Plus,
  LogOut,
  HelpCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardSidebarProps {
  currentOrg: string;
  onOrgChange: (org: string) => void;
  orgs: string[];
}

export function DashboardSidebar({ currentOrg, onOrgChange, orgs }: DashboardSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Societies", href: "/dashboard/societies", icon: Building2 },
    { name: "Buildings", href: "/dashboard/buildings", icon: Building },
    { name: "Flats", href: "/dashboard/flats", icon: Home },
    { name: "Residents", href: "/dashboard/residents", icon: Users },
    { name: "Complaints", href: "/dashboard/complaints", icon: AlertCircle, badge: "12" },
    { name: "Maintenance", href: "/dashboard/maintenance", icon: Wrench, badge: "8" },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Utilities", href: "/dashboard/utilities", icon: Zap },
    { name: "Parking", href: "/dashboard/parking", icon: Car },
    { name: "Visitors", href: "/dashboard/visitors", icon: Fingerprint },
    { name: "Staff", href: "/dashboard/staff", icon: UserCheck },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="hidden md:flex h-full w-60 flex-col border-r border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-850 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Header / Logo */}
      <div className="flex h-12 items-center px-4 border-b border-zinc-200 dark:border-zinc-850">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-white font-bold text-xs select-none">
            S
          </div>
          <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">SocietyOS</span>
          <span className="rounded bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 text-[9px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase select-none">
            v1.0
          </span>
        </div>
      </div>

      {/* Organization Switcher */}
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-850">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center justify-between rounded bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors border border-zinc-200 dark:border-zinc-800 shadow-sm outline-none">
              <span className="truncate">{currentOrg}</span>
              <ChevronsUpDown className="ml-1 h-3.5 w-3.5 shrink-0 text-zinc-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52 border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded shadow-md text-zinc-900 dark:text-zinc-50 p-1">
            <DropdownMenuLabel className="text-[10px] uppercase font-bold text-zinc-455 tracking-wider px-2 py-1">
              Select Community
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
            {orgs.map((org) => (
              <DropdownMenuItem
                key={org}
                onClick={() => onOrgChange(org)}
                className={`text-xs px-2 py-1.5 rounded cursor-pointer ${
                  org === currentOrg
                    ? "bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-white"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {org}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
            <DropdownMenuItem className="text-xs px-2 py-1.5 rounded cursor-pointer flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-850 font-medium">
              <Plus className="h-3.5 w-3.5" />
              <span>Add new society</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/dashboard");
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => {
                if (
                  item.href !== "/dashboard" &&
                  item.href !== "/dashboard/societies" &&
                  item.href !== "/dashboard/buildings" &&
                  item.href !== "/dashboard/flats" &&
                  item.href !== "/dashboard/residents" &&
                  item.href !== "/dashboard/complaints" &&
                  item.href !== "/dashboard/billing" &&
                  item.href !== "/dashboard/utilities" &&
                  item.href !== "/dashboard/parking" &&
                  item.href !== "/dashboard/visitors" &&
                  item.href !== "/dashboard/staff" &&
                  item.href !== "/dashboard/analytics" &&
                  item.href !== "/dashboard/settings"
                ) {
                  e.preventDefault();
                }
              }}
              className={`flex items-center justify-between rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                  : "text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-450 dark:text-zinc-500"}`} />
                <span className="truncate">{item.name}</span>
              </div>
              {item.badge && (
                <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold tracking-tight ${
                  isActive 
                    ? "bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Section */}
      <div className="mt-auto border-t border-zinc-200 dark:border-zinc-850 p-2 space-y-1 bg-zinc-100/50 dark:bg-zinc-950/40">
        <Link
          href="#help"
          className="flex items-center gap-2.5 rounded px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
        >
          <HelpCircle className="h-4 w-4 shrink-0 text-zinc-450" />
          <span>Documentation</span>
        </Link>
        <button
          onClick={() => alert("Logging out of SocietyOS...")}
          className="flex w-full items-center gap-2.5 rounded px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-700"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
