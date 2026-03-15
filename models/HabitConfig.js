const mongoose = require('mongoose');

const HabitConfigSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    habitName: {
        type: String,
        required: true
    },
    targetValue: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        default: ''
    },
    reminderTime: {
        type: String, // format: "08:00"
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('HabitConfig', HabitConfigSchema);
