const Comentario = require('../models/comentario.model');

exports.listarComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.findAll();
        res.json(comentarios);
    } catch (error) {
        console.error('Erro ao listar comentários:', error);
        res.status(400).json({ erro: 'Erro ao buscar comentários' });
    }
};

exports.criarComentario = async (req, res) => {
    try {
        const { conteudo, idUsuario, idPalestra } = req.body;

        const novoComentario = await Comentario.create({
            conteudo,
            idUsuario,
            idPalestra
        });

        res.status(201).json(novoComentario);
    } catch (error) {
        console.error('Erro ao criar comentário:', error);
        res.status(400).json({ erro: 'Erro ao criar comentário', detalhes: error.message });
    }
};
