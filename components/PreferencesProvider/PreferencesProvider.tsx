"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  DEFAULT_DENSITY,
  DENSITY_KEY,
  isDensity,
  type Density,
} from "@/lib/preferences"
import {
  PreferencesContext,
  type PreferencesContextValue,
} from "./usePreferences"

export interface Props {
  children: React.ReactNode
}

export default function PreferencesProvider({ children }: Props) {
  const [density, setDensityState] = useState<Density>(() => {
    if (typeof window === "undefined") return DEFAULT_DENSITY
    const stored = localStorage.getItem(DENSITY_KEY)
    return isDensity(stored) ? stored : DEFAULT_DENSITY
  })

  const setDensity = useCallback((next: Density) => {
    setDensityState(next)
    localStorage.setItem(DENSITY_KEY, next)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.density = density
  }, [density])

  const value = useMemo<PreferencesContextValue>(
    () => ({ density, setDensity }),
    [density, setDensity],
  )

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  )
}
