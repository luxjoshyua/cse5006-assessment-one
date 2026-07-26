"use client"

import { useSyncExternalStore } from "react"
import { usePreferences } from "@/components/PreferencesProvider"
import type { Density } from "@/lib/preferences"

const OPTIONS: { value: Density; label: string }[] = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
]

const subscribe = () => () => {}
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}

export interface Props {
  className?: string
}

export default function DensityToggle({ className }: Props) {
  const { density, setDensity } = usePreferences()
  const hydrated = useHydrated()

  const move = (dir: 1 | -1) => {
    const i = OPTIONS.findIndex((o) => o.value === density)
    const next = OPTIONS[(i + dir + OPTIONS.length) % OPTIONS.length]
    setDensity(next.value)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      move(1)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      move(-1)
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Feed density"
      onKeyDown={onKeyDown}
      className={`inline-flex rounded-lg border border-border p-1 ${className ?? ""}`}
    >
      {OPTIONS.map(({ value, label }) => {
        const active = hydrated && density === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => setDensity(value)}
            className={`cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors ${
              active ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
