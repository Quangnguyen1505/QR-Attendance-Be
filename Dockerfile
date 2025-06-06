# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && \
    yarn cache clean && \
    rm -rf /root/.cache /tmp/*

COPY --from=builder /app/dist ./dist

RUN adduser -D myuser
USER myuser

CMD ["node", "dist/main"]
