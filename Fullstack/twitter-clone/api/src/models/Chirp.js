const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const chirpFields = {
  body: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
}

const chirpSchema = Schema({
  ...chirpFields,
  replies: [{ ...chirpFields }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  }
});

const Chirp = mongoose.model("Chirp", chirpSchema);

module.exports = Chirp;