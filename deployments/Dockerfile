# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the TypeScript application (ensure "build" script is defined in package.json)
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from the builder stage:
# - package files (for production dependencies)
# - compiled JavaScript code (e.g., in a dist/ folder)
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

# Expose the port your app listens on (adjust if necessary)
EXPOSE 3000

# Set the command to run your app (adjust the entry point if needed)
CMD ["node", "dist/index.js"]
