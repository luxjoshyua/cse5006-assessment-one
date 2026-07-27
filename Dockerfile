# -------- Stage 1: Build --------
FROM node:24-alpine AS builder

WORKDIR /app

# Prisma needs OpenSSL on Alpine
RUN apk add --no-cache openssl

# pnpm via corepack (project uses pnpm, not npm)
RUN corepack enable && corepack prepare pnpm@11.15.1 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# prisma generate reads prisma.config.ts, which requires DATABASE_URL to
# resolve. Generation only emits types from the schema — it never connects —
# so a placeholder is sufficient here. The real URL is injected at runtime.
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"

COPY . .

# Generate the Prisma client before building the app
RUN pnpm prisma generate
RUN pnpm build

# -------- Stage 2: Production --------
FROM node:24-alpine

RUN apk add --no-cache tini openssl
RUN corepack enable && corepack prepare pnpm@11.15.1 --activate

ENV NODE_ENV=production
WORKDIR /app

# Copy only what the running app needs
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/lib/generated ./lib/generated
COPY --from=builder /app/docker-entrypoint.sh ./

RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["/sbin/tini", "--", "./docker-entrypoint.sh"]

EXPOSE 3000

CMD ["pnpm", "start"]