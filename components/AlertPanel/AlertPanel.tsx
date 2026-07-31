import type { Alert } from "@/lib/metrics/types"

export interface Props {
  alerts: Alert[]
}

const LEVEL_STYLES: Record<Alert["level"], string> = {
  ok: "border-border text-muted",
  warning: "border-amber-500/60 text-amber-700 dark:text-amber-400",
  error: "border-red-500/60 text-red-700 dark:text-red-400",
}

const LEVEL_LABELS: Record<Alert["level"], string> = {
  ok: "OK",
  warning: "Warning",
  error: "Error",
}

export default function AlertPanel({ alerts }: Props) {
  return (
    <section aria-labelledby="alerts" className="flex flex-col gap-3">
      <h2
        id="alerts"
        className="text-sm font-semibold tracking-wide text-muted uppercase"
      >
        Alerts
      </h2>
      <ul className="flex flex-col gap-2" aria-live="polite">
        {alerts.map((alert, i) => (
          <li
            key={`${alert.title}-${i}`}
            className={`flex flex-col gap-0.5 rounded-lg border bg-surface p-3 ${LEVEL_STYLES[alert.level]}`}
          >
            <span className="text-sm font-semibold">
              <span className="sr-only">{LEVEL_LABELS[alert.level]}: </span>
              {alert.title}
            </span>
            <span className="text-sm text-muted">{alert.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
