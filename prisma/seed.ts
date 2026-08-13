import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { SAMPLE_FEEDS } from "../lib/feeds/sample-data"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Idempotent: clear then reseed, so re-running doesn't duplicate.
  await prisma.requestLog.deleteMany()
  await prisma.enclosure.deleteMany()
  await prisma.item.deleteMany()
  await prisma.category.deleteMany()
  await prisma.author.deleteMany()
  await prisma.feed.deleteMany()

  for (const feed of SAMPLE_FEEDS) {
    await prisma.feed.create({
      data: {
        title: feed.title,
        description: feed.description,
        siteUrl: feed.siteUrl,
        feedUrl: `${feed.siteUrl}/rss.xml`,
        items: {
          create: feed.items.map((item) => ({
            guid: item.slug,
            slug: item.slug,
            title: item.title,
            link: item.link,
            summary: item.summary,
            content: item.content,
            publishedAt: new Date(item.publishedAt),
            author: {
              connectOrCreate: {
                where: { name: item.author },
                create: { name: item.author },
              },
            },
            categories: {
              connectOrCreate: item.categories.map((name) => ({
                where: { name },
                create: { name },
              })),
            },
            enclosures: item.enclosure
              ? {
                  create: [
                    { url: item.enclosure.url, mimeType: item.enclosure.type },
                  ],
                }
              : undefined,
          })),
        },
      },
    })
  }

  console.log(`Seeded ${SAMPLE_FEEDS.length} feed(s).`)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
