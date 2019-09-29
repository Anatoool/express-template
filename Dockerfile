FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY /src ./src
COPY /swagger ./swagger
RUN npm run build
EXPOSE 4000
CMD [ "npm", "start" ]
