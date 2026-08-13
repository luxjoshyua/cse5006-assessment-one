import type { Feed, FeedItem } from "./types"

/** Escape the five XML predefined entities. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toRfc822(iso: string): string {
  return new Date(iso).toUTCString()
}

function itemToXml(item: FeedItem): string {
  const parts = [
    `      <title>${escapeXml(item.title)}</title>`,
    `      <link>${escapeXml(item.link)}</link>`,
    `      <guid isPermaLink="false">${escapeXml(item.slug)}</guid>`,
    `      <description>${escapeXml(item.summary)}</description>`,
    `      <pubDate>${toRfc822(item.publishedAt)}</pubDate>`,
    `      <dc:creator>${escapeXml(item.author)}</dc:creator>`,
    ...item.categories.map((c) => `      <category>${escapeXml(c)}</category>`),
  ]

  if (item.enclosure) {
    parts.push(
      `      <enclosure url="${escapeXml(item.enclosure.url)}" type="${escapeXml(item.enclosure.type)}" />`,
    )
  }

  return `    <item>\n${parts.join("\n")}\n    </item>`
}

/** Serialise a feed and its items as an RSS 2.0 document. */
export function feedToRss(feed: Feed, items: FeedItem[]): string {
  const channel = [
    `    <title>${escapeXml(feed.title)}</title>`,
    `    <link>${escapeXml(feed.siteUrl)}</link>`,
    `    <description>${escapeXml(feed.description)}</description>`,
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
  ].join("\n")

  const body = items.map(itemToXml).join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
${channel}
${body}
  </channel>
</rss>`
}
