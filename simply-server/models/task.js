const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

// Task model
let task = new Schema ({
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true   
    },
    group: {
        type: String,
        required: true,
        max: 50
    },
    assignee: { 
        type: Schema.Types.ObjectId,
        ref: 'User'  
    },
    descirption: {
        type: String,
        required: true,
        max: 20
    },
    comments: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Comment'    
    }],
    participants: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'    
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

module.exports = mongoose.model('Task', task);