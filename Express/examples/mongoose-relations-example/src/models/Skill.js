const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const skillSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    default: 0
  }
})

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;