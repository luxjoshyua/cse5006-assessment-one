import { cookies } from "next/headers"

export type Theme = "light" | "dark"

export const THEME_COOKIE = "theme"

export async function getTheme(): Promise<Theme> {
  const store = await cookies()
  return store.get(THEME_COOKIE)?.value === "dark" ? "dark" : "light"
}
