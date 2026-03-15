const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from root

if (!process.env.MONGODB_URI) {
    console.warn('⚠️ WARNING: MONGODB_URI is not defined in environment variables!');
}

// Database Connection
async function connectDB() {
    try {
        const uri = process.env.MONGODB_URI;
        
        console.log('⏳ Connecting to MongoDB...');
        
        await mongoose.connect(uri, { 
            serverSelectionTimeoutMS: 5000 
        });
        
        console.log('✅ MongoDB Connected Successfully');
    } catch (err) {
        console.error('\n❌ MongoDB Connection Error ❌');
        console.error('It seems MongoDB is not reachable.');
        console.error('If this is a local database (mongodb://localhost:27017/healthguard), ensure MongoDB Server is installed and running.');
        console.error('If this is a Cloud URI (Atlas), ensure your password is correct and your IP is whitelisted.\n');
        console.error(err.message);
    }
}
connectDB();

// Routes
// We will import routes here later
const authRoutes = require('./routes/auth');
const habitRoutes = require('./routes/habits');
const chatbotRoutes = require('./routes/chatbot');
const adminRoutes = require('./routes/admin');
const reportRoutes = require('./routes/reports');

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/chat', chatbotRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);

// Base route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 404 Handler for API
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
