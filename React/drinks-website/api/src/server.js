const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const DrinkRouter = require("./routes/drink.routes");
const ReviewRouter = require("./routes/review.routes");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello drinkers!");
});

app.use("/drinks", DrinkRouter);
app.use("/reviews", ReviewRouter);

const connectDatabase = async () => {
  const database = await mongoose.connect('mongodb://localhost/test-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  });

  console.log("Connected to database...");

  return database;
}

const startServer = (port=8000) => {
  app.listen(port, async () => {
    await connectDatabase();
    console.log(`Listening @ localhost:${port}...`);
  });
}

startServer();
