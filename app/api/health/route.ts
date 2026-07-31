import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api/response"

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return ok({ status: "healthy", database: "connected" })
  } catch {
    return fail("Database unreachable", 503)
  }
}
