"use client"

import { createContext, useContext } from "react"
import type { Density } from "@/lib/preferences"

export interface PreferencesContextValue {
  density: Density
  setDensity: (density: Density) => void
}

export const PreferencesContext = createContext<PreferencesContextValue | null>(
  null,
)

export function usePreferences(): PreferencesContextValue {
  const context = useContext(PreferencesContext)
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider")
  }
  return context
}
