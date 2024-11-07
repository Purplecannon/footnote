// Author: Mia
// Central file for backend handling of user authentication

const express = require('express');
const router = express.Router();

const conn = require('../../config/database');
const bcrypt = require('bcrypt');

router.post('/create-user', async(req, res) => {
  const { username, password, confirmPassword } = req.body;

  try {
    const result = await createUser(username, password, confirmPassword);

    if (result === "Created user " + username.toLowerCase()) {
      // session
      req.session.isLoggedIn = true;
      req.session.username = username.toLowerCase();
      console.log(req.session);
    }

    res.send(result);  // TODO: wrap this in else block?
  } catch (err) {
    console.log('Error creating user: ', err);
    res.status(500).send('Error creating user');
  }
});

router.post('/login-user', async(req, res) => {
  const { username, password } = req.body;

  try {
    const result = await loginUser(username, password);

    if (result === "Login successful for user " + username.toLowerCase()) {
      // session
      req.session.isLoggedIn = true;
      req.session.username = username.toLowerCase();
      console.log(req.session);
    }

    res.send(result);  // TODO: wrap this in else block?
  } catch (err) {
    console.log('Error logging in user: ', err);
    res.status(500).send('Error logging in user');
  }
});

// session
// initialize the session middleware
// router.get('/', (req, res) => {
//   const sessionData = req.session;

//   // access session data
// });

// session
// router.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect('/login-user');
//     }
//   });
// });

// Create a new user given a username and password.
// The password stored is a hashed password.
// Usernames should be unique and are not case-sensitive.
async function createUser(username, password, confirmPassword) {
  const checkExistingSql = 'SELECT * FROM USERS WHERE username = ?';
  const createUserSql = 'INSERT INTO USERS(username, hashed_password) VALUES(?, ?)';

  try {
    // check if username, password, or confirmPassword is empty
    if (!username || username.trim() === "" || !password) {
      return "Username is empty";
    }
    if (!password || !confirmPassword ||
        password.trim() === "" || confirmPassword.trim() === "") {
      return "Password or confirm password is empty";
    }
    if (password !== confirmPassword) {
      return "Password and confirm password don't match";
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

    return "Created user " + usernameLower;
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
    if (!username || username.trim() === "" || !password || password.trim() === "") {
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
    const hashedPassword = existingUser[0].hashed_password;  // the stored hashedPassword
    const correctPassword = await bcrypt.compare(password, hashedPassword);

    if (correctPassword) {
      return "Login successful for user " + usernameLower;
    } else {
      return "Incorrect password";
    }
  } catch (err) {
    console.error('Error during user login: ', err);
    return 'Error during user login';
  }
}

// Exports
module.exports = router;
module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
