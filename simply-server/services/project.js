const projectModel = require('../models/project');

// Find all projects
exports.findAll = async function (){
    try {
        var projects = await projectModel.find().exec();
        return projects;
      } catch (error) {
        throw Error('Error while searching projects  : ' + error.message);
      }
  };

  // Insert project
exports.addProject = async function(body){
  try {
    var project = new projectModel(body);
    project.creationDate = new Date();
    var result = await project.save();
    return result;
  } catch (error) {
      throw Error('Error while Inserting project  : ' + error.message);
  }
};

// Find project by Id
exports.findById = async function(id){
  try {
    var project = await projectModel.findById(id).exec();
    return project;
  } catch (error) {
      throw Error('Error while Finding project By Id : ' + error.message);
  }
};

// Modify project using his Id
exports.update = async function(id, body){
    try {
      var project = await projectModel.findById(id).exec();
      if(project === undefined || project === null){
          throw Error('project not found with id ' + id);
      }
      project.set(body);
      var savedProject = await project.save();
      return savedProject;
    } catch (error) {
        throw Error('Error while Updating project : ' + error.message);
    }
};

// Delete a project using his Id
exports.delete = async function(id){
  try {
    var deletedProject = await projectModel.deleteOne({ _id: id}).exec();
    return deletedProject;
  } catch (error) {
      throw Error('Error while Deleting project : ' + error.message);
  }
};