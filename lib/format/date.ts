const AU_LOCALE = "en-AU"

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString(AU_LOCALE, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function formatDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString(AU_LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
