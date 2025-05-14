const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Palestra = sequelize.define('Palestra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    palestrante: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // data: {
    //     type: DataTypes.DATEONLY,
    //     allowNull: false
    // },
    // horario: {
    //     type: DataTypes.TIME,
    //     allowNull: false
    // },
    horario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    local: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'palestras',
    timestamps: false
});

module.exports = Palestra;
