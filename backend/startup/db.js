const winston = require("winston");
const mongoose = require("mongoose");
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "logfile.log" }),
    new winston.transports.MongoDB({ db: "mongodb://localhost/reactApp" })
  ]
});
module.exports = function() {
  //DB connection
  mongoose
    .connect("mongodb://localhost/reactApp", { useNewUrlParser: true })
    .then(() => logger.info("Connected to MongoDB."));
};
