FROM node:alpine

WORKDIR /app

COPY package.json .

RUN yarn install --production --frozen-lockfile

COPY . .

CMD ["yarn", "dev"]
