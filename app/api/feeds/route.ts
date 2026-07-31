import { feeds } from "@/lib/feeds"
import { ok, fail } from "@/lib/api/response"
import { withLogging } from "@/lib/api/with-logging"

async function getHandler() {
  try {
    return ok(await feeds.listFeeds())
  } catch {
    return fail("Failed to load feeds", 500)
  }
}

export const GET = withLogging("/api/feeds", getHandler)
