// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const planRoutes = require('./routes/planRoutes');
const leadRoutes = require('./routes/leadRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/plans', planRoutes);
app.use('/api/leads', leadRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('IronCore Gym API is running securely.');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});