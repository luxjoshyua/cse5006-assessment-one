import { prisma } from "@/lib/prisma"
import type { FeedRepository } from "./repository"
import type { Feed, FeedItem } from "./types"

// Prisma returns relations as objects/arrays; the app's FeedItem is flat.
// This mapping is the seam that lets A1 components render DB data unchanged.
type ItemWithRelations = {
  slug: string
  title: string
  link: string
  summary: string
  content: string
  publishedAt: Date
  author: { name: string } | null
  categories: { name: string }[]
  enclosures: { url: string; mimeType: string; length: number | null }[]
}

function toFeedItem(item: ItemWithRelations): FeedItem {
  const enclosure = item.enclosures[0]
  return {
    slug: item.slug,
    title: item.title,
    link: item.link,
    summary: item.summary,
    content: item.content,
    publishedAt: item.publishedAt.toISOString(),
    author: item.author?.name ?? "Unknown",
    categories: item.categories.map((c) => c.name),
    enclosure: enclosure
      ? {
          url: enclosure.url,
          type: enclosure.mimeType,
          length: enclosure.length ?? undefined,
        }
      : undefined,
  }
}

const itemInclude = {
  author: { select: { name: true } },
  categories: { select: { name: true } },
  enclosures: { select: { url: true, mimeType: true, length: true } },
} as const

export const prismaFeedRepository: FeedRepository = {
  async listItems(): Promise<FeedItem[]> {
    const items = await prisma.item.findMany({
      include: itemInclude,
      orderBy: { publishedAt: "desc" },
    })
    return items.map(toFeedItem)
  },

  async getItem(slug: string): Promise<FeedItem | null> {
    const item = await prisma.item.findUnique({
      where: { slug },
      include: itemInclude,
    })
    return item ? toFeedItem(item) : null
  },

  async listFeeds(): Promise<Feed[]> {
    const feeds = await prisma.feed.findMany({
      include: { items: { include: itemInclude } },
    })
    return feeds.map((feed) => ({
      id: feed.id,
      title: feed.title,
      description: feed.description,
      siteUrl: feed.siteUrl,
      items: feed.items.map(toFeedItem),
    }))
  },

  async getFeed(id: string): Promise<Feed | null> {
    const feed = await prisma.feed.findUnique({
      where: { id },
      include: { items: { include: itemInclude } },
    })
    if (!feed) return null
    return {
      id: feed.id,
      title: feed.title,
      description: feed.description,
      siteUrl: feed.siteUrl,
      items: feed.items.map(toFeedItem),
    }
  },
}
