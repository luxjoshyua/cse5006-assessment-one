import { prisma } from "@/lib/prisma"
import { feeds } from "@/lib/feeds"
import { ok, fail } from "@/lib/api/response"
import { withLogging } from "@/lib/api/with-logging"
import { parseFeedUpdateInput } from "@/lib/api/validation"

interface Params {
  params: Promise<{ id: string }>
}

async function getHandler(_req: Request, { params }: Params) {
  const { id } = await params
  const feed = await feeds.getFeed(id)
  return feed ? ok(feed) : fail("Feed not found", 404)
}

async function patchHandler(request: Request, { params }: Params) {
  const { id } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return fail("Invalid JSON body", 400)
  }

  const parsed = parseFeedUpdateInput(body)
  if (!parsed.ok) return fail(parsed.error, 422)

  try {
    await prisma.feed.update({ where: { id }, data: parsed.value })
    return ok(await feeds.getFeed(id))
  } catch {
    return fail("Feed not found", 404)
  }
}

async function deleteHandler(_req: Request, { params }: Params) {
  const { id } = await params
  try {
    await prisma.feed.delete({ where: { id } })
    return ok({ deleted: id })
  } catch {
    return fail("Feed not found", 404)
  }
}

export const GET = withLogging("/api/feeds/:id", getHandler)
export const PATCH = withLogging("/api/feeds/:id", patchHandler)
export const DELETE = withLogging("/api/feeds/:id", deleteHandler)
