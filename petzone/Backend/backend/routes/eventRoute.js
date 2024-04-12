const router = require("express").Router();
const { request } = require("express");
let Event = require("../models/eventModel");

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
router.route("/").get((req, res) => {
  Event.find()
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      console.log(err);
    });
});
//Delete Event
router.route("/delete/:id").delete((req, res) => {
  const eventId = req.params.id;
  Event.findByIdAndDelete(eventId).then((deletedEvent) => {
    res.json({ code: 1, msg: deletedEvent });
  });
});

module.exports = router;
