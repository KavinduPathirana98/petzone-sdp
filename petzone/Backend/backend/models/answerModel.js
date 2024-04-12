const mongoose = require("mongoose");
// const User = require("./userModel");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

//user table and path
const Answer = mongoose.model("answer", AnswerSchema);
module.exports = Answer;
