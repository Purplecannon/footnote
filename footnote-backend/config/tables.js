// Author: Mia

// Include methods to create and clear all necessary tables including
// tables USERS, PROJECTS, ANNOTATIONS, sessions

const conn = require('./database');

// Create all necessary tables in Digital Ocean database.
async function createTables() {
  const createUsersTableSql = `
    CREATE TABLE IF NOT EXISTS USERS(
      username VARCHAR(100) PRIMARY KEY,
      hashed_password VARCHAR(256) NOT NULL
    );
  `;
  const createProjectsTableSql = `
    CREATE TABLE IF NOT EXISTS PROJECTS(
      pid INT PRIMARY KEY AUTO_INCREMENT,
      project_name VARCHAR(100),
      video_url VARCHAR(2083),
      thumbnail_url VARCHAR(2083),
      username VARCHAR(100) NOT NULL,
      FOREIGN KEY (username) REFERENCES USERS(username)
    );
  `;

  try {
    await conn.promise().query(createUsersTableSql);
    console.log('USERS table created successfully');

    await conn.promise().query(createProjectsTableSql);
    console.log('PROJECTS table created successfully');

  } catch (err) {
    console.log('Error creating tables: ', err);
  }
}

// Clear all necessary tables in Digital Ocean database.
// Not the same as drop tables (this is clearing, not dropping).
async function clearTables() {
  const clearUsersTableSql = 'DELETE FROM USERS;';
  const clearProjectsTableSql = 'DELETE FROM PROJECTS;';
  const resetProjectsTableSql= 'ALTER TABLE PROJECTS AUTO_INCREMENT = 1;';
  const clearSessionsTableSql = 'DELETE FROM sessions;';

  try {
    // Clear in the order of ANNOTATIONS -> PROJECTS -> USERS due to foreign key constraints
    await conn.promise().query(clearProjectsTableSql);
    console.log('Successfully cleared PROJECTS table');

    await conn.promise().query(resetProjectsTableSql);
    console.log('Successfully reset PROJECTS table pid autoincrement');

    await conn.promise().query(clearUsersTableSql);
    console.log('Successfully cleared USERS table');

    await conn.promise().query(clearSessionsTableSql);
    console.log('Successfully cleared sessions table');

  } catch (err) {
    console.log('Error clearing tables: ', err);
  }
}

// Exports
module.exports.createTables = createTables;
module.exports.clearTables = clearTables;