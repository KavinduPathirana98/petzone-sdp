const router = require("express").Router();
const { request } = require("express");
const Profile = require("../models/profileModel");

router.route("/add").post((req, res) => {
  const userId = req.body.userId;
  const interests = req.body.interests;
  const abilities = req.body.abilities;
  const talents = req.body.talents;
  const createdOn = req.body.createdOn;
  const newProfile = new Profile({
    userId,
    interests,
    abilities,
    talents,
    createdOn,
  });
  newProfile
    .save()
    .then(() => {
      res.json({
        code: 1,
        msg: "success",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
//get question
router.route("/:id").get((req, res) => {
  const userId = req.params.id;
  Profile.findOne({ userId: userId }).then((profile) => {
    return res.json({
      code: 1,
      data: profile,
    });
  });
});
module.exports = router;
