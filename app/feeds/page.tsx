import FeedCard from "@/components/FeedCard"
import { feeds } from "@/lib/feeds"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Feeds",
}

export default async function FeedsPage() {
  const items = await feeds.listItems()

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Feeds</h1>
        <p className="max-w-2xl text-muted">
          Syndicated posts collected for the LMS. Sample content stands in for
          live RSS data at this stage.
        </p>
      </header>

      {items.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug} className="relative">
              <FeedCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-muted">
          No posts yet.
        </p>
      )}
    </div>
  )
}
