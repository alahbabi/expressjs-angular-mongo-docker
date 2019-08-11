const config = require('../config.json');
const userModel = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Login  
exports.login = async function ({email, password}){
  try {
      var user = await userModel.findOne({ email: email }).exec();
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({user}, config.secretKey, { expiresIn: '3600s' });
        return {
          user,
          token
        };
      }
  } catch (error) {
      throw Error('Error login user  : ' + error.message);
  }
};

// Find all Users
exports.findAll = async function (){
  try {
        var users = await userModel.find().exec();
        return users;
    } catch (error) {
        throw Error('Error while Searching Users  : ' + error.message);
    }
};

// Insert user
exports.addUser = async function(body){
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;
    var user = new userModel(body);
    var result = await user.save();
    return result;
  } catch (error) {
      throw Error('Error while Inserting User  : ' + error.message);
  }
};

// Find user by Id
exports.findById = async function(id){
  try {
    var user = await userModel.findById(id).exec();
    return user;
  } catch (error) {
      throw Error('Error while Finding User By Id : ' + error.message);
  }
};

// Modify user using his Id
exports.update = async function(id, body){
    try {
      var user = await userModel.findById(id).exec();
      if(user === undefined || user === null) {
          throw Error('User not found with id ' + id);
      }
      user.set(body);
      var savedUser = await user.save();
      return savedUser;
    } catch (error) {
        throw Error('Error while Updating User : ' + error.message);
    }
};

// Delete a user using his Id
exports.delete = async function(id){
  try {
    var deletedUser = await userModel.deleteOne({ _id: id}).exec();
    return deletedUser;
  } catch (error) {
      throw Error('Error while Deleting User : ' + error.message);
  }
};
