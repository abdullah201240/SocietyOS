"use client";

import { useEffect } from "react";
import { RefreshCw, AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[BuildingOS Dashboard] Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-100/50 dark:bg-zinc-900/30 font-sans">
      <div className="flex flex-col items-center gap-5 text-center px-6">
        <div className="flex h-12 w-12 items-center justify-center bg-red-50 dark:bg-red-950/50">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Dashboard error</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
            This section failed to load. Your data is safe. Try refreshing.
          </p>
          {error.digest && (
            <p className="text-xs text-zinc-400 font-mono">Ref: {error.digest}</p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 h-9 px-4 text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 h-9 px-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            Dashboard Home
          </Link>
        </div>
      </div>
    </div>
  );
}
