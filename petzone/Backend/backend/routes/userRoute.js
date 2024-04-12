const router = require("express").Router();
const { request } = require("express");
let User = require("../models/userModel");
//Save User
router.route("/add").post((req, res) => {
  const First_name = req.body.First_name;
  const Last_name = req.body.Last_name;
  const Email = req.body.Email;
  const Password = req.body.Password;
  const Category = req.body.Category;

  const newUser = new User({
    First_name,
    Last_name,
    Email,
    Password,
    Category,
  });
  User.findOne({ Email: req.body.Email }).then((user) => {
    if (user) {
      res.json("Email Already Exists");
    } else {
      newUser
        .save()
        .then(() => {
          res.json("User Registered Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

//Search
router.route("/search").post((req, res) => {
  const keyword = req.body.keyword;
  User.find({ First_name: new RegExp(keyword, "i") })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get All Users
router.route("/").get((req, res) => {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});
//Delete User
router.route("/delete/:id").delete((req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId).then((deletedUser) => {
    res.json({ code: 1, msg: deletedUser });
  });
});
//login User
router.route("/login").post((req, res) => {
  const Password = req.body.Password;
  User.findOne({ Email: req.body.Email }).then((user) => {
    // Check if Attendee exists
    if (!user) {
      return res.status(404).json({ Email: "Email not found" });
    } else {
      // Check password
      if (Password === user.Password) {
        var date = new Date(user.CreatedOn);
        date.setHours(date.getHours() + 5.5);
        var isoDate = date.toISOString();
        user.CreatedOn = isoDate;
        res.json(user);
      } else {
        return res.status(400).json({ Password: "Password incorrect" });
      }
    }
  });
});

module.exports = router;
