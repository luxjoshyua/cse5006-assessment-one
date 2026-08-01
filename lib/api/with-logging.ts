import { resolveClientId } from "./client-id"
import { logRequest } from "./log-request"

type Handler<Ctx> = (request: Request, ctx: Ctx) => Promise<Response>

interface Options<Ctx> {
  /** Optionally derive the feed this request relates to, for per-feed metrics. */
  feedIdFrom?: (request: Request, ctx: Ctx) => Promise<string | undefined>
}

export function withLogging<Ctx>(
  path: string,
  handler: Handler<Ctx>,
  options: Options<Ctx> = {},
): Handler<Ctx> {
  return async (request, ctx) => {
    const response = await handler(request, ctx)

    let feedId: string | undefined
    if (options.feedIdFrom) {
      try {
        feedId = await options.feedIdFrom(request, ctx)
      } catch {
        // Metric attribution must never break the request.
      }
    }

    await logRequest({
      path,
      method: request.method,
      statusCode: response.status,
      clientId: resolveClientId(request),
      feedId,
    })
    return response
  }
}
