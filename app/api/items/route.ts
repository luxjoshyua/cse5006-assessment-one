import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api/response"
import { feeds } from "@/lib/feeds"
import { parseItemInput } from "@/lib/api/validation"

// GET /api/items — list all items
export async function GET() {
  try {
    const items = await feeds.listItems()
    return ok(items)
  } catch {
    return fail("Failed to load items", 500)
  }
}

// POST /api/items — create an item
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return fail("Invalid JSON body", 400)
  }

  const parsed = parseItemInput(body)
  if (!parsed.ok) return fail(parsed.error, 422)

  try {
    const item = await prisma.item.create({
      data: {
        guid: parsed.value.slug,
        slug: parsed.value.slug,
        title: parsed.value.title,
        link: parsed.value.link,
        summary: parsed.value.summary,
        content: parsed.value.content,
        publishedAt: new Date(parsed.value.publishedAt),
        feed: { connect: { id: parsed.value.feedId } },
        author: {
          connectOrCreate: {
            where: { name: parsed.value.author },
            create: { name: parsed.value.author },
          },
        },
      },
    })
    return ok(item, 201)
  } catch {
    return fail("Failed to create item", 500)
  }
}
