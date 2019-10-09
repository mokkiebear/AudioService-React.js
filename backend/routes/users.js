const router = require("express").Router();
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Joi = require("joi");
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.get("/", async function(req, res) {
  const users = await User.find();
  res.json(users);
});

router.get("/:id", async function(req, res) {
  const user = await User.findOne({ _id: req.params.id });
  res.json(_.pick(user, ["_id", "name", "email", "likedAudios"]));
});

router.put("/:id", async function(req, res) {
  const userId = req.params.id;

  const { email, likedAudios, name, newPassword, oldPassword } = req.body;
  console.log(newPassword);
  // Изменение пароля пользователя
  if (newPassword && oldPassword) {
    const user = await User.findOne({ _id: userId });
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (validPassword) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(newPassword, salt);
      await User.findOneAndUpdate({ _id: userId }, { password });
    } else {
      return res.status(400).send("Проверьте введенные данные");
    }
  }

  // Изменение имени, почты и т.д.
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { email, name, likedAudios } },
    { new: true }
  );

  res.json(user);
});

// Создание новых пользователей
router.post("/", async (req, res, next) => {
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered!");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
