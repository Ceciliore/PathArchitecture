require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/presencas', require('./src/routes/presenca.routes'));

const PORT = 3005;

db.sync().then(() => {
  app.listen(PORT, () => console.log(`Presenca service rodando na porta ${PORT}`));
});
