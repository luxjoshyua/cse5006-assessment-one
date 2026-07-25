import { resolveClientId } from "./client-id"
import { logRequest } from "./log-request"

type Handler<Ctx> = (request: Request, ctx: Ctx) => Promise<Response>

export function withLogging<Ctx>(
  path: string,
  handler: Handler<Ctx>,
): Handler<Ctx> {
  return async (request, ctx) => {
    const response = await handler(request, ctx)
    await logRequest({
      path,
      method: request.method,
      statusCode: response.status,
      clientId: resolveClientId(request),
    })
    return response
  }
}
