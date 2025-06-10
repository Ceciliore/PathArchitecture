const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Presenca = sequelize.define('Presenca', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idPalestra: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataHora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'presencas',
    timestamps: false
});

module.exports = Presenca;
