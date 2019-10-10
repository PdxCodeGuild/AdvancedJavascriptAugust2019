const { AsyncRouter } = require("express-async-router");
const { check, validationResult } = require("express-validator");

const Chirp = require("../models/Chirp");
const handleValidationErrors = require("../helpers/handleValidationErrors");
const jwtMiddleware = require("../helpers/jwtMiddleware");

const router = AsyncRouter();

const createValidators = [
  check("body").isLength({min: 3, max: 156}),
];

const updateValidators = [
  check("body").isLength({min: 3, max: 156}), 
];

// List chirps
router.get("/", async (req, res) => {
  const chirps = await Chirp.find({})
  .populate({
    path: "replies.user user"
  });

  res.send(chirps);
});

// Create a chirp
router.post(
  "/", [
    ...createValidators,
    jwtMiddleware,
    handleValidationErrors
  ], 
  async (req, res) => {
    const chirp = new Chirp();
    chirp.body = req.body.body;
    chirp.user = req.user;

    await chirp.save();

    res.status(201).send(chirp);
  }
)

// Reply to a chirp
router.post(
  "/reply/:_id", [
    ...createValidators,
    jwtMiddleware,
    handleValidationErrors
  ], 
  async (req, res) => {
    const chirp = await Chirp.findById(req.params._id);
    
    const reply = {
      body: req.body.body,
      user: req.user._id,
      postedAt: new Date(),
    }

    chirp.replies.push(reply);
    await chirp.save();

    res.status(201).send(await chirp.populate({path: "replies.user user"}).execPopulate());
  }
)

// Delete a chirp
router.delete(
  "/:_id", [
    ...createValidators,
    jwtMiddleware,
    handleValidationErrors
  ], 
  async (req, res) => {
    const chirp = await Chirp.findById(req.params._id);
    
    await chirp.remove();

    res.send(chirp);
  }
)

module.exports = router;