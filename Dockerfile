# Step 1: Use official Node.js image
FROM node:18-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy rest of the code
COPY . .

# Step 5: Add required environment variables before build
ENV AUTH_SECRET=de57e9bcafaba6812bead9fd858c21c888f3459edeb17d6763ad5e200f2e600f
ENV NODE_ENV=production

# Step 6: Generate Prisma client & build Next.js app
RUN npx prisma generate
RUN npm run build

# Step 7: Production image
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV AUTH_SECRET=de57e9bcafaba6812bead9fd858c21c888f3459edeb17d6763ad5e200f2e600f

# Copy built app from builder
COPY --from=builder /app ./

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
