# ---------- Base ----------
FROM node:16.3.0-alpine AS base

WORKDIR /app

# ---------- Builder ----------
# Creates:
# - node_modules: production dependencies (no dev dependencies)
# - dist: A production build compiled with Babel
FROM base AS builder

COPY package*.json .babelrc.json ./

RUN npm install

COPY ./src ./src

RUN npm run build

RUN npm prune --production # Remove dev dependencies

# ---------- Release ----------
FROM base AS release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# docker run -p 3000:3000 --env PORT=3000 --rm node-docker-boilerplate
USER node
EXPOSE 3000:3000
CMD ["node", "./dist/index.js"]