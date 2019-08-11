const mongoose = require('mongoose');
const schema = mongoose.Schema ;

// Task model
let Task = new schema ({
    title: {
        type: String,
        required: true,
        max: 100
    },
    creationDate: {
        type: Date,
        required: true
    },
    modificationDate: {
        type: Date,
        required: false
    },
    owner: { 
        type: String,
        required: true,
        max: 100
    },
    project: {
        type: String,
        required: true,
        max: 50
    },
    assignee: { 
        type: String,
        required: true,
        max: 100 
    },
    descirption: {
        type: String,
        required: true,
        max: 20
    },
    comments: [{ 
        type: String,
        required: true,
        max: 200
    }],
    participants: [{ 
        type: String,
        required: true,
        max: 100
    }],
    priority: {
        type: String,
        required: true,
        max: 20
    },
    status: {
        type: String,
        required: true,
        max: 20
    }
});

module.exports = mongoose.model('task', Task);