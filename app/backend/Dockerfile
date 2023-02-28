FROM node:16.14

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm","start" ]