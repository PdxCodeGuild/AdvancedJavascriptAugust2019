const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const postSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;