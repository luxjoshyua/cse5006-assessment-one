import { feeds } from "@/lib/feeds"
import { feedToRss } from "@/lib/feeds/rss"
import { fail } from "@/lib/api/response"
import { resolveClientId } from "@/lib/api/client-id"
import { logRequest } from "@/lib/api/log-request"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const all = await feeds.listFeeds()
    const feed = all[0]

    if (!feed) return fail("No feed available", 404)

    const xml = feedToRss(feed, feed.items)

    await logRequest({
      path: "/api/rss",
      method: "GET",
      statusCode: 200,
      clientId: resolveClientId(request),
      feedId: feed.id,
    })

    return new Response(xml, {
      status: 200,
      headers: {
        "content-type": "application/rss+xml; charset=utf-8",
        "cache-control": "no-store",
      },
    })
  } catch {
    return fail("Failed to generate RSS feed", 500)
  }
}
