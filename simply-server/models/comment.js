const mongoose = require('mongoose');
const schema = mongoose.Schema ;

// Task model

let Comment = new schema ({
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
        type: schema.Types.ObjectId, 
        ref: 'user',
        required: true 
    },
    task: { 
        type: schema.Types.ObjectId, 
        ref: 'task',
        required: true 
    }
});

module.exports = mongoose.model('comment', Comment);