const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/route');
const app = express();
const db = require('./helpers/database/connection');
const config = require('./configs/global_config');

dotenv.config();
db.connect();
app.use(express.json());
app.use(routes);

app.listen(config.get('/port'), function () {
  console.log(`Server listening on port ${config.get('/port')}`);
  console.log('Database connected successfully!');
});