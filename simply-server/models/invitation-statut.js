const mongoose = require("mongoose");
const invitationStatut = new mongoose.Schema({
  name: {
    type: String,
  },
});
module.exports = mongoose.model("InvitationStatut", invitationStatut);
