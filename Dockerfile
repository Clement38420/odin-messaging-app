FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# Step 1 : Dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Step 2 : Build
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Step 3 : Release
FROM base AS release
ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

COPY --from=build /app/.output /app/.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]