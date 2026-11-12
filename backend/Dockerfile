# =========================
# Build
# =========================
FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
COPY shared/package.json ./shared/package.json

RUN npm ci

COPY . .

WORKDIR /app/backend

RUN  DISABLE_ERD=true \
    npx prisma generate

WORKDIR /app

RUN npm run shared:build
RUN npm run backend:build


# =========================
# Production dependencies
# =========================
FROM node:22-bookworm-slim AS deps

WORKDIR /app

COPY package.json package-lock.json ./

COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
COPY shared/package.json ./shared/package.json

RUN npm ci --omit=dev \
    --workspace=backend \
    --workspace=shared


# =========================
# Production
# =========================
FROM node:22-bookworm-slim AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

# Backend
COPY --from=builder /app/backend/package.json ./backend/package.json
COPY --from=builder /app/backend/dist ./backend/dist

# Prisma CLI configuration and migrations
COPY --from=builder /app/backend/prisma.config.ts ./backend/prisma.config.ts
COPY --from=builder /app/backend/src/prisma/schema.prisma ./backend/src/prisma/schema.prisma
COPY --from=builder /app/backend/src/prisma/migrations ./backend/src/prisma/migrations

# Generated Prisma Client
COPY --from=builder /app/backend/src/generated/prisma ./backend/dist/generated/prisma

# Shared workspace
COPY --from=builder /app/shared/package.json ./shared/package.json
COPY --from=builder /app/shared/dist ./shared/dist

WORKDIR /app/backend

EXPOSE 3000

CMD ["sh", "-c", "npm run db:deploy && npm run db:seed:prod && node dist/main.js"]