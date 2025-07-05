const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Importa os modelos
const PalestraModel = require('./palestra.model');
const ComentarioModel = require('./comentario.model');
const PresencaModel = require('./presenca.model');

// Instancia os modelos
const Palestra = PalestraModel(sequelize, Sequelize.DataTypes);
const Comentario = ComentarioModel(sequelize, Sequelize.DataTypes);
const Presenca = PresencaModel(sequelize, Sequelize.DataTypes);

// Associações
Palestra.hasMany(Comentario, { foreignKey: 'idPalestra', as: 'comentarios' });
Comentario.belongsTo(Palestra, { foreignKey: 'idPalestra', as: 'palestra' });

Palestra.hasMany(Presenca, { foreignKey: 'idPalestra', as: 'presencas' });
Presenca.belongsTo(Palestra, { foreignKey: 'idPalestra', as: 'palestra' });

// Exporta tudo pronto
const db = {
    sequelize,
    Sequelize,
    Palestra,
    Comentario,
    Presenca
};

module.exports = db;
