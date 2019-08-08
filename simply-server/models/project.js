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
        type: String,
        required: true,
        max: 100
    },
    collaborators : [{ 
        type: schema.Types.ObjectId, 
        ref: 'user' 
    }]
});

module.exports = mongoose.model('project', Project);