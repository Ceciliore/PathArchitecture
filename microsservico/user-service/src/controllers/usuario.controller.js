const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

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

exports.loginUsuario = async (req, res) => {
    try {
        const { identificador, senha } = req.body;

        const usuario = await Usuario.findOne({
            where: {
                [Usuario.sequelize.Op.or]: [
                    { email: identificador },
                    { matricula: identificador }
                ]
            }
        });

        console.log('morango')

        if (!usuario) return res.status(401).json({ erro: 'Usuário não encontrado' });

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) return res.status(401).json({ erro: 'Senha inválida' });

        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome, email: usuario.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ mensagem: 'Login bem-sucedido', token });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao fazer login', detalhes: error.message });
    }
};