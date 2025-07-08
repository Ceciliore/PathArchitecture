const express = require('express');
const path = require('path');
const db = require('./models');
const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3333;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

db.sequelize.sync({ alter: true });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *       500:
 *         description: Erro ao buscar usuários.
 */
app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await db.Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
});

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - matricula
 *               - email
 *               - senha
 *               - idPerfil
 *             properties:
 *               nome:
 *                 type: string
 *               matricula:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               idPerfil:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       500:
 *         description: Erro ao criar usuário.
 */
app.post('/api/usuarios', async (req, res) => {
    try {
        const { nome, matricula, email, senha, idPerfil } = req.body;

        const novoUsuario = await db.Usuario.create({
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
});



/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Realiza login de usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identificador
 *               - senha
 *             properties:
 *               identificador:
 *                 type: string
 *                 description: Email ou matrícula do usuário
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *       401:
 *         description: Usuário ou senha inválidos.
 *       500:
 *         description: Erro ao fazer login.
 */
app.post('/api/usuarios/login', async (req, res) => {
    try {
        const { identificador, senha } = req.body;

        const usuario = await db.Usuario.findOne({
            where: {
                [db.Sequelize.Op.or]: [
                    { email: identificador },
                    { matricula: identificador }
                ]
            }
        });

        console.log('morango');

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
});

/**
 * @swagger
 * /api/palestras:
 *   post:
 *     summary: Cria uma nova palestra
 *     tags: [Palestras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               local:
 *                 type: string
 *               palestrante:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date
 *               horario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Palestra criada com sucesso
 */
app.post('/api/palestras', async (req, res) => {
    try {
        const novaPalestra = await db.Palestra.create(req.body);
        res.status(201).json(novaPalestra);
    } catch (error) {
        console.error('Erro ao criar palestra:', error);
        res.status(500).json({ mensagem: 'Erro interno' });
    }
});

/**
 * @swagger
 * /api/palestras:
 *   get:
 *     summary: Lista todas as palestras
 *     tags: [Palestras]
 *     responses:
 *       200:
 *         description: Lista de palestras
 */
app.get('/api/palestras', async (req, res) => {
    try {
        const palestras = await db.Palestra.findAll();
        res.json(palestras);
    } catch (error) {
        console.error('Erro ao listar palestras:', error);
        res.status(500).json({ mensagem: 'Erro interno' });
    }
});

/**
 * @swagger
 * /api/presencas:
 *   post:
 *     summary: Registra a presença de um usuário em uma palestra
 *     tags: [Presenças]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: integer
 *               idPalestra:
 *                 type: integer
 *               path_certificado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Presença registrada
 */
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

/**
 * @swagger
 * /api/comentarios:
 *   post:
 *     summary: Salva um comentário em uma palestra
 *     tags: [Comentários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo:
 *                 type: string
 *               idUsuario:
 *                 type: integer
 *               idPalestra:
 *                 type: integer
 *               idPresenca:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Comentário criado
 */
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

/**
 * @swagger
 * /api/comentarios:
 *   get:
 *     summary: Lista os comentários de uma palestra
 *     tags: [Comentários]
 *     parameters:
 *       - in: query
 *         name: palestra
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da palestra
 *     responses:
 *       200:
 *         description: Lista de comentários
 */
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
