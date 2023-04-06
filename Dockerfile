FROM node:19-alpine

EXPOSE 3000

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . .

CMD [ "node", "server.js" ]
