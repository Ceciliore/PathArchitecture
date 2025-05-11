const db = require('../../models');
const Presenca = db.Presenca;

exports.listarPresencas = async (req, res) => {
    try {
        const presencas = await Presenca.findAll();
        res.json(presencas);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar presenças' });
    }
};

exports.registrarPresenca = async (req, res) => {
    try {
        const nova = await Presenca.create(req.body);
        res.status(201).json(nova);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao registrar presença' });
    }
};