const db = require('../models');
const Presenca = db.Presenca;

exports.listarPresencas = async (req, res) => {
    try {
        const presencas = await Presenca.findAll();
        res.json(presencas);
    } catch (error) {
        console.error('Erro ao listar presenças:', error);
        res.status(400).json({ erro: 'Erro ao buscar presenças' });
    }
};

exports.criarPresenca = async (req, res) => {
    try {
        const { idUsuario, nomeUsuario, idPalestra } = req.body;

        const novaPresenca = await Presenca.create({
            idUsuario,
            nomeUsuario,
            idPalestra
        });

        res.status(201).json(novaPresenca);
    } catch (error) {
        console.error('Erro ao criar presença:', error);
        res.status(400).json({ erro: 'Erro ao criar presença', detalhes: error.message });
    }
};
