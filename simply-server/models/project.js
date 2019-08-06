const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Project model

let Project = new schema ({
    name: {
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
    collaborators : [{ 
        type: schema.Types.ObjectId, 
        ref: 'user' 
    }]
});

module.exports = mongoose.model('project', Project);