import { sampleFeedRepository } from "./sample-repository"
import type { FeedRepository } from "./repository"

/**
 * The active feed source. In Assessment 2 this binding switches to the
 * RSS/database-backed repository; nothing else in the app changes.
 */
export const feeds: FeedRepository = sampleFeedRepository

export type { Feed, FeedItem, FeedEnclosure } from "./types"
export type { FeedRepository } from "./repository"
