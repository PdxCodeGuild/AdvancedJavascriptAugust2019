const { AsyncRouter } = require("express-async-router");
const { check, validationResult } = require("express-validator");

const jwtMiddleware = require("../helpers/jwt-middleware");
const Board = require("../models/Board");

const router = AsyncRouter();
const createValidators = [
  check("name").exists(),
  check("user").exists()
];
const updateValidators = [
  check("name").exists(),
];

// Le de LCRUD
router.get("/", async (req, res) => {
  const boards = await Board.find();

  res.send(boards);
});

// Cre de LCRUD
router.post("/", [...createValidators, jwtMiddleware], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const { name, user } = req.body;

  const board = new Board({ name, user });
  await board.save();

  res.status(201).send(board);
});

// Le re de LCRUD
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  const board = await Board.findOne({ _id }).populate(["posts", "user"]);

  if(!board) return res.sendStatus(404);

  res.send(board);
});

// Le update 
router.patch("/:_id", [...updateValidators, jwtMiddleware], async (req, res) => {
  const { _id } = req.params;
  const board = await Board.findOne({ _id });

  if(!board) return res.sendStatus(404);
  if(req.user._id !== board.user._id) return res.sendStatus(401);

  board.name = req.body.name;
  await board.save();

  res.send(board);
});

// Le delete
router.delete("/:_id", jwtMiddleware, async (req, res) => {
  const { _id } = req.params;
  const board = await Board.findOne({ _id });
  
  if(!board) return res.sendStatus(404);
  if(req.user._id !== board.user._id) return res.sendStatus(401);

  await board.remove();

  res.send(board);
});

module.exports = router;
