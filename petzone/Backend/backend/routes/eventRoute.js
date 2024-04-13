const router = require("express").Router();
const { request } = require("express");
let Event = require("../models/eventModel");
const axios = require("axios");
//Save Event
router.route("/add").post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  const place = req.body.place;

  const newEvent = new Event({
    title,
    description,
    fromDate,
    toDate,
    place,
  });

  newEvent
    .save()
    .then(() => {
      res.json({ code: 1, msg: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get All Events
router.route("/search").post((req, res) => {
  const keyword = req.body.keyword;
  Event.find({ title: new RegExp(keyword, "i") })
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get All Events
router.route("/").get(async (req, res) => {
  try {
    const events = await Event.find();

    // Use map instead of forEach to create an array of promises
    const promises = events.map(async (element) => {
      const item = await axios.get("https://dog.ceo/api/breeds/image/random");
      element.image = item.data.message;
      console.log(element);
      return element;
    });

    // Wait for all promises to resolve
    const arr = await Promise.all(promises);

    res.json(arr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// router.route("/").get(async (req, res) => {
//   let arr = [];
//   await Event.find()
//     .then((event) => {
//       event.forEach(async (element) => {
//         await axios
//           .get("https://dog.ceo/api/breeds/image/random")
//           .then((item) => {
//             element.image = item.data.message;
//             console.log(element);
//             arr.push(element);
//           });
//       });

//       res.json(arr);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
//Delete Event
router.route("/delete/:id").delete((req, res) => {
  const eventId = req.params.id;
  Event.findByIdAndDelete(eventId).then((deletedEvent) => {
    res.json({ code: 1, msg: deletedEvent });
  });
});

module.exports = router;
