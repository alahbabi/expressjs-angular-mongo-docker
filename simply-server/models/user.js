const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User model
let user = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 30,
    min: 8,
  },
  firstname: {
    type: String,
    required: true,
    max: 80,
  },
  lastname: {
    type: String,
    required: true,
    max: 80,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  profile: { 
    type: String,
    required: true,
   },
   picture: {
    type: String
   },
   groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }]

});

module.exports = mongoose.model("User", user);
