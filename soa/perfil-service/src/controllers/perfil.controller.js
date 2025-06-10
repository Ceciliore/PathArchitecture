const Perfil = require('../models/perfil.model');

exports.listarPerfis = async (req, res) => {
    try {
        const perfis = await Perfil.findAll();
        res.json(perfis);
    } catch (error) {
        console.error('Erro ao listar perfis:', error);
        res.status(400).json({ erro: 'Erro ao buscar perfis' });
    }
};

exports.criarPerfil = async (req, res) => {
    try {
        const { nome } = req.body;

        const novoPerfil = await Perfil.create({ nome });
        res.status(201).json(novoPerfil);
    } catch (error) {
        console.error('Erro ao criar perfil:', error);
        res.status(400).json({ erro: 'Erro ao criar perfil', detalhes: error.message });
    }
};
