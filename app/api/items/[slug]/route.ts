import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api/response"
import { feeds } from "@/lib/feeds"
import { pickUpdatableFields } from "@/lib/api/validation"

interface Params {
  params: Promise<{ slug: string }>
}

// GET /api/items/:slug
export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params
  const item = await feeds.getItem(slug)
  return item ? ok(item) : fail("Item not found", 404)
}

// PATCH /api/items/:slug
export async function PATCH(request: Request, { params }: Params) {
  const { slug } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return fail("Invalid JSON body", 400)
  }

  try {
    const item = await prisma.item.update({
      where: { slug },
      data: pickUpdatableFields(body),
    })
    return ok(item)
  } catch {
    return fail("Item not found", 404)
  }
}

// DELETE /api/items/:slug
export async function DELETE(_req: Request, { params }: Params) {
  const { slug } = await params
  try {
    await prisma.item.delete({ where: { slug } })
    return ok({ deleted: slug })
  } catch {
    return fail("Item not found", 404)
  }
}
