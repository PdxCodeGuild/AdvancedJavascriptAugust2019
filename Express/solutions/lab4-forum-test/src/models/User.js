const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});
userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});
userSchema.virtual("boards", {
  ref: "Board",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

const User = mongoose.model("User", userSchema);
module.exports = User;