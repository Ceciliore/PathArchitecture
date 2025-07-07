const express = require('express');
const router = express.Router();
const controller = require('./presenca.controller');

router.get('/', controller.listarPresencas);
router.post('/', controller.registrarPresenca);

module.exports = router;