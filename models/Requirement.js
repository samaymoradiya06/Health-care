const mongoose = require('mongoose');

const RequirementSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional, in case a guest user suggests a feature
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'implemented', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Requirement', RequirementSchema);
