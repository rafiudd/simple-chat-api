/* eslint-disable strict */
const mysql = require('mysql2');

const databaseConnection = mysql
  .createConnection({
    host: 'localhost', // HOST NAME
    user: 'root', // USER NAME
    database: 'chat', // DATABASE NAME
    password: '', // DATABASE PASSWORD
  })
  .on('error', (err) => {
    // eslint-disable-next-line no-console
    console.log('Failed to connect to Database - ', err);
  });

module.exports = databaseConnection;
