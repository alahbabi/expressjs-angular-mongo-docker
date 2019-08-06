const commentModel = require('../models/comment');

// Find all comments
exports.findAll = async function (){
    try {
        var comments = await commentModel.find().exec();
        return comments;
      } catch (error) {
        throw Error('Error while searching comments  : ' + error.message);
      }
  };

  // Insert comment
exports.addComment = async function(body){
  try {
    var comment = new commentModel(body);
    var result = await comment.save();
    return result;
  } catch (error) {
      throw Error('Error while Inserting comment  : ' + error.message);
  }
};

// Find comment by Id
exports.findById = async function(id){
  try {
    var comment = await commentModel.findById(id).exec();
    return comment;
  } catch (error) {
      throw Error('Error while Finding comment By Id : ' + error.message);
  }
};

// Modify comment using his Id
exports.update = async function(id, body){
    try {
      var comment = await commentModel.findById(id).exec();
      if(comment === undefined || comment === null){
          throw Error('comment not found with id ' + id);
      }
      comment.set(body);
      var savedComment = await comment.save();
      return savedComment;
    } catch (error) {
        throw Error('Error while Updating comment : ' + error.message);
    }
};

// Delete a comment using his Id
exports.delete = async function(id){
  try {
    var deletedComment = await commentModel.deleteOne({ _id: id}).exec();
    return deletedComment;
  } catch (error) {
      throw Error('Error while Deleting comment : ' + error.message);
  }
};