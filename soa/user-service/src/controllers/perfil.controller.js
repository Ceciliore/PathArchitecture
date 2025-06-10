const db = require('../config/db');
const Perfil = require('../models/perfil.model')(db, require('sequelize').DataTypes);

exports.getAllPerfis = async (req, res) => {
    try {
        const perfis = await Perfil.findAll();
        res.json(perfis);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar perfis' });
    }
};