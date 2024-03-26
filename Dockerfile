FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY ./prisma .

RUN yarn prisma generate

COPY . .

EXPOSE 3000

CMD [  "yarn", "dev" ]
