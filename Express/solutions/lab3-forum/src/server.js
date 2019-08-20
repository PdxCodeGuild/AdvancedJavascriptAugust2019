const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const AuthController = require("./controllers/auth");
const BoardController = require("./controllers/board");
const PostController = require("./controllers/post");


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/auth", AuthController);
app.use("/board", BoardController);
app.use("/post", PostController);

const connectDatabase = async (databaseName) => {
  try {
    const connection = await mongoose.connect(`mongodb://localhost/${databaseName}`, {
      useNewUrlParser: true,
      useCreateIndex: true
    })

    console.log(`🎒 Connected to database "${databaseName}"...`);
    return connection;
  } catch(err) {
    console.error(err);
  }
}

const startServer = async (port = 8000, hostname = "localhost") => {
  await connectDatabase("lab3-forum");

  app.listen(port, hostname, () => {
    console.log(`🚀 Listening at ${hostname}:${port}...`);
  });
}

startServer();