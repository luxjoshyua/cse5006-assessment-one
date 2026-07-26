"use client"

import { useCallback, useEffect, useState } from "react"
import type { FeedItem } from "@/lib/feeds"
import { formatDateShort } from "@/lib/format"

interface CountData {
  totalRequests: number
  uniqueClients: number
}

const CLIENT_ID = "rss-client-web"

export interface Props {
  className?: string
}

export default function RssClient({ className }: Props) {
  const [items, setItems] = useState<FeedItem[]>([])
  const [count, setCount] = useState<CountData | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")

  const fetchFeeds = useCallback(async () => {
    setStatus("loading")
    try {
      const res = await fetch("/api/items", {
        headers: { "x-client-id": CLIENT_ID },
      })
      const body = await res.json()
      if (body.error) throw new Error(body.error)
      setItems(body.data)

      const countRes = await fetch("/api/count")
      const countBody = await countRes.json()
      setCount(countBody.data)

      setStatus("idle")
    } catch {
      setStatus("error")
    }
  }, [])

  useEffect(() => {
    const run = async () => {
      await fetchFeeds()
    }
    run()
  }, [fetchFeeds])

  return (
    <div className={`flex flex-col gap-6 ${className ?? ""}`}>
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-surface p-4">
        <button
          type="button"
          onClick={fetchFeeds}
          disabled={status === "loading"}
          className="cursor-pointer rounded-md bg-accent px-4 py-2 text-sm text-accent-fg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "Fetching…" : "Fetch from server"}
        </button>
        {count && (
          <dl className="flex gap-6 text-sm">
            <div className="flex gap-2">
              <dt className="text-muted">Total requests</dt>
              <dd className="font-semibold" aria-live="polite">
                {count.totalRequests}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted">Unique clients</dt>
              <dd className="font-semibold">{count.uniqueClients}</dd>
            </div>
          </dl>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">Failed to reach the server.</p>
        )}
      </div>

      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.slug}
            className="flex flex-col gap-1 rounded-lg border border-border bg-surface p-4"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-semibold">{item.title}</span>
              <time
                className="shrink-0 text-xs text-muted"
                dateTime={item.publishedAt}
              >
                {formatDateShort(item.publishedAt)}
              </time>
            </div>
            <span className="text-sm text-muted">{item.summary}</span>
            <span className="text-xs text-muted">{item.author}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
