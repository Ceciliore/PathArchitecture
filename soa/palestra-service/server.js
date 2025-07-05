require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/models');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/api/palestras', require('./src/routes/palestra.routes'));
app.use('/api/comentarios', require('./src/routes/comentario.routes'));
app.use('/api/presencas', require('./src/routes/presenca.routes'));

// só aqui!
db.sequelize.sync().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Palestra Service rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao conectar ao banco:', error);
});
