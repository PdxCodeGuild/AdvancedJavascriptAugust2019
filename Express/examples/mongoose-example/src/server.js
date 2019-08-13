const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const Todo = require("./models/Todo");

const app = express();

// Jason fake configurable middleware!
const jason = (options = {}) => (req, res, next) => {
  console.log(options.message || "Default message!");
  next();
}

// Parses JSON data bodies
app.use(express.json());
// Added request logging
app.use(morgan("tiny"));
// Allows for CORS
app.use(cors());
// Use jason
// app.use(jason({message: "Hello from my middleware!"}));

// LIST METHOD
app.get('/todo', async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

// CREATE METHOD
app.post('/todo', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save()

  res.status(201).send(todo);
});

// RETRIEVE
app.get('/todo/:_id', async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params._id });

  if(!todo) return res.sendStatus(404);

  res.send(todo);
});

// UPDATE
app.patch('/todo/:_id', async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params._id });

  if(!todo) return res.sendStatus(404);

  todo.set(req.body);
  await todo.save();

  res.send(todo);
});

// DELETE
app.delete('/todo/:_id', async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params._id });

  if(!todo) return res.sendStatus(404);

  await todo.remove();
  res.send(todo);
});


const startServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost/mongoose-example", {
      useNewUrlParser: true, // Avoid annoying deprecation error!
    })
    console.log("Connected to DB...");
  } catch(err) {
    console.error(`Failed to connect to MongoDB: ${err}`);
    // Tells other programs that this failed
    process.exit(-1);
  }

  app.listen(8000, () => {
    console.log("Listening at localhost:8000...");
  });
}

startServer();