export default function Loading() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100/50 dark:bg-zinc-900/30 font-sans">
      <div className="hidden md:flex h-full w-60 flex-col border-r border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 p-3 gap-2 animate-pulse">
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 mb-2" />
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="h-8 bg-zinc-200 dark:bg-zinc-800" />
        ))}
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="h-14 border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 flex items-center px-6 gap-4">
          <div className="h-4 w-48 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        </div>
        <div className="flex-1 overflow-auto p-6 space-y-4">
          <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="h-48 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="h-48 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
