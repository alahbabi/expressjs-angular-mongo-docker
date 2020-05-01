const groupModel = require('../models/group');
const userService = require('./user');

// Find all groups
exports.findAll = async function (){
    try {
        var groups = await groupModel.find().exec();
        return groups;
      } catch (error) {
        throw Error('Error while searching groups  : ' + error.message);
      }
  };

  // Insert group
exports.addGroup = async function(body){
  try {
    var group = new groupModel();
    group.name = body.name;
    group.owner = await userService.findById(body.owner);
    group.creationDate = new Date();
    var result = await group.save();
    return result;
  } catch (error) {
      throw Error('Error while Inserting group  : ' + error.message);
  }
};

// Find group by Id
exports.findById = async function(id){
  try {
    var group = await groupModel.findById(id).exec();
    return group;
  } catch (error) {
      throw Error('Error while Finding group By Id : ' + error.message);
  }
};

// Modify group using his Id
exports.update = async function(id, body){
    try {
      var group = await groupModel.findById(id).exec();
      if(group === undefined || group === null){
          throw Error('group not found with id ' + id);
      }
      group.set(body);
      var savedGroup = await group.save();
      return savedGroup;
    } catch (error) {
        throw Error('Error while Updating group : ' + error.message);
    }
};

// Delete a group using his Id
exports.delete = async function(id){
  try {
    var deletedGroup = await groupModel.deleteOne({ _id: id}).exec();
    return deletedGroup;
  } catch (error) {
      throw Error('Error while Deleting group : ' + error.message);
  }
};