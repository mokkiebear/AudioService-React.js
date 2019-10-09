const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
var config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean,
  likedAudios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Audio" }]
});

userSchema.methods.generateAuthToken = function() {
  console.log(config.get("jwtPrivateKey"));
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey"),
    { expiresIn: "10d" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
