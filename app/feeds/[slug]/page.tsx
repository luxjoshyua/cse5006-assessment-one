import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { feeds } from "@/lib/feeds"
import { formatDateShort } from "@/lib/format"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = await feeds.getItem(slug)
  return { title: item ? item.title : "Post not found" }
}

export default async function FeedItemPage({ params }: Props) {
  const { slug } = await params
  const item = await feeds.getItem(slug)

  if (!item) notFound()

  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <li>
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/feeds" className="hover:text-accent">
              Feeds
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-fg">
            {item.title}
          </li>
        </ol>
      </nav>

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          {item.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <span>{item.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={item.publishedAt}>
            {formatDateShort(item.publishedAt)}
          </time>
        </div>
        {item.categories.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {item.categories.map((c) => (
              <li
                key={c}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {c}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {item.enclosure ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.enclosure.url}
          alt=""
          className="aspect-[16/9] w-full rounded-lg object-cover"
        />
      ) : null}

      <div className="leading-relaxed text-pretty">{item.content}</div>

      <footer className="border-t border-border pt-6">
        <Link href="/feeds" className="text-sm text-accent hover:underline">
          ← Back to all feeds
        </Link>
      </footer>
    </article>
  )
}
