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
        type: schema.Types.ObjectId,
        ref: 'user',
        required: true   
    },
    project: {
        type: String,
        required: true,
        max: 50
    },
    assignee: { 
        type: schema.Types.ObjectId,
        ref: 'user'  
    },
    descirption: {
        type: String,
        required: true,
        max: 20
    },
    comments: [{ 
        type: schema.Types.ObjectId,
        ref: 'comment'    
    }],
    participants: [{ 
        type: schema.Types.ObjectId,
        ref: 'user'    
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