const axios = require('axios');

const perfilService = {
    listarPerfis: async function (_, callback) {
        try {
            const response = await axios.get('http://user-service:3000/perfis');
            const resultado = JSON.stringify(response.data);
            callback({ resultado });
        } catch (error) {
            console.error('Erro ao listar perfis:', error.message);
            callback({ resultado: 'Erro ao buscar perfis' });
        }
    }
};

module.exports = perfilService;
