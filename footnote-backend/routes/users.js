// Author: Mia
const express = require('express');
const router = express.Router();
const db = require('../services/database');
const bcrypt = require('bcrypt');  // for password hashing

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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

module.exports = router;
module.exports.userCreate = userCreate;
// module.exports.userLogin = userLogin;