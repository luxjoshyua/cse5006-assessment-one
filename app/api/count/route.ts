import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api/response"

export async function GET() {
  try {
    const [total, uniqueClients, byMethod] = await Promise.all([
      prisma.requestLog.count(),
      prisma.requestLog.findMany({
        distinct: ["clientId"],
        select: { clientId: true },
      }),
      prisma.requestLog.groupBy({
        by: ["method"],
        _count: { _all: true },
      }),
    ])

    return ok({
      totalRequests: total,
      uniqueClients: uniqueClients.length,
      byMethod: Object.fromEntries(
        byMethod.map((r: { method: string; _count: { _all: number } }) => [
          r.method,
          r._count._all,
        ]),
      ),
    })
  } catch {
    return fail("Failed to compute request stats", 500)
  }
}
