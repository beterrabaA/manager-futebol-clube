FROM node:16.14

WORKDIR /app-frontend

COPY package*.{json,npm} ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm","start" ]