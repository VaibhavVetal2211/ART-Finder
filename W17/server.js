const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('public'));

// API endpoint to get employee data
app.get('/api/employees', (req, res) => {
    try {
        const employeesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'employees.json'), 'utf8'));
        res.json(employeesData);
    } catch (error) {
        console.error('Error reading employees data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});