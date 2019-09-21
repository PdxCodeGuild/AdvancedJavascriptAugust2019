const Review = require("../models/Review");
const { AsyncRouter } = require("express-async-router");

const router = AsyncRouter();

// List route
router.get("/", async (req, res) => {
  const reviews = await Review.find({});

  res.send(reviews);
});

// Create route
router.post("/", async (req, res) => {
  const review = new Review(req.body);
  await review.save();

  res.status(201).send(review);
});

// Retrieve route
router.get("/:_id", async (req, res) => {
  const review = await Review.findOne({_id: req.params._id});
  if(!review) return res.sendStatus(404);

  res.send(review);
});

// Update route
router.patch("/:_id", async (req, res) => {
  const review = await Review.findOne({_id: req.params._id});
  if(!review) return res.sendStatus(404);

  review.set(req.body);
  await review.save();

  res.send(review);
});

// Delete route
router.delete("/:_id", async (req, res) => {
  const review = await Review.findOne({_id: req.params._id});
  if(!review) return res.sendStatus(404);
  await review.remove();

  res.send(review);
});

module.exports = router;