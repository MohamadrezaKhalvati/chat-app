FROM node:21.4.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build


EXPOSE 3001:3001
CMD ["npm", "run", "start:prod"]