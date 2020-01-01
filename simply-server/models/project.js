const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Project model

let project = new Schema ({
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
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Project', project);