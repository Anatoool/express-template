# Express template
Technologies
----------

- [Express.js](https://expressjs.com)
- MongoDB + [Mongoose](https://mongoosejs.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [Swagger](https://github.com/scottie1984/swagger-ui-express) + [yaml](https://github.com/jeremyfa/yaml.js)

Docker deployment
--------------------
> docker build -t express-template .
>
> docker-compose up

Deployment
--------------------
Install [MongoDB](https://www.mongodb.com/download-center/community)

Start mongod service (example for linux)
> sudo service mongod start

Install dependencies:

>npm install

For start the server:

>npm start

For start the development server:

>npm run server

Server starts on localhost:4000

Swagger url: localhost:4000/swagger 

