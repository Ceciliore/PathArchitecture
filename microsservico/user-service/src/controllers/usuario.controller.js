const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const JWT_SECRET = process.env.JWT_SECRET

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao buscar usuários' });
    }
};

exports.criarUsuario = async (req, res) => {
    try {
        const { nome, matricula, email, senha, idPerfil } = req.body;

        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = await Usuario.create({
            nome,
            matricula,
            email,
            senha: senhaHash,
            idPerfil
        });

        res.status(201).json(novoUsuario);
    } catch (error) {

        res.status(400).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
    }
};

exports.loginUsuario = async (req, res) => {
    try {
        const { identificador, senha } = req.body;

        const usuario = await Usuario.findOne({
            where: {
                [Op.or]: [
                    { email: identificador },
                    { matricula: identificador }
                ]
            }
        });

        if (!usuario) {
            return res.status(401).json({ erro: 'Usuário não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'Senha inválida' });
        }

        const { id, nome, email, matricula, idPerfil } = usuario;
        res.json({
            mensagem: 'Login bem-sucedido',
            usuario: { id, nome, email, matricula, idPerfil }
        });

    } catch (error) {
        res.status(400).json({ erro: 'Erro ao fazer login', detalhes: error.message });
    }
};