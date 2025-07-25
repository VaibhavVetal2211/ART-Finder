const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Token = sequelize.define('Token', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('refresh', 'access'),
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Token;