"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  FileText,
  FileCheck,
  FileSignature,
  Upload,
  Search,
  Filter,
  Plus,
  AlertCircle,
  Eye,
  EyeOff,
  User,
  ExternalLink,
  Download,
} from "lucide-react";
import { useDocumentRecords, documentsApi } from "@/lib/api";
import { validateData, documentRecordSchema } from "@/lib/validations";

export default function DocumentsPage() {
  const orgs = ["Grandview Towers", "Meadow View Complex", "Parkside Residences"];
  const [currentOrg, setCurrentOrg] = React.useState(orgs[0]);

  const { documents: docsFromApi, loading, error, refetch } = useDocumentRecords();
  const [documents, setDocuments] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (docsFromApi) setDocuments(docsFromApi);
  }, [docsFromApi]);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterType, setFilterType] = React.useState("All");
  const [filterStatus, setFilterStatus] = React.useState("All");

  // Document Upload Dialog State
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    title: "",
    residentName: "",
    flatNumber: "",
    documentType: "Lease" as "Lease" | "ID Proof" | "NID" | "Utility Bill",
    expiresAt: ""
  });

  // Handle Document Upload Submissions
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateData(documentRecordSchema, form);
    if (!validation.success) {
      toast.error(validation.error);
      return;
    }

    const payload = {
      ...form,
      buildingName: currentOrg,
      status: "Pending" as any,
      uploadedAt: new Date().toISOString(),
      downloadUrl: "#",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const response = await documentsApi.create(payload);
    if (response.success) {
      toast.success(`Document "${form.title}" registered successfully!`);
      setUploadOpen(false);
      setForm({ title: "", residentName: "", flatNumber: "", documentType: "Lease", expiresAt: "" });
      refetch();
    } else {
      toast.error(response.error || "Failed to register document");
    }
  };

  // Toggle Document status
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus: "Verified" | "Pending" | "Missing" = 
      currentStatus === "Pending" ? "Verified" : 
      currentStatus === "Verified" ? "Missing" : "Pending";

    const response = await documentsApi.verify(id, nextStatus);
    if (response.success) {
      toast.success(`Document marked as ${nextStatus}`);
      refetch();
    } else {
      toast.error(response.error || "Failed to verify document");
    }
  };

  // CSV registry download
  const handleExportCSV = () => {
    if (documents.length === 0) {
      toast.error("No documents to export.");
      return;
    }
    const headers = ["ID", "Title", "Resident Name", "Flat Unit", "Building", "Type", "Status", "Uploaded At", "Expires At"];
    const rows = documents.map(d => [
      d.id,
      `"${d.title.replace(/"/g, '""')}"`,
      `"${d.residentName.replace(/"/g, '""')}"`,
      `"${d.flatNumber}"`,
      `"${d.buildingName}"`,
      `"${d.documentType}"`,
      `"${d.status}"`,
      `"${d.uploadedAt}"`,
      `"${d.expiresAt || ""}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `documents_vault_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Document vault ledger downloaded.");
  };

  // Filter vault
  const filteredDocs = documents.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.residentName.toLowerCase().includes(searchQuery.toLowerCase()) || d.flatNumber.includes(searchQuery);
    const matchesType = filterType === "All" || d.documentType === filterType;
    const matchesStatus = filterStatus === "All" || d.status === filterStatus;
    const matchesBuilding = d.buildingName === currentOrg;
    return matchesSearch && matchesType && matchesStatus && matchesBuilding;
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 text-zinc-900 dark:bg-zinc-900/30 dark:text-zinc-100 font-sans selection:bg-zinc-200">
      
      <DashboardSidebar
        currentOrg={currentOrg}
        orgs={orgs}
        onOrgChange={(org) => setCurrentOrg(org)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar currentOrg={currentOrg} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-0.5">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Compliance Document Vault
              </h1>
              <p className="text-[11px] text-zinc-550 dark:text-zinc-400">
                Audit resident lease agreements, identity validations, and check compliance verification logs.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="xs"
                onClick={handleExportCSV}
                className="h-8 text-[11px] font-semibold border-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-350 shadow-sm gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Vault Ledger</span>
              </Button>

              <Button
                size="xs"
                onClick={() => setUploadOpen(true)}
                className="h-8 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-1 cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Document</span>
              </Button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded dark:bg-emerald-950/30">
                  <FileCheck className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-450 tracking-wider block">Verified Contracts</span>
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {documents.filter(d => d.status === "Verified").length} verified
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded dark:bg-amber-950/30">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-455 tracking-wider block">Pending Verification</span>
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {documents.filter(d => d.status === "Pending").length} review pending
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-rose-50 rounded dark:bg-rose-955/20">
                  <AlertCircle className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-zinc-455 tracking-wider block">Missing Document Audits</span>
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {documents.filter(d => d.status === "Missing").length} profiles missing
                  </span>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Filtering bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-450" />
              <Input
                type="text"
                placeholder="Search by Title, Flat or Resident..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-sm pl-8.5 text-xs outline-none bg-white dark:bg-zinc-950 focus:border-indigo-500 border-zinc-200"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
              <div className="flex items-center gap-1.5">
                <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Doc Type</Label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="h-8 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-950 outline-none"
                >
                  <option value="All">All types</option>
                  <option value="Lease">Lease Contracts</option>
                  <option value="ID Proof">Identity Proofs</option>
                  <option value="NID">National ID</option>
                  <option value="Utility Bill">Utility Bills</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Status</Label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="h-8 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-950 outline-none"
                >
                  <option value="All">All states</option>
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Missing">Missing / Flagged</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table registry */}
          <Card className="rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-850 dark:bg-zinc-950">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-indigo-650 mb-2" />
                  <span className="text-xs font-semibold">Loading document vault...</span>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-rose-500">
                  <AlertCircle className="h-8 w-8 mb-2" />
                  <span className="text-xs font-semibold">{error}</span>
                  <Button size="xs" variant="outline" className="mt-3 text-[10px] h-7" onClick={refetch}>Retry</Button>
                </div>
              ) : filteredDocs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                  <FileText className="h-8 w-8 text-zinc-300 mb-2" />
                  <span className="text-xs font-semibold">No records matches criteria</span>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-zinc-50/50 dark:bg-zinc-950/20">
                    <TableRow>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Title / ID</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Resident Unit</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider h-9">Category</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Upload Date</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Expiration Date</TableHead>
                      <TableHead className="text-[9.5px] uppercase font-bold text-zinc-500 tracking-wider text-center h-9">Verification</TableHead>
                      <TableHead className="w-28 h-9" />
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-zinc-250 dark:divide-zinc-850">
                    {filteredDocs.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell className="py-2.5">
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-zinc-900 dark:text-white max-w-[200px] truncate" title={d.title}>
                              {d.title}
                            </span>
                            <span className="text-[9px] text-zinc-400 font-mono">{d.id}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Flat {d.flatNumber}</span>
                            <span className="text-[9.5px] text-zinc-500">{d.residentName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-medium py-2.5">{d.documentType}</TableCell>
                        <TableCell className="text-center text-xs text-zinc-550 dark:text-zinc-400 py-2.5">
                          {d.uploadedAt ? new Date(d.uploadedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—"}
                        </TableCell>
                        <TableCell className="text-center text-xs text-zinc-550 dark:text-zinc-400 py-2.5">
                          {d.expiresAt ? (
                            <span className={new Date(d.expiresAt).getTime() < Date.now() ? "text-rose-500 font-bold" : "text-zinc-550 dark:text-zinc-450"}>
                              {new Date(d.expiresAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                          ) : "No Expiry"}
                        </TableCell>
                        <TableCell className="text-center py-2.5">
                          <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[8.5px] font-bold cursor-pointer select-none ${
                            d.status === "Verified"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450"
                              : d.status === "Pending"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-450"
                              : "bg-rose-50 text-rose-700 dark:bg-rose-955/20 dark:text-rose-455"
                          }`}
                          onClick={() => handleToggleStatus(d.id, d.status)}
                          title="Click to toggle verification status"
                          >
                            {d.status}
                          </span>
                        </TableCell>
                        <TableCell className="py-2.5 text-right pr-4">
                          {d.uploadedAt && (
                            <Button
                              size="xs"
                              variant="outline"
                              onClick={() => toast.success(`Initiating download for document payload "${d.id}"`)}
                              className="h-7 text-[10px] font-semibold border-zinc-200 text-zinc-700 dark:text-zinc-350 cursor-pointer shadow-sm gap-1 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span>Download</span>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

        </main>
      </div>

      {/* DOCUMENT VAULT UPLOAD DIALOG */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white dark:bg-zinc-950 p-6 rounded-md">
          <form onSubmit={handleUpload}>
            <DialogHeader>
              <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Register Lease / ID Document</DialogTitle>
              <DialogDescription className="text-xs text-zinc-500">Record verification compliance details for resident file audits.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-3.5 py-4">
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="d-title" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Title</Label>
                <Input
                  id="d-title"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. NID Copy - Flat 202"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="d-resident" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Resident</Label>
                <Input
                  id="d-resident"
                  required
                  value={form.residentName}
                  onChange={(e) => setForm({ ...form, residentName: e.target.value })}
                  placeholder="Resident full name"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="d-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat Unit</Label>
                <Input
                  id="d-flat"
                  required
                  value={form.flatNumber}
                  onChange={(e) => setForm({ ...form, flatNumber: e.target.value })}
                  placeholder="e.g. 202"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="d-type" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Type</Label>
                <select
                  id="d-type"
                  value={form.documentType}
                  onChange={(e) => setForm({ ...form, documentType: e.target.value as any })}
                  className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                >
                  <option value="Lease">Lease Agreement</option>
                  <option value="ID Proof">Identity Proof</option>
                  <option value="NID">National ID (NID)</option>
                  <option value="Utility Bill">Utility Bill copy</option>
                </select>
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="d-expires" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Expires At</Label>
                <Input
                  id="d-expires"
                  type="date"
                  value={form.expiresAt}
                  onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button size="xs" variant="outline" type="button" onClick={() => setUploadOpen(false)} className="h-8.5 text-xs font-semibold rounded-sm">
                Cancel
              </Button>
              <Button size="xs" type="submit" className="h-8.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm gap-1 cursor-pointer">
                <Plus className="h-3.5 w-3.5" />
                <span>Upload</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
