require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.HTTP_PORT,
  mysql: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  },
  jwtKey: process.env.JWT_SECRET
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);