const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const reviewSchema = Schema({
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
  },
  drink: {
    type: ObjectId,
    ref: "Drink",
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;