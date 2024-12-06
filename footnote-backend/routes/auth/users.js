/**
 * Author: Mia, Catherine
 * Central file for backend handling of user authentication, includes session handling
 */

// Imports
const express = require("express");
const router = express.Router();
const conn = require("../../config/database");
const bcrypt = require("bcrypt");
const {
  CHECK_EXISTING_USER,
  CREATE_NEW_USER,
} = require("../../queries/sqlConstants");

/**
 * Creates a new user, with the given username, password (stored as hashedPassword)
 * Endpoint: POST http://localhost:3000/users/create-user
 */
router.post("/create-user", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  try {
    const result = await createUser(username, password, confirmPassword);

    if (result === "Created user " + username.toLowerCase()) {
      req.session.isLoggedIn = true;
      req.session.username = username.toLowerCase();
      return res.status(200).send(result);
    } else {
      return res.status(401).json({ message: result });
    }
  } catch (err) {
    console.log("Error creating user: ", err);
    res.status(500).send("Error creating user");
  }
});

/**
 * Login an existing user, with the given username, password
 * Endpoint: POST http://localhost:3000/users/login-user
 */
router.post("/login-user", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await loginUser(username, password);

    if (result === "Login successful for user " + username.toLowerCase()) {
      req.session.isLoggedIn = true;
      req.session.username = username.toLowerCase();
      return res.status(200).send(result);
    } else {
      return res.status(401).json({ message: result });
    }
  } catch (err) {
    console.log("Error logging in user: ", err);
    res.status(500).send("Error logging in user");
  }
});

/**
 * Logout an existing user, with the username currently associated with the session
 * Endpoint: GET http://localhost:3000/users/logout
 */
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error logging out");
    } else {
      return res.status(200).send("Logged out successfully");
    }
  });
});

/**
 * Create a new user given a username and password.
 * The password stored is a hashed password.
 * Usernames should be unique and are not case-sensitive.
 * @param {*} username
 * @param {*} password
 * @param {*} confirmPassword
 * @returns
 */
async function createUser(username, password, confirmPassword) {
  try {
    // check if username, password, or confirmPassword is empty
    if (!username || username.trim() === "") {
      return "Username is empty";
    }
    if (
      !password ||
      !confirmPassword ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      return "Password or confirm password is empty";
    }
    if (password !== confirmPassword) {
      return "Password and confirm password don't match";
    }

    // usernames are not case-sensitive
    const usernameLower = username.toLowerCase();

    // check if username already exists
    const [existingUser] = await conn
      .promise()
      .query(CHECK_EXISTING_USER, [usernameLower]);

    if (existingUser.length > 0) {
      return "Username already exists";
    }

    // hash the password with salt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert the new user into the database
    await conn
      .promise()
      .query(CREATE_NEW_USER, [usernameLower, hashedPassword]);

    return "Created user " + usernameLower;
  } catch (err) {
    // handles error during user creation (eg. deadlock)
    console.error("Error during user creation: ", err);
    return "Error during user creation";
  }
}

/**
 * Login an existing user given a username and password.
 * The password stored is a hashed password.
 * Usernames should be unique and are not case-sensitive.
 * @param {*} username
 * @param {*} password
 * @returns
 */
async function loginUser(username, password) {
  try {
    // check if username or password is empty
    if (
      !username ||
      username.trim() === "" ||
      !password ||
      password.trim() === ""
    ) {
      return "Username or password is empty";
    }

    // usernames are not case-sensitive
    const usernameLower = username.toLowerCase();

    // check that username exists in database
    const [existingUser] = await conn
      .promise()
      .query(CHECK_EXISTING_USER, [usernameLower]);

    if (existingUser.length === 0) {
      return "Username doesn't exist";
    }

    // compare the provided password with the stored hashed password
    const hashedPassword = existingUser[0].hashed_password; // the stored hashedPassword
    const correctPassword = await bcrypt.compare(password, hashedPassword);

    if (correctPassword) {
      return "Login successful for user " + usernameLower;
    } else {
      return "Incorrect password";
    }
  } catch (err) {
    console.error("Error during user login: ", err);
    return "Error during user login";
  }
}

// Exports
module.exports = router;
module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
