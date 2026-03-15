const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String, // format: YYYY-MM-DD
        required: true
    },
    water: {
        type: Number,
        default: 0
    },
    sleep: {
        type: Number,
        default: 0
    },
    steps: {
        type: Number,
        default: 0
    },
    exercise: {
        type: Number,
        default: 0
    },
    medicine: {
        type: Boolean,
        default: false
    }
});

// Compound index to ensure one habit record per user per day
HabitSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Habit', HabitSchema);
