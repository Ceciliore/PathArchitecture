const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const UsuarioModel = require('./usuario.model');
const PerfilModel = require('./perfil.model');

const Usuario = UsuarioModel(sequelize, Sequelize.DataTypes);
const Perfil = PerfilModel(sequelize, Sequelize.DataTypes);

Usuario.associate?.({ Perfil });
Perfil.associate?.({ Usuario });

const db = {
    sequelize,
    Sequelize,
    Usuario,
    Perfil
};

module.exports = db;
