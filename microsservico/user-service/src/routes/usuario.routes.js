const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');

router.get('/', controller.listarUsuarios);

router.post('/', controller.criarUsuario);

router.patch('/', controller.loginUsuario)

module.exports = router;
