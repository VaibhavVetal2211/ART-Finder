const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const ChatHistory = sequelize.define('ChatHistory', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true
});

ChatHistory.belongsTo(User, { foreignKey: 'userId' });

module.exports = ChatHistory;