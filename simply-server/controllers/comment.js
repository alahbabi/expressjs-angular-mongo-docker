const commentService = require('../services/comment');

// Insert comment
exports.addComment = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var comment = await commentService.addComment(request.body);
        return response.status(200).json({
          status: 200,
          data: comment,
          message: "Succesfully comment Inserted"
        });
    } catch (error) {
        return response.status(403).json({
          status: 403,
          message: error.message
        });
    }
};

// Find all comments
exports.findAll = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var comments = await commentService.findAll();
        return response.status(200).json({
          status: 200,
          data: comments,
          message: "Succesfully comments Retrieved"
        });
    } catch (error) {
        return response.status(400).json({
          status: 400,
          message: error.message
        });
    }
};

// Find comment by id
exports.findById = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var comment = await commentService.findById(request.params.id);
        return response.status(200).json({
          status: 200,
          data: comment,
          message: "Succesfully comment Retrieved"
        });
    } catch (error) {
        return response.status(400).json({
          status: 400,
          message: error.message
        });
    }
};

// Modify comment using his Id
exports.update = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var comment = await commentService.update(request.params.id, request.body);
        return response.status(200).json({
          status: 200,
          data: comment,
          message: "Succesfully comment Modified"
        });
    } catch (error) {
        return response.status(400).json({
          status: 400,
          message: error.message
        });
    }
}

// Modify comment using his Id
exports.delete = async function (request, response, next) {
    // TODO: Validation of parameters ...
    try {
        var comment = await commentService.delete(request.params.id);
        return response.status(200).json({
          status: 200,
          data: comment,
          message: "Succesfully comment deleted"
        });
    } catch (error) {
        return response.status(400).json({
          status: 400,
          message: error.message
        });
    }
};
