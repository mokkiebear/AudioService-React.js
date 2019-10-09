const Joi = require("joi");
const mongoose = require("mongoose");

const Audio = mongoose.model(
  "Audio",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      maxlength: 50
    },
    singers: [
      {
        type: String,
        required: false,
        maxlength: 50
      }
    ],
    likes: { type: Number, default: 0 },
    auditions: { type: Number, default: 0 },
    //! Should be genre in ref
    genres: [
      {
        /*type: mongoose.Schema.Types.ObjectId, ref: "Iteration"*/ type: String,
        required: true,
        maxlength: 50
      }
    ],
    pathToAudio: { type: String, required: true }
    /*,
    date: { type: Date, default: Date.now }*/
  })
);

function validateAudio(audio) {
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
}

module.exports.Audio = Audio;
module.exports.validate = validateAudio;
