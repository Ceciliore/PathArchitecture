const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('API Gateway está rodando');
});

app.use('/api/usuarios', createProxyMiddleware({
    target: 'http://user-service:3001',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        return '/usuarios';
    },
}));

app.use('/api/perfis', createProxyMiddleware({
    target: 'http://perfil-service:3002',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        return '/perfis';
    },
}));

app.use('/api/palestras', createProxyMiddleware({
    target: 'http://palestra-service:3003',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        return '/palestras';
    },
}));

app.use('/api/comentarios', createProxyMiddleware({
    target: 'http://comentario-service:3004',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        return '/comentarios';
    },
}));

app.use('/api/presencas', createProxyMiddleware({
    target: 'http://presenca-service:3005',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        return '/presencas';
    },
}));

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`API Gateway rodando na porta ${PORT}`);
});
