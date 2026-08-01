export interface Metrics {
  totalRequests: number
  uniqueClients: number
  feedCount: number
  itemCount: number
  errorCount: number
  lastRequestAt: string | null
  emptyFeeds: { id: string; title: string }[]
  requestsByFeed: { feedId: string | null; title: string; count: number }[]
  requestsByClient: { clientId: string; count: number }[]
  requestsByStatus: { statusCode: number; count: number }[]
}

export interface HealthStatus {
  status: string
  database: string
}

export type AlertLevel = "ok" | "warning" | "error"

export interface Alert {
  level: AlertLevel
  title: string
  detail: string
}

const STALE_REQUEST_MS = 5 * 60 * 1000

/** Derive operational alerts from current metrics and health state. */
export function deriveAlerts(
  metrics: Metrics | null,
  health: HealthStatus | null,
): Alert[] {
  const alerts: Alert[] = []

  if (!health || health.database !== "connected") {
    alerts.push({
      level: "error",
      title: "Database unreachable",
      detail: "The server cannot connect to the database.",
    })
  }

  if (!metrics) return alerts

  if (metrics.errorCount > 0) {
    alerts.push({
      level: "warning",
      title: "Failed requests recorded",
      detail: `${metrics.errorCount} request${metrics.errorCount === 1 ? "" : "s"} returned an error status.`,
    })
  }

  for (const feed of metrics.emptyFeeds) {
    alerts.push({
      level: "warning",
      title: "Empty feed",
      detail: `"${feed.title}" contains no items.`,
    })
  }

  if (metrics.lastRequestAt) {
    const age = Date.now() - new Date(metrics.lastRequestAt).getTime()
    if (age > STALE_REQUEST_MS) {
      alerts.push({
        level: "warning",
        title: "No recent activity",
        detail: "No requests have been received in the last five minutes.",
      })
    }
  } else {
    alerts.push({
      level: "warning",
      title: "No requests recorded",
      detail: "The server has not handled any API requests yet.",
    })
  }

  if (alerts.length === 0) {
    alerts.push({
      level: "ok",
      title: "All systems normal",
      detail: "Database connected, no errors, feeds populated.",
    })
  }

  return alerts
}
