import Link from "next/link";
import { Building2, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black font-sans">
      {/* Grid background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] opacity-60" />

      <div className="flex flex-col items-center gap-6 text-center px-4">
        <div className="flex h-12 w-12 items-center justify-center bg-zinc-100 dark:bg-zinc-900">
          <Building2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">Error 404</p>
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Page not found
          </h1>
          <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400 max-w-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-10 px-5 text-sm font-semibold bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 h-10 px-5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-4">
          BuildingOS · Residential &amp; Commercial Property Platform
        </p>
      </div>
    </div>
  );
}
