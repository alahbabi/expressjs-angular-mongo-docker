const mongoose = require('mongoose');
const schema = mongoose.Schema;

//User model
let User = new schema({
    username: {
      type: String,
      required: true,
      max: 100
    },
    password: {
      type: String,
      required: true,
      max: 100
    },
    email :{
      type: String,
      required: true,
      max: 100
    },
    firstname: {
      type: String,
      required: true,
      max: 100
    },
    lastname: {
      type: String,
      required: true,
      max: 100
    },
    profile: {
      type: String,
      required: true,
      max: 100
    }
});

module.exports = mongoose.model('user', User);
