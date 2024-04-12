const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  interests: {
    type: String,
    required: true,
  },
  abilities: {
    type: String,
    required: true,
  },
  talents: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

//user table and path
const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
