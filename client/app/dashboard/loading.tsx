export default function DashboardLoading() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 dark:bg-zinc-900/30 font-sans">
      {/* Sidebar skeleton */}
      <div className="hidden md:flex h-full w-60 flex-col border-r border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 p-3 gap-2">
        {/* Org switcher */}
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-2" />
        {/* Nav items */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-8 bg-zinc-200 dark:bg-zinc-800 animate-pulse" style={{ animationDelay: `${i * 50}ms` }} />
        ))}
      </div>

      {/* Main content skeleton */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <div className="h-14 border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 flex items-center px-6 gap-4">
          <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="ml-auto h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-zinc-200 dark:bg-zinc-800 animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
            ))}
          </div>
          {/* Content cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 bg-zinc-200 dark:bg-zinc-800 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
