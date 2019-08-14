const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  skills: [{
    type: ObjectId,
    ref: "Skill",
  }]
}, {
  toJSON: {
    virtuals: true
  }
})

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
  justOne: false,
})

const User = mongoose.model("User", userSchema);

// {
//   username: "test",
//   email: "test@test.com",
//   password: "321yu0h1w9ido1wjiorj31lindsa",
//   skills: [ObjectId("192jd9qh90qdjiw2n")]
// }

module.exports = User;