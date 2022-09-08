const router = require("express").Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const { User } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

router.get("/", async function(req, res) {
  const users = await User.find().sort("name");
  console.log(users);
  res.render("users", { data: users });
});

// Вход
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password!");

  const token = user.generateAuthToken();
  console.log(token);
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
  /*res.status(200).json({
		token: token
	});*/
});

function validate(req) {
  const schema = {
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
  return Joi.validate(req, schema);
}

module.exports = router;
