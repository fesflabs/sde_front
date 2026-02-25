FROM node:23-alpine AS BUILDER

WORKDIR /app

RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . .
RUN pnpm run build

FROM node:23-alpine

WORKDIR /app

RUN npm i -g pnpm
COPY --from=BUILDER /app/node_modules ./node_modules
COPY --from=BUILDER /app/.next ./.next
COPY package.json ./

EXPOSE 3000
CMD ["pnpm", "start"]
