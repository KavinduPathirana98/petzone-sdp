const mongoose = require("mongoose");
const Answer = require("./answerModel");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  answers: { type: Array },
  user: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

//user table and path
const Question = mongoose.model("question", QuestionSchema);
module.exports = Question;
