// Author: Mia

const express = require('express');
const router = express.Router();

const conn = require('../services/database');
const bcrypt = require('bcrypt');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// TODO: Path is set up. Get username and password from front end.
router.get('/create-user', async(req, res) => {
  const username = 'footnote';
  const password = 'yippie';

  try {
    const result = await createUser(username, password);
    res.send(result);
  } catch (err) {
    console.log('Error creating user: ', err);
    res.status(500).send('Error creating user');
  }
});

// TODO: Path is set up. Get username and password from front end.
router.get('/login-user', async(req, res) => {
  const username = 'footnote';
  const password = 'yippie';

  try {
    const result = await loginUser(username, password);
    res.send(result);
  } catch (err) {
    console.log('Error logging in user: ', err);
    res.status(500).send('Error logging in user');
  }
});

///////// THESE FUNCTIONS ARE USED TO CREATE AND CLEAR ALL NECESSARY TABLES:  /////////
///////// INCLUDING USERS, PROJECTS, AND ANNOTATIONS                          /////////

// Create all necessary tables in Digital Ocean database.
async function createTables() {
  const createUsersTableSql = `
    CREATE TABLE IF NOT EXISTS USERS(
      username VARCHAR(100) PRIMARY KEY,
      hashedPassword VARCHAR(256) NOT NULL
    );
  `;
  const createProjectsTableSql = `
    CREATE TABLE IF NOT EXISTS PROJECTS(
      pid INT PRIMARY KEY AUTO_INCREMENT,
      projectName VARCHAR(100),
      videoUrl VARCHAR(2083),
      username VARCHAR(100) NOT NULL,
      FOREIGN KEY (username) REFERENCES USERS(username)
    );
  `;

  try {
    await new Promise((resolve, reject) => {
      conn.query(createUsersTableSql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
    console.log('USERS table created successfully');

    await new Promise((resolve, reject) => {
      conn.query(createProjectsTableSql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
    console.log('PROJECTS table created successfully');

  } catch (err) {
    console.log('Error creating tables: ', err);
  }
}

// Clear all necessary tables in Digital Ocean database.
// Not the same as drop tables (this is clearing, not dropping).
async function clearTables() {
  const clearUsersTableSql = `DELETE FROM USERS;`;
  const clearProjectsTableSql = `DELETE FROM PROJECTS;`;

  try {
    // Clear in the order of ANNOTATIONS -> PROJECTS -> USERS due to foreign key constraints
    await new Promise((resolve, reject) => {
      conn.query(clearProjectsTableSql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
    console.log('Successfully cleared PROJECTS table');

    await new Promise((resolve, reject) => {
      conn.query(clearUsersTableSql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
    console.log('Successfully cleared USERS table');

  } catch (err) {
    console.log('Error clearing tables: ', err);
  }
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

// Create a new user given a username and password.
// The password stored is a hashed password.
// Usernames should be unique and are not case-sensitive.
async function createUser(username, password) {
  const checkExistingSql = 'SELECT * FROM USERS WHERE username = ?';
  const createUserSql = 'INSERT INTO USERS(username, hashedPassword) VALUES(?, ?)';

  try {
    // check if username or password is empty
    if (!username || username.trim() === "" || !password) {
      return "Username or password is empty";
    }

    // usernames are not case-sensitive
    const usernameLower = username.toLowerCase();

    // check if username already exists
    const [existingUser] = await conn.promise().query(checkExistingSql, [usernameLower]);

    if (existingUser.length > 0) {
      return "Username already exists";
    }

    // hash the password with salt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert the new user into the database
    await conn.promise().query(createUserSql, [usernameLower, hashedPassword]);

    return "Created user " + usernameLower + "\n";
  } catch (err) {
    // handles error during user creation (eg. deadlock)
    console.error('Error during user creation: ', err);
    return 'Error during user creation';
  }
}

// Login an existing user given a username and password.
// The password stored is a hashed password.
// Usernames should be unique and are not case-sensitive.
async function loginUser(username, password) {
  const checkExistingSql = 'SELECT * FROM USERS WHERE username = ?';

  try {
    // check if username or password is empty
    if (!username || username.trim() === "" || !password) {
      return "Username or password is empty";
    }

    // usernames are not case-sensitive
    const usernameLower = username.toLowerCase();

    // check that username exists in database
    const [existingUser] = await conn.promise().query(checkExistingSql, [usernameLower]);

    if (existingUser.length === 0) {
      return "Username doesn't exist";
    }

    // compare the provided password with the stored hashed password
    const hashedPassword = existingUser[0].hashedPassword;  // the stored hashedPassword
    const correctPassword = await bcrypt.compare(password, hashedPassword);

    if (correctPassword) {
      return "Login successful for user " + usernameLower;
    } else {
      return "Incorrect username or password";
    }
  } catch (err) {
    console.error('Error during user login: ', err);
    return 'Error during user login';
  }
}

// Exports
module.exports = router;
module.exports.createTables = createTables;
module.exports.clearTables = clearTables;
module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
