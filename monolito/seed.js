const db = require('./models');

(async () => {
    try {
        await db.sequelize.sync({ alter: true });

        // Perfis
        const perfis = await db.Perfil.bulkCreate([
            { nome: 'aluno' },
            { nome: 'usuario' },
            { nome: 'admin' }
        ], { ignoreDuplicates: true });

        // Usuarios
        const usuarios = await db.Usuario.bulkCreate([
            { nome: 'Eduardo', idPerfil: 1 },
            { nome: 'Diego', idPerfil: 2 },
            { nome: 'Malena', idPerfil: 3 }
        ], { ignoreDuplicates: true });

        console.log('Seed inserido com sucesso!');
    } catch (error) {
        console.error('Erro ao executar seed:', error);
    } finally {
        process.exit();
    }
})();
