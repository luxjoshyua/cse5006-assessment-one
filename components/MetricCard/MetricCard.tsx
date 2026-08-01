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

export default function MetricCard({ label, value, tone = "default" }: Props) {
  return (
    <div
      className={`flex flex-col gap-1 rounded-lg border bg-surface p-4 ${TONE_CLASSES[tone]}`}
    >
      <span className="text-sm text-muted">{label}</span>
      <span className="text-2xl font-semibold tabular-nums">{value}</span>
    </div>
  )
}
