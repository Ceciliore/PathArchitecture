require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/perfis', require('./src/routes/perfil.routes'));

const PORT = 3002;

db.sync().then(() => {
  app.listen(PORT, () => console.log(`Perfil service rodando na porta ${PORT}`));
});
