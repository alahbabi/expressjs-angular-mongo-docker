const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});
module.exports = mongoose.model("Profile", ProfileSchema);
