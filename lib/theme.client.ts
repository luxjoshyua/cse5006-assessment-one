import { THEME_COOKIE, THEME_MAX_AGE, type Theme } from "./theme"

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=${THEME_MAX_AGE}; samesite=lax`
}
