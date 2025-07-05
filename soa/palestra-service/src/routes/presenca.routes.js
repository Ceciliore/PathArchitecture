const express = require('express');
const router = express.Router();
const controller = require('../controllers/presenca.controller');

router.get('/', controller.listarPresencas);

router.post('/', controller.criarPresenca);

module.exports = router;
