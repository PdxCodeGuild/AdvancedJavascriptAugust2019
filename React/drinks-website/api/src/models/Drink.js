const mongoose = require("mongoose");

const { Schema } = mongoose;

const drinkSchema = Schema({
  name: {
    require: true,
    type: String,
  },
  type: {
    enum: ["energy", "alcoholic", "healthy"],
    type: String,
    default: "energy",
  },
  calories: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtual: true,
  }
});
drinkSchema.virtual("reviews", {
  localField: "_id",
  foreignField: "drink",
  ref: "Review",
  justOne: false,
});

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = Drink;