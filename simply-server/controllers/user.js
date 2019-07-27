const userService = require('../services/user');

// Insert user
exports.addUser = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var user = await userService.addUser(request.body);
        return response.status(200).json({
          status: 200,
          data: user,
          message: "Succesfully User Inserted"
        });
    } catch (error) {
        return response.status(403).json({
          status: 403,
          message: error.message
        });
    }
};

// Find all Users
exports.findAll = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var users = await userService.findAll();
        return response.status(200).json({
          status: 200,
          data: users,
          message: "Succesfully Users Retrieved"
        });
    } catch (error) {
        return response.status(400).json({
          status: 400,
          message: error.message
        });
    }
};

// Find user by id
exports.findById = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var user = await userService.findById(request.params.id);
        return response.status(200).json({
          status: 200,
          data: user,
          message: "Succesfully User Retrieved"
        });
    } catch (error) {
        return response.status(400).json({
          status: 400,
          message: error.message
        });
    }
};

// Modify user using his Id
exports.update = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var user = await userService.update(request.params.id, request.body);
        return response.status(200).json({
          status: 200,
          data: user,
          message: "Succesfully User Modified"
        });
    } catch (error) {
        return response.status(400).json({
          status: 400,
          message: error.message
        });
    }
}

// Modify user using his Id
exports.delete = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var user = await userService.delete(request.params.id);
        return response.status(200).json({
          status: 200,
          data: user,
          message: "Succesfully User deleted"
        });
    } catch (error) {
        return response.status(400).json({
          status: 400,
          message: error.message
        });
    }
};
