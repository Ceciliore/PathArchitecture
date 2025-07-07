const express = require('express');
const router = express.Router();
const controller = require('./comentario.controller');

router.get('/', controller.listarComentarios);
router.post('/', controller.criarComentario);

module.exports = router;
