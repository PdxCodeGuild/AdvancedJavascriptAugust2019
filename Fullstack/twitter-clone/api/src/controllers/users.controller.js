const { AsyncRouter } = require("express-async-router");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Chirp = require("../models/Chirp");

const handleValidationErrors = require("../helpers/handleValidationErrors");
const jwtMiddleware = require("../helpers/jwtMiddleware");

const router = AsyncRouter();

const followValidators = [
  check("user").exists(),
]

// Follow a user
router.post(
  "/follow/:_id", 
  [...followValidators, jwtMiddleware, handleValidationErrors],
  async (req, res) => {
    const followUser = await User.findById(req.params._id);

    if(!followUser) return res.sendStatus(404);

    // Add followers to followingUser
    followUser.followers.push(req.user._id);
    await followUser.save();

    // Add following to current user
    req.user.following.push(followUser._id);
    await req.user.save();

    res.send(req.user);
  }
);

// Get chirps for a user
router.get("/profile/:userId", async (req, res) => {
  const profile = await User.findById(req.params.userId).populate({
    path: "chirps followers following",
  })

  res.send(profile);
});

module.exports = router;