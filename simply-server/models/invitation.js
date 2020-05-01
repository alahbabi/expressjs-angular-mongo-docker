const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Group model

let invitation = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  sentDate: {
    type: Date,
    required: true,
  },
  group: { type: Schema.Types.ObjectId, ref: "Group" },
  statut:{ type: Schema.Types.ObjectId, ref: "InvitationStatut" },
  lastModification: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model("Invitation", invitation);