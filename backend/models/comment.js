const Joi = require("joi");
const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    text: {
      type: String,
      required: true,
      maxlength: 150
    },
    audioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Audio"
    },
    user: {
      type: String,
      required: true
    }
  })
);

/*function validateAudio(audio) {
  const schema = {
    title: Joi.string()
      .min(1)
      .max(50)
      .required(),
    singers: Joi.array().allow([]),
    likes: Joi.number(),
    auditions: Joi.number(),
    genres: Joi.array().allow([])
  };
  return Joi.validate(audio, schema);
}*/

module.exports.Comment = Comment;
//module.exports.validate = validateAudio;
