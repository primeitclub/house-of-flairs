// server.js

require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // <--- Make sure this is imported

const app = express();

connectDB();

// IMPORTANT: These two lines for parsing JSON and enabling CORS
app.use(express.json()); // <--- This MUST be before your routes
app.use(cors());         // <--- This MUST be before your routes

// --- Your API Routes ---
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/auth', require('./routes/authRoutes')); // And this line is correctly mounting authRoutes

app.get('/', (req, res) => {
    res.send('Lost & Found API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access it at: http://localhost:${PORT}`);
});