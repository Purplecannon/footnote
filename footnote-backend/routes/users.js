/**
 * Author: Mia
 * Handle all user-related logic
 */

// defines all the routes related to user operations
const express = require('express');
const router = express.Router();

// COPY THIS LINE INTO ANY FILES THAT NEED DB CONNECTION //
const db = require('../database');

// Handles the backend of a user login
async function userLogin(username, password) {
  // TODO: FINISH THIS
  try {
    const [results] = await db.execute();

  } catch (error) {
    console.error('Error querying from database: ', error);
  }

};

// Handles the backend of a user create
// Talks to the database
async function userCreate(username, password) {
  try {
    if (!username || username.trim() === "") {
      console.log('Username is empty');
    }
  } catch (error) {
    console.error('Error querying from database: ', error);
  }
};


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = { router, userLogin, userCreate };
