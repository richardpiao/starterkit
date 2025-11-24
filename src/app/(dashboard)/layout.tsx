import type { ReactNode } from "react";

import Link from "next/link";

interface IDashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: IDashboardLayoutProps): ReactNode {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-muted/40 lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="text-xl font-bold">
              Dashboard
            </Link>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-sm font-medium"
            >
              <span>Overview</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <span>Analytics</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <span>Settings</span>
            </Link>
          </nav>
          <div className="border-t p-4">
            <button
              type="button"
              className="w-full rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <button type="button" className="lg:hidden" aria-label="Toggle menu">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome back!</span>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
