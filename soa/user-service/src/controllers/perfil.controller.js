const db = require('../models');
const Perfil = db.Perfil;

exports.listarPerfis = async (req, res) => {
    try {
        const perfis = await Perfil.findAll();
        res.json(perfis);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar perfis' });
    }
};
