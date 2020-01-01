const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

// Task model

let comment = new Schema ({
    title: {
        type: String,
        required: true,
        max: 100
    },
    creationDate: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true,
        max: 500,
        required: true
    },
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    task: { 
        type: Schema.Types.ObjectId, 
        ref: 'Task',
        required: true 
    }
});

module.exports = mongoose.model('Comment', comment);