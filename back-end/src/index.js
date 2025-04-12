const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const createDatabase = require('./db');

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Initialize Express app
const app = express();

// Initialize database and attach to app
app.db = createDatabase();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Logging

// Basic admin authentication middleware
const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Import routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

// Routes
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Admin routes (protected)
app.use('/admin', adminAuth, adminRoutes);

// User routes
app.use('/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 