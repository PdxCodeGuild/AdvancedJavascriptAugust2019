const { AsyncRouter } = require("express-async-router");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const handleValidationErrors = require("../helpers/handleValidationErrors");
const jwtMiddleware = require("../helpers/jwtMiddleware");

const router = AsyncRouter();

const signUpValidators = [
  check("email").isEmail(),
  check("password").exists(),
  check("passwordConfirm").exists()
];

const loginValidators = [
  check("email").isEmail(),
  check("password").exists()
];

router.post(
  "/sign-up", 
  [...signUpValidators, handleValidationErrors], 
  async (req, res) => {
    const userExists = await User.findOne({email: req.body.email});

    if(userExists)
      return res.status(400).send("E-mail already exists");
    if(req.body.password !== req.body.passwordConfirm)
      return res.status(400).send("Passwords do not match");

    const user = await User.signUp(req.body.email, req.body.password);
    res.status(201).send(user.sanitize());
  }
);

router.post(
  "/login", 
  [...loginValidators, handleValidationErrors],
  async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if(!user || !user.comparePassword(req.body.password))
      return res.status(400).send("Invalid login information");
      
    const token = jwt.sign({
      _id: user._id,
    }, "CHANGEME!");

    res.send({token});
  }
);

router.get("/profile", [jwtMiddleware], async (req, res) => {
  const user = await User.findOne({_id: req.user._id}).populate("chrips");

  res.send(user);
});

module.exports = router;