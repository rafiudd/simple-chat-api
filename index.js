const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/route');
const app = express();
const db = require('./helpers/database/connection');

dotenv.config();
db.connect();
app.use(express.json());
app.use(routes);

const port = process.env.HTTP_PORT;

app.listen(port, function () {
    console.log('Server listening on port ' + port);
    console.log("Database connected successfully!");
});