const express = require('express');
const router = express.Router();
const controller = require('../controllers/perfil.controller');

router.get('/', controller.listarPerfis);

module.exports = router;
