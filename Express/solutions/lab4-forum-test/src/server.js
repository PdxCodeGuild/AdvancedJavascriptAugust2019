const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const AuthController = require("./controllers/auth.controller");
const BoardController = require("./controllers/board.controller");
const PostController = require("./controllers/post.controller");


const app = express();

app.use(express.json());
app.use(cors());
/* istanbul ignore next */
if(process.env.ENV !== "test") app.use(morgan("tiny"));

app.use("/auth", AuthController);
app.use("/board", BoardController);
app.use("/post", PostController);

const connectDatabase = async (name, host="localhost") => {
  return await mongoose.connect(`mongodb://${host}/${name}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });
}

module.exports = { 
  app,
  connectDatabase,
};