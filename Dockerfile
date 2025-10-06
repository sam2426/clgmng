# Dockerfile.dev
FROM node:20-alpine

# Install necessary packages
RUN apk add --no-cache libc6-compat bash

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start in dev mode with hot reload
CMD ["npm", "run", "start:dev"]