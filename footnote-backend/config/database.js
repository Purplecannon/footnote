/**
 * Central file for database configuration
 */

const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config(); // Load environment variables

/**
 * @constant {string} caCert - The CA certificate for SSL connection.
 * It either retrieves the certificate from the environment variable DB_SSL__CA_STR or reads from the file
 * specified in the environment variable DB_SSL__CA.
 */
let caCert;
if (process.env.DB_SSL__CA_STR !== undefined) {
  caCert = process.env.DB_SSL__CA_STR;
} else {
  caCert = fs.readFileSync(process.env.DB_SSL__CA);
}

/**
 * @constant {object} conn - The MySQL connection object used to interact with the database.
 * It is created using the configuration provided by environment variables. SSL is enabled using the CA certificate.
 */
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: {
    // enable SSL mode as required by DigitalOcean database
    rejectUnauthorized: true,
    ca: caCert,
  },
});

/**
 * Tests the database connection by attempting to connect and logging the result.
 * Logs an error message if the connection fails or confirms the connection with the thread ID.
 * @function
 */
conn.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  } else {
    console.log("Connected to the database as " + conn.threadId);
  }
});

// Exports
module.exports = conn;
