const db = require('../../models');
const Palestra = db.Palestra;

exports.listarPalestras = async (req, res) => {
    try {
        const palestras = await Palestra.findAll();
        res.json(palestras);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar palestras' });
    }
};

exports.criarPalestra = async (req, res) => {
    try {
        const novaPalestra = await Palestra.create(req.body);
        res.status(201).json(novaPalestra);
    } catch (error) {
        console.log(req.body);
        console.error('Erro ao criar palestra:', error);
        res.status(400).json({ erro: 'Erro ao criar palestra' });
    }
};
