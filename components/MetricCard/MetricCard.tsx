export interface Props {
  label: string
  value: string | number
  tone?: "default" | "warning" | "error"
}

const TONE_CLASSES: Record<NonNullable<Props["tone"]>, string> = {
  default: "border-border",
  warning: "border-amber-500/60",
  error: "border-red-500/60",
}

const TONE_LABELS: Record<NonNullable<Props["tone"]>, string | null> = {
  default: null,
  warning: "Warning",
  error: "Error",
}

export default function MetricCard({ label, value, tone = "default" }: Props) {
  const toneLabel = TONE_LABELS[tone]

  return (
    <div
      className={`flex flex-col gap-1 rounded-lg border bg-surface p-4 ${TONE_CLASSES[tone]}`}
    >
      <span className="text-sm text-muted">
        {toneLabel && <span className="sr-only">{toneLabel}: </span>}
        {label}
      </span>
      <span className="text-2xl font-semibold tabular-nums">{value}</span>
    </div>
  )
}
