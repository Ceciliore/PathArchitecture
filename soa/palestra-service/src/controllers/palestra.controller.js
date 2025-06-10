const Palestra = require('../models/palestra.model');

// GET /palestras
exports.listarPalestras = async (req, res) => {
    try {
        const palestras = await Palestra.findAll();
        res.json(palestras);
    } catch (error) {
        console.error('Erro ao listar palestras:', error);
        res.status(400).json({ erro: 'Erro ao buscar palestras' });
    }
};

// POST /palestras
exports.criarPalestra = async (req, res) => {
    try {
        console.log(req.body)
        const { titulo, descricao, palestrante, data, horario, local } = req.body;

        const novaPalestra = await Palestra.create({
            titulo,
            descricao,
            palestrante,
            data,
            horario,
            local
        });

        res.status(201).json(novaPalestra);
    } catch (error) {
        console.error('Erro ao criar palestra:', error);
        res.status(400).json({ erro: 'Erro ao criar palestra', detalhes: error.message });
    }
};
