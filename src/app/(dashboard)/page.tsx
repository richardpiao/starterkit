import type { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your dashboard overview",
};

export default function DashboardPage(): ReactNode {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your dashboard overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-lg border p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border">
        <div className="border-b p-6">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {ACTIVITIES.map((activity) => (
              <div key={activity.title} className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const STATS = [
  { label: "Total Users", value: "1,234", change: "+12% from last month" },
  { label: "Active Sessions", value: "567", change: "+8% from last month" },
  { label: "Revenue", value: "$12,345", change: "+23% from last month" },
  { label: "Conversion Rate", value: "3.2%", change: "+2% from last month" },
] as const;

const ACTIVITIES = [
  { title: "New user registered", time: "2 minutes ago" },
  { title: "Payment received", time: "15 minutes ago" },
  { title: "New order placed", time: "1 hour ago" },
  { title: "User upgraded plan", time: "3 hours ago" },
] as const;
