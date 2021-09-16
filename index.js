const express = require('express');
const routes = require('./routes/route');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(routes);

app.get('/', function (req, res) {
    res.json({
        status: 200,
        message: 'Service is successfull running :D'
    });
});

const port = process.env.HTTP_PORT;

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});