const chai = require("chai");
const expect = chai.expect;
const jwt = require("jsonwebtoken");

const { app } = require("../src/server");

describe("auth.controller.js", () => {
  it("should allow valid users to sign-up", async () => {
    const response = await chai.request(app).post("/auth/sign-up").send({
      username: "testmctest",
      password: "password123",
      passwordCheck: "password123"
    });

    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal("testmctest");
    expect(response.body.password).to.equal(undefined);
  });

  it("should not allow invalid users to sign-up", async () => {
    const response = await chai.request(app).post("/auth/sign-up").send({
      username: "te",
      password: "pa",
      passwordCheck: "paxssword123"
    });

    expect(response.status).to.equal(422);
  });

  it("should allow users to login", async() => {
    const response = await chai.request(app).post("/auth/login").send({
      username: "testmctest",
      password: "password123"
    });

    expect(response.status).to.equal(200);
    const user = jwt.verify(response.body.token, "CHANGEME!");

    expect(user.username).to.equal("testmctest");
  });

  it("should not allow users to login with the wrong password", async() => {
    const response = await chai.request(app).post("/auth/login").send({
      username: "testmctest",
      password: "password1"
    });

    expect(response.status).to.equal(403);
  });

  it("should not allow users to login who don't exist", async() => {
    const response = await chai.request(app).post("/auth/login").send({
      username: "idontexist",
      password: "ahahahahahah"
    });

    expect(response.status).to.equal(403);
  });
});