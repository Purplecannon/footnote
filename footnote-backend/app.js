// Author: Mia

// Imports
const express = require("express");
const path = require("path");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");  // cors in backend to talk between port 5173 and 3000

// session
// const session = require("express-session");
// const bodyParser = require("body-parser");
// const MySQLStore = require("express-mysql-session")(session);
// const conn = require('./services/database');
// const sessionStore = new MySQLStore({}, conn);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const videosRouter = require("./routes/videos"); // video routes
const projectsRouter = require("./routes/projects");

const { createTables, clearTables } = require("./services/tables");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());  // enable cors in backend: to allow frontend (port 5173) to communicate with backend (port 3000)
app.use(logger("dev"));
app.use(express.json());  // to parse JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// session
// app.use(session({
//   // key: "session_id",  // TODO: needed or not?
//   secret: process.env.SESSION_SECRET, // TODO: replace with a strong secret key used to sign the session ID cookie
//   store: sessionStore,  // to store in MySQL Digital Ocean database sessions table
//   resave: false,  // save the session to the store even if it hasn't been modified
//   saveUninitialized: false,  // save a new session that hasn't been modified yet
//   cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }  // timeout: 1 day
// }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/videos", videosRouter); // Place this BEFORE the 404 handler
app.use("/projects", projectsRouter);

// TODO: change the following initialize() portion once app actually storing real user data
async function initialize() {
  try {
    await createTables();
    console.log('All tables are initialized');

    await clearTables();
    console.log('All tables are cleared');
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
