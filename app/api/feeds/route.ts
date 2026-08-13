import { prisma } from "@/lib/prisma"
import { feeds } from "@/lib/feeds"
import { ok, fail } from "@/lib/api/response"
import { withLogging } from "@/lib/api/with-logging"
import { parseFeedInput } from "@/lib/api/validation"

async function getHandler() {
  try {
    return ok(await feeds.listFeeds())
  } catch {
    return fail("Failed to load feeds", 500)
  }
}

async function postHandler(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return fail("Invalid JSON body", 400)
  }

  const parsed = parseFeedInput(body)
  if (!parsed.ok) return fail(parsed.error, 422)

  try {
    const created = await prisma.feed.create({ data: parsed.value })
    const feed = await feeds.getFeed(created.id)
    return ok(feed, 201)
  } catch {
    return fail("Failed to create feed. The feed URL may already exist.", 409)
  }
}

export const GET = withLogging("/api/feeds", getHandler)
export const POST = withLogging("/api/feeds", postHandler)
