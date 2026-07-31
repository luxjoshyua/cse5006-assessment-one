"use client"

import { useCallback, useEffect, useState } from "react"
import {
  deriveAlerts,
  type HealthStatus,
  type Metrics,
} from "@/lib/metrics/types"
import AlertPanel from "@/components/AlertPanel"
import MetricCard from "@/components/MetricCard"
import MetricTable from "@/components/MetricTable"

const POLL_MS = 15000

export interface Props {
  className?: string
}

export default function Dashboard({ className }: Props) {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      const [mRes, hRes] = await Promise.all([
        fetch("/api/metrics"),
        fetch("/api/health"),
      ])
      const mBody = await mRes.json()
      const hBody = await hRes.json()
      setMetrics(mBody.data ?? null)
      setHealth(hBody.data ?? null)
      setUpdatedAt(new Date().toLocaleTimeString("en-AU"))
    } catch {
      setHealth(null)
    }
  }, [])

  // useEffect(() => {
  // const initial = setTimeout(() => void refresh(), 0)
  // const id = setInterval(() => void refresh(), POLL_MS)
  // return () => {
  // clearTimeout(initial)
  // clearInterval(id)
  // }
  // }, [refresh])

  useEffect(() => {
    const instance = Math.random().toString(36).slice(2, 7)
    console.log("dashboard polling started", instance)
    const initial = setTimeout(() => void refresh(), 0)
    const id = setInterval(() => void refresh(), POLL_MS)
    return () => {
      console.log("dashboard polling stopped", instance)
      clearTimeout(initial)
      clearInterval(id)
    }
  }, [refresh])

  const alerts = deriveAlerts(metrics, health)

  return (
    <div className={`flex flex-col gap-8 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">
          {updatedAt ? `Last updated ${updatedAt}` : "Loading…"}
        </p>
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-md border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
        >
          Refresh now
        </button>
      </div>

      <AlertPanel alerts={alerts} />

      <section aria-labelledby="overview" className="flex flex-col gap-4">
        <h2
          id="overview"
          className="text-sm font-semibold tracking-wide text-muted uppercase"
        >
          Overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard label="RSS feeds" value={metrics?.feedCount ?? 0} />
          <MetricCard label="Feed items" value={metrics?.itemCount ?? 0} />
          <MetricCard
            label="Total requests"
            value={metrics?.totalRequests ?? 0}
          />
          <MetricCard
            label="Unique clients"
            value={metrics?.uniqueClients ?? 0}
          />
          <MetricCard
            label="Failed requests"
            value={metrics?.errorCount ?? 0}
            tone={metrics && metrics.errorCount > 0 ? "warning" : "default"}
          />
          <MetricCard
            label="Database"
            value={
              health?.database === "connected" ? "Connected" : "Unreachable"
            }
            tone={health?.database === "connected" ? "default" : "error"}
          />
        </div>
      </section>

      <section aria-labelledby="reporting" className="flex flex-col gap-4">
        <h2
          id="reporting"
          className="text-sm font-semibold tracking-wide text-muted uppercase"
        >
          Reporting
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <MetricTable
            title="Requests per feed"
            columns={["Feed", "Requests"]}
            rows={
              metrics?.requestsByFeed.map((r) => [r.title, String(r.count)]) ??
              []
            }
            emptyMessage="No feed-scoped requests recorded."
          />
          <MetricTable
            title="Requests per client"
            columns={["Client", "Requests"]}
            rows={
              metrics?.requestsByClient.map((r) => [
                r.clientId,
                String(r.count),
              ]) ?? []
            }
            emptyMessage="No client requests recorded."
          />
          <MetricTable
            title="Responses by status"
            columns={["Status", "Count"]}
            rows={
              metrics?.requestsByStatus.map((r) => [
                String(r.statusCode),
                String(r.count),
              ]) ?? []
            }
            emptyMessage="No responses recorded."
          />
        </div>
      </section>
    </div>
  )
}
