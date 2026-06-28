"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
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
  Wallet,
  ChevronLeft,
  ChevronRight,
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
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("buildingos-sidebar-collapsed");
    if (saved === "true") {
      setIsCollapsed(true);
    }
  }, []);

  const toggleCollapse = () => {
    const nextVal = !isCollapsed;
    setIsCollapsed(nextVal);
    localStorage.setItem("buildingos-sidebar-collapsed", String(nextVal));
    window.dispatchEvent(new Event("sidebar-toggle"));
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Buildings", href: "/dashboard/buildings", icon: Building },
    { name: "Flats", href: "/dashboard/flats", icon: Home },
    { name: "Residents", href: "/dashboard/residents", icon: Users },
    { name: "Complaints", href: "/dashboard/complaints", icon: AlertCircle, badge: "12" },
    { name: "Maintenance", href: "/dashboard/maintenance", icon: Wrench, badge: "8" },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Payments", href: "/dashboard/payments", icon: Wallet },
    { name: "Utilities", href: "/dashboard/utilities", icon: Zap },
    { name: "Parking", href: "/dashboard/parking", icon: Car },
    { name: "Visitors", href: "/dashboard/visitors", icon: Fingerprint },
    { name: "Staff", href: "/dashboard/staff", icon: UserCheck },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className={`hidden md:flex h-full flex-col border-r border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-all duration-200 ${
      isCollapsed ? "w-14" : "w-60"
    }`}>
      {/* Header / Logo */}
      <div className={`flex h-12 items-center border-b border-zinc-200 dark:border-zinc-900 px-3 ${
        isCollapsed ? "justify-center" : "justify-between"
      }`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden animate-in fade-in duration-200">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-indigo-600 text-white font-bold text-xs select-none">
              B
            </div>
            <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white truncate">
              BuildingOS
            </span>
            <span className="rounded bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 text-[9px] font-semibold text-zinc-650 dark:text-zinc-400 uppercase select-none shrink-0">
              v1.0
            </span>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={toggleCollapse}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className="flex h-6 w-6 items-center justify-center rounded text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 shrink-0 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Building Switcher */}
      <div className={`p-3 border-b border-zinc-200 dark:border-zinc-900 ${isCollapsed ? "flex justify-center" : ""}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isCollapsed ? (
              <button 
                title={currentOrg}
                className="flex h-8 w-8 items-center justify-center rounded bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors border border-zinc-200 dark:border-zinc-800 shadow-sm outline-none shrink-0"
              >
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  {currentOrg[0]}
                </span>
              </button>
            ) : (
              <button className="flex w-full items-center justify-between rounded bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors border border-zinc-200 dark:border-zinc-800 shadow-sm outline-none">
                <span className="truncate">{currentOrg}</span>
                <ChevronsUpDown className="ml-1 h-3.5 w-3.5 shrink-0 text-zinc-400" />
              </button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isCollapsed ? "center" : "start"} className="w-52 border border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-900 rounded shadow-md text-zinc-900 dark:text-zinc-50 p-1">
            <DropdownMenuLabel className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider px-2 py-1">
              Select Building
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
              <span>Add new building</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation Links */}
      <nav className={`flex-1 overflow-y-auto p-2 space-y-0.5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 ${
        isCollapsed ? "flex flex-col items-center" : ""
      }`}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/dashboard");
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center justify-between rounded transition-colors ${
                isCollapsed ? "h-8 w-8 justify-center p-0" : "px-3 py-1.5 text-xs font-medium w-full"
              } ${
                isActive
                  ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400 dark:text-zinc-500"}`} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </div>
              {!isCollapsed && item.badge && (
                <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold tracking-tight ${
                  isActive 
                    ? "bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-205"
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
      <div className={`mt-auto border-t border-zinc-200 p-2 space-y-1 bg-zinc-100/50 dark:border-zinc-900 dark:bg-zinc-950/40 ${
        isCollapsed ? "flex flex-col items-center" : ""
      }`}>
        <Link
          href="#help"
          title={isCollapsed ? "Documentation" : undefined}
          className={`flex items-center gap-2.5 rounded text-xs font-medium text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200 ${
            isCollapsed ? "h-8 w-8 justify-center p-0" : "px-3 py-1.5 w-full"
          }`}
        >
          <HelpCircle className="h-4 w-4 shrink-0 text-zinc-400" />
          {!isCollapsed && <span>Documentation</span>}
        </Link>
        <button
          onClick={() => alert("Logging out of BuildingOS...")}
          title={isCollapsed ? "Logout" : undefined}
          className={`flex items-center gap-2.5 rounded text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-700 ${
            isCollapsed ? "h-8 w-8 justify-center p-0" : "px-3 py-1.5 w-full"
          }`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
