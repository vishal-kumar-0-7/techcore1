# Use Node 22 Alpine for small image size
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# Generate Prisma client using the locally installed CLI (no runtime download)
RUN npx prisma generate && chown -R node:node /app

# Don't run as root
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

# Use node directly — restarts are handled by Docker restart policy
# Apply pending migrations, then start
CMD ["sh", "-c", "npx prisma migrate deploy && exec node server.js"]
