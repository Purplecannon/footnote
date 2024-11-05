var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");  // cors in backend to talk between port 5173 and 3000

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var { createTables, clearTables } = require("./services/tables");
var videosRouter = require("./routes/videos"); // Import the video routes
var projectsRouter = require("./routes/projects");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());  // enable cors in backend: to allow frontend (port 5173) to communicate with backend (port 3000)
app.use(logger("dev"));
app.use(express.json());  // to parse JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/videos", videosRouter); // Place this BEFORE the 404 handler
app.use("/projects", projectsRouter);

// Author: Mia
// TODO: change the following initialize() portion once app actually storing real user
// data. Currently, tables are ALWAYS cleared upon initialization.

async function initialize() {
  try {
    await createTables();
    console.log('All tables are initialized');

    // await clearTables();
    // console.log('All tables are cleared');
  } catch (err) {
    console.log('Error during tables initialization and clearing: ', err);
  }
}

initialize();
////////////////

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
