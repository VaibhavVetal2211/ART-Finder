const { sequelize } = require('./database');
const User = require('../models/User');
const Token = require('../models/Token');
const ChatHistory = require('../models/ChatHistory');

async function syncDatabase() {
    try {
        // Sync all models
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
        process.exit(1);
    }
}

syncDatabase();