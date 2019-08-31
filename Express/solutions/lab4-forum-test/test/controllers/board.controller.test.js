const chai = require("chai");
const { app } = require("../../src/server");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { getToken, signUpUser, validUser } = require("./auth.controller.test");
const Board = require("../../src/models/Board");

const { ObjectId } = mongoose.Types;
const { expect } = chai;

const createBoard = async (board, token) => {
  return await chai
    .request(app)
    .post("/board")
    .send(board)
    .set("Authorization", `Bearer ${token}`)
}

describe("src/controllers/board.controller.js", () => {
  before(async function() {
    this.token = await getToken();
    this.user = jwt.verify(this.token, process.env.JWT_SECRET);
  });

  beforeEach(async function() {
    const res = await createBoard({
      name: "Board",
      user: this.user._id
    }, this.token);

    this.board = res.body;
  })

  afterEach(async () => {
    await Board.deleteMany({})
  });

  it("GET /board: should show boards", async function() {
    const res = await chai
      .request(app)
      .get("/board");

    expect(res.status).to.eq(200);
    expect(res.body.length).to.eq(1);
  });

  it("POST /board: should create a board", async function() {
    const res = await createBoard({
      name: "Test Board",
      user: this.user._id
    }, this.token);

    expect(res.status).to.eq(201);
    expect(res.body.name).to.eq("Test Board");
  });

  it("POST /board: should not create invalid board", async function() {
    const res = await createBoard({
      user: this.user._id
    }, this.token);

    expect(res.status).to.eq(422);
  });

  it("POST /board: should only allow users to create", async function() {
    const res = await createBoard({
      name: "Board",
      user: this.user._id
    });

    expect(res.status).to.eq(401);
  });

  it("GET /board/:_id: should show a board", async function() {
    const res = await chai
      .request(app)
      .get("/board/" + this.board._id)

    expect(res.status).to.eq(200);
    expect(res.body.name).to.eq("Board");
  });

  it("GET /board/:_id: should 404", async function() {
    const res = await chai
      .request(app)
      .get("/board/" + new ObjectId())

    expect(res.status).to.eq(404);
  });

  it("PATCH /board/:_id: should update", async function() {
    const res = await chai
      .request(app)
      .patch("/board/" + this.board._id)
      .set("Authorization", `Bearer ${this.token}`)
      .send({
        name: "More Fun Board"
      })
    
    expect(res.status).to.eq(200);
    expect(res.body.name).to.eq("More Fun Board");
  });

  it("PATCH /board/:_id: should not update invalid data", async function() {
    const res = await chai
      .request(app)
      .patch("/board/" + this.board._id)
      .set("Authorization", `Bearer ${this.token}`)
      .send({})
    
    expect(res.status).to.eq(422);
  });

  it("PATCH /board/:_id: should 404", async function() {
    const res = await chai
      .request(app)
      .patch("/board/" + new ObjectId())
      .set("Authorization", `Bearer ${this.token}`)
      .send({
        name: "More Fun Board"
      })
    
    expect(res.status).to.eq(404);
  });

  it("PATCH /board/:_id: should require token", async function() {
    const res = await chai
      .request(app)
      .patch("/board/" + this.board._id)
      .send({
        name: "More Fun Board"
      })
    
    expect(res.status).to.eq(401);
  });
});