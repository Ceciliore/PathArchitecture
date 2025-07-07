const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let soapClient;

soap.createClient('http://localhost:8000/esb?wsdl', (err, client) => {
    if (!err) {
        soapClient = client;
        console.log('Cliente SOAP conectado ao WSDL.');
    } else {
        console.error('Erro ao conectar SOAP Client:', err);
    }
});

function safeCall(method, args, res) {
    if (!soapClient) return res.status(500).json({ erro: 'SOAP indisponível' });
    soapClient[method](args, (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro ao comunicar com o ESB' });
        try {
            const chave = Object.keys(result)[0];
            const retorno = result[chave];
            if (typeof retorno === 'string' && retorno.startsWith('[')) {
                return res.json(JSON.parse(retorno));
            } else {
                return res.json(retorno);
            }
        } catch (e) {
            return res.status(500).json({ erro: 'Erro ao processar resposta' });
        }
    });
}

// Usuário
app.post('/api/usuarios', (req, res) => safeCall('criarUsuario', req.body, res));
app.get('/api/usuarios', (req, res) => safeCall('listarUsuarios', {}, res));
app.get('/api/perfis', (req, res) => safeCall('listarPerfis', {}, res));

// Palestra
app.post('/api/palestras', (req, res) => safeCall('criarPalestra', req.body, res));
app.get('/api/palestras', (req, res) => safeCall('listarPalestras', {}, res));

// Presença
app.post('/api/presencas', (req, res) => safeCall('registrarPresenca', req.body, res));

// Comentário
app.post('/api/comentarios', (req, res) => safeCall('criarComentario', req.body, res));
app.get('/api/comentarios', (req, res) => safeCall('listarComentarios', {}, res));

app.listen(3333, () => {
    console.log('Middleware REST em execução: http://localhost:3333');
});
