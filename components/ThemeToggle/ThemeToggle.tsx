"use client"

import { useTheme } from "@/components/ThemeProvider"

export interface Props {
  className?: string
}

export default function ThemeToggle( { className }: Props ) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      className={`inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent ${ className ?? "" }`}
    >
      <span
        aria-hidden="true"
        className="relative flex h-4 w-4 items-center justify-center"
      >
        <span
          className={`absolute h-3 w-3 rounded-full border-2 border-current transition-transform duration-300 ${
            isDark ? "scale-100" : "scale-0"
          }`}
        />
        <span
          className={`absolute h-3 w-3 rounded-full bg-current transition-transform duration-300 ${
            isDark ? "scale-0" : "scale-100"
          }`}
        />
      </span>
      {isDark ? "Dark" : "Light"}
    </button>
  )
}
