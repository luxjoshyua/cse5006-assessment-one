"use client"

import { useCallback, useMemo, useState, type ReactNode } from "react"
import { applyTheme } from "@/lib/theme.client"
import { ThemeContext, type ThemeContextValue } from "./useTheme"
import type { Theme } from "@/lib/theme"

export interface Props {
  initialTheme: Theme
  children: ReactNode
}

export default function ThemeProvider({ initialTheme, children }: Props) {
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    applyTheme(next)
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    }),
    [theme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
