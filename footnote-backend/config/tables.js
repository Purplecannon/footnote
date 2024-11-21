/**
 * Author: Mia
 * Functions to create, clear, reset all necessary tables including
 * USERS, PROJECTS, ANNOTATIONS, SESSIONS
 */

// Environment
const tableSuffix = process.env.DB_SUFFIX || "dev";

// Imports
const conn = require("./database");
const {
  CREATE_USERS_TABLE,
  CREATE_PROJECTS_TABLE,
  CREATE_ANNOTATIONS_TABLE,
  CLEAR_USERS_TABLE,
  CLEAR_PROJECTS_TABLE,
  CLEAR_ANNOTATIONS_TABLE,
  CLEAR_SESSIONS_TABLE,
  RESET_PROJECTS_TABLE,
  RESET_ANNOTATIONS_TABLE,
} = require("../queries/sqlConstants");

/**
 * Creates all necessary tables in the database.
 * This function runs SQL queries to create the USERS, PROJECTS, and ANNOTATIONS tables.
 */
async function createTables() {
  await createTable(CREATE_USERS_TABLE, `USERS_${tableSuffix}`);
  await createTable(CREATE_PROJECTS_TABLE, `PROJECTS_${tableSuffix}`);
  await createTable(CREATE_ANNOTATIONS_TABLE, `ANNOTATIONS_${tableSuffix}`);
}

/**
 * Clears all data from the necessary tables while preserving their structure.
 * This function executes SQL queries to remove all rows from the USERS, PROJECTS, ANNOTATIONS, and SESSIONS tables.
 * It clears the tables in a specific order to account for foreign key constraints (e.g., ANNOTATIONS -> PROJECTS -> USERS).
 */
async function clearTables() {
  await clearTable(CLEAR_ANNOTATIONS_TABLE, `ANNOTATIONS_${tableSuffix}`);
  await clearTable(CLEAR_PROJECTS_TABLE, `PROJECTS_${tableSuffix}`);
  await clearTable(CLEAR_USERS_TABLE, `USERS_${tableSuffix}`);
  await clearTable(CLEAR_SESSIONS_TABLE, `SESSIONS_${tableSuffix}`);
}

/**
 * Resets specific tables, typically used to reinitialize data for projects or annotations.
 * This function runs SQL queries to reset the ANNOTATIONS and PROJECTS tables, which involve resetting
 * auto-increment values to return the tables to their original state.
 */
async function resetTables() {
  await resetTable(RESET_ANNOTATIONS_TABLE, `ANNOTATIONS_${tableSuffix}`);
  await resetTable(RESET_PROJECTS_TABLE, `PROJECTS_${tableSuffix}`);
}

/**
 * Creates a table in the DigitalOcean database cluster using the provided SQL query.
 * @param {string} tableSql - The SQL query to execute for creating the table.
 * @param {string} tableName - The name of the table to be created.
 */
async function createTable(tableSql, tableName) {
  try {
    await conn.promise().query(tableSql);
    console.log(`${tableName} table created`);
  } catch (err) {
    console.log(`Error creating table ${tableName}`, err);
  }
}

/**
 * Clears all data from the specified table in the DigitalOcean database.
 * This function executes the provided SQL query to remove all rows from the target table
 * while preserving its structure.
 * @param {string} tableSql - The SQL query to execute for clearing the table.
 * @param {string} tableName - The name of the table to be cleared.
 */
async function clearTable(tableSql, tableName) {
  try {
    await conn.promise().query(tableSql);
    console.log(`${tableName} table cleared`);
  } catch (err) {
    console.log(`Error clearing table ${tableName}`, err);
  }
}

/**
 * Resets the auto-increment value of the specified table in the DigitalOcean database.
 * This function executes the provided SQL query to reset the auto-increment counter of
 * the target table to 1, which is typically used to restart the sequence for primary key IDs.
 * @param {string} tableSql - The SQL query to execute for resetting the table's auto-increment.
 * @param {string} tableName - The name of the table whose auto-increment value will be reset.
 */
async function resetTable(tableSql, tableName) {
  try {
    await conn.promise().query(tableSql);
    console.log(`${tableName} table reset`);
  } catch (err) {
    console.log(`Error resetting table ${tableName}`, err);
  }
}

// Exports
module.exports.createTables = createTables;
module.exports.clearTables = clearTables;
module.exports.resetTables = resetTables;
