const db = require('../models');
const Comentario = db.Comentario;

exports.listarComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.findAll();
        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar comentários' });
    }
};

exports.criarComentario = async (req, res) => {
    try {
        const { conteudo, idUsuario, nomeUsuario, idPalestra } = req.body;

        const novoComentario = await Comentario.create({
            conteudo,
            idUsuario,
            nomeUsuario,
            idPalestra
        });

        res.status(201).json(novoComentario);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar comentário', detalhes: error.message });
    }
};
