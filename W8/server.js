const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files from current directory
app.use(express.static(__dirname));

// Endpoint to save registration data
app.post('/save-registration', async (req, res) => {
    try {
        const registrationData = req.body;
        const filePath = path.join(__dirname, 'registrations.json');

        // Read existing registrations
        let registrations = [];
        try {
            const data = await fs.readFile(filePath, 'utf8');
            registrations = JSON.parse(data);
        } catch (error) {
            // If file doesn't exist or is empty, start with empty array
            registrations = [];
        }

        // Add new registration
        registrations.push(registrationData);

        // Save back to file
        await fs.writeFile(filePath, JSON.stringify(registrations, null, 2));

        res.status(200).json({ message: 'Registration saved successfully' });
    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(500).json({ error: 'Failed to save registration' });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});