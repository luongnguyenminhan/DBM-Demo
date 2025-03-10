# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json yarn.lock* ./
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/tsconfig.json ./
COPY --from=deps /app/tailwind.config.ts ./
COPY --from=deps /app/postcss.config.mjs ./

# Copy source files
COPY src ./src
COPY public ./public
COPY next.config.ts ./
COPY *.d.ts ./
COPY package.json yarn.lock* ./

RUN yarn build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/package.json /app/yarn.lock* ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]