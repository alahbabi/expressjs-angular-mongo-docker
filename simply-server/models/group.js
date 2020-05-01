const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Group model

let group = new Schema({
  name: {
    type: String,
    required: true,
    max: 100,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Group", group);
