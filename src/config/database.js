const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

// Test the connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = {
    sequelize
};

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        
        // Import models
        const User = require('../models/User');
        const Token = require('../models/Token');

        // Force sync User table first
        await User.sync();
        
        // Then sync Token table
        await Token.sync();
        
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };