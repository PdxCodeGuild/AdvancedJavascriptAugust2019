const Drink = require("../models/Drink");
const { AsyncRouter } = require("express-async-router");

const router = AsyncRouter();

// List route
router.get("/", async (req, res) => {
  const drinks = await Drink.find({}).populate("reviews");

  res.send(drinks);
});

// Create route
router.post("/", async (req, res) => {
  const drink = new Drink(req.body);
  await drink.save();

  res.status(201).send(drink);
});

// Retrieve route
router.get("/:_id", async (req, res) => {
  const drink = await Drink.findOne({_id: req.params._id}).populate("reviews");
  if(!drink) return res.sendStatus(404);

  res.send(drink);
});

// Update route
router.patch("/:_id", async (req, res) => {
  const drink = await Drink.findOne({_id: req.params._id});
  if(!drink) return res.sendStatus(404);

  drink.set(req.body);
  await drink.save();

  res.send(drink);
});

// Delete route
router.delete("/:_id", async (req, res) => {
  const drink = await Drink.findOne({_id: req.params._id}).populate("reviews");
  if(!drink) return res.sendStatus(404);

  drink.reviews.forEach(async (review) => {
    await review.remove();
  });
  await drink.remove();

  res.send(drink);
});

module.exports = router;