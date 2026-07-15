import type { Feed } from "./types"

const SAMPLE_FEED: Feed = {
  id: "lms-updates",
  title: "LMS Course Updates",
  description:
    "Announcements and articles syndicated into the learning management system.",
  siteUrl: "https://example.edu/lms",
  items: [
    {
      slug: "welcome-to-the-rss-server",
      title: "Welcome to the RSS Server",
      link: "https://example.edu/lms/welcome-to-the-rss-server",
      summary:
        "An introduction to how syndicated content flows into the LMS and what students can expect each week.",
      content:
        "The RSS Server collects updates from across the course and delivers them into one reading surface inside the LMS. This first post explains the reading experience: how items are listed, how to open a full article, and how the layout adapts on smaller screens. In later stages these sample posts are replaced by live feed data, but the interface stays the same.",
      publishedAt: "2026-07-01T09:00:00.000Z",
      author: "Course Team",
      categories: ["Announcements"],
      enclosure: {
        url: "https://picsum.photos/seed/welcome/800/450",
        type: "image/jpeg",
      },
    },
    {
      slug: "reading-feeds-on-any-device",
      title: "Reading Feeds on Any Device",
      link: "https://example.edu/lms/reading-feeds-on-any-device",
      summary:
        "The feed layout is built to be scanned quickly on a phone as easily as on a laptop.",
      content:
        "Feed items are presented as cards with a clear title, publication date, and short summary, so the list can be scanned at a glance. Opening an item reveals the full content on its own page, with a breadcrumb back to the list. The same structure holds once live RSS feeds are connected, because each card is driven by the same fields an RSS item provides.",
      publishedAt: "2026-07-04T14:30:00.000Z",
      author: "Course Team",
      categories: ["Guides", "Usability"],
    },
    {
      slug: "what-changes-in-assessment-two",
      title: "What Changes in Assessment Two",
      link: "https://example.edu/lms/what-changes-in-assessment-two",
      summary:
        "A preview of the backend work: a database, an API, and real RSS feeds replacing this sample content.",
      content:
        "This stage is frontend only. The next stage introduces a database and an API so the server can accept and store real RSS feeds, and a client page to consume them. Because the interface is already built against an RSS-shaped data model, connecting the live source is a matter of changing where the data comes from, not how it is displayed.",
      publishedAt: "2026-07-08T08:15:00.000Z",
      author: "Course Team",
      categories: ["Announcements", "Roadmap"],
    },
  ],
}

export const SAMPLE_FEEDS: Feed[] = [SAMPLE_FEED]
