const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

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

app.get('/', (req, res) => {
  res.send({class: "Advanced Bowling!"});
});

app.post('/', (req, res) => {
  console.log(req.body.Hello);

  res.send(req.body);
});

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost/first-express-example", {
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