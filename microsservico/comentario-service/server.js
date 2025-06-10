require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/comentarios', require('./src/routes/comentario.routes'));

const PORT = 3004;

db.sync().then(() => {
  app.listen(PORT, () => console.log(`Comentario service rodando na porta ${PORT}`));
});
