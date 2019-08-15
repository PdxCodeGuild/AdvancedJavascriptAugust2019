const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const ListController = require("./controllers/list.controller");
const ItemController = require("./controllers/item.controller");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/list", ListController);
app.use("/item", ItemController);


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
  await connectDatabase("todolist-api");

  app.listen(port, hostname, () => {
    console.log(`🚀 Listening at ${hostname}:${port}...`);
  });
}

startServer();