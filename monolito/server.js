const express = require('express');
const path = require('path');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// db.sequelize.sync();
db.sequelize.sync({ alter: true });

app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Rota para criar palestras
app.post('/api/palestras', async (req, res) => {
    try {
        const novaPalestra = await db.Palestra.create(req.body);
        res.status(201).json(novaPalestra);
    } catch (error) {
        console.error('Erro ao criar palestra:', error);
        res.status(500).json({ mensagem: 'Erro interno' });
    }
});

// Rota para listar palestras
app.get('/api/palestras', async (req, res) => {
    try {
        const palestras = await db.Palestra.findAll();
        res.json(palestras);
    } catch (error) {
        console.error('Erro ao listar palestras:', error);
        res.status(500).json({ mensagem: 'Erro interno' });
    }
});

app.post('/api/presencas', async (req, res) => {
    const { idUsuario, idPalestra, path_certificado } = req.body;

    try {
        const novaPresenca = await db.Presenca.create({
            idUsuario,
            idPalestra,
            path_certificado
        });

        res.status(201).json(novaPresenca);
    } catch (error) {
        console.error('Erro ao registrar presença:', error);
        res.status(500).json({ mensagem: 'Erro ao registrar presença' });
    }
});

app.post('/api/comentarios', async (req, res) => {
    const { conteudo, idUsuario, idPalestra, idPresenca } = req.body;

    try {
        const novoComentario = await db.Comentario.create({
            conteudo,
            idUsuario,
            idPalestra,
            idPresenca: idPresenca || null
        });

        res.status(201).json(novoComentario);
    } catch (error) {
        console.error('Erro ao salvar comentário:', error);
        res.status(500).json({ mensagem: 'Erro ao salvar comentário' });
    }
});

app.get('/api/comentarios', async (req, res) => {
    const { palestra } = req.query;

    try {
        const comentarios = await db.Comentario.findAll({
            where: { idPalestra: palestra },
            include: [{
                model: db.Usuario,
                attributes: ['id', 'nome']
            }],
            order: [['createdAt', 'ASC']]
        });

        res.json(comentarios);
    } catch (error) {
        console.error('Erro ao listar comentários:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar comentários' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
