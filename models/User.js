const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, // Made optional for GitHub users
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true // Allows nulls/undefined but still unique when present
    },
    avatarUrl: {
        type: String
    },
    mobile: {
        type: String
    },
    age: {
        type: Number
    },
    bloodGroup: {
        type: String
    },
    hasIllness: {
        type: Boolean,
        default: false
    },
    illnessDetails: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
