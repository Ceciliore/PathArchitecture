const soap = require('soap');
const http = require('http');
const fs = require('fs');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

// Serviço SOAP
const service = {
    ESBService: {
        ESBServiceSoapPort: {
            criarUsuario(args) {
                return axios.post('http://user-service:3002/usuarios', args)
                    .then(() => ({ status: 'Usuário criado com sucesso' }))
                    .catch((err) => {
                        console.error('Erro real ao criar usuário:', err.response?.data || err.message);
                        throw new Error('Erro ao criar usuário');
                    });
            },

            listarUsuarios() {
                return axios.get('http://user-service:3002/usuarios')
                    .then(res => ({ resultado: JSON.stringify(res.data) }))
                    .catch((err) => {
                        console.error('Erro real ao listar usuários:', err.response?.data || err.message);
                        throw new Error('Erro ao listar usuários');
                    });
            },

            listarPerfis() {
                return axios.get('http://user-service:3002/perfis')
                    .then(res => ({ resultado: JSON.stringify(res.data) }))
                    .catch((err) => {
                        console.error('Erro real ao listar perfis:', err.response?.data || err.message);
                        throw new Error('Erro ao listar perfis');
                    });
            },

            criarPalestra(args) {
                return axios.post('http://palestra-service:3002/api/palestras', args)
                    .then(() => ({ status: 'Palestra criada com sucesso' }))
                    .catch((err) => {
                        console.error('Erro real ao criar palestra:', err.response?.data || err.message);
                        throw new Error('Erro ao criar palestra');
                    });
            },
            listarPalestras() {
                return axios.get('http://palestra-service:3002/api/palestras')
                    .then(res => ({ resultado: JSON.stringify(res.data) }))
                    .catch((err) => {
                        console.error('Erro real ao listar palestras:', err.response?.data || err.message);
                        throw new Error('Erro ao listar palestras');
                    });
            },

            registrarPresenca(args) {
                return axios.post('http://palestra-service:3002/api/presencas', args)
                    .then(() => ({ status: 'Presença registrada com sucesso' }))
                    .catch((err) => {
                        console.error('Erro real ao registrar presença:', err.response?.data || err.message);
                        throw new Error('Erro ao registrar presença');
                    });
            },

            criarComentario(args) {
                return axios.post('http://palestra-service:3002/api/comentarios', args)
                    .then(() => ({ status: 'Comentário criado com sucesso' }))
                    .catch((err) => {
                        console.error('Erro real ao criar comentário:', err.response?.data || err.message);
                        throw new Error('Erro ao criar comentário');
                    });
            },

            listarComentarios() {
                return axios.get('http://palestra-service:3002/api/comentarios')
                    .then(res => ({ resultado: JSON.stringify(res.data) }))
                    .catch((err) => {
                        console.error('Erro real ao listar comentários:', err.response?.data || err.message);
                        throw new Error('Erro ao listar comentários');
                    });
            }
        }
    }
};

const wsdl = fs.readFileSync('./esb.wsdl', 'utf8');

// server SOAP
const server = http.createServer((req, res) => res.end('404: Not Found'));
server.listen(8000, () => {
    console.log('SOAP disponível em http://localhost:8000/esb?wsdl');
});
soap.listen(server, '/esb', service, wsdl);

const restApp = express();
restApp.use(bodyParser.json());

let soapClient;
soap.createClient('http://localhost:8000/esb?wsdl', (err, client) => {
    if (!err) {
        soapClient = client;
        console.log('Cliente SOAP conectado ao WSDL.');
    } else {
        console.error('Erro ao conectar SOAP Client:', err);
    }
});

// USUÁRIO
restApp.post('/api/usuarios', (req, res) => {
    if (!soapClient) return res.status(500).json({ erro: 'SOAP indisponível' });

    soapClient.criarUsuario(req.body, (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro ao criar usuário' });
        res.json(result);
    });
});

restApp.get('/api/usuarios', (req, res) => {
    if (!soapClient) return res.status(500).json({ erro: 'SOAP indisponível' });

    soapClient.listarUsuarios({}, (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro ao listar usuários' });
        try {
            res.json(JSON.parse(result.resultado));
        } catch {
            res.status(500).json({ erro: 'Erro ao converter resposta SOAP' });
        }
    });
});

restApp.get('/api/perfis', (req, res) => {
    if (!soapClient) return res.status(500).json({ erro: 'SOAP indisponível' });

    soapClient.listarPerfis({}, (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro ao listar perfis' });
        try {
            res.json(JSON.parse(result.resultado));
        } catch {
            res.status(500).json({ erro: 'Erro ao converter resposta SOAP' });
        }
    });
});

restApp.post('/api/palestras', (req, res) => {
    if (!soapClient) return res.status(500).json({ erro: 'SOAP indisponivel' });

    soapClient.criarPalestra(req.body, (err, result) => {
        if (err) {
            console.error('Erro na camada SOAP to ESB:', err);
            return res.status(500).json({ erro: 'Erro ao criar palestra' });
        }
        res.json(result);
    });
});

restApp.get('/api/palestras', (req, res) => {
    if (!soapClient) return res.status(500).json({ erro: 'SOAP indisponível' });

    soapClient.listarPalestras({}, (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro ao listar palestras' });

        try {
            res.json(JSON.parse(result.resultado));
        } catch {
            res.status(500).json({ erro: 'Erro ao converter resposta SOAP' });
        }
    });
});

restApp.post('/api/presencas', (req, res) => {
    if (!soapClient) return res.status(500).json({ erro: 'SOAP indisponível' });

    soapClient.registrarPresenca(req.body, (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro ao registrar presença' });
        res.json(result);
    });
});

restApp.post('/api/comentarios', (req, res) => {
    if (!soapClient) return res.status(500).json({ erro: 'SOAP indisponível' });

    soapClient.criarComentario(req.body, (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro ao criar comentário' });
        res.json(result);
    });
});

restApp.get('/api/comentarios', (req, res) => {
    if (!soapClient) return res.status(500).json({ erro: 'SOAP indisponível' });

    soapClient.listarComentarios({}, (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro ao listar comentários' });
        try {
            res.json(JSON.parse(result.resultado));
        } catch {
            res.status(500).json({ erro: 'Erro ao converter resposta SOAP' });
        }
    });
});

restApp.listen(3333, () => {
    console.log('Middleware REST rodando em http://localhost:3333');
});
