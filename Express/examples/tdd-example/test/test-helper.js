process.env.ENV = "test";

const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");

const { connectDatabase } = require("../src/server");

chai.use(chaiHttp);

// Drop and our test database
setTimeout(() => {
  before(async () => {
    await connectDatabase("tdd-example-test");
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
