const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const boardSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})
boardSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "board",
  justOne: false,
})

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;