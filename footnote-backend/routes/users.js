// Author: Mia

const express = require('express');
const conn = require('../services/database');
const bcrypt = require('bcrypt');  // for password hashing
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Path is set up. Figure out how to get username and password from front end.
router.get('/create-user', async(req, res) => {
  const username = 'footnote';
  const password = 'yippie';

  try {
    const result = await userCreate(username, password);
    res.send(result);
  } catch (err) {
    console.log('Error creating user: ', err);
    res.status(500).send('Error creating user');
  }
});

async function createTables() {
  const createTablesSql = `
    CREATE TABLE IF NOT EXISTS USERS(
      username VARCHAR(100) PRIMARY KEY,
      hashedPassword VARBINARY(256) NOT NULL
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

async function userCreate(username, password) {
  const checkExistingSql = 'SELECT * FROM USERS WHERE username = ?';
  const createUserSql = 'INSERT INTO USERS(username, hashedPassword) VALUES(?, ?)';

  try {
    // check if username or password is empty
    if (!username || username.trim() === "" || !password) {
      return "Username or password is empty";
    }

    const usernameLower = username.toLowerCase();

    // check if username already exists (not case-sensitive)
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
  } catch (error) {
    // handles error during user creation (eg. deadlock)
    console.error('Error during user creation: ', error);
    return "Error during user creation";
  }
};

module.exports = router;
module.exports.createTables = createTables;
module.exports.userCreate = userCreate;