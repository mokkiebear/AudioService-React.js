const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = require("express").Router();
const mongoose = require("mongoose");
var path = require("path"),
  fs = require("fs"),
  url = require("url");
var qs = require("querystring");
const { Comment, validate } = require("../models/comment");
const { User } = require("../models/user");

router.get("/:audioId", async function(req, res) {
  console.log(req.params);
  const comments = await Comment.find({ audioId: req.params.audioId });
  res.json(comments);
});

router.post("/", auth, async (req, res) => {
  let comment = new Comment({
    text: req.body.text,
    audioId: req.body.audioId,
    user: req.body.user
  });
  comment = await comment.save();
  res.json(comment);
});

module.exports = router;
