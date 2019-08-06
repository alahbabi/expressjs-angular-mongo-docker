const taskModel = require('../models/task');

// Find all tasks
exports.findAll = async function (){
    try {
        var tasks = await taskModel.find().exec();
        return tasks;
      } catch (error) {
        throw Error('Error while searching tasks  : ' + error.message);
      }
  };

  // Insert task
exports.addTask = async function(body){
  try {
    var task = new taskModel(body);
    var result = await task.save();
    return result;
  } catch (error) {
      throw Error('Error while Inserting task  : ' + error.message);
  }
};

// Find task by Id
exports.findById = async function(id){
  try {
    var task = await taskModel.findById(id).exec();
    return task;
  } catch (error) {
      throw Error('Error while Finding task By Id : ' + error.message);
  }
};

// Modify task using his Id
exports.update = async function(id, body){
    try {
      var task = await taskModel.findById(id).exec();
      if(task === undefined || task === null){
          throw Error('task not found with id ' + id);
      }
      task.set(body);
      var savedtask = await task.save();
      return savedtask;
    } catch (error) {
        throw Error('Error while Updating task : ' + error.message);
    }
};

// Delete a task using his Id
exports.delete = async function(id){
  try {
    var deletedTask = await taskModel.deleteOne({ _id: id}).exec();
    return deletedTask;
  } catch (error) {
      throw Error('Error while Deleting task : ' + error.message);
  }
};