const { AsyncRouter } = require("express-async-router");
const { check, validationResult } = require("express-validator");

const jwtMiddleware = require("../helpers/jwt-middleware");
const Post = require("../models/Post");

const router = AsyncRouter();
const createValidators = [
  check("title").exists(),
  check("body").exists(),
  check("board").exists(),
  check("user").exists(),
];
const updateValidators = [
  check("title").exists(),
  check("body").exists(),
];

// Le de LCRUD
router.get("/", async (req, res) => {
  const posts = await Post.find();

  res.send(posts);
});

// Cre de LCRUD
router.post("/", [...createValidators, jwtMiddleware], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const post = new Post(req.body);
  await post.save();

  res.status(201).send(post);
});

// Le re de LCRUD
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  const post = await Post.findOne({ _id }).populate(["posts", "user"]);

  if(!post) return res.sendStatus(404);

  res.send(post);
});

// Le update 
router.patch("/:_id", [...updateValidators, jwtMiddleware], async (req, res) => {
  const { _id } = req.params;
  const post = await Post.findOne({ _id });

  if(!post) return res.sendStatus(404);
  if(req.user._id !== post.user._id) return res.sendStatus(401);  

  post.title = req.body.title;
  post.body = req.body.body;
  await post.save();

  res.send(post);
});

// Le delete
router.delete("/:_id", jwtMiddleware, async (req, res) => {
  const { _id } = req.params;
  const post = await Post.findOne({ _id });

  if(!post) return res.sendStatus(404);
  if(req.user._id !== post.user._id) return res.sendStatus(401);

  await post.remove();

  res.send(post);
});

module.exports = router;
