#!/bin/sh
set -e

echo "Applying database migrations..."
pnpm prisma migrate deploy

echo "Starting application..."
exec "$@"