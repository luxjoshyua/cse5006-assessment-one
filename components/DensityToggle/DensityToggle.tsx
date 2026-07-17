"use client"

import { useSyncExternalStore } from "react"
import { usePreferences } from "@/components/PreferencesProvider"
import type { Density } from "@/lib/preferences"

const OPTIONS: { value: Density; label: string }[] = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
]

// false on the server and on the client's first render; true after hydration.
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

  return (
    <div
      role="radiogroup"
      aria-label="Feed density"
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
            onClick={() => setDensity(value)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
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
