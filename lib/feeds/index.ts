import { prismaFeedRepository } from "./prisma-repository"
import type { FeedRepository } from "./repository"

export const feeds: FeedRepository = prismaFeedRepository

export type { Feed, FeedItem, FeedEnclosure } from "./types"
export type { FeedRepository } from "./repository"
