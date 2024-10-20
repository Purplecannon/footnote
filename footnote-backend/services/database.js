// author: Mia
// a central file for database configuration

const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();  // load env variables

const caCert = fs.readFileSync(process.env.DB_SSL__CA);

// create a connection
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: {
    // enable SSL mode as required by DigitalOcean database
    rejectUnauthorized: true,
    ca: caCert
  }
});

// tests the connection
conn.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  } else {
    console.log('Connected to the database as ' + conn.threadId);
  }
});

module.exports = conn;

///////// NOTES ///////////
/**
 * A connection pool: is a cache of database connections that are maintained in
 * memory so they can be reused instead of having to open a new connection
 * everytime the application interacts with the database.
 * Important for efficiency, concurrency, and resource management.
 *
 * Promises: in connection pools help handle async database queries in a
 * readable way. Promises allow the use of async/await for cleaner, more
 * synchronous-looking code.
 */