import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api/response"
import { withLogging } from "@/lib/api/with-logging"

async function getHandler() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return ok({ status: "healthy", database: "connected" })
  } catch {
    return fail("Database unreachable", 503)
  }
}

export const GET = withLogging("/api/health", getHandler)
