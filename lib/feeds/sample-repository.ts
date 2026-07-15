import type { FeedRepository } from "./repository"
import type { Feed, FeedItem } from "./types"
import { SAMPLE_FEEDS } from "./sample-data"

class SampleFeedRepository implements FeedRepository {
  async listFeeds(): Promise<Feed[]> {
    return SAMPLE_FEEDS
  }

  async getFeed(id: string): Promise<Feed | null> {
    return SAMPLE_FEEDS.find((feed) => feed.id === id) ?? null
  }

  async listItems(): Promise<FeedItem[]> {
    return SAMPLE_FEEDS.flatMap((feed) => feed.items).sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
  }

  async getItem(slug: string): Promise<FeedItem | null> {
    return (
      SAMPLE_FEEDS.flatMap((feed) => feed.items).find(
        (item) => item.slug === slug,
      ) ?? null
    )
  }
}

export const sampleFeedRepository = new SampleFeedRepository()
