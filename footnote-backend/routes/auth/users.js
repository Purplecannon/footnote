/**
 * Central file for backend handling of user authentication, including session management.
 * This file contains routes for user creation, login, and logout functionality.
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
 * Endpoint: POST /users/create-user
 *
 * Route for creating a new user with a given username and password.
 * The password is stored as a hashed password in the database.
 *
 * @param {string} username - The username for the new user (case-insensitive).
 * @param {string} password - The password for the new user.
 * @param {string} confirmPassword - A confirmation of the password for validation.
 * @returns {Object} - Response message indicating whether user creation was successful or failed.
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
 * Endpoint: POST /users/login-user
 *
 * Route for logging in an existing user with a given username and password.
 * If login is successful, the session is created for the user.
 *
 * @param {string} username - The username of the user trying to log in.
 * @param {string} password - The password provided by the user to log in.
 * @returns {Object} - Response message indicating whether login was successful or failed.
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
 * Endpoint: GET /users/logout
 *
 * Route for logging out the current user. The session is destroyed.
 *
 * @returns {Object} - Response message indicating whether logout was successful or failed.
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
 * Creates a new user in the database with a unique username and a hashed password.
 *
 * Usernames are case-insensitive and must be unique.
 * The password is hashed using bcrypt before being stored in the database.
 *
 * @param {string} username - The username for the new user (case-insensitive).
 * @param {string} password - The password for the new user.
 * @param {string} confirmPassword - The confirmation of the password for validation.
 * @returns {string} - A message indicating the result of the user creation process.
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
 * Logs in an existing user with a given username and password.
 * The function checks whether the password matches the stored hashed password.
 *
 * @param {string} username - The username of the user trying to log in.
 * @param {string} password - The password provided by the user to log in.
 * @returns {string} - A message indicating the result of the login process.
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
