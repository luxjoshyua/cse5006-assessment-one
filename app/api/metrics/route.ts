import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api/response"

export async function GET() {
  try {
    const [
      totalRequests,
      uniqueClientRows,
      feedCount,
      itemCount,
      errorCount,
      requestsByFeed,
      requestsByClient,
      requestsByStatus,
      emptyFeeds,
      lastRequest,
      allFeeds,
    ] = await Promise.all([
      prisma.requestLog.count(),
      prisma.requestLog.findMany({
        distinct: ["clientId"],
        select: { clientId: true },
      }),
      prisma.feed.count(),
      prisma.item.count(),
      prisma.requestLog.count({
        where: { statusCode: { gte: 400 } },
      }),
      prisma.requestLog.groupBy({
        by: ["feedId"],
        _count: { _all: true },
        where: { feedId: { not: null } },
      }),
      prisma.requestLog.groupBy({
        by: ["clientId"],
        _count: { _all: true },
        orderBy: { _count: { clientId: "desc" } },
        take: 10,
      }),
      prisma.requestLog.groupBy({
        by: ["statusCode"],
        _count: { _all: true },
      }),
      prisma.feed.findMany({
        where: { items: { none: {} } },
        select: { id: true, title: true },
      }),
      prisma.requestLog.findFirst({
        orderBy: { createdAt: "desc" },
        select: { createdAt: true },
      }),
      prisma.feed.findMany({
        select: { id: true, title: true },
      }),
    ])

    return ok({
      totalRequests,
      uniqueClients: uniqueClientRows.length,
      feedCount,
      itemCount,
      errorCount,
      lastRequestAt: lastRequest?.createdAt.toISOString() ?? null,
      emptyFeeds: emptyFeeds.map((f: { id: string; title: string }) => ({
        id: f.id,
        title: f.title,
      })),
      requestsByFeed: requestsByFeed.map(
        (r: { feedId: string | null; _count: { _all: number } }) => ({
          feedId: r.feedId,
          title:
            allFeeds.find((f: { id: string }) => f.id === r.feedId)?.title ??
            "Unknown feed",
          count: r._count._all,
        }),
      ),
      requestsByClient: requestsByClient.map(
        (r: { clientId: string; _count: { _all: number } }) => ({
          clientId: r.clientId,
          count: r._count._all,
        }),
      ),
      requestsByStatus: requestsByStatus.map(
        (r: { statusCode: number; _count: { _all: number } }) => ({
          statusCode: r.statusCode,
          count: r._count._all,
        }),
      ),
    })
  } catch {
    return fail("Failed to compute metrics", 500)
  }
}
