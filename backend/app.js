var express = require("express");
var path = require("path");
const helmet = require("helmet");
const app = express();

require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Set static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());

module.exports = app;
