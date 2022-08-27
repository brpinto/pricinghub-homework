FROM node:17-alpine

WORKDIR /app

COPY package.json .

COPY tsconfig.json .

COPY tsconfig.path.json .

RUN yarn install

RUN yarn add sass

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]