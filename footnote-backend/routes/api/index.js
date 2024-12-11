/**
 * Express router for handling home page requests.
 * This router defines the route for the home page of the application.
 * When a GET request is made to the root URL ("/"), it renders the home page.
 */

var express = require("express");
var router = express.Router();

/**
 * GET home page.
 * This endpoint renders the "index" view with a title of "Express".
 * The home page is displayed when a GET request is made to the root URL ("/").
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} Renders the "index" view with the title "Express".
 */ router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Exports
module.exports = router;
