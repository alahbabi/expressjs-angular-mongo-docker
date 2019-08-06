const projectService = require('../services/project');

// Find all Projects
exports.findAll = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var projects = await projectService.findAll();
        return response.status(200).json({
          status: 200,
          data: projects,
          message: "Succesfully projects Retrieved"
        });
    } catch (error) {
        return response.status(400).json({
          status: 400,
          message: error.message
        });
    }
};


// Insert project
exports.addProject = async function (request, response, next) {
  // TODO: Validation of parameters ...
  try {
      var project = await projectService.addproject(request.body);
      return response.status(200).json({
        status: 200,
        data: project,
        message: "Succesfully project Inserted"
      });
  } catch (error) {
      return response.status(403).json({
        status: 403,
        message: error.message
      });
  }
};

// Find project by id
exports.findById = async function (request, response, next) {
  // TODO: Validation of parameters ...
  try {
      var project = await projectService.findById(request.params.id);
      return response.status(200).json({
        status: 200,
        data: project,
        message: "Succesfully project Retrieved"
      });
  } catch (error) {
      return response.status(400).json({
        status: 400,
        message: error.message
      });
  }
};

// Modify project using his Id
exports.update = async function (request, response, next) {
  // TODO: Validation of parameters ...
  try {
      var project = await projectService.update(request.params.id, request.body);
      return response.status(200).json({
        status: 200,
        data: project,
        message: "Succesfully project Modified"
      });
  } catch (error) {
      return response.status(400).json({
        status: 400,
        message: error.message
      });
  }
}

// Modify project using his Id
exports.delete = async function (request, response, next) {
  // TODO: Validation of parameters ...
  try {
      var project = await projectService.delete(request.params.id);
      return response.status(200).json({
        status: 200,
        data: project,
        message: "Succesfully project deleted"
      });
  } catch (error) {
      return response.status(400).json({
        status: 400,
        message: error.message
      });
  }
};