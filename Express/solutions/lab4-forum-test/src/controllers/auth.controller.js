const { AsyncRouter } = require("express-async-router");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const jwtMiddleware = require("../middleware/jwt");

const controller = AsyncRouter();

const signUpValidators = [
  check("username").exists().isLength({min: 4, max: 32}),
  check("password").exists().isLength({min: 8, max: 64}),
  check("passwordConfirm").exists().isLength({min: 8, max: 64}),
];

const loginValidators = [
  check("username").exists().isLength({min: 4, max: 32}),
  check("password").exists().isLength({min: 8, max: 64}),
];

const sanitizeUser = (user) => ({
  ...user.toJSON(),
  password: undefined,
})

controller.post("/sign-up", [...signUpValidators], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const { username, password, passwordConfirm } = req.body;

  const userFound = await User.findOne({username});

  if(userFound) {
    return res.status(422).send({error: "User already exists"});
  }

  if (password !== passwordConfirm) {
    return res.status(422).send({error: "Passwords don't match"});
  }

  const user = new User();
  user.username = username;
  user.password = bcrypt.hashSync(password, 4);
  await user.save();

  res.send(sanitizeUser(user));
});

controller.post('/login', [...loginValidators], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if(!user) return res.sendStatus(401);

  const correctPassword = bcrypt.compareSync(password, user.password);
  if(!correctPassword) return res.sendStatus(401);

  const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET, {
    expiresIn: "7 days"
  });

  res.send({token});
});

controller.get('/profile', jwtMiddleware, (req, res) => {
  res.send(sanitizeUser(req.user));
});

module.exports =  controller;