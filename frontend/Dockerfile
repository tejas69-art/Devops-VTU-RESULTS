# =============================================================================
# Stage 1: Dependencies
# Install only production deps + cache node_modules for faster rebuilds
# =============================================================================
FROM node:20-alpine AS deps

# Install system dependencies needed for native modules
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package manifests first for Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies with clean install (respects lock file)
RUN npm ci --only=production && \
    # Cache dev deps separately for build stage
    cp -R node_modules /tmp/prod_node_modules && \
    npm ci

# =============================================================================
# Stage 2: Builder
# Compile TypeScript, build Next.js production bundle
# =============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all dependencies (including devDeps for build)
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build arguments for environment (passed at build time via CI)
ARG NEXT_PUBLIC_APP_ENV=production
ARG BUILD_SHA=local
# ─── Backend API URL: baked into Next.js bundle at build time ────────────────
# Passed via: docker build --build-arg NEXT_PUBLIC_BACKEND_URL=https://api.vtu.com
ARG NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

ENV NEXT_PUBLIC_APP_ENV=${NEXT_PUBLIC_APP_ENV}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_TELEMETRY_DISABLED=1


# Build the Next.js application
RUN npm run build

# =============================================================================
# Stage 3: Runner (production image)
# Minimal Alpine image, non-root user, only runtime artifacts
# =============================================================================
FROM node:20-alpine AS runner

# Security: add non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy production node_modules (no devDeps)
COPY --from=deps /tmp/prod_node_modules ./node_modules

# Copy built Next.js output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy package.json for version info
COPY --from=builder /app/package.json ./package.json

# Fix permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Health check — pings the app every 30s
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the Next.js standalone server
CMD ["node", "server.js"]
