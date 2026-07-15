/**
 * Domain types for feed content.
 *
 * Field names mirror the RSS 2.0 specification so that Assessment 2's live
 * RSS parser can populate these structures directly, with no translation
 * layer. The sample data in this assessment satisfies the same interface the
 * real feed will.
 *
 * RSS 2.0 reference: https://www.rssboard.org/rss-specification
 */

/** Maps to an RSS <enclosure> — a media object attached to an item. */
export interface FeedEnclosure {
  url: string
  type: string // MIME type, e.g. "image/jpeg"
  length?: number // size in bytes (optional here)
}

/** Maps to an RSS <item>. */
export interface FeedItem {
  slug: string // <guid> — also the route slug
  title: string // <title>
  link: string // <link>
  summary: string // <description> — card summary
  content: string // <content:encoded> — detail body
  publishedAt: string // <pubDate>, ISO 8601
  author: string // <dc:creator> / <author>
  categories: string[] // <category>
  enclosure?: FeedEnclosure // <enclosure> — optional media
}

/** Maps to an RSS <channel>. */
export interface Feed {
  id: string
  title: string // <title>
  description: string // <description>
  siteUrl: string // <link>
  items: FeedItem[]
}
