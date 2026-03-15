const mongoose = require('mongoose');

const TipSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'General'
    },
    icon: {
        type: String,
        default: '💡'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tip', TipSchema);
