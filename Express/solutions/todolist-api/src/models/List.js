const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})
listSchema.virtual("items", {
  ref: "Item",
  localField: "_id",
  foreignField: "list",
  justOne: false,
})

const List = mongoose.model("List", listSchema);

module.exports = List;