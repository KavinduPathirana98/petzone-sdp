const router = require("express").Router();
const { request } = require("express");
const Question = require("../models/questionModel");

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const answers = req.body.answers;
  const question = req.body.question;
  const user = req.body.user;
  const createdOn = req.body.createdOn;

  const newQuestion = new Question({
    title,
    answers,
    user,
    question,
    createdOn,
  });
  newQuestion
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
router.route("/getAll").get((req, res) => {
  Question.find().then((questions) => {
    return res.json({
      code: 1,
      data: questions,
    });
  });
});
// //get User
// //http://localhost:8050/user/
// //Get Request
// router.route("/").get((req, res) => {
//   User.find()
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// //User login
// //http://localhost:8050/user/login
// router.route("/login").post((req, res) => {
//   const Password = req.body.Password;
//   User.findOne({ Email: req.body.Email }).then((user) => {
//     // Check if Attendee exists
//     if (!user) {
//       return res.status(404).json({ Email: "Email not found" });
//     } else {
//       // Check password
//       if (Password === user.Password) {
//         var date = new Date(user.CreatedOn);
//         date.setHours(date.getHours() + 5.5);
//         var isoDate = date.toISOString();
//         user.CreatedOn = isoDate;
//         res.json(user);
//       } else {
//         return res.status(400).json({ Password: "Password incorrect" });
//       }
//     }
//   });
// });

module.exports = router;
