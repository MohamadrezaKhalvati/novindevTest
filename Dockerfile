# Build stage
FROM focker.ir/node:lts-alpine AS builder

WORKDIR /app


COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

RUN yarn add passport
COPY . .


RUN yarn run build


FROM focker.ir/node:lts-alpine AS production

WORKDIR /app


COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules




CMD ["npm", "run", "start:prod"]