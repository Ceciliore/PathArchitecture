require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/palestras', require('./src/routes/palestra.routes'));

const PORT = 3003;

db.sync().then(() => {
  app.listen(PORT, () => console.log(`Palestra service rodando na porta ${PORT}`));
});
