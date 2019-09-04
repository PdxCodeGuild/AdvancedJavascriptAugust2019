const chai = require("chai");
const { app } = require("../../src/server");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { getToken, signUpUser, validUser } = require("./auth.controller.test");
const { createBoard } = require("./board.controller.test");
const Post = require("../../src/models/Post");
const Board = require("../../src/models/Board");


const { ObjectId } = mongoose.Types;
const { expect } = chai;

const createPost = async (post, token) => {
  return await chai
    .request(app)
    .post("/post")
    .send(post)
    .set("Authorization", `Bearer ${token}`)
}

describe("src/controllers/post.controller.js", () => {
  before(async function() {
    this.token = await getToken();
    this.user = jwt.verify(this.token, process.env.JWT_SECRET);

    const boardRes = await createBoard({
      name: "Board",
      user: this.user._id
    }, this.token);

    this.board = boardRes.body;
  });

  after(async function() {
    await Board.deleteMany({})
  });

  beforeEach(async function() {
    const res = await createPost({
      title: "Flexible Post",
      body: "Lorem ipsum baby",
      user: this.user._id,
      board: this.board._id
    }, this.token);

    this.post = res.body;
  })

  afterEach(async () => {
    await Post.deleteMany({})
  });

  it("GET /post: should show posts", async function() {
    const res = await chai
      .request(app)
      .get("/post");

    expect(res.status).to.eq(200);
    expect(res.body.length).to.eq(1);
  });

  it("POST /post: should create a post", async function() {
    const res = await createPost({
      title: "Flexible Post",
      body: "Lorem ipsum baby",
      user: this.user._id,
      board: this.board._id
    }, this.token);

    expect(res.status).to.eq(201);
    expect(res.body.title).to.eq("Flexible Post");
  });

  it("POST /post: should not create invalid post", async function() {
    const res = await createPost({
      title: "Flexible Post",
      body: "Lorem ipsum baby",
      user: this.user._id,
    }, this.token);

    expect(res.status).to.eq(422);
  });

  it("POST /post: should only allow users to create", async function() {
    const res = await createPost({
      title: "Flexible Post",
      body: "Lorem ipsum baby",
      user: this.user._id,
      board: this.board._id
    });

    expect(res.status).to.eq(401);
  });

  it("GET /post/:_id: should show a post", async function() {
    const res = await chai
      .request(app)
      .get("/post/" + this.post._id)

    expect(res.status).to.eq(200);
    expect(res.body.title).to.eq("Flexible Post");
  });

  it("GET /post/:_id: should 404", async function() {
    const res = await chai
      .request(app)
      .get("/post/" + new ObjectId())

    expect(res.status).to.eq(404);
  });

  it("PATCH /post/:_id: should update", async function() {
    const res = await chai
      .request(app)
      .patch("/post/" + this.post._id)
      .set("Authorization", `Bearer ${this.token}`)
      .send({
        title: "More Fun Post"
      })
    
    expect(res.status).to.eq(200);
    expect(res.body.title).to.eq("More Fun Post");
  });

  // it("PATCH /post/:_id: should not update invalid data", async function() {
  //   const res = await chai
  //     .request(app)
  //     .patch("/post/" + this.post._id)
  //     .set("Authorization", `Bearer ${this.token}`)
  //     .send({})
    
  //   expect(res.status).to.eq(422);
  // });

  it("PATCH /post/:_id: should 404", async function() {
    const res = await chai
      .request(app)
      .patch("/post/" + new ObjectId())
      .set("Authorization", `Bearer ${this.token}`)
      .send({
        title: "More Fun Post"
      })
    
    expect(res.status).to.eq(404);
  });

  it("PATCH /post/:_id: should require token", async function() {
    const res = await chai
      .request(app)
      .patch("/post/" + this.post._id)
      .send({
        title: "More Fun Post"
      })
    
    expect(res.status).to.eq(401);
  });

  it("DELETE /post/:_id: should delete", async function() {
    const res = await chai
      .request(app)
      .delete("/post/" + this.post._id)
      .set("Authorization", `Bearer ${this.token}`);

    expect(res.status).to.eq(200);
    expect(res.body.title).to.eq("Flexible Post");
  });

  it("DELETE /post/:_id: 404", async function() {
    const res = await chai
      .request(app)
      .delete("/post/" + new ObjectId())
      .set("Authorization", `Bearer ${this.token}`);

    expect(res.status).to.eq(404);
  });

  it("DELETE /post/:_id: invalid token", async function() {
    const res = await chai
      .request(app)
      .delete("/post/" + this.post._id);

    expect(res.status).to.eq(401);
  });
});