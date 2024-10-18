// author: Mia
// a central file for database configuration

const mysql = require('mysql2');

// create a connection pool (recommended for scaling)
const pool = mysql.createPool({
  host: 'private-footnote-mysql-db-do-user-18061608-0.d.db.ondigitalocean.com',
  user: 'doadmin',
  password: 'AVNS_GtmewqnqsWYUqVHb7_8',
  database: 'defaultdb',
  port: 25060,
  ssl: {
    // enable SSL mode as required by the DigitalOcean database
    rejectUnauthorized: true
  }
});

// export a Promise-based version of the pool
module.exports = pool.promise();

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