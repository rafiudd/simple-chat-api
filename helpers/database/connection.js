/* eslint-disable strict */
const mysql = require('mysql2');
const config = require('../../configs/global_config');

const databaseConnection = mysql
  .createConnection(config.get('/mysql'))
  .on('error', (err) => {
    // eslint-disable-next-line no-console
    console.log('Failed to connect to Database - ', err);
});

module.exports = databaseConnection;
