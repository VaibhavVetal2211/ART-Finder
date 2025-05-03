const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use(express.static('public'));

// API endpoint to get users
app.get('/api/users', (req, res) => {
    try {
        const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json')));
        res.json(usersData);
    } catch (error) {
        res.status(500).json({ error: 'Error reading user data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});