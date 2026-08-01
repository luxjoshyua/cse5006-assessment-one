import { feeds } from "@/lib/feeds"
import { ok, fail } from "@/lib/api/response"
import { withLogging } from "@/lib/api/with-logging"

interface Params {
  params: Promise<{ id: string }>
}

async function getHandler(_req: Request, { params }: Params) {
  const { id } = await params
  const feed = await feeds.getFeed(id)
  return feed ? ok(feed.items) : fail("Feed not found", 404)
}

export const GET = withLogging("/api/feeds/:id/items", getHandler, {
  feedIdFrom: async (_req, ctx) => {
    const { id } = await (ctx as Params).params
    return id
  },
})
