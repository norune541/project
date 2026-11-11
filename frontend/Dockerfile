# Build stage
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Workspace manifests
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
COPY shared/package.json ./shared/package.json

# Install dependencies
RUN npm ci

# Copy project
COPY . .

# Build shared package first
RUN npm run build --workspace=shared

# Build frontend
RUN npm run build --workspace=frontend


# Production stage
FROM nginx:alpine AS production

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
