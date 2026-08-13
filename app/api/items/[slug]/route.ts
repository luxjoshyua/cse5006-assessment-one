import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api/response"
import { feeds } from "@/lib/feeds"
import { parseUpdateInput } from "@/lib/api/validation"
import { withLogging } from "@/lib/api/with-logging"

interface Params {
  params: Promise<{ slug: string }>
}

// GET /api/items/:slug
async function getHandler(_req: Request, { params }: Params) {
  const { slug } = await params
  const item = await feeds.getItem(slug)
  return item ? ok(item) : fail("Item not found", 404)
}

// PATCH /api/items/:slug
async function patchHandler(request: Request, { params }: Params) {
  const { slug } = await params
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return fail("Invalid JSON body", 400)
  }

  const parsed = parseUpdateInput(body)
  if (!parsed.ok) return fail(parsed.error, 422)

  try {
    await prisma.item.update({
      where: { slug },
      data: parsed.value,
    })
    const updated = await feeds.getItem(slug)
    return ok(updated)
  } catch {
    return fail("Item not found", 404)
  }
}

// DELETE /api/items/:slug
async function deleteHandler(_req: Request, { params }: Params) {
  const { slug } = await params
  try {
    await prisma.item.delete({ where: { slug } })
    return ok({ deleted: slug })
  } catch {
    return fail("Item not found", 404)
  }
}

export const GET = withLogging("/api/items/:slug", getHandler)
export const PATCH = withLogging("/api/items/:slug", patchHandler)
export const DELETE = withLogging("/api/items/:slug", deleteHandler)
