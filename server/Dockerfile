# Use Node 22 Alpine for small image size
FROM node:22-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000

# Use node directly — PM2 is handled by Docker restart policy
CMD ["node", "server.js"]
