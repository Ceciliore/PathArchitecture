const express = require('express');
const router = express.Router();
const controller = require('./palestra.controller');

router.get('/', controller.listarPalestras);
router.post('/', controller.criarPalestra);

module.exports = router;
