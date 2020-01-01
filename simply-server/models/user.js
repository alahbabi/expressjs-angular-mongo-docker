const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User model
let user = new Schema({
    username: {
      type: String,
      required: true,
      max: 100
    },
    password: {
      type: String,
      required: true,
      max: 30,
      min: 8
    },
    email :{
      type: String,
      required: true,
      unique: true
    },
    firstname: {
      type: String,
      required: true,
      max: 80
    },
    lastname: {
      type: String,
      required: true,
      max: 80
    },
    profile: {
      type: String,
      required: true,
      max: 30
    }
});

module.exports = mongoose.model('User', user);
