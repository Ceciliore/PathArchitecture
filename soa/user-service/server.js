require('dotenv').config();
const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const db = require('./src/config/db');

const UsuarioModel = require('./src/models/usuario.model');
const PerfilModel = require('./src/models/perfil.model');

const Usuario = UsuarioModel(db, Sequelize.DataTypes);
const Perfil = PerfilModel(db, Sequelize.DataTypes);

Usuario.associate({ Perfil });

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/usuarios', require('./src/routes/usuario.routes'));
app.use('/perfis', require('./src/routes/perfil.routes'))

const PORT = 3001;

db.sync().then(() => {
    app.listen(PORT, () => console.log(`User service rodando na porta ${PORT}`));
});
