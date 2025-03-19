FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install --production

COPY . .

RUN npm run build

ENV PORT 1715
ENV NODE_ENV production
EXPOSE 1715

CMD ["npm", "start"]
