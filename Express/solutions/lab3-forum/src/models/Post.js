const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const postSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  board: {
    type: ObjectId,
    ref: "Board",
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  }
}, {
  timestamps: true
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;