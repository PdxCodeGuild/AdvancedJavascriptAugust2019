const { AsyncRouter } = require("express-async-router");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

const controller = AsyncRouter();

const signUpValidators = [
  check("username").exists().isLength({min: 4, max: 32}),
  check("password").exists().isLength({min: 8, max: 64}),
  check("passwordCheck").exists().isLength({min: 8, max: 64}),
];

controller.post("/sign-up", [...signUpValidators], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { username, password, passwordCheck } = req.body;

  const userFound = await User.findOne({username});

  if(userFound) {
    return res.status(422).send({error: "User already exists"});
  }

  if (password !== passwordCheck) {
    return res.status(422).send({error: "Passwords don't match"});
  }

  const user = new User();
  user.username = username;
  user.password = bcrypt.hashSync(password, 4);
  await user.save();

  res.send({
    ...user.toJSON(),
    password: undefined,
  });
});

module.exports =  controller;