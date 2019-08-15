const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const itemSchema = Schema({
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  list: {
    type: ObjectId,
    ref: "List",
    required: true
  }
}, {
  timestamps: true
})

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;