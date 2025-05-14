const Usuario = require('../models/usuario.model');

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
};

exports.criarUsuario = async (req, res) => {
    try {
        const { nome, matricula, email, senha, idPerfil } = req.body;

        const novoUsuario = await Usuario.create({
            nome,
            matricula,
            email,
            senha,
            idPerfil
        });

        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
    }
};
