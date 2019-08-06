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
    owner: { 
        type: schema.Types.ObjectId, 
        ref: 'user',
        required: true
    },
    assignment: { 
        type: schema.Types.ObjectId, 
        ref: 'user' 
    },
    comments: [{ 
        type: schema.Types.ObjectId, 
        ref: 'comment' 
    }]
});

module.exports = mongoose.model('task', Task);