/**
 * Handle all user-related logic
 */

// npm install mysql2
// for db connection


// defines all the routes related to user operations
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// author: Mia
// Handles the backend of a user login
// Talks to the database
const userLogin = (req, res) => {
  const { username, password } = req.body;


  // logic for user authentication
  // respond with success or failure

};

// author: Mia
// Handles the backend of a user create
// Talks to the database
const userCreate = (req, res) => {
  const { username, password } = req.body;

  // logic for creating a new user
  // respond with success or failure

};


module.exports = { userLogin, userCreate, router };
