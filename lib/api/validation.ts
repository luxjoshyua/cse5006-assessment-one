interface FeedInput {
  title: string
  description: string
  siteUrl: string
  feedUrl: string
}

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
  if (!isValidUrl(b.link as string)) {
    return { ok: false, error: "Field link must be a valid http(s) URL" }
  }
  if (!isValidIsoDate(b.publishedAt as string)) {
    return { ok: false, error: "Field publishedAt must be a valid ISO date" }
  }
  return { ok: true, value: b as unknown as ItemInput }
}

const MAX_TITLE = 300
const MAX_SUMMARY = 1000
const MAX_CONTENT = 20000
const MAX_URL = 2048

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

function isValidIsoDate(value: string): boolean {
  const date = new Date(value)
  return !Number.isNaN(date.getTime())
}

export function parseUpdateInput(
  body: unknown,
): ParseResult<Record<string, string | Date>> {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Body must be an object" }
  }

  const b = body as Record<string, unknown>
  const out: Record<string, string | Date> = {}

  const lengths: Record<string, number> = {
    title: MAX_TITLE,
    summary: MAX_SUMMARY,
    content: MAX_CONTENT,
  }

  for (const [key, max] of Object.entries(lengths)) {
    if (b[key] === undefined) continue
    if (typeof b[key] !== "string" || (b[key] as string).trim() === "") {
      return { ok: false, error: `Invalid value for field: ${key}` }
    }
    if ((b[key] as string).length > max) {
      return { ok: false, error: `Field ${key} exceeds ${max} characters` }
    }
    out[key] = b[key] as string
  }

  if (b.link !== undefined) {
    if (typeof b.link !== "string" || !isValidUrl(b.link)) {
      return { ok: false, error: "Field link must be a valid http(s) URL" }
    }
    if (b.link.length > MAX_URL) {
      return { ok: false, error: `Field link exceeds ${MAX_URL} characters` }
    }
    out.link = b.link
  }

  if (b.publishedAt !== undefined) {
    if (typeof b.publishedAt !== "string" || !isValidIsoDate(b.publishedAt)) {
      return { ok: false, error: "Field publishedAt must be a valid ISO date" }
    }
    out.publishedAt = new Date(b.publishedAt)
  }

  if (Object.keys(out).length === 0) {
    return { ok: false, error: "No updatable fields provided" }
  }

  return { ok: true, value: out }
}

export function parseFeedInput(body: unknown): ParseResult<FeedInput> {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Body must be an object" }
  }

  const b = body as Record<string, unknown>

  for (const key of ["title", "description", "siteUrl", "feedUrl"]) {
    if (typeof b[key] !== "string" || (b[key] as string).trim() === "") {
      return { ok: false, error: `Missing or invalid field: ${key}` }
    }
  }

  for (const key of ["siteUrl", "feedUrl"]) {
    if (!isValidUrl(b[key] as string)) {
      return { ok: false, error: `Field ${key} must be a valid http(s) URL` }
    }
  }

  if ((b.title as string).length > MAX_TITLE) {
    return { ok: false, error: `Field title exceeds ${MAX_TITLE} characters` }
  }

  return { ok: true, value: b as unknown as FeedInput }
}

export function parseFeedUpdateInput(
  body: unknown,
): ParseResult<Record<string, string>> {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Body must be an object" }
  }

  const b = body as Record<string, unknown>
  const out: Record<string, string> = {}

  for (const key of ["title", "description"]) {
    if (b[key] === undefined) continue
    if (typeof b[key] !== "string" || (b[key] as string).trim() === "") {
      return { ok: false, error: `Invalid value for field: ${key}` }
    }
    out[key] = b[key] as string
  }

  for (const key of ["siteUrl", "feedUrl"]) {
    if (b[key] === undefined) continue
    if (typeof b[key] !== "string" || !isValidUrl(b[key] as string)) {
      return { ok: false, error: `Field ${key} must be a valid http(s) URL` }
    }
    out[key] = b[key] as string
  }

  if (Object.keys(out).length === 0) {
    return { ok: false, error: "No updatable fields provided" }
  }

  return { ok: true, value: out }
}
