require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./src/config/db');

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/usuarios', require('./src/routes/usuario.routes'));

const PORT = 3001;

db.sync().then(() => {
    app.listen(PORT, () => console.log(`User service rodando na porta ${PORT}`));
});
