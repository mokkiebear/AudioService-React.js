const express = require("express");

//Routers
const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const commentsRouter = require("../routes/comments");
const audiosRouter = require("../routes/audios");

var cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(fileUpload());

  app.use((req, res, next) => {
    res.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
    );
    res.set("Access-Control-Expose-Headers", "x-auth-token");
    next();
  });

  app.use("/", indexRouter);
  app.use("/users", usersRouter);

  app.use("/audios", audiosRouter);
  app.use("/comments", commentsRouter);
  app.use("/auth", authRouter);
};
