"use client";

import { useEffect } from "react";
import { Building2, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[BuildingOS Global] Critical system crash:", error);
  }, [error]);

  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white dark:bg-black font-sans items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center px-4">
          <div className="flex h-12 w-12 items-center justify-center bg-red-100 dark:bg-red-950 rounded-lg">
            <Building2 className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-widest text-red-500 uppercase">Critical Error</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              System initialization failed
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
              The application layout failed to load. Click below to reset the core runtime environment.
            </p>
            {error.digest && (
              <p className="text-xs text-zinc-400 font-mono mt-1">Digest: {error.digest}</p>
            )}
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 h-10 px-5 text-sm font-semibold bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Re-Initialize App
          </button>
        </div>
      </body>
    </html>
  );
}
