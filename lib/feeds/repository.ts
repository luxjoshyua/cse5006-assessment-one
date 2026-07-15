import type { Feed, FeedItem } from "./types"

/**
 * Abstraction over the source of feed data.
 *
 * A1: SampleFeedRepository (in-memory).
 * A2: an RSS/database-backed implementation.
 * Pages depend on this interface, so swapping the source is a one-line change
 * in ./index.ts. Methods are async now so the DB-backed version in A2 is a
 * drop-in with no call-site changes.
 */
export interface FeedRepository {
  listItems(): Promise<FeedItem[]>
  getItem(slug: string): Promise<FeedItem | null>
  listFeeds(): Promise<Feed[]>
  getFeed(id: string): Promise<Feed | null>
}
