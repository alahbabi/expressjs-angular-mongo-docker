const taskService = require('../services/task');

// Find all tasks
exports.findAll = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var tasks = await taskService.findAll();
        return response.status(200).json({
          status: 200,
          data: tasks,
          message: "Succesfully tasks Retrieved"
        });
    } catch (error) {
        return response.status(400).json({
          status: 400,
          message: error.message
        });
    }
};

// Insert task
exports.addTask = async function (request, response, next) {
  // TODO: Validation of parameters ...
  try {
      var task = await taskService.addTask(request.body);
      return response.status(200).json({
        status: 200,
        data: task,
        message: "Succesfully task Inserted"
      });
  } catch (error) {
      return response.status(403).json({
        status: 403,
        message: error.message
      });
  }
};

// Find task by id
exports.findById = async function (request, response, next) {
  // TODO: Validation of parameters ...
  try {
      var task = await taskService.findById(request.params.id);
      return response.status(200).json({
        status: 200,
        data: task,
        message: "Succesfully task Retrieved"
      });
  } catch (error) {
      return response.status(400).json({
        status: 400,
        message: error.message
      });
  }
};

// Modify task using his Id
exports.update = async function (request, response, next) {
  // TODO: Validation of parameters ...
  try {
      var task = await taskService.update(request.params.id, request.body);
      return response.status(200).json({
        status: 200,
        data: task,
        message: "Succesfully task Modified"
      });
  } catch (error) {
      return response.status(400).json({
        status: 400,
        message: error.message
      });
  }
}

// Modify task using his Id
exports.delete = async function (request, response, next) {
  // TODO: Validation of parameters ...
  try {
      var task = await taskService.delete(request.params.id);
      return response.status(200).json({
        status: 200,
        data: task,
        message: "Succesfully task deleted"
      });
  } catch (error) {
      return response.status(400).json({
        status: 400,
        message: error.message
      });
  }
};