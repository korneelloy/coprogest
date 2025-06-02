const mysql = require('mysql2');

const config = require('../config/config.json');

let pool;

try {
  pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password
  });
  console.log('Connected to database.');
} catch(err) {
  console.error('Could not connect to the database:', err.message);
  process.exit(1);
}

module.exports = pool.promise();
