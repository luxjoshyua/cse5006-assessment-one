import Link from "next/link"
import type { FeedItem } from "@/lib/feeds"
import { formatDateShort } from "@/lib/format"

export interface Props {
  item: FeedItem
}

export default function FeedCard({ item }: Props) {
  const { slug, title, summary, author, publishedAt, categories, enclosure } =
    item

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-accent">
      {enclosure ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={enclosure.url}
          alt=""
          className="aspect-[16/9] w-full object-cover compact:aspect-[21/9]"
        />
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-5 compact:gap-2 compact:p-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <time dateTime={publishedAt}>{formatDateShort(publishedAt)}</time>
          {categories.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span>{categories[0]}</span>
            </>
          )}
        </div>

        <h3 className="text-lg font-semibold tracking-tight">
          <Link
            href={`/feeds/${slug}`}
            className="after:absolute after:inset-0 hover:text-accent"
          >
            {title}
          </Link>
        </h3>

        <p className="text-sm text-muted">{summary}</p>

        <div className="mt-auto flex items-center justify-between pt-2 text-sm">
          <span className="text-muted">{author}</span>
          <span className="font-medium text-accent" aria-hidden="true">
            Read more →
          </span>
        </div>
      </div>
    </article>
  )
}
