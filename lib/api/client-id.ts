export function resolveClientId(request: Request): string {
  const header = request.headers.get("x-client-id")
  if (header && header.trim() !== "") return header.trim()

  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()

  return "unknown"
}
