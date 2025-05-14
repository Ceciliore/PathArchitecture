const express = require('express');
const router = express.Router();
const controller = require('../controllers/palestra.controller');

router.get('/', controller.listarPalestras);

router.post('/', controller.criarPalestra);

module.exports = router;