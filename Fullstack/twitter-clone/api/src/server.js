const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const AuthController = require("./controllers/auth.controller");
const ChirpController = require("./controllers/chirp.controller");
const UsersController = require("./controllers/users.controller");


const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/auth", AuthController);
app.use("/chirp", ChirpController);
app.use("/users", UsersController);

const connectDatabase = async (databaseName="twitter-clone-chirp", hostname="localhost") => {
  const database = await mongoose.connect(
    `mongodb://${hostname}/${databaseName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  );

  if(process.env.ENV !== "test") 
    console.log(`🗑️ Database connected at mongodb://${hostname}/${databaseName}...`)

  return database;
}

const startServer = (hostname="0.0.0.0", port=1337) => {
  app.listen(port, hostname, async () => {
    await connectDatabase();
    if(process.env.ENV !== "test") 
      console.log(`🚀 Server started at ${hostname}:${port}...`)
  });
}

module.exports = {
  app,
  connectDatabase,
  startServer
};