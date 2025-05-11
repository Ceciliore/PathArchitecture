const db = require('../../models');
const Comentario = db.Comentario;
const Usuario = db.Usuario;

exports.listarComentarios = async (req, res) => {
    try {
        const idPalestra = req.query.palestra;

        if (!idPalestra) {
            return res.status(400).json({ erro: 'ID da palestra não informado.' });
        }

        const comentarios = await Comentario.findAll({
            where: { idPalestra },
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['nome']
                }
            ]
        });

        res.status(200).json(comentarios);
    } catch (error) {
        console.error('Erro ao listar comentários:', error);
        res.status(500).json({ erro: 'Erro ao listar comentários.' });
    }
};


exports.criarComentario = async (req, res) => {
    try {
        const { conteudo, idUsuario, idPalestra } = req.body;
        console.log(req.body);
        const novoComentario = await Comentario.create({
            conteudo,
            idUsuario,
            idPalestra
        });

        res.status(201).json(novoComentario);
    } catch (error) {
        console.error('Erro ao criar comentário:', error); // <-- isso aqui é ESSENCIAL
        res.status(500).json({ erro: 'Erro ao criar comentário.' });
    }
};