const db = require('../../models');

const Usuario = db.Usuario;

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ include: ['perfil'] });
        res.json(usuarios);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao listar usuários' });
    }
};

exports.criarUsuario = async (req, res) => {
    try {
        const novoUsuario = await Usuario.create(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar usuário' });
    }
};
