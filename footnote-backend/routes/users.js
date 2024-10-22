// Author: Mia

<<<<<<< HEAD
const express = require('express');
const conn = require('../services/database');
const bcrypt = require('bcrypt');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// TODO: Path is set up. Get username and password from front end.
router.get('/create-user', async(req, res) => {
  const username = 'footnote';
  const password = 'yippie';
=======
// COPY THIS LINE INTO ANY FILES THAT NEED DB CONNECTION //
const db = require("../database");

// npm install bcrypt
const bcrypt = require("bcrypt"); // for password hashing

// defines all the routes related to user operations
const express = require("express");
const router = express.Router();

/**
 * Creates an account from the given username and password. The password is
 * stored internally as a hashed password.
 * @param {*} username - the passed in username
 * @param {*} password - the passed in password
 * @returns
 */
async function userCreate(username, password) {
  // start a transaction
  const conn = await db.getConnection(); // initialize the connection object
>>>>>>> 163a124aabcbe9e2abf8e9808ef2368865a8467a

  try {
    const result = await userCreate(username, password);
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
    const result = await userLogin(username, password);
    res.send(result);
  } catch (err) {
    console.log('Error logging in user: ', err);
    res.status(500).send('Error logging in user');
  }
});

// Create all necessary tables in Digital Ocean database.
async function createTables() {
  const createTablesSql = `
    CREATE TABLE IF NOT EXISTS USERS(
      username VARCHAR(100) PRIMARY KEY,
      hashedPassword VARCHAR(256) NOT NULL
    );
  `;

  try {
    await new Promise((resolve, reject) => {
      conn.query(createTablesSql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
    console.log('Tables created successfully');
  } catch (err) {
    console.log('Error creating tables: ', err);
  }
}

// Clear all necessary tables in Digital Ocean database.
// Not the same as drop tables (this is clearing, not dropping).
async function clearTables() {
  const clearTablesSql = `DELETE FROM USERS`;

  try {
    await new Promise((resolve, reject) => {
      conn.query(clearTablesSql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
    console.log('Successfully cleared tables');
  } catch (err) {
    console.log('Error clearing tables: ', err);
  }
}

// Create a new user given a username and password.
// The password stored is a hashed password.
// Usernames should be unique and are not case-sensitive.
async function userCreate(username, password) {
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

<<<<<<< HEAD
    return "Created user " + usernameLower + "\n";
  } catch (err) {
    // handles error during user creation (eg. deadlock)
    console.error('Error during user creation: ', err);
    return 'Error during user creation';
=======
    // commit the transaction (end)
    await conn.commit();
    return "Created user " + username + "\n";
  } catch (error) {
    // handles error during user creation (eg. deadlock)
    console.error("Error during user creation: ", error);
    await conn.rollback();
    return "Failed to create user\n";
  } finally {
    conn.release(); // release the connection back to the pool
>>>>>>> 163a124aabcbe9e2abf8e9808ef2368865a8467a
  }
}

// Login an existing user given a username and password.
// The password stored is a hashed password.
// Usernames should be unique and are not case-sensitive.
async function userLogin(username, password) {
  const checkExistingSql = 'SELECT * FROM USERS WHERE username = ?';

  try {
<<<<<<< HEAD
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
module.exports.userCreate = userCreate;
module.exports.userLogin = userLogin;
=======
    const [results] = await db.execute();
  } catch (error) {
    console.error("Error querying from database: ", error);
  }
}

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
module.exports = userLogin;
module.exports = userCreate;
// NOTE //
/**
 * to start, commit, rollback transactions:
 * conn.beginTransaction(), conn.commit(), conn.rollback()
 *
 * to acquire a connection from the pool then release it
 * db.getConnection(), conn.release()
 */
>>>>>>> 163a124aabcbe9e2abf8e9808ef2368865a8467a
