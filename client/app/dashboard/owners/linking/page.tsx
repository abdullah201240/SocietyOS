"use client";

import * as React from "react";
import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Contact,
  Building,
  ChevronRight,
  ChevronDown,
  Search,
  Plus,
  Trash2,
  Share2,
} from "lucide-react";

interface OwnerSummary {
  id: string;
  name: string;
  flatsOwned: number;
}

interface TreeItem {
  id: string;
  label: string;
  type: "building" | "flat";
  children?: TreeItem[];
}

export default function PropertyLinkingPage() {
  const orgs = ["Grandview Towers", "Pine Crest Society", "Meadow View Estate"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  // Mock list of owners
  const ownersList: OwnerSummary[] = [
    { id: "OWN-201", name: "Arthur Pendragon", flatsOwned: 12 },
    { id: "OWN-202", name: "Guinevere Slytherin", flatsOwned: 4 },
    { id: "OWN-203", name: "Uther Lightbringer", flatsOwned: 8 }
  ];

  const [selectedOwner, setSelectedOwner] = React.useState<OwnerSummary>(ownersList[0]);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Middle panel tree state
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({
    "bld-1a": true,
    "bld-1b": false,
    "bld-2a": false
  });

  const [selectedPropertyIds, setSelectedPropertyIds] = React.useState<string[]>([]);

  const treeData: TreeItem[] = [
    {
      id: "bld-1a",
      label: "Tower Alpha",
      type: "building",
      children: [
        { id: "flat-101", label: "Flat 101", type: "flat" },
        { id: "flat-102", label: "Flat 102", type: "flat" },
        { id: "flat-201", label: "Flat 201", type: "flat" },
        { id: "flat-1402", label: "Flat 1402", type: "flat" }
      ]
    },
    {
      id: "bld-1b",
      label: "Tower Beta",
      type: "building",
      children: [
        { id: "flat-301", label: "Flat 301", type: "flat" },
        { id: "flat-302", label: "Flat 302", type: "flat" }
      ]
    },
    {
      id: "bld-2a",
      label: "Oak Block",
      type: "building",
      children: [
        { id: "flat-501", label: "Flat 501", type: "flat" },
        { id: "flat-502", label: "Flat 502", type: "flat" }
      ]
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleSelectProperty = (id: string) => {
    setSelectedPropertyIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Actions
  const handleLinkProperties = () => {
    if (selectedPropertyIds.length === 0) {
      toast.warning("Please select properties from the tree view to link.");
      return;
    }
    toast.success(`Successfully linked ${selectedPropertyIds.length} properties to ${selectedOwner.name}!`);
    setSelectedPropertyIds([]);
  };

  const handleTransfer = () => {
    if (selectedPropertyIds.length === 0) {
      toast.warning("Select properties to transfer.");
      return;
    }
    toast.success(`Ownership transferred successfully.`);
    setSelectedPropertyIds([]);
  };

  const handleRemove = () => {
    if (selectedPropertyIds.length === 0) {
      toast.warning("Select properties to unlink.");
      return;
    }
    toast.success(`Removed ownership link.`);
    setSelectedPropertyIds([]);
  };

  // Tree nodes render helper
  const renderTreeNode = (node: TreeItem) => {
    const isExpanded = !!expandedItems[node.id];
    const isSelected = selectedPropertyIds.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="space-y-1 pl-3.5 select-none">
        <div className="flex items-center gap-2 py-1 text-xs">
          {hasChildren ? (
            <button onClick={() => toggleExpand(node.id)} className="text-zinc-400 hover:text-zinc-600 outline-none">
              {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </button>
          ) : (
            <div className="w-3" />
          )}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleToggleSelectProperty(node.id)}
            className="rounded border-zinc-200 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
          />
          <span className={`font-semibold cursor-pointer ${
            node.type === "building"
              ? "text-zinc-900 dark:text-white"
              : "text-zinc-550 dark:text-zinc-400 font-medium"
          }`} onClick={() => handleToggleSelectProperty(node.id)}>
            {node.label}
          </span>
          <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider scale-95 origin-left">
            {node.type}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div className="border-l border-zinc-200/60 dark:border-zinc-800 pl-1.5 space-y-1 ml-1.5">
            {node.children!.map((child) => renderTreeNode(child))}
          </div>
        )}
      </div>
    );
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Property Linking
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Link and manage owner profiles to societies, buildings, and individual flats.
              </p>
            </div>
          </div>

          {/* Three Panel Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)] overflow-hidden">
            
            {/* Panel 1: Owners List */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
              <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900">
                <CardTitle className="text-xs font-bold uppercase tracking-wider">Onboarded Owners</CardTitle>
                <CardDescription className="text-[10px]">Select an owner to link properties to.</CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-2.5 top-2 h-3 w-3 text-zinc-400" />
                  <Input
                    placeholder="Search owners..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-7.5 text-xs pl-8 rounded-sm"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-2 space-y-1 overflow-y-auto flex-1 scrollbar-thin">
                {ownersList
                  .filter((o) => o.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((owner) => (
                    <div
                      key={owner.id}
                      onClick={() => setSelectedOwner(owner)}
                      className={`flex justify-between items-center p-2 rounded cursor-pointer transition-colors ${
                        selectedOwner.id === owner.id
                          ? "bg-zinc-100 dark:bg-zinc-900 font-semibold text-zinc-900 dark:text-white"
                          : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50 text-zinc-650"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <Contact className="h-3.5 w-3.5 text-zinc-400" />
                        <span>{owner.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-[9px] font-bold rounded-sm bg-zinc-200/50 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {owner.flatsOwned} Flats
                      </Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Panel 2: Societies/Buildings Tree View */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
              <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900">
                <CardTitle className="text-xs font-bold uppercase tracking-wider">Properties Tree Map</CardTitle>
                <CardDescription className="text-[10px]">Select building blocks or individual flats.</CardDescription>
              </CardHeader>
              <CardContent className="p-3 space-y-2 overflow-y-auto flex-1 scrollbar-thin">
                {treeData.map((node) => renderTreeNode(node))}
              </CardContent>
            </Card>

            {/* Panel 3: Selected Properties Action Center */}
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950 flex flex-col overflow-hidden">
              <CardHeader className="p-3.5 border-b border-zinc-100 dark:border-zinc-900">
                <CardTitle className="text-xs font-bold uppercase tracking-wider">Linking Action Center</CardTitle>
                <CardDescription className="text-[10px]">Configure links for: {selectedOwner.name}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 flex-1 flex flex-col justify-between overflow-y-auto scrollbar-thin">
                
                {/* Selected Summary list */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Selected Properties ({selectedPropertyIds.length})</span>
                  <div className="space-y-2">
                    {selectedPropertyIds.map((id) => (
                      <div key={id} className="flex justify-between items-center p-2 rounded border border-zinc-150 bg-zinc-50/50 dark:border-zinc-900 text-xs">
                        <span className="font-semibold text-zinc-850 dark:text-zinc-255 capitalize">{id.replace("-", " ")}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleSelectProperty(id)}
                          className="h-6 w-6 text-zinc-400 hover:text-rose-600 rounded-sm"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {selectedPropertyIds.length === 0 && (
                      <span className="text-[11px] text-zinc-400 block italic">Check items from the tree view diagram to execute linking actions.</span>
                    )}
                  </div>
                </div>

                {/* Operations Buttons */}
                <div className="space-y-2 border-t border-zinc-100 pt-4 dark:border-zinc-900">
                  <Button
                    onClick={handleLinkProperties}
                    className="w-full h-8.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm font-semibold gap-1.5"
                  >
                    <Plus className="h-4 w-4" /> Link to {selectedOwner.name}
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={handleTransfer}
                      variant="outline"
                      className="h-8.5 text-xs rounded-sm border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 gap-1"
                    >
                      <Share2 className="h-3 w-3" /> Transfer
                    </Button>
                    <Button
                      onClick={handleRemove}
                      variant="outline"
                      className="h-8.5 text-xs text-rose-600 border-rose-100 hover:bg-rose-50 dark:border-rose-950/20 rounded-sm gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Remove Link
                    </Button>
                  </div>
                </div>

              </CardContent>
            </Card>

          </div>

        </main>
      </div>

    </div>
  );
}
