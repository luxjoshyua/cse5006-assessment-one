import { prisma } from "@/lib/prisma"

export async function logRequest(params: {
  path: string
  method: string
  statusCode: number
  clientId: string
  feedId?: string
}) {
  try {
    await prisma.requestLog.create({ data: params })
  } catch {
    // Request logging must never break the request it's logging.
  }
}
