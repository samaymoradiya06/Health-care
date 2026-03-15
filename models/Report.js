const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    analysisResult: {
        type: Object, // Stores extracted params and AI interpretation
        required: true
    },
    imageUrl: {
        type: String, // Store Base64 or URL
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', ReportSchema);
