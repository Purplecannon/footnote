/**
 * Author: Mia
 * Handle all user-related logic
 */

// COPY THIS LINE INTO ANY FILES THAT NEED DB CONNECTION //
const db = require('../database');

// npm install bcrypt
const bcrypt = require('bcrypt');  // for password hashing

// defines all the routes related to user operations
const express = require('express');
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
  const conn = await db.getConnection();  // initialize the connection object

  try {
    await conn.beginTransaction();

    // check if username or password is empty
    if (!username || username.trim() === "" || !password) {
      await conn.rollback();
      return "Failed to create user\n";
    }

    const usernameLower = username.toLowerCase();

    // check if username already exists (not case-sensitive)
    const [existingUser] = await conn.query(
      "SELECT * FROM USERS WHERE username = ?",
      [usernameLower]
    );

    if (existingUser.length > 0) {
      await conn.rollback();
      return "Failed to create user\n";
    }

    // hash the password with salt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert the new user into the database
    await conn.query(
      "INSERT INTO USERS(username, hashedPassword) VALUES(?, ?)",
      [usernameLower, hashedPassword]
    );

    // commit the transaction (end)
    await conn.commit();
    return "Created user " + username + "\n";

  } catch (error) {
    // handles error during user creation (eg. deadlock)
    console.error('Error during user creation: ', error);
    await conn.rollback();
    return "Failed to create user\n";

  } finally {
    conn.release();  // release the connection back to the pool
  }
};

// Handles the backend of a user login
async function userLogin(username, password) {
  // TODO: FINISH THIS
  try {
    const [results] = await db.execute();

  } catch (error) {
    console.error('Error querying from database: ', error);
  }

};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = { router, userLogin, userCreate };

// NOTE //
/**
 * to start, commit, rollback transactions:
 * conn.beginTransaction(), conn.commit(), conn.rollback()
 *
 * to acquire a connection from the pool then release it
 * db.getConnection(), conn.release()
 */