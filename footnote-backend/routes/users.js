// Author: Mia
const express = require('express');
// const session = require('express-session');
// const path = require('path');
const conn = require('../services/database');
const bcrypt = require('bcrypt');  // for password hashing

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

async function userCreate(username, password) {
  const checkExistingSql = 'SELECT * FROM USERS WHERE username = ?';
  const createUserSql = 'INSERT INTO USERS(username, hashedPassword) VALUES(?, ?)';

  try {
    // check if username or password is empty
    if (!username || username.trim() === "" || !password) {
      return "Failed to create user\n";
    }

    const usernameLower = username.toLowerCase();

    // check if username already exists (not case-sensitive)
    const [existingUser] = await conn.promise().query(checkExistingSql, [usernameLower]);

    if (existingUser.length > 0) {
      return "Failed to create user\n";
    }

    // hash the password with salt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert the new user into the database
    await conn.promise().query(createUserSql, [usernameLower, hashedPassword]);

    return "Created user " + username + "\n";
  } catch (error) {
    // handles error during user creation (eg. deadlock)
    console.error('Error during user creation: ', error);
    return "Failed to create user\n";
  }
};

module.exports = router;
module.exports.userCreate = userCreate;
// module.exports.userLogin = userLogin;