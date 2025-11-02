# Step 1: Use official Node.js image
FROM node:18-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy all files
COPY . .

# Step 5: Set required environment variables
ENV NODE_ENV=production
ENV AUTH_SECRET=de57e9bcafaba6812bead9fd858c21c888f3459edeb17d6763ad5e200f2e600f

# Step 6: Generate Prisma client & build Next.js app
RUN npx prisma generate
RUN npm run build

# Step 7: Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only what’s needed for production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
