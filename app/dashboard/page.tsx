import Dashboard from "@/components/Dashboard"

export const metadata = {
  title: "Dashboard",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="max-w-2xl text-muted">
          Operational overview of the RSS Server: feed and item counts, request
          activity by feed and client, response statuses, and alerts for
          conditions that need attention. Figures refresh automatically.
        </p>
      </header>
      <Dashboard />
    </div>
  )
}
