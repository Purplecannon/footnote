/**
 * Author: Mia
 * All SQL constants
 */

// Environment
const tableSuffix = process.env.DB_SUFFIX || "dev";

/////////////////////////////////////TABLES/////////////////////////////////////
// Create table queries
const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS USERS_${tableSuffix}(
    username VARCHAR(100) PRIMARY KEY,
    hashed_password VARCHAR(256) NOT NULL
  );
`;
const CREATE_PROJECTS_TABLE = `
  CREATE TABLE IF NOT EXISTS PROJECTS_${tableSuffix}(
    pid INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR(100),
    video_url VARCHAR(2083),
    thumbnail_url VARCHAR(2083),
    username VARCHAR(100) NOT NULL,
    FOREIGN KEY (username) REFERENCES USERS_${tableSuffix}(username)
  );
`;
const CREATE_ANNOTATIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS ANNOTATIONS_${tableSuffix}(
    aid INT PRIMARY KEY AUTO_INCREMENT,
    timestampStr VARCHAR(256),
    timestampNum DOUBLE,
    text VARCHAR(1000),
    pid INT NOT NULL,
    FOREIGN KEY (pid) REFERENCES PROJECTS_${tableSuffix}(pid)
  );
`;

// Clear table queries
const CLEAR_USERS_TABLE = `DELETE FROM USERS_${tableSuffix};`;
const CLEAR_PROJECTS_TABLE = `DELETE FROM PROJECTS_${tableSuffix};`;
const CLEAR_ANNOTATIONS_TABLE = `DELETE FROM ANNOTATIONS_${tableSuffix};`;
const CLEAR_SESSIONS_TABLE = `DELETE FROM SESSIONS_${tableSuffix};`;

// Reset table queries
const RESET_PROJECTS_TABLE = `ALTER TABLE PROJECTS_${tableSuffix} AUTO_INCREMENT = 1;`;
const RESET_ANNOTATIONS_TABLE = `ALTER TABLE ANNOTATIONS_${tableSuffix} AUTO_INCREMENT = 1;`;

/////////////////////////////////////USERS//////////////////////////////////////
const CHECK_EXISTING_USER = `SELECT * FROM USERS_${tableSuffix} WHERE username = ?;`;
const CREATE_NEW_USER = `INSERT INTO USERS_${tableSuffix}(username, hashed_password) VALUES(?, ?);`;

////////////////////////////////////PROJECTS////////////////////////////////////
const CHECK_OWN_PROJECT = `SELECT username FROM PROJECTS_${tableSuffix} WHERE pid = ?;`;
const GET_PROJECTS_BY_USERNAME = `SELECT pid, project_name FROM PROJECTS_${tableSuffix} WHERE username = ?;`;
const INSERT_PROJECT = `INSERT INTO PROJECTS_${tableSuffix}(username) VALUES(?);`;
const GET_PROJECT_BY_PID = `SELECT * FROM PROJECTS_${tableSuffix} WHERE pid = ?;`;
const UPDATE_PROJECTNAME = `UPDATE PROJECTS_${tableSuffix} SET project_name = ? WHERE pid = ?;`;
const DELETE_PROJECT_BY_PID = `DELETE FROM PROJECTS_${tableSuffix} WHERE pid = ?;`;
const UPDATE_PROJECTURL = `UPDATE PROJECTS_${tableSuffix} SET video_url = ? WHERE pid = ?;`;

///////////////////////////////////ANNOTATIONS//////////////////////////////////
const DELETE_ANNOTATIONS_BY_PID = `DELETE FROM ANNOTATIONS_${tableSuffix} WHERE pid = ?`;
const GET_ANNOTATIONS_BY_PID = `SELECT aid, timestamp, text FROM ANNOTATIONS_${tableSuffix} WHERE pid = ?;`;
const INSERT_ANNOTATION = `INSERT INTO ANNOTATIONS_${tableSuffix} (timestamp, text, pid) VALUES (?, ?, ?);`;
const UPDATE_ANNOTATION = `UPDATE ANNOTATIONS_${tableSuffix} SET text = ? WHERE aid = ?;`;
const DELETE_ANNOTATION_BY_AID = `DELETE FROM ANNOTATIONS_${tableSuffix} WHERE aid = ?;`;

// Exports
module.exports = {
  CREATE_USERS_TABLE,
  CREATE_PROJECTS_TABLE,
  CREATE_ANNOTATIONS_TABLE,
  CLEAR_USERS_TABLE,
  CLEAR_PROJECTS_TABLE,
  CLEAR_ANNOTATIONS_TABLE,
  CLEAR_SESSIONS_TABLE,
  RESET_PROJECTS_TABLE,
  RESET_ANNOTATIONS_TABLE,
  CHECK_EXISTING_USER,
  CREATE_NEW_USER,
  CHECK_OWN_PROJECT,
  GET_PROJECTS_BY_USERNAME,
  INSERT_PROJECT,
  GET_PROJECT_BY_PID,
  UPDATE_PROJECTNAME,
  DELETE_PROJECT_BY_PID,
  UPDATE_PROJECTURL,
  DELETE_ANNOTATIONS_BY_PID,
  GET_ANNOTATIONS_BY_PID,
  INSERT_ANNOTATION,
  UPDATE_ANNOTATION,
  DELETE_ANNOTATION_BY_AID,
};
