interface ItemInput {
  slug: string
  title: string
  link: string
  summary: string
  content: string
  publishedAt: string
  author: string
  feedId: string
}

type ParseResult<T> = { ok: true; value: T } | { ok: false; error: string }

export function parseItemInput(body: unknown): ParseResult<ItemInput> {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Body must be an object" }
  }
  const b = body as Record<string, unknown>
  const required = [
    "slug",
    "title",
    "link",
    "summary",
    "content",
    "publishedAt",
    "author",
    "feedId",
  ]
  for (const key of required) {
    if (typeof b[key] !== "string" || (b[key] as string).trim() === "") {
      return { ok: false, error: `Missing or invalid field: ${key}` }
    }
  }
  return { ok: true, value: b as unknown as ItemInput }
}

export function pickUpdatableFields(body: unknown): Record<string, string> {
  if (typeof body !== "object" || body === null) return {}
  const b = body as Record<string, unknown>
  const allowed = ["title", "summary", "content", "link"]
  const out: Record<string, string> = {}
  for (const key of allowed) {
    if (typeof b[key] === "string") out[key] = b[key] as string
  }
  return out
}
