const chai = require("chai");
const { app } = require("../../src/server");
const jwt = require("jsonwebtoken");

const { expect } = chai;

const validUser = {
  username: "test",
  password: "password123",
  passwordConfirm: "password123"
}

const invalidUser = {
  username: "x",
  password: "pa",
  passwordConfirm: "i am not a password dude"
}

const signUpUser = async (user=validUser) => {
  return await chai
    .request(app)
    .post("/auth/sign-up")
    .send(user)
}

const loginUser = async (user=validUser) => {
  return await chai
    .request(app)
    .post("/auth/login")
    .send({
      ...user,
      passwordConfirm: undefined
    })
}

const getToken = async (user=validUser) => {
  const res = await loginUser(user);
  return res.body.token;
}

describe("src/controllers/user.controller.js", () => {
  it("POST /auth/sign-up: valid user", async () => {
    const res = await signUpUser();

    expect(res.status).to.eq(200);
    expect(res.body.username).to.eq(validUser.username);
    expect(res.body.password).to.not.exist;
  });

  it("POST /auth/sign-up: invalid user", async () => {
    const res = await signUpUser(invalidUser);

    expect(res.status).to.eq(422);
  });

  it("POST /auth/login: valid user", async () => {
    const res = await loginUser();

    expect(res.status).to.eq(200);
    expect(res.body.token).to.exist;

    const user = jwt.verify(res.body.token, process.env.JWT_SECRET);

    expect(user.username).to.eq(validUser.username);
    expect(res.body.password).to.not.exist;
  });

  it("POST /auth/login: invalid user", async () => {
    const res = await loginUser({
      username: "idontexist",
      password: "nodjsakjdksla"
    });

    expect(res.status).to.eq(401);
  });

  it("GET /auth/profile" , async () => {
    const token = await getToken();

    const res = await chai
      .request(app)
      .get("/auth/profile")
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).to.eq(200);
    expect(res.body.username).to.eq(validUser.username);
    expect(res.body.password).to.not.exist;
  });
});

module.exports = {
  validUser,
  invalidUser,
  signUpUser,
  loginUser,
  getToken
}