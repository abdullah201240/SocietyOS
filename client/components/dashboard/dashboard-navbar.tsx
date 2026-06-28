"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  CreditCard,
  LogOut,
  Building,
  Menu,
  LayoutDashboard,
  Building2,
  Home,
  Users,
  AlertCircle,
  Wrench,
  Zap,
  Car,
  Fingerprint,
  UserCheck,
  BarChart3,
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
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface DashboardNavbarProps {
  currentOrg: string;
}

export function DashboardNavbar({ currentOrg }: DashboardNavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [notifications, setNotifications] = React.useState([
    { id: 1, text: "New complaint filed for Flat 302 (Water leak)", time: "5m ago", unread: true },
    { id: 2, text: "Maintenance scheduled for Passenger Elevator A", time: "1h ago", unread: true },
    { id: 3, text: "Payment of $185 received from Unit 1402", time: "2h ago", unread: false },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

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
    <header className="flex h-12 items-center justify-between -200 bg-white px-4 dark:bg-zinc-950">
      {/* Left side: Hamburger (mobile only) & Search & Org Name */}
      <div className="flex items-center gap-2">
        {/* Mobile Navigation Drawer */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-550 md:hidden hover:bg-zinc-50 dark:hover:bg-zinc-900 outline-none"
            >
              <Menu className="h-4.5 w-4.5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 -200 bg-zinc-50 dark:bg-zinc-950 p-0 flex flex-col h-full text-zinc-900 dark:text-zinc-50">
            <SheetHeader className="p-4 -200 text-left">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-white font-bold text-xs select-none">
                  S
                </div>
                <SheetTitle className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
                  SocietyOS
                </SheetTitle>
              </div>
              <SheetDescription className="text-[10px] text-zinc-500">v1.0 • Residential OS</SheetDescription>
            </SheetHeader>

            <nav className="flex-1 overflow-y-auto p-2 space-y-0.5 scrollbar-thin">
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
                      } else {
                        setMobileOpen(false);
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

            <div className="mt-auto -200 p-2 space-y-1 bg-zinc-100/50 dark:bg-zinc-950/40">
              <Link
                href="#help"
                className="flex items-center gap-2.5 rounded px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900"
              >
                <HelpCircle className="h-4 w-4 shrink-0 text-zinc-450" />
                <span>Documentation</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-455 select-none">
          <Building className="h-3.5 w-3.5" />
          <span className="max-w-[80px] sm:max-w-none truncate">{currentOrg}</span>
          <span>/</span>
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">Operations</span>
        </div>

        {/* Global Search Bar */}
        <div className="relative hidden sm:block max-w-xs w-64 ml-2">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search complaints, residents..."
            className="h-7.5 w-full rounded -200 bg-zinc-50 pl-8 pr-3 text-xs text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:indigo-500 focus:bg-white dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
        </div>
      </div>

      {/* Right side: Notifications & User Menu */}
      <div className="flex items-center gap-2">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 text-zinc-550 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors outline-none"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-indigo-600" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 -200 bg-white dark:bg-zinc-900 rounded shadow-md text-zinc-900 dark:text-zinc-50 p-1">
            <div className="flex items-center justify-between px-2 py-1.5">
              <DropdownMenuLabel className="text-[10px] uppercase font-bold text-zinc-455 tracking-wider p-0">
                Notifications ({unreadCount} unread)
              </DropdownMenuLabel>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>
            <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
            <div className="max-h-60 overflow-y-auto py-1">
              {notifications.map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  className="flex flex-col items-start gap-0.5 px-3 py-2 rounded text-left hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-pointer"
                >
                  <div className="flex items-start justify-between w-full gap-2">
                    <span className={`text-xs ${n.unread ? "font-semibold text-zinc-900 dark:text-white" : "text-zinc-650 dark:text-zinc-400"}`}>
                      {n.text}
                    </span>
                    {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0 mt-1" />}
                  </div>
                  <span className="text-[9px] text-zinc-400">{n.time}</span>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded px-1.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors outline-none select-none">
              <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-[10px] shadow-sm">
                JD
              </div>
              <div className="hidden md:flex flex-col items-start text-left">
                <span className="text-xs font-semibold leading-none text-zinc-900 dark:text-white">John Doe</span>
                <span className="text-[9px] leading-none text-zinc-400 mt-0.5">Admin Manager</span>
              </div>
              <ChevronDown className="h-3 w-3 text-zinc-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 -200 bg-white dark:bg-zinc-900 rounded shadow-md text-zinc-900 dark:text-zinc-50 p-1">
            <div className="flex flex-col px-3 py-2 text-left">
              <span className="text-xs font-semibold text-zinc-900 dark:text-white">John Doe</span>
              <span className="text-[10px] text-zinc-400 mt-0.5">john.doe@societyos.com</span>
            </div>
            <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
            <DropdownMenuItem className="text-xs px-2 py-1.5 rounded cursor-pointer flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300">
              <User className="h-3.5 w-3.5 text-zinc-450" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs px-2 py-1.5 rounded cursor-pointer flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300">
              <Settings className="h-3.5 w-3.5 text-zinc-450" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs px-2 py-1.5 rounded cursor-pointer flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300">
              <CreditCard className="h-3.5 w-3.5 text-zinc-450" />
              <span>Billing & Plan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
            <DropdownMenuItem
              onClick={() => alert("Logging out of SocietyOS...")}
              className="text-xs px-2 py-1.5 rounded cursor-pointer flex items-center gap-2 text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-955/20 font-medium"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
