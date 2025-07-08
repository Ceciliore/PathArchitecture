const express = require('express');
const path = require('path');
const db = require('./src/models');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Usuarios
const usuarioRoutes = require('./src/modules/usuarios/usuario.routes');
app.use('/api/usuarios', usuarioRoutes);

// Palestras
const palestraRoutes = require('./src/modules/palestras/palestra.routes');
app.use('/api/palestras', palestraRoutes);

// Comentarios
const comentarioRoutes = require('./src/modules/comentarios/comentario.routes');
app.use('/api/comentarios', comentarioRoutes);

// Presencas
const presencaRoutes = require('./src/modules/presencas/presenca.routes');
app.use('/api/presencas', presencaRoutes);

db.sequelize.sync({ alter: true }).then(() => {
    console.log('Banco conectado com sucesso!');
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Erro ao conectar no banco:', err);
});
